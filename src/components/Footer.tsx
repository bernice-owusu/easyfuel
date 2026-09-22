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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand */}
          <div className="lg:col-span-4">
            <a href="#home" className="inline-block mb-4">
              <img
                src="/assets/img/logo.png"
                alt="EasyFuel"
                className="h-20 w-auto"
              />
            </a>
            <p className="text-sm text-[#E17226] font-semibold tracking-wide mb-4">
              Every Litre Accounted For.
            </p>
            <p className="text-white text-sm leading-relaxed max-w-sm mb-6">
              An enterprise fuel station operations and control platform built
              for Oil Marketing Companies and multi-station petroleum networks.
            </p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E17226] shrink-0 mt-0.5" />
                <span>No 6 Eseefo Street, Asylum Down, Accra</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E17226] shrink-0" />
                <a
                  href="mailto:info@easyfuel.com"
                  className="hover:text-[#E17226] transition-colors"
                >
                  info@easyfuel.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E17226] shrink-0" />
                <a
                  href="tel:+233302254340"
                  className="hover:text-[#E17226] transition-colors"
                >
                  (0)302 254340
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white hover:text-white hover:border-[#E17226] hover:bg-[#E17226] flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white hover:text-white hover:border-[#E17226] hover:bg-[#E17226] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Product */}
          <div className="lg:col-span-2">
            <h5 className="text-white text-base font-bold uppercase tracking-wider mb-5">
              Product
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#solutions"
                  className="hover:text-[#E17226] transition-colors"
                >
                  Solutions
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-[#E17226] transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#integrations"
                  className="hover:text-[#E17226] transition-colors"
                >
                  Integrations
                </a>
              </li>
              <li>
                <a
                  href="#security"
                  className="hover:text-[#E17226] transition-colors"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="lg:col-span-2">
            <h5 className="text-white text-base font-bold uppercase tracking-wider mb-5">
              Company
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#about"
                  className="hover:text-[#E17226] transition-colors"
                >
                  About EasyFuel
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-[#E17226] transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#quotation"
                  className="hover:text-[#E17226] transition-colors"
                >
                  Request a Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div className="lg:col-span-2">
            <h5 className="text-white text-base font-bold uppercase tracking-wider mb-5">
              Resources
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#resources"
                  className="hover:text-[#E17226] transition-colors"
                >
                  Insights
                </a>
              </li>
              <li>
                <a
                  href="#resources"
                  className="hover:text-[#E17226] transition-colors"
                >
                  Guides
                </a>
              </li>
              <li>
                <a
                  href="#resources"
                  className="hover:text-[#E17226] transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#resources"
                  className="hover:text-[#E17226] transition-colors"
                >
                  Downloads
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal */}
          <div className="lg:col-span-2">
            <h5 className="text-white text-base font-bold uppercase tracking-wider mb-5">
              Legal
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:text-[#E17226] transition-colors focus:outline-none cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="hover:text-[#E17226] transition-colors focus:outline-none cursor-pointer"
                >
                  Terms of Use
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:text-[#E17226] transition-colors focus:outline-none cursor-pointer"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom Area */}
      <div className="bg-brand-navy py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white">
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
