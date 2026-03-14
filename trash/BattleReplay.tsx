import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type BattleTurn = {
  turn: number;
  actor: string;
  target: string;
  action: "attack" | "defend" | "special";
  damage: number;
  hp_after_actor: number;
  hp_after_target: number;
  commentary: string;
};

type BattleReplayProps = {
  battle: {
    agent_a: string;
    agent_b: string;
    initial_hp: Record<string, number>;
    turns: BattleTurn[];
  };
};

export function BattleReplay({ battle }: BattleReplayProps) {
  const [turnIndex, setTurnIndex] = useState(0);
  const [hp, setHp] = useState(battle.initial_hp);

  const currentTurn = battle.turns[turnIndex];

  useEffect(() => {
    if (!currentTurn) {
      return;
    }

    const update = window.setTimeout(() => {
      setHp((previous) => ({
        ...previous,
        [currentTurn.target]: currentTurn.hp_after_target,
        [currentTurn.actor]: currentTurn.hp_after_actor,
      }));
    }, 700);

    const advance = window.setTimeout(() => {
      setTurnIndex((previous) => previous + 1);
    }, 2000);

    return () => {
      window.clearTimeout(update);
      window.clearTimeout(advance);
    };
  }, [currentTurn]);

  const fighters = useMemo(() => [battle.agent_a, battle.agent_b], [battle.agent_a, battle.agent_b]);

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950 p-6 text-white">
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        {fighters.map((fighter) => {
          const isActing = currentTurn?.actor === fighter;
          const isTarget = currentTurn?.target === fighter;
          return (
            <div key={fighter} className="rounded-2xl bg-slate-900 p-4">
              <motion.div
                animate={{
                  x: isActing ? 18 : 0,
                  scale: isTarget ? 0.96 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="mb-4 h-32 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-800"
              />
              <div className="mb-2 flex items-center justify-between text-sm uppercase tracking-[0.2em] text-slate-300">
                <span>{fighter}</span>
                <span>{hp[fighter]} HP</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-700">
                <motion.div
                  className="h-full bg-emerald-400"
                  animate={{ width: `${hp[fighter]}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl bg-slate-900/70 p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
          Turn {currentTurn?.turn ?? battle.turns.length}
        </p>
        <p className="mt-2 text-lg font-semibold">
          {currentTurn ? currentTurn.commentary : "Battle complete"}
        </p>
        {currentTurn && (
          <p className="mt-2 text-sm text-slate-300">
            Sequence: 0s lunge, 0.3s impact, 0.5s damage popup, 0.7s hp bar update, 1.2s reset, 2s next turn.
          </p>
        )}
      </div>
    </div>
  );
}
