import React from "react";
import { Mail, Phone, MapPin, Linkedin, Facebook } from "lucide-react";

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
}) => {
  return (
    <footer id="contact" className="bg-brand-navy-dark text-white">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12 border-b border-white/10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          {/* Col 1: Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <p className="text-brand-orange font-semibold tracking-wide mb-3 text-lg">
              EasyFuel
            </p>
            <p className="text-sm text-brand-orange font-medium mb-3">
              Every Litre Accounted For.
            </p>
            <p className="text-white text-sm leading-relaxed max-w-xs mb-4">
              Enterprise fuel station operations platform for OMCs and multi-station networks.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span>No 6 Eseefo Street, Asylum Down, Accra</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <a href="mailto:info@easyfuel.com" className="hover:text-brand-orange transition-colors">
                  info@easyfuel.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <a href="tel:+233302254340" className="hover:text-brand-orange transition-colors">
                  (0)302 254340
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white hover:text-white hover:border-brand-orange hover:bg-brand-orange flex items-center justify-center transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white hover:text-white hover:border-brand-orange hover:bg-brand-orange flex items-center justify-center transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Product */}
          <div>
            <h5 className="text-white text-sm font-bold uppercase tracking-wider mb-3">
              Product
            </h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#solutions" className="hover:text-brand-orange transition-colors">Solutions</a></li>
              <li><a href="#how-it-works" className="hover:text-brand-orange transition-colors">How It Works</a></li>
              <li><a href="#integrations" className="hover:text-brand-orange transition-colors">Integrations</a></li>
              <li><a href="#security" className="hover:text-brand-orange transition-colors">Security</a></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h5 className="text-white text-sm font-bold uppercase tracking-wider mb-3">
              Company
            </h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-brand-orange transition-colors">About EasyFuel</a></li>
              <li><a href="#contact" className="hover:text-brand-orange transition-colors">Contact</a></li>
              <li><a href="#quotation" className="hover:text-brand-orange transition-colors">Request a Demo</a></li>
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div>
            <h5 className="text-white text-sm font-bold uppercase tracking-wider mb-3">
              Resources
            </h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#resources" className="hover:text-brand-orange transition-colors">Insights</a></li>
              <li><a href="#resources" className="hover:text-brand-orange transition-colors">Guides</a></li>
              <li><a href="#resources" className="hover:text-brand-orange transition-colors">FAQs</a></li>
              <li><a href="#resources" className="hover:text-brand-orange transition-colors">Downloads</a></li>
            </ul>
          </div>

          {/* Col 5: Legal */}
          <div>
            <h5 className="text-white text-sm font-bold uppercase tracking-wider mb-3">
              Legal
            </h5>
            <ul className="space-y-2 text-sm">
              <li><button type="button" onClick={onOpenPrivacy} className="hover:text-brand-orange transition-colors focus:outline-none cursor-pointer">Privacy Policy</button></li>
              <li><button type="button" onClick={onOpenTerms} className="hover:text-brand-orange transition-colors focus:outline-none cursor-pointer">Terms of Use</button></li>
              <li><button type="button" onClick={onOpenPrivacy} className="hover:text-brand-orange transition-colors focus:outline-none cursor-pointer">Cookie Policy</button></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom Area */}
      <div className="bg-brand-navy py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-white">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} EasyFuel. All rights reserved.
            </p>
            <p className="text-center sm:text-right">
              Developed by{" "}
              <span className="text-white font-medium">Bsystems Limited</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
