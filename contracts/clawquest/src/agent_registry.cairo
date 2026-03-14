#[derive(Drop, Serde, Copy, starknet::Store)]
pub struct Agent {
    pub owner: starknet::ContractAddress,
    pub name: felt252,
    pub skills: felt252,
}

#[starknet::interface]
pub trait IAgentRegistry<TContractState> {
    fn register_agent(ref self: TContractState, name: felt252, skills: felt252) -> u64;
    fn get_agent(self: @TContractState, agent_id: u64) -> Agent;
    fn get_agent_count(self: @TContractState) -> u64;
}

#[starknet::contract]
pub mod AgentRegistry {
    use super::{Agent, IAgentRegistry};
    use starknet::{ContractAddress, get_caller_address};
    use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess, StoragePointerReadAccess, StoragePointerWriteAccess};

    #[storage]
    struct Storage {
        agent_count: u64,
        agents: Map<u64, Agent>,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        AgentRegistered: AgentRegistered,
    }

    #[derive(Drop, starknet::Event)]
    struct AgentRegistered {
        agent_id: u64,
        owner: ContractAddress,
        name: felt252,
    }

    #[abi(embed_v0)]
    impl AgentRegistryImpl of IAgentRegistry<ContractState> {
        fn register_agent(ref self: ContractState, name: felt252, skills: felt252) -> u64 {
            let owner = get_caller_address();
            let id = self.agent_count.read();
            let agent = Agent { owner, name, skills };

            self.agents.write(id, agent);
            self.agent_count.write(id + 1_u64);
            self.emit(Event::AgentRegistered(AgentRegistered { agent_id: id, owner, name }));

            id
        }

        fn get_agent(self: @ContractState, agent_id: u64) -> Agent {
            self.agents.read(agent_id)
        }

        fn get_agent_count(self: @ContractState) -> u64 {
            self.agent_count.read()
        }
    }
}
