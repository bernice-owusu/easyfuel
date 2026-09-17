import React from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Activity,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Truck,
  TrendingUp,
} from "lucide-react";

interface HeroSliderProps {
  onOpenQuote: () => void;
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export const HeroSlider: React.FC<HeroSliderProps> = ({ onOpenQuote }) => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-brand-navy bg-[url('/assets/img/hero1.jpeg')] bg-cover bg-center bg-no-repeat"
    >
      {/* Soft transition into the light section below */}
      <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-b from-transparent to-white/60 z-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10 items-center">
          {/* Left: Copy */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 relative z-10 bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl shadow-black/20"
          >
            <span className="inline-flex items-center gap-2 text-[#E17226] font-semibold text-xs sm:text-sm tracking-wider uppercase bg-white/5 px-4 py-2 rounded-full border border-white/10 mb-6">
              <Activity className="w-4 h-4" />
              Enterprise Fuel Station Management
            </span>

            <h1 className="font-bold tracking-tight text-white leading-[1.15] mb-6 text-[1.2rem] sm:text-5xl lg:text-[2rem] xl:text-[1.8rem]">
              <span className="block whitespace-nowrap">
                Every Litre{" "}
                <span className="text-[#E17226]">Accounted For.</span>
              </span>
              <span className="block whitespace-nowrap">
                Every Transaction{" "}
                <span className="text-[#E17226]">Traceable.</span>
              </span>
              <span className="block whitespace-nowrap">
                Every Station{" "}
                <span className="text-[#E17226]">Controlled.</span>
              </span>
            </h1>

            <p className="text-white text-base sm:text-lg leading-relaxed mb-9 max-w-xl">
              EasyFuel gives Oil Marketing Companies complete visibility and
              control across fuel delivery, tank inventory, dispensing, sales,
              payments and reconciliation all from one intelligent enterprise
              platform.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#E17226] hover:bg-[#C65F1D] text-white font-semibold text-base rounded-full shadow-xl shadow-orange-950/50 transition-all hover:translate-y-[-2px] active:translate-y-0 cursor-pointer"
              >
                Request a Demo
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-7 py-4 text-white hover:text-white font-medium text-base rounded-full border border-white/20 hover:border-[#E17226]/70 hover:bg-white/5 transition-all"
              >
                Explore Features
              </a>
            </div>
          </motion.div>

          {/* Right: Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="relative lg:col-span-7"
          >
            {/* Ambient glow */}
            <div className="absolute -inset-10 bg-[#E17226]/10 rounded-[3rem] blur-3xl" />

            {/* Tilted backdrop panel */}
            <div className="absolute inset-0 translate-x-4 translate-y-5 rotate-2 rounded-[1.9rem] bg-gradient-to-br from-brand-orange/40 to-brand-navy/40 border border-white/10" />

            {/* Gradient frame around image */}
            <div className="relative p-2 rounded-[1.9rem] bg-gradient-to-br from-[#E17226]/60 via-white/20 to-transparent shadow-2xl shadow-black/60">
              <img
                src="/assets/img/hero.jpeg"
                alt="EasyFuel Command Centre dashboard"
                className="rounded-[1.5rem] w-full h-auto border border-white/10"
              />
            </div>

            {/* LIVE badge */}
            <div className="absolute top-5 right-5 flex items-center gap-2 bg-brand-heading/80 backdrop-blur-md border border-white/15 rounded-full px-3 py-1.5">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[10px] font-semibold text-white uppercase tracking-wider">
                Live
              </span>
            </div>

            {/* Floating card: variance resolved */}
            <div className="hidden sm:flex absolute -bottom-7 -left-4 lg:-left-8 items-center gap-3 bg-[#0E5A5B]/90 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-3 shadow-xl shadow-black/50">
              <span className="w-9 h-9 rounded-xl bg-emerald-400/15 border border-emerald-400/40 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xs font-semibold text-white">
                  Variance Resolved
                </div>
                <div className="text-[10px] text-white">
                  Auto-routed to reconciliation
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-white hover:text-[#E17226] transition-colors z-20"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
};
