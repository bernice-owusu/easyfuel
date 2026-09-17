import React from "react";
import { EASY_FUEL_SERVICES } from "../data/fossilData";
import { ServiceCard } from "./ServiceCard";

export const AllServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* All Services */}
      <section className="py-20 lg:py-28 bg-white flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#E17226] font-semibold text-sm tracking-wider uppercase bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-100 inline-block mb-3">
              All Services
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-heading leading-tight">
              <b className="text-brand-navy font-black underline decoration-brand-orange decoration-4">
                One Platform
              </b>{" "}
              for Every Fuel Station Operation
            </h2>
            <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto">
              Every module you need to run OMCs and multi-station networks —
              from tank and pump to sales, cash and enterprise reporting.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {EASY_FUEL_SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};