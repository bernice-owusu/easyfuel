import {
  NavItem,
  SlideItem,
  ServiceItem,
  EasyFuelService,
  ExtraServiceItem,
} from "../types";

export const NAV_ITEMS: NavItem[] = [
  {
    name: "Home",
    href: "#home",
  },
  {
    name: "About EasyFuel",
    href: "#about",
  },
  {
    name: "Solutions",
    href: "#solutions",
  },
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "How It Works",
    href: "#how-it-works",
  },
  {
    name: "Resources",
    href: "#resources",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];

export const SLIDES: SlideItem[] = [
  {
    id: 1,
    subtitle: "Welcome to Fossil",
    titlePrimary: "Best Solution for",
    titleHighlight: "EV",
    titleSuffix: "Charging",
    description:
      "Fuel Revolution, in modern history, the process of change from an agrarian and handicraft economy to one dominated by fuel and refueling services.",
    bgImage: "/assets/img/slider/slide-3.jpg",
    btnText: "Learn More",
  },
  {
    id: 2,
    subtitle: "Since in 1995",
    titlePrimary: "We also provide",
    titleHighlight: "Vehicle",
    titleSuffix: "Repair",
    description:
      "Fuel Revolution, in modern history, the process of change from an agrarian and handicraft economy to one dominated by fuel and refueling services.",
    bgImage: "/assets/img/slider/slide-4.jpg",
    btnText: "Learn More",
  },
];

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: "pure-octane",
    title: "Pure Octane",
    category: "High-Performance Fuel",
    description:
      "There are some reason build the site lorem ipsum dolor sit amet.",
    details:
      "Our ultra-refined 98+ Octane blend is engineered for peak engine responsiveness, preventing knock and maximizing power delivery for sports and premium high-compression vehicles.",
    iconName: "flame",
    image: "/assets/img/service/1.jpg",
    specs: [
      "98+ Research Octane",
      "Deposit-cleaning additives",
      "Enhanced fuel economy",
      "Zero sulfur contamination",
    ],
  },
  {
    id: "light-diesel",
    title: "Light Diesel",
    category: "Commercial & Transport",
    description:
      "There are some reason build the site lorem ipsum dolor sit amet.",
    details:
      "Ultra-Low Sulfur Light Diesel optimized for modern common-rail injection engines. Provides rapid cold-weather ignition and superior lubrication for commercial fleets.",
    iconName: "fuel",
    image: "/assets/img/service/2.jpg",
    specs: [
      "Ultra-low sulfur formula",
      "High cetane rating",
      "All-weather anti-gel",
      "Lubricity enhancers",
    ],
  },
  {
    id: "crystal-petrol",
    title: "Crystal Petrol",
    category: "Everyday Mobility",
    description:
      "There are some reason build the site lorem ipsum dolor sit amet.",
    details:
      "Crystal Petrol undergoes multi-stage filtration to eliminate impurities and moisture, ensuring clean combustion, lower emissions, and maximum mileage for daily commuters.",
    iconName: "gauge",
    image: "/assets/img/service/3.jpg",
    specs: [
      "Multi-stage micro-filtration",
      "Clean valve guarantee",
      "Lower carbon footprint",
      "Standard 95 Ron",
    ],
  },
  {
    id: "cng-conversion",
    title: "CNG & EV Charging",
    category: "Eco-Friendly Energy",
    description:
      "There are some reason build the site lorem ipsum dolor sit amet.",
    details:
      "State-of-the-art Compressed Natural Gas and CCS/NACS ultra-fast electric vehicle charging dispensers supporting up to 350kW for rapid 15-minute battery replenishment.",
    iconName: "zap",
    image: "/assets/img/service/4.jpg",
    specs: [
      "Up to 350kW DC Fast Charge",
      "Certified CNG dispensers",
      "Universal plug compatibility",
      "Green energy sourced",
    ],
  },
];

export const EASY_FUEL_SERVICES: EasyFuelService[] = [
  {
    id: "fuel-inventory-management",
    title: "Fuel Inventory Management",
    description:
      "Track fuel stock across products and sites with automated stock counts, reorder triggers and delivery reconciliation.",
    icon: "fuel",
    image: "/assets/img/service/1.jpg",
  },
  {
    id: "fuel-dispensing-management",
    title: "Fuel Dispensing Management",
    description:
      "Capture pump transactions, nozzles and attendant activity in real time for complete sale traceability.",
    icon: "droplets",
    image: "/assets/img/service/2.jpg",
  },
  {
    id: "fuel-stock-monitoring",
    title: "Fuel Stock Monitoring",
    description:
      "Live inventory visibility across tanks and sites, with opening vs. closing stock calculations and variance alerts.",
    icon: "gauge",
    image: "/assets/img/service/3.jpg",
  },
  {
    id: "fuel-card-management",
    title: "Fuel Card Management",
    description:
      "Issue, manage and control fuel cards with limits, spend caps, product restrictions and usage monitoring.",
    icon: "credit-card",
    image: "/assets/img/service/4.jpg",
  },
  {
    id: "fuel-station-management",
    title: "Fuel Station Management",
    description:
      "Oversee shift activity, cashiering, sales and station operations from a single control panel.",
    icon: "building-2",
    image: "/assets/img/xtra/01.jpg",
  },
  {
    id: "fuel-purchase-management",
    title: "Fuel Purchase Management",
    description:
      "Manage fuel procurement from orders to delivery — quantities, prices, suppliers and costs in one workflow.",
    icon: "shopping-cart",
    image: "/assets/img/xtra/02.jpg",
  },
  {
    id: "fuel-expense-management",
    title: "Fuel Expense Management",
    description:
      "Capture and categorize every station expense for accurate cost control and period P&L.",
    icon: "wallet",
    image: "/assets/img/xtra/03.jpg",
  },
  {
    id: "tank-monitoring",
    title: "Tank Monitoring",
    description:
      "Monitor tank levels, dips, temperature and deliveries with automated dip readings and low-stock alarms.",
    icon: "container",
    image: "/assets/img/xtra/04.jpg",
  },
  {
    id: "alerts-notifications",
    title: "Alerts & Notifications",
    description:
      "Receive instant alerts on shortages, variances, delivery discrepancies and operational thresholds.",
    icon: "bell",
    image: "/assets/img/blog/1.jpg",
  },
  {
    id: "fraud-detection",
    title: "Fraud Detection",
    description:
      "Automatically flag anomalous sales, discounts, voids, card misuse and unexplained variances.",
    icon: "shield-alert",
    image: "/assets/img/blog/2.jpg",
  },
  {
    id: "analytics-dashboard",
    title: "Analytics Dashboard",
    description:
      "Real-time dashboards across sales, fuel, cash and stock performance for any scope or period.",
    icon: "bar-chart-3",
    image: "/assets/img/blog/3.jpg",
  },
  {
    id: "reports",
    title: "Reports",
    description:
      "Generate enterprise-ready reports on sales, inventory, reconciliation, expenses and exceptions.",
    icon: "file-text",
    image: "/assets/img/achievement.jpg",
  },
  {
    id: "multi-location-management",
    title: "Multi-location Management",
    description:
      "Run unlimited stations under one platform with consolidated control and per-site visibility.",
    icon: "globe",
    image: "/assets/img/feature.jpg",
  },
  {
    id: "user-management",
    title: "User Management",
    description:
      "Manage station and head-office users, assignments, departments and enrollment.",
    icon: "users",
    image: "/assets/img/about/about-2.jpg",
  },
  {
    id: "role-based-access",
    title: "Role-Based Access",
    description:
      "Control what each user can see and do with granular roles and permissions.",
    icon: "shield-check",
    image: "/assets/img/slider/slide-1.jpg",
  },
  {
    id: "mobile-application",
    title: "Mobile Application",
    description:
      "Empower attendant and manager workflows on the go with a mobile companion app.",
    icon: "smartphone",
    image: "/assets/img/slider/slide-2.jpg",
  },
  {
    id: "api-integration",
    title: "API Integration",
    description:
      "Connect your fuel management tools, accounting systems and hardware through open APIs.",
    icon: "code-2",
    image: "/assets/img/slider/slide-3.jpg",
  },
];

export const EXTRA_SERVICES: ExtraServiceItem[] = [
  {
    id: "car-evacuation",
    title: "Car Evacuation",
    description:
      "Rapid on-demand towing and roadside vehicle evacuation services available around the clock.",
    image: "/assets/img/xtra/01.jpg",
    tag: "Emergency 24/7",
  },
  {
    id: "emergency-charging",
    title: "Emergency Charging",
    description:
      "Mobile EV power rescue units equipped with rapid DC charging packs dispatched to your stalled location.",
    image: "/assets/img/xtra/02.jpg",
    tag: "Mobile EV Tech",
  },
  {
    id: "wheels-pumping",
    title: "Wheels Pumping",
    description:
      "High-precision automated digital tire inflation, nitrogen tire fill, and wheel balancing checkpoints.",
    image: "/assets/img/xtra/03.jpg",
    tag: "Tire Diagnostics",
  },
  {
    id: "engine-repair",
    title: "Engine Repair",
    description:
      "Certified master technicians providing swift diagnostics, spark plug replacements, fluid flushes, and checks.",
    image: "/assets/img/xtra/04.jpg",
    tag: "Certified Mechanics",
  },
];

export const ACHIEVEMENTS = [
  { number: "2150+", label: "Satisfied Client", suffix: "" },
  { number: "132", label: "Worldwide Branches", suffix: "" },
  { number: "55", label: "Countries Covered", suffix: "" },
  { number: "4.8", label: "Review Rating", suffix: "★" },
];

export const FUEL_RATES: Record<string, number> = {
  Octane: 4.15,
  Diesel: 3.89,
  Petrol: 3.65,
  "CNG Gas": 2.45,
  "Lube Oil": 18.5,
  "EV Fast Charge (per kWh)": 0.35,
};
