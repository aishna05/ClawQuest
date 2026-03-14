#[starknet::interface]
pub trait IERC20<TContractState> {
    fn transfer(ref self: TContractState, recipient: starknet::ContractAddress, amount: u256) -> bool;
    fn transfer_from(
        ref self: TContractState,
        sender: starknet::ContractAddress,
        recipient: starknet::ContractAddress,
        amount: u256,
    ) -> bool;
}

#[derive(Drop, Serde, Copy, starknet::Store)]
pub struct MatchData {
    pub player1: starknet::ContractAddress,
    pub player2: starknet::ContractAddress,
    pub pot: u128,
    pub active: bool,
    pub locked: bool,
}

#[starknet::interface]
pub trait IMatchPot<TContractState> {
    fn create_match(ref self: TContractState, match_id: u64, player2: starknet::ContractAddress);
    fn deposit(ref self: TContractState, match_id: u64);
    fn lock_pot(ref self: TContractState, match_id: u64);
    fn distribute(
        ref self: TContractState,
        match_id: u64,
        winner: starknet::ContractAddress,
        loser: starknet::ContractAddress,
    );
    fn get_match(self: @TContractState, match_id: u64) -> MatchData;
    fn get_entry_fee(self: @TContractState) -> u128;
}

#[starknet::contract]
pub mod MatchPot {
    use super::{IERC20Dispatcher, IERC20DispatcherTrait, IMatchPot, MatchData};
    use starknet::{ContractAddress, get_caller_address, get_contract_address};
    use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess, StoragePointerReadAccess, StoragePointerWriteAccess};

    const WINNER_BPS: u128 = 8000;
    const LOSER_BPS: u128 = 500;
    const BPS_DENOM: u128 = 10000;

    #[storage]
    struct Storage {
        operator: ContractAddress,
        platform: ContractAddress,
        token: ContractAddress,
        entry_fee: u128,
        matches: Map<u64, MatchData>,
        deposited: Map<(u64, ContractAddress), bool>,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        operator: ContractAddress,
        platform: ContractAddress,
        token: ContractAddress,
        entry_fee: u128,
    ) {
        self.operator.write(operator);
        self.platform.write(platform);
        self.token.write(token);
        self.entry_fee.write(entry_fee);
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        MatchCreated: MatchCreated,
        Deposited: Deposited,
        PotLocked: PotLocked,
        PotDistributed: PotDistributed,
    }

    #[derive(Drop, starknet::Event)]
    struct MatchCreated {
        match_id: u64,
        player1: ContractAddress,
        player2: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct Deposited {
        match_id: u64,
        player: ContractAddress,
        amount: u128,
    }

    #[derive(Drop, starknet::Event)]
    struct PotLocked {
        match_id: u64,
        pot: u128,
    }

    #[derive(Drop, starknet::Event)]
    struct PotDistributed {
        match_id: u64,
        winner: ContractAddress,
        loser: ContractAddress,
        winner_share: u128,
        loser_share: u128,
        platform_share: u128,
    }

    fn to_u256(amount: u128) -> u256 {
        u256 { low: amount, high: 0 }
    }

    fn assert_operator(self: @ContractState) {
        assert(get_caller_address() == self.operator.read(), 'only operator');
    }

    fn assert_player(m: MatchData, caller: ContractAddress) {
        assert(caller == m.player1 || caller == m.player2, 'only players');
    }

    #[abi(embed_v0)]
    impl MatchPotImpl of IMatchPot<ContractState> {
        fn create_match(ref self: ContractState, match_id: u64, player2: ContractAddress) {
            let player1 = get_caller_address();
            let existing = self.matches.read(match_id);
            assert(!existing.active, 'match exists');

            let data = MatchData {
                player1,
                player2,
                pot: 0_u128,
                active: true,
                locked: false,
            };
            self.matches.write(match_id, data);

            self.emit(Event::MatchCreated(MatchCreated { match_id, player1, player2 }));
        }

        fn deposit(ref self: ContractState, match_id: u64) {
            let m = self.matches.read(match_id);
            assert(m.active, 'inactive match');
            assert(!m.locked, 'pot locked');

            let caller = get_caller_address();
            assert_player(m, caller);

            let paid = self.deposited.read((match_id, caller));
            assert(!paid, 'already deposited');

            let amount = self.entry_fee.read();
            let token = IERC20Dispatcher { contract_address: self.token.read() };
            assert(token.transfer_from(caller, get_contract_address(), to_u256(amount)), 'transfer_from failed');

            let updated = MatchData {
                player1: m.player1,
                player2: m.player2,
                pot: m.pot + amount,
                active: m.active,
                locked: m.locked,
            };
            self.matches.write(match_id, updated);
            self.deposited.write((match_id, caller), true);

            self.emit(Event::Deposited(Deposited { match_id, player: caller, amount }));
        }

        fn lock_pot(ref self: ContractState, match_id: u64) {
            let m = self.matches.read(match_id);
            assert(m.active, 'inactive match');
            assert(!m.locked, 'already locked');

            let caller = get_caller_address();
            assert_player(m, caller);

            let p1_paid = self.deposited.read((match_id, m.player1));
            let p2_paid = self.deposited.read((match_id, m.player2));
            assert(p1_paid && p2_paid, 'both players must deposit');

            let updated = MatchData {
                player1: m.player1,
                player2: m.player2,
                pot: m.pot,
                active: m.active,
                locked: true,
            };
            self.matches.write(match_id, updated);

            self.emit(Event::PotLocked(PotLocked { match_id, pot: m.pot }));
        }

        fn distribute(ref self: ContractState, match_id: u64, winner: ContractAddress, loser: ContractAddress) {
            assert_operator(@self);

            let m = self.matches.read(match_id);
            assert(m.active, 'inactive match');
            assert(m.locked, 'pot not locked');

            let valid_players =
                (winner == m.player1 && loser == m.player2) || (winner == m.player2 && loser == m.player1);
            assert(valid_players, 'invalid winner/loser');

            let total = m.pot;
            let winner_share = (total * WINNER_BPS) / BPS_DENOM;
            let loser_share = (total * LOSER_BPS) / BPS_DENOM;
            let platform_share = total - winner_share - loser_share;

            let token = IERC20Dispatcher { contract_address: self.token.read() };
            assert(token.transfer(winner, to_u256(winner_share)), 'winner transfer failed');
            assert(token.transfer(loser, to_u256(loser_share)), 'loser transfer failed');
            assert(token.transfer(self.platform.read(), to_u256(platform_share)), 'platform transfer failed');

            let closed = MatchData {
                player1: m.player1,
                player2: m.player2,
                pot: m.pot,
                active: false,
                locked: false,
            };
            self.matches.write(match_id, closed);

            self.emit(
                Event::PotDistributed(
                    PotDistributed { match_id, winner, loser, winner_share, loser_share, platform_share }
                )
            );
        }

        fn get_match(self: @ContractState, match_id: u64) -> MatchData {
            self.matches.read(match_id)
        }

        fn get_entry_fee(self: @ContractState) -> u128 {
            self.entry_fee.read()
        }
    }
}
