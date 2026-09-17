import React from "react";
import { Eye, Building2, RefreshCcw, ScanLine, Fingerprint } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Item {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ITEMS: Item[] = [
  {
    icon: Eye,
    title: "Fuel Visibility",
    description: "Track fuel movement from delivery to dispensing.",
  },
  {
    icon: Building2,
    title: "Station Control",
    description: "Manage multiple stations from a centralized platform.",
  },
  {
    icon: RefreshCcw,
    title: "Payment Reconciliation",
    description: "Connect sales, payment channels and banking.",
  },
  {
    icon: ScanLine,
    title: "Variance Intelligence",
    description: "Identify discrepancies quickly and route them for review.",
  },
  {
    icon: Fingerprint,
    title: "Auditability",
    description: "Maintain traceable records of operational activities.",
  },
];

export const TrustStrip: React.FC = () => {
  return (
    <section className="bg-white py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-heading">
            One Platform.{" "}
            <span className="text-[#E17226]">Complete Operational Control.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group rounded-2xl bg-[#f8f9fa] border border-gray-100 hover:bg-brand-navy hover:border-brand-navy hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 text-center flex flex-col items-center"
              >
                <span className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 text-[#E17226] flex items-center justify-center mb-3.5 transition-colors group-hover:bg-[#E17226] group-hover:border-[#E17226] group-hover:text-white">
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="font-bold text-sm text-gray-900 mb-1.5 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed group-hover:text-white transition-colors">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};