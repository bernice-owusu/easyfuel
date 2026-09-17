import React from "react";
import { ArrowRight, Boxes, CheckCircle2 } from "lucide-react";

export const SolutionIntro: React.FC = () => {
  const chain = [
    "Fuel Movement",
    "Inventory & Tanks",
    "Dispensing",
    "Sales",
    "Payments",
    "Reconciliation",
    "Approvals",
    "Reporting",
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left: Product image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src="/assets/img/multi.jpeg"
                  alt="EasyFuel operations platform"
                  className="w-full h-[440px] sm:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-brand-navy text-white p-5 rounded-2xl shadow-xl border-2 border-brand-orange/30 max-w-[240px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#E17226] text-white flex items-center justify-center">
                    <Boxes className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-teko text-3xl font-bold text-[#E17226] leading-none">
                      One
                    </span>
                    <p className="text-xs uppercase tracking-wider text-gray-300 font-medium">
                      Connected Platform
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#E17226]/10 rounded-full blur-2xl -z-10" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-7 lg:pl-8">
            <span className="text-[#E17226] font-semibold text-sm tracking-wider uppercase bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-100 inline-block mb-3">
              Meet EasyFuel
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-heading leading-tight mb-6">
              Complete Control from <b className="text-[#E17226]">Delivery</b>{" "}
              to <b className="text-[#E17226]">Payment</b>.
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
              EasyFuel is an end-to-end fuel station operations and control
              platform built for Oil Marketing Companies and multi-station
              petroleum networks. It connects fuel movement, station operations,
              attendant activity, sales, inventory, payments, reconciliation,
              approvals and reporting in one centralized environment.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Instead of managing isolated processes, EasyFuel gives management
              a{" "}
              <b className="text-brand-navy">
                connected view of the entire fuel operation
              </b>
              .
            </p>

            {/* Chain visual */}
            <div className="rounded-2xl bg-brand-navy border border-white/10 p-5 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                {chain.map((step, i) => (
                  <React.Fragment key={step}>
                    <span className="text-xs sm:text-[13px] font-semibold text-white bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                      {step}
                    </span>
                    {i < chain.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-[#E17226]" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Bsystems */}
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 text-[#E17226] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">
                    Built by Bsystems Limited
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    A technology company focused on enterprise software, digital
                    transformation, payment-related platforms, operational
                    management systems, systems integration and custom
                    technology solutions.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#solutions"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-navy hover:bg-brand-orange text-white font-semibold text-sm rounded-full transition-colors shadow-md group"
            >
              Explore EasyFuel
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
