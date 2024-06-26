import {
  PenTool,
  HelpCircle,
  Award,
  Puzzle,
  Home,
  Search,
  FileText,
  DollarSign,
  Calendar,
  Mail,
  Play,
  Briefcase,
  Megaphone,
  Pencil,
  type LucideIcon,
  Phone,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

export const platformItems: NavItem[] = [
  {
    title: "Overview",
    href: "/overview",
    description: "AI-powered compliance assistance for all your needs",
    icon: PenTool,
  },
  {
    title: "How it Works",
    href: "/how-it-works",
    description: "Seamless integration with your existing systems",
    icon: HelpCircle,
  },
  {
    title: "Why Law Assistant AI",
    href: "/why-codex",
    description: "The leader in AI-powered compliance solutions",
    icon: Award,
  },
  {
    title: "Integrations",
    href: "/integrations",
    description: "Explore our integrations with popular legal databases",
    icon: Puzzle,
  },
];

export const useCasesItems: NavItem[] = [
  {
    title: "Real Estate",
    href: "/real-estate",
    description:
      "Ensure real estate projects adhere to zoning and building bylaws",
    icon: Home,
  },
  {
    title: "Contracts",
    href: "/contracts",
    description: "Analyze contracts for deviations from standards and policies",
    icon: Search,
  },
  {
    title: "Environmental",
    href: "/environmental",
    description:
      "Assess projects against environmental regulations and standards",
    icon: FileText,
  },
  {
    title: "Financial",
    href: "/financial",
    description: "Detect suspicious transactions and ensure AML law compliance",
    icon: DollarSign,
  },
];

export const resourcesItems: NavItem[] = [
  {
    title: "Blog",
    href: "/blog",
    description: "Insights and updates on compliance trends",
    icon: FileText,
  },
  {
    title: "Webinars & Events",
    href: "/events-webinars",
    description: "Learn from compliance experts online and in-person",
    icon: Calendar,
  },
  {
    title: "Case Studies",
    href: "/case-studies",
    description: "See how Law Assistant AI helps organizations stay compliant",
    icon: Pencil,
  },
  {
    title: "Newsletter",
    href: "/newsletter",
    description: "Get the latest compliance news delivered to your inbox",
    icon: Mail,
  },
];
export const getStartedItems: NavItem[] = [
  {
    title: "Request a Demo",
    href: "https://usemotion.com/meet/vincent-gauthier/meeting?d=30",
    description: "See Law Assistant AI in action with a personalized demo",
    icon: Play,
  },
  {
    title: "Pricing",
    href: "/pricing",
    description: "Choose the right plan for your compliance needs",
    icon: DollarSign,
  },
  {
    title: "Contact Sales",
    href: "/contact-sales",
    description: "Contact our sales team",
    icon: Phone,
  },
];

export const companyItems: NavItem[] = [
  {
    title: "About",
    href: "/about",
    description: "Learn about our mission and team",
    icon: Briefcase,
  },
  {
    title: "Careers",
    href: "/jobs",
    description: "Join us in revolutionizing compliance with AI",
    icon: Briefcase,
  },
  {
    title: "Press",
    href: "/press",
    description:
      "Read the latest news and press releases about Law Assistant AI",
    icon: Megaphone,
  },
  {
    title: "Contact Us",
    href: "/contact",
    description: "Get in touch with our team",
    icon: Mail,
  },
];
