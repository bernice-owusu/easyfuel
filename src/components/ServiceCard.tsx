import React from 'react';
import {
  BarChart3,
  Bell,
  Building2,
  Code2,
  Container,
  CreditCard,
  Droplets,
  FileText,
  Fuel,
  Gauge,
  Globe,
  LucideIcon,
  ShieldAlert,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Users,
  Wallet,
} from 'lucide-react';
import { EasyFuelService } from '../types';

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  fuel: Fuel,
  droplets: Droplets,
  gauge: Gauge,
  'credit-card': CreditCard,
  'building-2': Building2,
  'shopping-cart': ShoppingCart,
  wallet: Wallet,
  container: Container,
  bell: Bell,
  'shield-alert': ShieldAlert,
  'bar-chart-3': BarChart3,
  'file-text': FileText,
  globe: Globe,
  users: Users,
  'shield-check': ShieldCheck,
  smartphone: Smartphone,
  'code-2': Code2,
};

export const ServiceCard: React.FC<{ service: EasyFuelService }> = ({ service }) => {
  const Icon = SERVICE_ICONS[service.icon] ?? Fuel;

  return (
    <div className="group w-full h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col md:flex-row">
      <div className="relative w-full md:w-1/2 h-52 md:h-full md:self-stretch overflow-hidden shrink-0">
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors" />
      </div>
      <div className="w-full md:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4 group-hover:bg-[#E17226] transition-colors duration-300">
          <Icon className="w-6 h-6 text-[#E17226] group-hover:text-white transition-colors duration-300" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#E17226] transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          {service.description}
        </p>
      </div>
    </div>
  );
};