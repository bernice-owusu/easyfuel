import React from "react";
import {
  KeyRound,
  ShieldCheck,
  Lock,
  Code2,
  FileSearch,
  UserCheck,
  Fingerprint,
  Router,
  ScanSearch,
  ShieldAlert,
  Layers,
  BadgeCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ITEMS: { name: string; icon: LucideIcon }[] = [
  { name: "User authentication", icon: KeyRound },
  { name: "Two-factor authentication", icon: ShieldCheck },
  { name: "Role-based access control", icon: UserCheck },
  { name: "Encryption", icon: Lock },
  { name: "Secure APIs", icon: Code2 },
  { name: "Audit logs", icon: FileSearch },
  { name: "Data privacy controls", icon: Fingerprint },
  { name: "Fraud monitoring", icon: ScanSearch },
  { name: "Station-scoped permissions", icon: Router },
  { name: "Session controls", icon: ShieldAlert },
  { name: "Enterprise access policies", icon: Layers },
  { name: "Governance & compliance", icon: BadgeCheck },
];

export const Security: React.FC = () => {
  return (
    <section id="security" className="py-20 lg:py-28 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-5">
            <span className="text-[#E17226] font-semibold text-sm tracking-wider uppercase bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-100 inline-block mb-3">
              Security
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-heading leading-tight mb-6">
              Built With Enterprise{" "}
              <b className="text-[#E17226]">Control in Mind</b>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-6">
              Fuel operations involve sensitive operational and financial
              information. EasyFuel incorporates security and governance
              controls to help organizations maintain appropriate access and
              accountability.
            </p>
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#E17226] shrink-0 mt-0.5" />
              <p className="text-xs text-gray-500 leading-relaxed">
                Formal ISO, regulatory and certification badges will be published
                once confirmed by Bsystems Limited — we never display
                unverified attestations.
              </p>
            </div>
          </div>

          {/* Right: Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="group rounded-2xl bg-white border border-gray-100 hover:border-[#E17226]/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 p-4 flex flex-col items-start"
                >
                  <span className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100 text-[#E17226] flex items-center justify-center mb-2.5 group-hover:bg-[#E17226] group-hover:border-[#E17226] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-semibold text-gray-800 leading-snug">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};