import React from "react";
import {
  Fuel,
  Gauge,
  Waypoints,
  CreditCard,
  Smartphone,
  Landmark,
  IdCard,
  Boxes,
  Container,
  Plug,
  Code2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const GROUPS: { title: string; icon: LucideIcon; items: string[] }[] = [
  {
    title: "Forecourt Hardware",
    icon: Fuel,
    items: ["Fuel Pumps & Dispensers", "Tank Sensors / ATGs"],
  },
  {
    title: "Payments",
    icon: CreditCard,
    items: [
      "POS & Acquirer Services",
      "Payment Gateways",
      "Mobile Money",
      "Banking Systems",
      "Fuel Card Services",
    ],
  },
  {
    title: "Enterprise Systems",
    icon: Boxes,
    items: ["ERP & Accounting Systems", "Depot Systems", "APIs"],
  },
];

const MORE = [
  { name: "Pump / Nozzle Interfaces", icon: Gauge },
  { name: "Dispenser Protocols", icon: Plug },
  { name: "Gateway Connectivity", icon: Waypoints },
  { name: "Mobile / Web APIs", icon: Code2 },
  { name: "Tank-level Telemetry", icon: Container },
  { name: "Card Processing", icon: IdCard },
  { name: "Bank Integration", icon: Landmark },
  { name: "Mobile Money Hubs", icon: Smartphone },
];

export const Integrations: React.FC = () => {
  return (
    <section id="integrations" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#E17226] font-semibold text-sm tracking-wider uppercase bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-100 inline-block mb-3">
            Integrations
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-heading leading-tight">
            Connect EasyFuel to Your{" "}
            <b className="text-[#E17226]">Existing Infrastructure</b>
          </h2>
          <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto">
            EasyFuel is designed to integrate with the systems that already
            support your fuel operation — configured to the provider API or
            device interface available.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {GROUPS.map((g) => {
            const Icon = g.icon;
            return (
              <div
                key={g.title}
                className="rounded-3xl bg-[#f8f9fa] border border-gray-100 p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <span className="w-12 h-12 rounded-2xl bg-brand-navy text-brand-orange flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {g.title}
                </h3>
                <ul className="space-y-2.5">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-gray-600 flex items-center gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E17226]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
