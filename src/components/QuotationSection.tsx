import React, { useState } from "react";
import { Send, PhoneCall, CheckCircle, CalendarCheck } from "lucide-react";

export const QuotationSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    fuelStations: "",
    country: "",
    message: "",
    demoDate: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      industry: "",
      fuelStations: "",
      country: "",
      message: "",
      demoDate: "",
    });
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#E17226] focus:ring-2 focus:ring-[#E17226]/20 outline-none transition-all text-gray-800 bg-white";

  return (
    <section id="quotation" className="py-20 lg:py-28 bg-[#f8f9fa] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#E17226] font-semibold text-sm tracking-wider uppercase bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-100 inline-block mb-3">
            Demo
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-heading leading-tight">
            Request a Free <b className="text-[#E17226]">Demo</b> of <br />
            the <b className="text-brand-navy">Easy Fuel</b> Platform
          </h2>
          <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto">
            Tell us about your operation and schedule a live walkthrough with
            our team.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
          {submitted ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-orange-100 text-[#E17226] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Demo Request Received!
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Thank you,{" "}
                <span className="font-semibold text-gray-900">
                  {formData.name}
                </span>{" "}
                from{" "}
                <span className="font-semibold text-gray-900">
                  {formData.company || "your company"}
                </span>
                . Our team will reach out shortly to confirm your demo for{" "}
                <span className="font-semibold text-orange-600">
                  {formData.demoDate || "a time that works for you"}
                </span>
                .
              </p>
              <div className="p-4 rounded-xl bg-gray-50 max-w-sm mx-auto mb-8 text-left text-sm text-gray-600 space-y-1">
                <div>
                  <span className="font-semibold">Industry:</span>{" "}
                  {formData.industry}
                </div>
                <div>
                  <span className="font-semibold">Fuel Stations:</span>{" "}
                  {formData.fuelStations}
                </div>
                <div>
                  <span className="font-semibold">Country:</span>{" "}
                  {formData.country}
                </div>
                <div>
                  <span className="font-semibold">Contact:</span>{" "}
                  {formData.phone} | {formData.email}
                </div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-3 bg-[#E17226] hover:bg-[#C65F1D] text-white font-semibold rounded-full transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="demo-name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="demo-name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Full Name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="demo-company"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="demo-company"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="Company Name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="demo-email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="demo-email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="name@example.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="demo-phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Phone No.
                  </label>
                  <input
                    type="tel"
                    id="demo-phone"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="(+233) 55-..."
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Row 2: Company Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="demo-industry"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Industry
                  </label>
                  <select
                    id="demo-industry"
                    required
                    value={formData.industry}
                    onChange={(e) =>
                      setFormData({ ...formData, industry: e.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select Industry
                    </option>
                    <option value="Fuel & Gas Stations">
                      Fuel & Gas Stations
                    </option>
                    <option value="EV Charging Network">
                      EV Charging Network
                    </option>
                    <option value="Fleet Management">Fleet Management</option>
                    <option value="Logistics & Transport">
                      Logistics & Transport
                    </option>
                    <option value="Retail & Convenience">
                      Retail & Convenience
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="demo-stations"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Number of Fuel Stations
                  </label>
                  <input
                    type="number"
                    id="demo-stations"
                    required
                    min="1"
                    value={formData.fuelStations}
                    onChange={(e) =>
                      setFormData({ ...formData, fuelStations: e.target.value })
                    }
                    placeholder="e.g. 12"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="demo-country"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="demo-country"
                    required
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    placeholder="Ghana"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Row 3: Preferred Demo Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
                <div>
                  <label
                    htmlFor="demo-date"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Preferred Demo Date
                  </label>
                  <input
                    type="date"
                    id="demo-date"
                    required
                    value={formData.demoDate}
                    onChange={(e) =>
                      setFormData({ ...formData, demoDate: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CalendarCheck className="w-5 h-5 text-[#E17226] shrink-0" />
                  <span>We'll confirm a convenient time with your team.</span>
                </div>
              </div>

              {/* Row 4: Message */}
              <div>
                <label
                  htmlFor="demo-message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="demo-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us about your operation, challenges, or what you'd like to see in the demo."
                  className={inputClass}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                id="request-demo-btn"
                className="w-full py-4 bg-[#E17226] hover:bg-[#C65F1D] text-white font-semibold text-base rounded-xl transition-all shadow-lg shadow-orange-600/25 flex items-center justify-center gap-2 hover:translate-y-[-1px] cursor-pointer"
              >
                <span>Request a Demo</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Business Hours Footer Note */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-3 text-sm text-gray-500 text-center">
            <PhoneCall className="w-4 h-4 text-[#E17226] shrink-0" />
            <span>
              Questions? Call us{" "}
              <a
                href="tel:+233302254340"
                className="text-gray-900 font-semibold hover:text-[#C65F1D] transition-colors"
              >
                +233302254340
              </a>{" "}
              during regular business hours
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
