import React, { useState, useEffect } from "react";
import { Clock, MapPin, Phone, Mail, Menu, X, ChevronDown } from "lucide-react";
import { NAV_ITEMS } from "../data/fossilData";

const HASH_TO_ITEM: Record<string, string> = {
  "#home": "Home",
  "#about": "About EasyFuel",
  "#solutions": "Solutions",
  "#how-it-works": "How It Works",
  "#resources": "Resources",
  "#contact": "Contact",
};

const SECTION_IDS: { id: string; name: string }[] = [
  { id: "home", name: "Home" },
  { id: "about", name: "About EasyFuel" },
  { id: "solutions", name: "Solutions" },
  { id: "how-it-works", name: "How It Works" },
  { id: "resources", name: "Resources" },
  { id: "contact", name: "Contact" },
];

const getActiveFromHash = (): string => {
  const hash = window.location.hash;
  return HASH_TO_ITEM[hash] ?? "Home";
};

interface HeaderProps {
  onOpenQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState(() => getActiveFromHash());

  const handleHashChange = () => setActiveItem(getActiveFromHash());
  useEffect(() => {
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const match = SECTION_IDS.find((s) => s.id === entry.target.id);
            if (match) setActiveItem(match.name);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );

    SECTION_IDS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full relative z-40">
      {/* Top Info Bar — dark navy */}
      <div
        className={`bg-brand-navy text-white text-xs sm:text-[13px] transition-all duration-300 overflow-hidden ${
          isScrolled ? "h-0 py-0" : "py-2.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 lg:gap-8">
            {/* Address */}
            <span className="hidden sm:inline-flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#E17226]" />
              No 6 Eseefo Street, Asylum Down, Accra
            </span>
            {/* Phone */}
            <a
              href="tel:+233302254340"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E17226]" />
              (0)302 254340
            </a>
            {/* Email */}
            <a
              href="mailto:info@easyfuel.com"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#E17226]" />
              info@easyfuel.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar — white background */}
      <div
        className={`w-full border-b transition-all duration-300 bg-white border-gray-100 ${
          isScrolled
            ? "fixed top-0 left-0 right-0 shadow-lg py-3 z-50"
            : "py-3 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo + Mobile Toggle */}
            <a
              href="#home"
              className="inline-block focus:outline-none shrink-0"
            >
              <img
                src="/assets/img/logo.png"
                alt="EasyFuel"
                className="h-11 sm:h-12 w-auto object-contain"
              />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 ml-8">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.href}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md font-medium text-[15px] transition-colors ${
                      item.name === activeItem
                        ? "text-[#E17226]"
                        : "text-gray-700 hover:text-[#E17226]"
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.subItems && (
                      <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {item.subItems && activeDropdown === item.name && (
                    <div className="absolute left-0 mt-1 w-52 bg-white text-gray-800 rounded-lg shadow-2xl py-2 border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      {item.subItems.map((sub) => (
                        <a
                          key={sub.name}
                          href={sub.href}
                          className="block px-4 py-2.5 text-sm font-medium hover:bg-orange-50 hover:text-orange-600 transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right: CTA + Mobile Toggle */}
            <div className="flex items-center gap-3 ml-auto">
              <button
                type="button"
                onClick={onOpenQuote}
                className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-[#E17226] hover:bg-[#C65F1D] text-white font-medium text-sm sm:text-base rounded-full shadow-lg shadow-orange-900/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Request a Demo
              </button>
              <a
                href="https://easyfuel.app/login"
                className="hidden md:inline-flex items-center justify-center px-6 py-2.5 border-2 border-[#E17226] text-[#E17226] font-medium text-sm sm:text-base rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Login
              </a>

              <button
                type="button"
                className="lg:hidden p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-gray-50 focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-start">
          <div className="bg-white text-gray-800 w-full max-h-[85vh] overflow-y-auto shadow-2xl rounded-b-2xl border-b border-gray-100">
            {/* Mobile header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <img
                src="/assets/img/logo.png"
                alt="EasyFuel"
                className="h-9 w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="px-6 py-4 flex flex-col space-y-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.name} className="border-b border-gray-100 pb-2">
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 text-base font-semibold transition-colors ${
                      item.name === activeItem
                        ? "text-[#E17226]"
                        : "text-gray-700 hover:text-[#E17226]"
                    }`}
                  >
                    {item.name}
                  </a>
                  {item.subItems && (
                    <div className="pl-4 space-y-1.5 mt-1">
                      {item.subItems.map((sub) => (
                        <a
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 text-sm text-gray-500 hover:text-[#E17226]"
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile CTA + contact */}
            <div className="px-6 py-5 border-t border-gray-100 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-3 bg-[#E17226] hover:bg-[#C65F1D] text-white text-center font-semibold rounded-full transition-colors"
              >
                Request a Demo
              </button>
              <a
                href="https://easyfuel.app/login"
                className="w-full py-3 border-2 border-[#E17226] text-[#E17226] hover:bg-[#E17226] hover:text-white text-center font-semibold rounded-full transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </a>
              <div className="flex flex-col items-center gap-1.5 text-xs text-gray-400 pt-2">
                <span>No 6 Eseefo Street, Asylum Down, Accra</span>
                <span>(0)302 254340 • info@easyfuel.com</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
