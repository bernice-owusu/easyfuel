import React, { useState } from 'react';
import { X, Search, Check, ArrowRight, ShieldCheck, Zap, Fuel, Send } from 'lucide-react';
import { ServiceItem, ExtraServiceItem } from '../types';
import { CORE_SERVICES, EXTRA_SERVICES } from '../data/fossilData';

// --- Search Modal ---
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (service: ServiceItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectService,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredServices = CORE_SERVICES.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase()) ||
      s.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-brand-navy border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="text-white text-sm font-medium">Search for anything at Fossil</div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input */}
        <div className="relative mb-6">
          <Search className="w-5 h-5 text-white absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fuel, EV charging, vehicle repair..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/15 text-white placeholder-gray-400 focus:outline-none focus:border-[#E17226] focus:ring-2 focus:ring-[#E17226]/30 text-base"
          />
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto space-y-4 pr-1">
          {query.trim() === '' ? (
            <div className="text-xs text-white">
              <span className="block font-semibold uppercase tracking-wider mb-2 text-white">
                Popular Searches:
              </span>
              <div className="flex flex-wrap gap-2">
                {['EV Charging', 'Octane 98', 'Light Diesel', 'Engine Repair', 'Tow Service'].map(
                  (term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : (
            <>
              {filteredServices.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-[#E17226] uppercase tracking-wider mb-2">
                    Services ({filteredServices.length})
                  </div>
                  <div className="space-y-2">
                    {filteredServices.map((svc) => (
                      <div
                        key={svc.id}
                        onClick={() => {
                          onClose();
                          onSelectService(svc);
                        }}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer flex items-center justify-between group transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img src={svc.image} alt={svc.title} className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <div className="font-semibold text-sm group-hover:text-[#E17226] transition-colors">
                              {svc.title}
                            </div>
                            <div className="text-xs text-white">{svc.category}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white group-hover:text-[#E17226] group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredServices.length === 0 && (
                <div className="text-center py-8 text-white text-sm">
                  No matching services found for &quot;{query}&quot;.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Service Details Modal ---
interface ServiceModalProps {
  service: ServiceItem | ExtraServiceItem | null;
  onClose: () => void;
  onBook: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onBook }) => {
  if (!service) return null;

  const isCore = 'specs' in service;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
        {/* Modal Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-900 shrink-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 text-white">
            <span className="text-xs font-bold text-[#E17226] uppercase tracking-wider">
              {isCore ? (service as ServiceItem).category : (service as ExtraServiceItem).tag}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Overview
            </h4>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {isCore ? (service as ServiceItem).details : service.description}
            </p>
          </div>

          {isCore && (
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
                Quality Specifications & Standards
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(service as ServiceItem).specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 p-2.5 rounded-lg">
                    <Check className="w-4 h-4 text-[#E17226] shrink-0" />
                    <span className="font-medium">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-between gap-4">
            <div className="text-xs text-orange-800">
              <span className="font-bold block text-sm mb-0.5">Need this service immediately?</span>
              Available at all 132 Fossil fueling stations & EV hubs 24 hours a day.
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onBook();
              }}
              className="px-5 py-2.5 bg-[#E17226] hover:bg-[#C65F1D] text-white font-semibold text-xs sm:text-sm rounded-full whitespace-nowrap shadow-sm"
            >
              Request a Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
