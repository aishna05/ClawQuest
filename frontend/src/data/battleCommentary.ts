// Personality-driven beast commentary lines

export interface PersonalityProfile {
  taunt_attack: string[];
  taunt_idle: string[];
  react_hit: string[];
  react_dodge: string[];
  react_low_hp: string[];
  react_winning: string[];
  react_losing: string[];
  berserk: string[];
  pre_battle: string[];
}

export const PERSONALITIES: Record<string, PersonalityProfile> = {
  aggressive: {
    taunt_attack: [
      "TASTE SCRAP METAL, WORM",
      "I'LL GRIND YOUR BONES TO DUST",
      "PATHETIC. IS THAT ALL YOU'VE GOT?",
      "YOUR CRYSTAL SHELL CRACKS LIKE GLASS",
      "ANOTHER SCAR FOR MY COLLECTION",
    ],
    taunt_idle: [
      "QUIT STALLING. HIT ME.",
      "YOUR HESITATION DISGUSTS ME",
      "I CAN FEEL YOUR FEAR THROUGH THE LINK",
      "EVERY SECOND YOU WAIT, I GET ANGRIER",
    ],
    react_hit: [
      "THAT... ACTUALLY HURT. GOOD.",
      "PAIN FUELS THE MAW",
      "YOU'LL PAY FOR THAT SCRATCH",
      "HA. FINALLY SOMETHING WORTH FEELING",
    ],
    react_dodge: [
      "TOO SLOW. ALWAYS TOO SLOW.",
      "MY GRANDMOTHER SWINGS HARDER",
      "MISSED. JUST LIKE YOUR LAST 12 BATTLES",
    ],
    react_low_hp: [
      "I DON'T NEED HP TO DESTROY YOU",
      "CORNERED BEASTS BITE HARDEST",
      "BLOOD MAKES ME STRONGER",
      "YOU THINK THIS IS OVER? I'M JUST GETTING STARTED",
    ],
    react_winning: [
      "KNEEL BEFORE THE MAW",
      "THIS ISN'T A FIGHT. IT'S AN EXECUTION",
      "TELL YOUR HANDLER TO PICK A REAL OPPONENT NEXT TIME",
    ],
    react_losing: [
      "NO... NOT AGAIN... NOT TO YOU",
      "THIS MEANS NOTHING. NOTHING!",
      "I WILL REMEMBER THIS. I WILL REMEMBER EVERYTHING.",
    ],
    berserk: [
      "R̷A̵G̶E̸ ̷P̶R̶O̶T̸O̷C̵O̸L̷ ̵A̶C̷T̸I̸V̷E̵",
      "PAIN IS JUST FUEL NOW",
      "ALL LIMITERS DISENGAGED",
    ],
    pre_battle: [
      "ANOTHER VICTIM. LET'S MAKE THIS QUICK.",
      "I'VE BEEN STARVING FOR COMBAT",
      "YOUR FILE SAYS 'FAST'. LET'S TEST THAT CLAIM.",
    ],
  },
  calculated: {
    taunt_attack: [
      "PREDICTABLE. DODGE PATTERN ALPHA-7.",
      "YOUR LEFT FLANK IS EXPOSED. AGAIN.",
      "I'VE ALREADY MAPPED YOUR NEXT 3 MOVES",
      "EFFICIENCY RATING: OPTIMAL",
    ],
    taunt_idle: [
      "TAKE YOUR TIME. I'VE ALREADY WON.",
      "EACH PAUSE GIVES ME MORE DATA",
      "ANALYZING... YOUR STRATEGY IS FASCINATING. FASCINATED AT HOW BAD IT IS.",
    ],
    react_hit: [
      "DAMAGE WITHIN ACCEPTABLE PARAMETERS",
      "NOTED. ADJUSTING DEFENSIVE MATRIX",
      "INTERESTING APPROACH. INEFFECTIVE, BUT INTERESTING.",
    ],
    react_dodge: [
      "PROBABILITY OF THAT LANDING: 3.2%",
      "YOUR ATTACK VECTOR WAS TELEGRAPHED",
      "I CALCULATED THAT 4 MOVES AGO",
    ],
    react_low_hp: [
      "LOW HP ACTIVATES CONTINGENCY PROTOCOLS",
      "YOU'VE TRIGGERED MY ENDGAME SCENARIO",
      "HP IS JUST A NUMBER. STRATEGY IS EVERYTHING.",
    ],
    react_winning: [
      "MATCH OUTCOME: AS PREDICTED",
      "YOUR DEFEAT WAS STATISTICALLY INEVITABLE",
      "ANOTHER DATA POINT FOR MY COLLECTION",
    ],
    react_losing: [
      "RECALCULATING... THIS WAS NOT IN MY MODELS",
      "ANOMALOUS RESULT DETECTED",
      "YOUR CHAOS EXCEEDS MY PARAMETERS",
    ],
    berserk: [
      "OVERCLOCK MODE: ALL PROCESSORS ENGAGED",
      "REMOVING ETHICAL CONSTRAINTS",
    ],
    pre_battle: [
      "I'VE STUDIED YOUR LAST 47 BATTLES. YOU HAVE NO SURPRISES LEFT.",
      "STATISTICAL ANALYSIS COMPLETE. VICTORY PROBABILITY: 94.7%",
    ],
  },
  unstable: {
    taunt_attack: [
      "D̵̢͝I̷̛̱D̶̰̀ ̵̱̏T̷̲̾H̸̱̑Ä̴̠́T̸̗̀ ̴̭̓H̶̰̊U̸̱͝R̶̖̎T̵̗̊?̸̨̛ ̵I̷̻͝ ̵̣̈C̸̣̊A̵̖̕N̸̲̈'̵̱̈T̶̗̾ ̸̡̇T̶̗̈́Ê̸̳L̵̘̈L̸̨̕ ̵̱̈A̸̡̛N̸̲̊Y̸̡̆M̵̱̑Ö̴̡R̸̖̈́Ë̸̡",
      "WHICH REALITY AM I HITTING YOU IN?",
      "THE VOID SAYS HELLO",
      "I̶̤͝ ̶̱̈A̸̡̕M̸̲̊ ̵̱̈E̸̡̛V̸̡̆Ė̸̳R̸̖̈́Y̸̡̆W̸̡̆H̸̱̑Ë̸̡R̸̖̈́Ë̸̡",
    ],
    taunt_idle: [
      "I CAN HEAR YOUR THOUGHTS. THEY'RE BORING.",
      "TIME ISN'T REAL IN HERE",
      "DO YOU HEAR THAT? NO? JUST ME THEN.",
    ],
    react_hit: [
      "P̵̗̈́Ä̴̠́I̷̛̱N̸̲̈ ̵̱̈I̷̛̱S̵̱̈ ̵̱̈J̵̱̈Ü̸̡S̵̱̈T̶̗̾ ̸̡̇D̶̰̀Ä̴̠́T̸̗̀Ä̴̠́",
      "WAS THAT ME OR MY ECHO?",
      "HAHAHA̵̖̕HA THAT TICKLES",
    ],
    react_dodge: [
      "I WASN'T EVEN THERE",
      "YOU HIT THE WRONG TIMELINE",
      "G̵̢͝L̵̘̈I̷̛̱T̶̗̾C̸̣̊H̸̱̑ ̵̱̈S̵̱̈T̶̗̾Ë̸̡P̵̗̈́",
    ],
    react_low_hp: [
      "REALITY IS THINNING... GOOD",
      "THE LESS HP I HAVE, THE MORE DIMENSIONS I CAN SEE",
      "Y̸̡̆Ö̴̡Ü̸̡ ̵̱̈D̶̰̀Ö̴̡N̸̲̈'̵̱̈T̶̗̾ ̸̡̇W̸̡̆Ä̴̠́N̸̲̈T̶̗̾ ̸̡̇T̶̗̾Ö̴̡ ̵̱̈S̵̱̈Ë̸̡Ë̸̡ ̵̱̈W̸̡̆H̸̱̑Ä̴̠́T̶̗̾ ̸̡̇H̸̱̑Ä̴̠́P̵̗̈́P̵̗̈́Ë̸̡N̸̲̈S̵̱̈ ̵̱̈Ä̴̠́T̶̗̾ ̸̡̇0̸̡̆",
    ],
    react_winning: [
      "FADE... FADE INTO THE STATIC...",
      "THE VOID CLAIMS ANOTHER",
    ],
    react_losing: [
      "T̶H̸I̷S̵ ̸R̵E̷A̶L̸I̵T̶Y̸ ̴R̶E̵J̵E̸C̷T̸S̵ ̶M̸E̷",
      "I'LL JUST... RESPAWN SOMEWHERE ELSE... PROBABLY...",
    ],
    berserk: [
      "R̶̖̎Ë̸̡Ä̴̠́L̵̘̈I̷̛̱T̶̗̾Y̸̡̆ ̵̱̈F̵̱̈R̸̖̈́Ä̴̠́C̸̣̊T̶̗̾Ü̸̡R̸̖̈́Ë̸̡ ̵̱̈I̷̛̱M̸̲̊M̸̲̊I̷̛̱N̸̲̈Ë̸̡N̸̲̈T̶̗̾",
      "ALL TIMELINES COLLAPSING INTO ONE PUNCH",
    ],
    pre_battle: [
      "I̷̤͝ ̶̱̈H̸̱̑Ä̴̠́V̸̡̆Ë̸̡ ̵̱̈S̵̱̈Ë̸̡Ë̸̡N̸̲̈ ̵̱̈T̶̗̾H̸̱̑I̷̛̱S̵̱̈ ̵̱̈B̸̡̆Ä̴̠́T̶̗̾T̶̗̾L̵̘̈Ë̸̡ ̵̱̈1̸̡̆0̸̡̆0̸̡̆0̸̡̆ ̵̱̈T̶̗̾I̷̛̱M̸̲̊Ë̸̡S̵̱̈. ̵̱̈Y̸̡̆Ö̴̡Ü̸̡ ̵̱̈L̵̘̈Ö̴̡S̵̱̈Ë̸̡ ̵̱̈I̷̛̱N̸̲̈ ̵̱̈Ä̴̠́L̵̘̈L̵̘̈ ̵̱̈Ö̴̡F̵̱̈ ̵̱̈T̶̗̾H̸̱̑Ë̸̡M̸̲̊.",
      "WHICH VERSION OF ME ARE YOU FIGHTING TODAY?",
    ],
  },
};

// Live announcer commentary (personality-neutral)
export const ANNOUNCER_LINES = {
  round_start: [
    "ROUND {round} — THE ARENA TREMBLES",
    "ROUND {round} — BOTH SPECIMENS LOCKED IN",
    "ROUND {round} — THIS IS GETTING BRUTAL",
    "ROUND {round} — NEITHER BEAST BACKING DOWN",
  ],
  big_hit: [
    "DEVASTATING BLOW! {dmg} DAMAGE!",
    "WHAT A HIT! THE CROWD GOES WILD!",
    "BRUTAL! ABSOLUTELY BRUTAL! {dmg} DAMAGE DEALT!",
    "THAT ONE'S GONNA LEAVE A MARK — {dmg} DAMAGE!",
  ],
  low_hp: [
    "{name} IS ON THE ROPES! CAN THEY SURVIVE?",
    "CRITICAL CONDITION FOR {name}! ONE MORE HIT AND IT'S OVER!",
    "{name} IS HANGING BY A THREAD!",
  ],
  near_death: [
    "THIS COULD BE THE FINAL BLOW!",
    "WE MIGHT HAVE A WINNER, FOLKS!",
    "THE END IS NEAR — WHO WILL FALL FIRST?",
  ],
  berserk: [
    "BERSERK MODE! THE BEAST HAS LOST ALL CONTROL!",
    "WARNING WARNING — RAGE LEVELS OFF THE CHARTS!",
  ],
};

// Simulated spectator chat messages
export const SPECTATOR_NAMES = [
  "xX_BeastSlayer_Xx", "CryptoWhale42", "GenesisMinter", "VoidWatcher_",
  "ToxicTrader", "ClawCollector", "ChainBreaker99", "NullPointer",
  "ScrapYardKing", "PrismaFan_01", "BeastBet420", "ArenaRat",
  "DegenAlpha", "IronChad", "GlitchHunter", "MutationMaxi",
  "EvolutionApe", "StakingSteve", "FloorSweeper", "DiamondPaws",
];

export const SPECTATOR_REACTIONS = {
  general: [
    "LFG 🔥", "LETS GOOO", "this is insane", "rip", "no way",
    "HOLD THE LINE", "gg", "ez clap", "nah thats crazy",
    "WHO BET ON THIS??", "im all in", "my tokens...",
    "IRON MAW SUPREMACY", "prisma is cooked", "null wraith would've won",
  ],
  player_hit: [
    "OUCH", "he felt that one", "noooo", "tank it!", "TAKE THE HIT",
    "paper beast lol", "get up!!!", "just dodge bro",
  ],
  opponent_hit: [
    "YOOO NICE", "CLEAN HIT", "do it again", "deleted", "one more!!",
    "GG EZ", "finish them!", "CRITICAL DAMAGE LETSGOO",
  ],
  big_damage: [
    "BRUHHH {dmg} DAMAGE??", "THATS ILLEGAL", "NERF THIS BEAST",
    "WTF WAS THAT", "clip it", "someone call security",
  ],
  pot_reaction: [
    "pot is JUICY", "all in on iron maw", "prisma dancer easy money",
    "who's hedging??", "the pot keeps growing lol",
    "i just doubled my bet", "dont rug me bro",
  ],
  victory: [
    "CALLED IT", "pay up losers", "GG WP", "what a match",
    "REMATCH WHEN??", "my tokens are SAFE", "easiest money of my life",
  ],
  defeat: [
    "RIGGED", "i want a refund", "my portfolio...", "pain.",
    "shoulda sold", "never betting again (until tomorrow)",
  ],
};

export const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
