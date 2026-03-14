import { useNavigate } from "react-router-dom";
import TokenTicker from "@/components/TokenTicker";
import HeroSection from "@/components/HeroSection";
import BeastCard from "@/components/BeastCard";
import BiomeSection from "@/components/BiomeSection";
import BattlePreview from "@/components/BattlePreview";
import TokenSection from "@/components/TokenSection";
import FooterCTA from "@/components/FooterCTA";
import { BEASTS } from "@/data/beasts";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="scanlines vignette min-h-screen bg-background">
      <TokenTicker />
      <HeroSection />

      {/* Beast Showcase */}
      <section className="relative py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <p className="mb-2 font-data text-[10px] uppercase tracking-[0.4em] text-neon-claw">
                /// Specimen Registry
              </p>
              <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
                Your Beasts.<br />
                <span className="text-muted-foreground">Their Demons.</span>
              </h2>
            </div>
            <button
              onClick={() => navigate("/registry")}
              className="border-2 border-static-gray hover:border-neon-claw px-5 py-2.5 font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-neon-claw transition-all"
            >
              VIEW ALL SPECIMENS
            </button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BEASTS.map((beast) => (
              <div key={beast.id} onClick={() => navigate(`/containment/${beast.id}`)} className="cursor-pointer">
                <BeastCard
                  name={beast.name}
                  type={beast.type}
                  rarity={beast.rarity}
                  hp={beast.hp}
                  maxHp={beast.maxHp}
                  atk={beast.atk}
                  def={beast.def}
                  spd={beast.spd}
                  personality={beast.personality}
                  mood={beast.mood}
                  moodColor={beast.moodColor}
                  image={beast.image}
                  gen={beast.gen}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <BiomeSection />
      <BattlePreview />
      <TokenSection />
      <FooterCTA />
    </div>
  );
};

export default Index;
