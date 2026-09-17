import React from "react";
import {
  LayoutDashboard,
  BarChart3,
  Fuel,
  ShoppingBag,
  ArrowLeftRight,
  PackageX,
  AlertTriangle,
  TrendingUp,
  Moon,
  CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const VIEWS: { name: string; icon: LucideIcon }[] = [
  { name: "Network Overview", icon: LayoutDashboard },
  { name: "Station Performance", icon: BarChart3 },
  { name: "Fuel Movement", icon: Fuel },
  { name: "Sales", icon: ShoppingBag },
  { name: "Payment Reconciliation", icon: ArrowLeftRight },
  { name: "Stock Variance", icon: PackageX },
  { name: "Exceptions", icon: AlertTriangle },
  { name: "Trends", icon: TrendingUp },
  { name: "End-of-Day Performance", icon: Moon },
];

const KPIS = [
  { value: "One", label: "network dashboard" },
  { value: "Live", label: "drill-down to any station" },
  { value: "Real-time", label: "fuel, sales & stock" },
  { value: "Full", label: "traceability per transaction" },
];

export const Analytics: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#E17226] font-semibold text-sm tracking-wider uppercase bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-100 inline-block mb-3">
            Analytics
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-heading leading-tight">
            Your Stations. Your Data.{" "}
            <b className="text-[#E17226]">Your Decisions.</b>
          </h2>
          <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto">
            Give executives, finance teams and operations managers the
            information they need to make faster decisions.
          </p>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {KPIS.map((k) => (
            <div
              key={k.label}
              className="rounded-2xl bg-brand-navy p-6 text-center hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-brand-navy/20"
            >
              <div className="text-2xl font-bold text-[#E17226]">{k.value}</div>
              <div className="mt-1 text-xs font-medium text-white">{k.label}</div>
            </div>
          ))}
        </div>

        {/* Views */}
        <div className="rounded-3xl border border-gray-100 bg-[#f8f9fa] p-7 lg:p-9">
          <div className="flex items-center gap-2.5 mb-6">
            <CheckCircle2 className="w-5 h-5 text-[#E17226]" />
            <h3 className="text-lg font-bold text-gray-900">
              Dashboard views included with EasyFuel
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {VIEWS.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.name}
                  className="group flex items-center gap-3 rounded-xl bg-white border border-gray-100 px-4 py-3 hover:border-[#E17226]/40 hover:shadow-md transition-all cursor-default"
                >
                  <span className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100 text-[#E17226] flex items-center justify-center shrink-0 group-hover:bg-[#E17226] group-hover:border-[#E17226] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    {v.name}
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