export type BattleTimelineResponse = {
  battle_id: string;
  agents: string[];
  initial_hp: Record<string, number>;
  winner: string | null;
  turns: Array<{
    turn: number;
    actor: string;
    target: string;
    action: "attack" | "defend" | "special";
    damage: number;
    hp_after_actor: number;
    hp_after_target: number;
    animation: {
      lunge_at: number;
      impact_at: number;
      damage_popup_at: number;
      hp_update_at: number;
      reset_at: number;
      next_turn_at: number;
    };
    commentary: string;
  }>;
};

export async function fetchBattleTimeline(battleId: string): Promise<BattleTimelineResponse> {
  const response = await fetch(`/battle/${battleId}/timeline`);
  if (!response.ok) {
    throw new Error("Failed to load battle timeline");
  }

  return response.json();
}
