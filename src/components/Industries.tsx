import React from "react";
import {
  Fuel,
  Building2,
  UserCog,
  PiggyBank,
  Settings,
  Briefcase,
  Factory,
  Network,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const USERS: { name: string; desc: string; icon: LucideIcon }[] = [
  {
    name: "Oil Marketing Companies",
    desc: "Gain centralized visibility and control across your entire station network.",
    icon: Fuel,
  },
  {
    name: "Multi-Station Operators",
    desc: "Manage distributed operations through one platform.",
    icon: Building2,
  },
  {
    name: "Station Managers",
    desc: "Control daily station activities, shifts, stock and transactions.",
    icon: UserCog,
  },
  {
    name: "Finance Teams",
    desc: "Improve payment reconciliation and financial accountability.",
    icon: PiggyBank,
  },
  {
    name: "Operations Teams",
    desc: "Monitor station performance and operational exceptions.",
    icon: Settings,
  },
  {
    name: "Executives",
    desc: "Access consolidated information for faster decision-making.",
    icon: Briefcase,
  },
];

const USE_CASES: { title: string; desc: string; icon: LucideIcon }[] = [
  {
    title: "Oil Marketing Companies",
    desc: "Centralized management of multiple petroleum retail locations.",
    icon: Factory,
  },
  {
    title: "Fuel Station Networks",
    desc: "Operational control across stations, shifts and attendants.",
    icon: Network,
  },
  {
    title: "Corporate Fuel Operations",
    desc: "Greater visibility over internal fuel operations and expenditure.",
    icon: Building2,
  },
];

export const Industries: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#E17226] font-semibold text-sm tracking-wider uppercase bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-100 inline-block mb-3">
            Who Is EasyFuel For?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-heading leading-tight">
            Built for Modern{" "}
            <b className="text-[#E17226]">Oil Marketing Companies</b>
          </h2>
          <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto">
            EasyFuel is an enterprise operations and control platform for the
            petroleum retail industry — not just fleet fuel management.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Users */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {USERS.map((u) => {
                const Icon = u.icon;
                return (
                  <div
                    key={u.name}
                    className="rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#E17226]/30 hover:-translate-y-0.5 transition-all duration-300 p-5 flex items-start gap-4"
                  >
                    <span className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 text-[#E17226] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="font-bold text-sm text-gray-900 mb-1">
                        {u.name}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {u.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Use cases */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-brand-navy border border-white/10 p-7 h-full flex flex-col">
              <h3 className="text-lg font-bold text-white mb-5">
                Focused on the Right Markets
              </h3>
              <div className="space-y-4 flex-1">
                {USE_CASES.map((uc) => {
                  const Icon = uc.icon;
                  return (
                    <div key={uc.title} className="flex items-start gap-4">
                      <span className="w-10 h-10 rounded-xl bg-[#E17226]/15 border border-[#E17226]/30 text-[#E17226] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </span>
                      <div>
                        <h4 className="font-bold text-sm text-white mb-0.5">
                          {uc.title}
                        </h4>
                        <p className="text-xs text-white leading-relaxed">
                          {uc.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <a
                href="#quotation"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#E17226] hover:gap-3 transition-all"
              >
                Discuss your network
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};