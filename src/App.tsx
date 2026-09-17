/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { TrustStrip } from './components/TrustStrip';
import { ProblemSection } from './components/ProblemSection';
import { SolutionIntro } from './components/SolutionIntro';
import { CoreCapabilities } from './components/CoreCapabilities';
import { HowItWorks } from './components/HowItWorks';
import { CommandCentre } from './components/CommandCentre';
import { Reconciliation } from './components/Reconciliation';
import { Payments } from './components/Payments';
import { Analytics } from './components/Analytics';
import { Industries } from './components/Industries';
import { Integrations } from './components/Integrations';
import { Security } from './components/Security';
import { FeatureGrid } from './components/FeatureGrid';
import { Resources } from './components/Resources';
import { QuotationSection } from './components/QuotationSection';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { AllServicesPage } from './components/AllServicesPage';

export default function App() {
  const [isServicesPage, setIsServicesPage] = useState(() => window.location.hash === '#/services');
  const [legalModalText, setLegalModalText] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    const onHashChange = () => setIsServicesPage(window.location.hash === '#/services');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (isServicesPage) {
      window.scrollTo({ top: 0 });
      return;
    }
    const id = window.location.hash.replace('#', '');
    const el = id ? document.getElementById(id) : null;
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0 });
  }, [isServicesPage]);

  const scrollToQuotation = () => {
    if (isServicesPage) {
      window.location.hash = '#quotation';
      return;
    }
    const el = document.getElementById('quotation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col selection:bg-[#E17226] selection:text-white">
      {/* Header with Top Bar and Sticky Navigation */}
      <Header onOpenQuote={scrollToQuotation} />

      {/* Main Content Area */}
      <main className="flex-1">
        {isServicesPage ? (
          <AllServicesPage />
        ) : (
          <>
            {/* 1. Hero */}
            <HeroSlider onOpenQuote={scrollToQuotation} />

            {/* 2. Trust / Value Proposition */}
            <TrustStrip />

            {/* 3. The Problem */}
            <ProblemSection />

            {/* 4. Meet EasyFuel */}
            <SolutionIntro />

            {/* 5. Core Capabilities */}
            <CoreCapabilities />

            {/* 6. How EasyFuel Works */}
            <HowItWorks />

            {/* 7. Multi-Station Command Centre */}
            <CommandCentre />

            {/* 8. Reconciliation & Variance Intelligence */}
            <Reconciliation />

            {/* 9. Payment Management */}
            <Payments />

            {/* 10. Analytics Dashboard */}
            <Analytics />

            {/* 11. Industries / Users */}
            <Industries />

            {/* 12. Integrations */}
            <Integrations />

            {/* 13. Security */}
            <Security />

            {/* 14. Feature Grid */}
            <FeatureGrid />

            {/* 15. Resources & FAQ */}
            <Resources />

            {/* 17. Final CTA - Request a Demo */}
            <QuotationSection />

            {/* 18. Footer */}
            <Footer
              onOpenPrivacy={() =>
                setLegalModalText({
                  title: 'Privacy Policy',
                  content:
                    'EasyFuel collects and processes station operational and financial data solely to operate and improve the platform. Enterprise AES-256 encryption protects all telemetry, transaction and reconciliation records. We never sell personal or organizational data to third parties.',
                })
              }
              onOpenTerms={() =>
                setLegalModalText({
                  title: 'Terms & Conditions',
                  content:
                    'EasyFuel is an enterprise fuel station operations platform provided under a quotation-based commercial agreement. All dispensing, sales, reconciliation and approval records remain governed by the implementing organization plus applicable petroleum retail and hazardous materials regulations.',
                })
              }
            />
          </>
        )}
      </main>

      {/* Floating Scroll to Top Button */}
      <ScrollToTop />

      {/* Legal Info Modal */}
      {legalModalText && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{legalModalText.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {legalModalText.content}
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModalText(null)}
                className="px-6 py-2.5 bg-[#E17226] text-white font-semibold rounded-full hover:bg-[#C65F1D] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}