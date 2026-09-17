import React from "react";
import { Users, Globe2, Building2, Star } from "lucide-react";
import { ACHIEVEMENTS } from "../data/fossilData";

export const AchievementsSection: React.FC = () => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Users className="w-8 h-8 text-[#E17226]" />;
      case 1:
        return <Building2 className="w-8 h-8 text-[#E17226]" />;
      case 2:
        return <Globe2 className="w-8 h-8 text-[#E17226]" />;
      case 3:
        return <Star className="w-8 h-8 text-[#E17226] fill-[#E17226]" />;
      default:
        return <Users className="w-8 h-8 text-[#E17226]" />;
    }
  };

  return (
    <section
      id="achievements"
      className="relative py-20 lg:py-24 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url('/assets/img/achievement.jpg')`,
      }}
    >
      {/* Dark tint overlay */}
      <div className="absolute inset-0 bg-brand-heading/90 backdrop-blur-[1px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ACHIEVEMENTS.map((item, index) => (
            <div
              key={item.label}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center hover:bg-white/10 hover:border-[#E17226]/40 transition-all group"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                {getIcon(index)}
              </div>
              <div className="font-teko text-5xl sm:text-6xl font-bold text-white tracking-wider mb-2 leading-none">
                <span className="text-white group-hover:text-[#E17226] transition-colors">
                  {item.number}
                </span>
                {item.suffix && (
                  <span className="text-[#E17226] ml-1">{item.suffix}</span>
                )}
              </div>
              <h6 className="text-sm font-semibold uppercase tracking-wider text-white">
                {item.label}
              </h6>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
