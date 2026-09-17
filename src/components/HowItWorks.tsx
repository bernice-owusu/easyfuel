import React from "react";
import {
  Truck,
  Container,
  Fuel,
  CreditCard,
  ArrowLeftRight,
  ClipboardCheck,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Fuel Delivery",
    description: "Record incoming fuel and delivery information.",
    icon: Truck,
  },
  {
    number: "02",
    title: "Tank & Inventory",
    description: "Track what enters the tank and monitor stock.",
    icon: Container,
  },
  {
    number: "03",
    title: "Dispensing",
    description: "Capture pump, nozzle and attendant activity.",
    icon: Fuel,
  },
  {
    number: "04",
    title: "Sales & Payments",
    description:
      "Track sales across cash, POS, mobile money, banking and fuel-card channels.",
    icon: CreditCard,
  },
  {
    number: "05",
    title: "Reconciliation",
    description: "Compare operational and financial records.",
    icon: ArrowLeftRight,
  },
  {
    number: "06",
    title: "Variance & Approval",
    description:
      "Identify exceptions, investigate discrepancies and complete approval workflows.",
    icon: ClipboardCheck,
  },
  {
    number: "07",
    title: "Management Intelligence",
    description:
      "Give executives a real-time view of station and network performance.",
    icon: BarChart3,
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#E17226] font-semibold text-sm tracking-wider uppercase bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-100 inline-block mb-3">
            How EasyFuel Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-heading leading-tight">
            From Fuel Delivery to{" "}
            <b className="text-[#E17226]">Final Reconciliation</b>
          </h2>
          <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto">
            Follow the connected chain of accountability that runs from the
            tanker all the way to management intelligence.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="group relative rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#E17226]/30 transition-all duration-300 p-6 flex flex-col"
              >
                <span className="absolute top-5 right-6 font-teko text-4xl font-bold text-gray-100 group-hover:text-[#E17226]/20 transition-colors">
                  {step.number}
                </span>
                <span className="w-12 h-12 rounded-xl bg-brand-navy text-brand-orange flex items-center justify-center mb-5 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </span>
                <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#E17226] transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}

          {/* CTA Card */}
          <a
            href="#quotation"
            className="group rounded-2xl bg-brand-navy border border-brand-navy p-6 flex flex-col justify-between min-h-full shadow-lg shadow-brand-navy/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              <span className="w-12 h-12 rounded-xl bg-[#E17226] text-white flex items-center justify-center mb-5">
                <ArrowRight className="w-6 h-6" />
              </span>
              <h3 className="text-lg font-bold text-white mb-2">
                See EasyFuel in Action
              </h3>
              <p className="text-sm text-white leading-relaxed">
                Watch the full flow live — from delivery to approval.
              </p>
            </div>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#E17226] group-hover:gap-3 transition-all">
              Request a Demo
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};