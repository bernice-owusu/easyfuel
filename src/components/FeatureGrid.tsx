import React from "react";
import {
  Boxes,
  Fuel,
  Container,
  ShoppingCart,
  CreditCard,
  ArrowLeftRight,
  Wallet,
  ShieldAlert,
  Bell,
  BarChart3,
  FileText,
  Building2,
  Users,
  UserCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Tool {
  title: string;
  description: string;
  icon: LucideIcon;
}

const TOOLS: Tool[] = [
  {
    title: "Fuel Inventory Management",
    description: "Monitor stock movements, tank balances and fuel availability.",
    icon: Boxes,
  },
  {
    title: "Fuel Dispensing",
    description: "Track fuel dispensing activity across pumps, nozzles and attendants.",
    icon: Fuel,
  },
  {
    title: "Tank Monitoring",
    description: "Monitor tank readings and support stock control.",
    icon: Container,
  },
  {
    title: "Fuel Purchase Management",
    description: "Capture and manage fuel supply and purchase activities.",
    icon: ShoppingCart,
  },
  {
    title: "Fuel Card Management",
    description: "Manage fuel-card transactions and related activity.",
    icon: CreditCard,
  },
  {
    title: "Fuel Reconciliation",
    description: "Compare fuel, sales and payment data to identify discrepancies.",
    icon: ArrowLeftRight,
  },
  {
    title: "Expense Management",
    description: "Monitor fuel-related expenses and financial activity.",
    icon: Wallet,
  },
  {
    title: "Fraud Detection",
    description: "Surface suspicious transactions and operational exceptions.",
    icon: ShieldAlert,
  },
  {
    title: "Alerts & Notifications",
    description: "Ensure teams know when attention is required.",
    icon: Bell,
  },
  {
    title: "Analytics Dashboard",
    description: "Turn station data into actionable operational intelligence.",
    icon: BarChart3,
  },
  {
    title: "Reports",
    description: "Generate management and operational reports.",
    icon: FileText,
  },
  {
    title: "Multi-Station Management",
    description: "Manage distributed stations through a centralized platform.",
    icon: Building2,
  },
  {
    title: "User Management",
    description: "Control users and their access.",
    icon: Users,
  },
  {
    title: "Role-Based Access",
    description: "Give each user access appropriate to their responsibilities.",
    icon: UserCheck,
  },
];

export const FeatureGrid: React.FC = () => {
  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#E17226] font-semibold text-sm tracking-wider uppercase bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-100 inline-block mb-3">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-heading leading-tight">
            Powerful Tools.{" "}
            <b className="text-[#E17226]">Practical Control.</b>
          </h2>
          <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto">
            Fourteen focused capabilities that give OMCs and station teams the
            control they need — without complication.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.title}
                className="group rounded-2xl border border-gray-100 bg-[#f8f9fa] p-5 hover:bg-white hover:shadow-xl hover:border-[#E17226]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <span className="w-11 h-11 rounded-xl bg-white border border-gray-200 text-[#E17226] flex items-center justify-center mb-4 group-hover:bg-[#E17226] group-hover:border-[#E17226] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="text-sm font-bold text-gray-900 mb-1.5 group-hover:text-[#E17226] transition-colors">
                  {tool.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {tool.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};