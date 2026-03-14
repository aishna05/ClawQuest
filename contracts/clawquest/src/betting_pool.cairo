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
pub struct BetPool {
    pub match_id: u64,
    pub start_time: u64,
    pub total_bet: u128,
    pub bets_on_a: u128,
    pub bets_on_b: u128,
    pub resolved: bool,
    pub winning_side_a: bool,
    pub platform_fee: u128,
}

#[derive(Drop, Serde, Copy, starknet::Store)]
pub struct Bet {
    pub amount: u128,
    pub on_a: bool,
    pub claimed: bool,
}

#[starknet::interface]
pub trait IBettingPool<TContractState> {
    fn create_pool(ref self: TContractState, match_id: u64) -> u64;
    fn place_bet(ref self: TContractState, pool_id: u64, on_agent_a: bool, amount: u128);
    fn resolve_pool(ref self: TContractState, pool_id: u64, winning_side_a: bool);
    fn claim(ref self: TContractState, pool_id: u64);
    fn get_pool(self: @TContractState, pool_id: u64) -> BetPool;
}

#[starknet::contract]
pub mod BettingPool {
    use super::{Bet, BetPool, IBettingPool, IERC20Dispatcher, IERC20DispatcherTrait};
    use starknet::{ContractAddress, get_block_timestamp, get_caller_address, get_contract_address};
    use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess, StoragePointerReadAccess, StoragePointerWriteAccess};

    const MAX_BET_WINDOW_SECS: u64 = 180;
    const PLATFORM_BPS: u128 = 500;
    const BPS_DENOM: u128 = 10000;

    #[storage]
    struct Storage {
        operator: ContractAddress,
        platform: ContractAddress,
        token: ContractAddress,
        next_pool_id: u64,
        pools: Map<u64, BetPool>,
        bets: Map<(u64, ContractAddress), Bet>,
    }

    #[constructor]
    fn constructor(ref self: ContractState, operator: ContractAddress, platform: ContractAddress, token: ContractAddress) {
        self.operator.write(operator);
        self.platform.write(platform);
        self.token.write(token);
        self.next_pool_id.write(1_u64);
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        PoolCreated: PoolCreated,
        BetPlaced: BetPlaced,
        PoolResolved: PoolResolved,
        Claimed: Claimed,
    }

    #[derive(Drop, starknet::Event)]
    struct PoolCreated {
        pool_id: u64,
        match_id: u64,
        start_time: u64,
    }

    #[derive(Drop, starknet::Event)]
    struct BetPlaced {
        pool_id: u64,
        bettor: ContractAddress,
        on_agent_a: bool,
        amount: u128,
    }

    #[derive(Drop, starknet::Event)]
    struct PoolResolved {
        pool_id: u64,
        winning_side_a: bool,
        platform_fee: u128,
    }

    #[derive(Drop, starknet::Event)]
    struct Claimed {
        pool_id: u64,
        bettor: ContractAddress,
        payout: u128,
    }

    fn to_u256(amount: u128) -> u256 {
        u256 { low: amount, high: 0 }
    }

    fn assert_operator(self: @ContractState) {
        assert(get_caller_address() == self.operator.read(), 'only operator');
    }

    #[abi(embed_v0)]
    impl BettingPoolImpl of IBettingPool<ContractState> {
        fn create_pool(ref self: ContractState, match_id: u64) -> u64 {
            assert_operator(@self);

            let pool_id = self.next_pool_id.read();
            self.next_pool_id.write(pool_id + 1_u64);

            let start_time = get_block_timestamp();
            let pool = BetPool {
                match_id,
                start_time,
                total_bet: 0_u128,
                bets_on_a: 0_u128,
                bets_on_b: 0_u128,
                resolved: false,
                winning_side_a: false,
                platform_fee: 0_u128,
            };
            self.pools.write(pool_id, pool);

            self.emit(Event::PoolCreated(PoolCreated { pool_id, match_id, start_time }));
            pool_id
        }

        fn place_bet(ref self: ContractState, pool_id: u64, on_agent_a: bool, amount: u128) {
            assert(amount > 0_u128, 'amount=0');

            let pool = self.pools.read(pool_id);
            assert(!pool.resolved, 'pool resolved');
            let now = get_block_timestamp();
            assert(now <= pool.start_time + MAX_BET_WINDOW_SECS, 'betting window closed');

            let caller = get_caller_address();
            let bet = self.bets.read((pool_id, caller));
            if bet.amount > 0_u128 {
                assert(bet.on_a == on_agent_a, 'cannot bet both sides');
            }

            let token = IERC20Dispatcher { contract_address: self.token.read() };
            assert(token.transfer_from(caller, get_contract_address(), to_u256(amount)), 'transfer_from failed');

            let updated_bet = Bet {
                amount: bet.amount + amount,
                on_a: on_agent_a,
                claimed: false,
            };
            self.bets.write((pool_id, caller), updated_bet);

            let updated_pool = if on_agent_a {
                BetPool {
                    match_id: pool.match_id,
                    start_time: pool.start_time,
                    total_bet: pool.total_bet + amount,
                    bets_on_a: pool.bets_on_a + amount,
                    bets_on_b: pool.bets_on_b,
                    resolved: pool.resolved,
                    winning_side_a: pool.winning_side_a,
                    platform_fee: pool.platform_fee,
                }
            } else {
                BetPool {
                    match_id: pool.match_id,
                    start_time: pool.start_time,
                    total_bet: pool.total_bet + amount,
                    bets_on_a: pool.bets_on_a,
                    bets_on_b: pool.bets_on_b + amount,
                    resolved: pool.resolved,
                    winning_side_a: pool.winning_side_a,
                    platform_fee: pool.platform_fee,
                }
            };

            self.pools.write(pool_id, updated_pool);
            self.emit(Event::BetPlaced(BetPlaced { pool_id, bettor: caller, on_agent_a, amount }));
        }

        fn resolve_pool(ref self: ContractState, pool_id: u64, winning_side_a: bool) {
            assert_operator(@self);

            let pool = self.pools.read(pool_id);
            assert(!pool.resolved, 'already resolved');

            let platform_fee = (pool.total_bet * PLATFORM_BPS) / BPS_DENOM;
            let token = IERC20Dispatcher { contract_address: self.token.read() };
            if platform_fee > 0_u128 {
                assert(token.transfer(self.platform.read(), to_u256(platform_fee)), 'platform fee transfer failed');
            }

            let resolved_pool = BetPool {
                match_id: pool.match_id,
                start_time: pool.start_time,
                total_bet: pool.total_bet,
                bets_on_a: pool.bets_on_a,
                bets_on_b: pool.bets_on_b,
                resolved: true,
                winning_side_a,
                platform_fee,
            };
            self.pools.write(pool_id, resolved_pool);

            self.emit(Event::PoolResolved(PoolResolved { pool_id, winning_side_a, platform_fee }));
        }

        fn claim(ref self: ContractState, pool_id: u64) {
            let pool = self.pools.read(pool_id);
            assert(pool.resolved, 'pool not resolved');

            let caller = get_caller_address();
            let bet = self.bets.read((pool_id, caller));
            assert(bet.amount > 0_u128, 'no bet');
            assert(!bet.claimed, 'already claimed');
            assert(bet.on_a == pool.winning_side_a, 'not a winner');

            let winners_total = if pool.winning_side_a { pool.bets_on_a } else { pool.bets_on_b };
            assert(winners_total > 0_u128, 'no winners');

            let distributable = pool.total_bet - pool.platform_fee;
            let payout = (bet.amount * distributable) / winners_total;

            let claimed = Bet {
                amount: bet.amount,
                on_a: bet.on_a,
                claimed: true,
            };
            self.bets.write((pool_id, caller), claimed);

            let token = IERC20Dispatcher { contract_address: self.token.read() };
            assert(token.transfer(caller, to_u256(payout)), 'payout transfer failed');

            self.emit(Event::Claimed(Claimed { pool_id, bettor: caller, payout }));
        }

        fn get_pool(self: @ContractState, pool_id: u64) -> BetPool {
            self.pools.read(pool_id)
        }
    }
}
