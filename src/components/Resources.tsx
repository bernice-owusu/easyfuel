import React, { useState } from "react";
import { Plus } from "lucide-react";

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is EasyFuel?",
    a: "EasyFuel is an enterprise fuel station operations and control platform designed for Oil Marketing Companies and multi-station petroleum networks.",
  },
  {
    q: "Who is EasyFuel designed for?",
    a: "It is primarily designed for OMCs, fuel stations, multi-station petroleum networks and corporate organisations with complex fuel operations.",
  },
  {
    q: "Can EasyFuel manage multiple stations?",
    a: "Yes. EasyFuel is designed to provide centralized oversight and management across multiple stations.",
  },
  {
    q: "Can EasyFuel manage fuel inventory?",
    a: "Yes. Fuel inventory management, stock monitoring and tank monitoring are among its core capabilities.",
  },
  {
    q: "Does EasyFuel support payment reconciliation?",
    a: "Yes. EasyFuel supports reconciliation across sales and payment channels including cash, POS, mobile money, banking and fuel cards.",
  },
  {
    q: "Can EasyFuel integrate with existing systems?",
    a: "Yes. The platform supports configurable integrations with payment, banking, ERP, accounting, fuel-card, POS, tank-monitoring and other systems where appropriate APIs or interfaces are available.",
  },
  {
    q: "Is EasyFuel cloud-based?",
    a: "Yes. The product specification identifies EasyFuel as a cloud/SaaS web application.",
  },
  {
    q: "Does EasyFuel have a mobile application?",
    a: "Yes. The solution includes Android mobile functionality intended for POS Terminal deployment.",
  },
  {
    q: "How much does EasyFuel cost?",
    a: "EasyFuel uses custom enterprise pricing based on factors such as the number of stations, rollout scope, integrations, implementation requirements and support model.",
  },
];

export const Resources: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="resources"
      className="py-20 lg:py-28 bg-brand-navy bg-[url('/assets/img/hero2.jpeg')] bg-cover bg-center bg-no-repeat relative"
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-brand-navy/50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-orange font-semibold text-sm tracking-wider uppercase bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-100 inline-block mb-3">
            Resources
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Frequently Asked Questions.
          </h2>
          <p className="mt-4 text-white text-base max-w-xl mx-auto">
            Everything you need to understand how EasyFuel works — and what it
            can do for your network.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={faq.q}
                  className={`rounded-2xl border transition-colors ${
                    isOpen
                      ? "bg-brand-navy border-brand-navy shadow-lg"
                      : "bg-white border-gray-100 hover:border-brand-orange/40"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 cursor-pointer"
                  >
                    <span
                      className={`text-sm sm:text-base font-semibold ${
                        isOpen ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-[#E17226] text-white rotate-45"
                          : "bg-orange-50 text-[#E17226]"
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 -mt-1">
                      <p className="text-sm text-white leading-relaxed border-t border-white/10 pt-3">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
