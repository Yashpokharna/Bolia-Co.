import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Script from "next/script";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";
import { AnimatePresence } from "framer-motion";
// import { Boxes} from "lucide-react";
import { Calculator, Building, Gavel } from "lucide-react";
import {
  Code2,
  Laptop2,
  Database,
  Search,
  BrainCircuit,
  Briefcase,
  Users,
  Rocket,
  Zap,
  Wand2,
  TrendingUp,
  Cpu,
  Gem,
  Layers3,
  Boxes,
  UserCircle2,
  Facebook,
  X,
  Linkedin,
  Github,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Import our new components
import Navbar from "@/components/layout/Navbar";
import FloatingSVG from "@/components/ui/FloatingSVG";
import ServiceCard from "@/components/cards/ServiceCard";
import ProductCard from "@/components/cards/ProductCard";
import TestimonialCard from "@/components/cards/TestimonialCard";
import TeamMemberCard from "@/components/cards/TeamMemberCard";
import { TeamMemberProps } from "@/components/cards/TeamMemberCard";
// import FaqItem from "@/components/sections/FaqItem";
import ContactInfo from "@/components/sections/ContactInfo";
import ContactForm from "@/components/sections/ContactForm";
import FloatingSVGGroup from "@/components/ui/FloatingSVGGroup";

// Dummy data for products and services
const products = [
  {
    name: "KoshiFit",
    description: "Revolutionize fitness with AI-powered personal training.",
    category: "Mobile",
    icon: <TrendingUp className="w-6 h-6 mb-4 text-red-400" />,
    detailedDescription: `KoshiFit is a cutting-edge fitness application that leverages artificial intelligence to provide personalized workout plans and nutrition advice.
        <br/><br/>
        <strong>Key Features:</strong>
        <ul class="list-disc pl-5 space-y-2 mt-3 mb-4">
          <li>AI-powered workout recommendations based on your goals and progress</li>
          <li>Real-time form correction and feedback</li>
          <li>Personalized nutrition plans integrated with fitness routines</li>
          <li>Community features to connect with fitness enthusiasts</li>
          <li>Sync with wearable devices for comprehensive health tracking</li>
        </ul>
        KoshiFit is designed to be your complete fitness companion, adapting to your needs and helping you achieve optimal results efficiently.`,
  },
  {
    name: "Accounting Suite",
    description: "Streamline finances with our intuitive accounting solution.",
    category: "Business",
    icon: <Briefcase className="w-6 h-6 mb-4 text-green-400" />,
    detailedDescription: `Our Accounting Suite is designed to simplify financial management for businesses of all sizes, from startups to enterprises.
        <br/><br/>
        <strong>Key Features:</strong>
        <ul class="list-disc pl-5 space-y-2 mt-3 mb-4">
          <li>Automated bookkeeping and transaction categorization</li>
          <li>Real-time financial reporting and analytics</li>
          <li>Tax preparation and compliance tools</li>
          <li>Multi-currency support for global businesses</li>
          <li>Role-based access control for team collaboration</li>
        </ul>
        Accounting Suite streamlines your financial operations, saving time and reducing errors while providing valuable insights into your business performance.`,
  },
  {
    name: "Finance API",
    description: "Integrate accounting seamlessly with our robust API.",
    category: "API",
    icon: <Cpu className="w-6 h-6 mb-4 text-blue-400" />,
    detailedDescription: `Our Finance API provides developers with a powerful way to integrate financial capabilities into their applications.
        <br/><br/>
        <strong>Key Features:</strong>
        <ul class="list-disc pl-5 space-y-2 mt-3 mb-4">
          <li>Comprehensive RESTful API with extensive documentation</li>
          <li>Secure transaction processing and data handling</li>
          <li>Webhooks for real-time event notifications</li>
          <li>SDK support for major programming languages</li>
          <li>Sandbox environment for development and testing</li>
        </ul>
        The Finance API enables seamless integration of financial services into your software ecosystem, with security and performance at its core.`,
  },
  {
    name: "LMS Platform",
    description: "Transform education with our innovative learning platform.",
    category: "Education",
    icon: <BrainCircuit className="w-6 h-6 mb-4 text-yellow-400" />,
    detailedDescription: `Our Learning Management System (LMS) Platform is built to enhance educational experiences in schools, universities, and corporate training environments.
        <br/><br/>
        <strong>Key Features:</strong>
        <ul class="list-disc pl-5 space-y-2 mt-3 mb-4">
          <li>Interactive course creation with multimedia support</li>
          <li>Progress tracking and adaptive learning paths</li>
          <li>Assessment tools with automatic grading</li>
          <li>Discussion forums and collaborative learning spaces</li>
          <li>Analytics dashboard for instructors and administrators</li>
        </ul>
        The LMS Platform creates engaging learning experiences, increases knowledge retention, and provides detailed insights into learner progress.`,
  },
  {
    name: "ServiceHub",
    description:
      "Enhance operations with our reliable service management solution.",
    category: "Business",
    icon: <Gem className="w-6 h-6 mb-4 text-pink-400" />,
    detailedDescription: `ServiceHub is our comprehensive service management platform designed to optimize operations and enhance customer satisfaction.
        <br/><br/>
        <strong>Key Features:</strong>
        <ul class="list-disc pl-5 space-y-2 mt-3 mb-4">
          <li>Service catalog management and request tracking</li>
          <li>Automated workflow management</li>
          <li>SLA monitoring and performance analytics</li>
          <li>Knowledge base for service delivery teams</li>
          <li>Client portal for service requests and status tracking</li>
        </ul>
        ServiceHub streamlines your service operations, improving efficiency and ensuring consistent service delivery to your customers.`,
  },
  {
    name: "StaffTrack",
    description:
      "Modernize HR with our efficient attendance and workforce management system.",
    category: "HR",
    icon: <Users className="w-6 h-6 mb-4 text-purple-400" />,
    detailedDescription: `StaffTrack is a modern solution for tracking employee attendance, time-off, and work hours with precision and ease.
        <br/><br/>
        <strong>Key Features:</strong>
        <ul class="list-disc pl-5 space-y-2 mt-3 mb-4">
          <li>Biometric and mobile check-in capabilities</li>
          <li>Leave management with approval workflows</li>
          <li>Scheduling tools and shift management</li>
          <li>Payroll integration and reporting</li>
          <li>Compliance tracking for labor regulations</li>
        </ul>
        StaffTrack simplifies workforce management, reduces administrative burden, and provides accurate data for payroll and compliance purposes.`,
  },
];

const services = [
  {
    title: "Taxation & Compliance",
    icon: <Code2 className="w-12 h-12 mb-4 text-blue-400" />,
    description:
      "Expert guidance on tax planning, filing, and compliance for businesses and individuals, ensuring peace of mind and adherence to regulations.",
    detailedDescription: `Our Taxation & Compliance service helps businesses and individuals stay fully compliant with all applicable laws and regulations.
      <br/><br/>
      <strong>What We Offer:</strong>
      <ul class="list-disc pl-5 space-y-2 mt-3 mb-4">
        <li>Corporate and personal tax planning and filing</li>
        <li>GST, VAT, and other indirect tax compliance</li>
        <li>Tax advisory for business structuring and transactions</li>
        <li>Representation and support during tax audits</li>
        <li>Regulatory compliance and reporting</li>
      </ul>
      We ensure your finances and business operations remain compliant while optimizing tax efficiency.`,
  },
  {
    title: "Audit & Assurance",
    icon: <Rocket className="w-12 h-12 mb-4 text-indigo-400" />,
    description:
      "Providing statutory, internal, and operational audits to ensure transparency, accuracy, and reliability of financial reporting.",
    detailedDescription: `Our Audit & Assurance service helps organizations maintain financial integrity and stakeholder confidence.
      <br/><br/>
      <strong>What We Offer:</strong>
      <ul class="list-disc pl-5 space-y-2 mt-3 mb-4">
        <li>Statutory audits for compliance with regulations</li>
        <li>Internal audits for operational efficiency and risk management</li>
        <li>Financial statement review and reporting</li>
        <li>Fraud detection and investigation support</li>
        <li>Advisory on internal controls and process improvement</li>
      </ul>
      We deliver audits that help clients make informed decisions with confidence.`,
  },
  {
    title: "Accounting & Advisory",
    icon: <TrendingUp className="w-12 h-12 mb-4 text-green-400" />,
    description:
      "Professional accounting services and financial advisory to streamline business operations and enhance decision-making.",
    detailedDescription: `Our Accounting & Advisory service helps businesses manage their finances efficiently and plan for growth.
      <br/><br/>
      <strong>What We Offer:</strong>
      <ul class="list-disc pl-5 space-y-2 mt-3 mb-4">
        <li>Bookkeeping and financial statement preparation</li>
        <li>Management reporting and budgeting</li>
        <li>Cash flow analysis and forecasting</li>
        <li>Business process advisory</li>
        <li>Financial planning and investment guidance</li>
      </ul>
      We provide actionable insights and robust financial systems to support business success.`,
  },
  {
    title: "Corporate & Legal Services",
    icon: <Boxes className="w-12 h-12 mb-4 text-red-400" />,
    description:
      "Supporting corporate governance, legal compliance, and company secretarial requirements to keep your business running smoothly.",
    detailedDescription: `Our Corporate & Legal Services help businesses navigate legal and regulatory obligations effectively.
      <br/><br/>
      <strong>What We Offer:</strong>
      <ul class="list-disc pl-5 space-y-2 mt-3 mb-4">
        <li>Company formation and registration</li>
        <li>Corporate governance advisory</li>
        <li>Secretarial compliance and statutory filings</li>
        <li>Contract review and legal documentation support</li>
        <li>Advisory on mergers, acquisitions, and restructuring</li>
      </ul>
      We ensure your business meets legal requirements while minimizing risks and maximizing efficiency.`,
  },
];


const testimonials = [
  {
    name: "John Smith",
    company: "Acme Corp",
    quote:
      "Their team delivered our project on time and within budget.  Highly recommended!  Their communication was excellent.",
    image:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=JohnSmith&style=circle&backgroundColor=ffaabb",
  },
  {
    name: "Jane Doe",
    company: "Beta Inc",
    quote:
      "We've been working with them for years and they consistently exceed our expectations.  A true partner in our success.",
    image:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=JaneDoe&style=circle&backgroundColor=aabbff",
  },
  {
    name: "David Lee",
    company: "Gamma Co",
    quote:
      "Their expertise in AI helped us transform our business.  A game-changer for our operations.  We're seeing significant ROI.",
    image:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidLee&style=circle&backgroundColor=bbffaa",
  },
];

const teamMembers: TeamMemberProps[] = [
  {
    name: "Daryl",
    title: "CEO",
    image: "/teams/1.png",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    name: "Mark",
    title: "CTO",
    image: "/teams/2.png",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    name: "Ching",
    title: "Software Architect",
    image: "/teams/3.png",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    name: "Loop",
    title: "Software Engineer",
    image: "/teams/4.png",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
];


const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We provide a comprehensive range of accounting and taxation services, including Income Tax, GST, VAT & ST, TDS & TCS, Company Incorporation, Compliance Services, and Tax Litigation. Our expertise ensures accurate filings, regulatory compliance, and strategic advisory for businesses of all sizes.",
  },
  {
    question: "Why choose Bolia & Co. over other CA firms?",
    answer:
      "Bolia & Co. is committed to professionalism, transparency, and personalized service. With years of experience, our team offers end-to-end solutions tailored to each client’s business needs. We combine technical expertise with timely, efficient service to ensure full statutory compliance and optimal tax management.",
  },
  {
    question: "How do you handle taxation and compliance?",
    answer:
      "Our team follows a structured approach to taxation and compliance. We manage registrations, filings, audits, and advisory services for Income Tax, GST, VAT & ST, TDS & TCS. By staying updated with the latest regulations, we minimize risks, avoid penalties, and ensure your business operates seamlessly within the law.",
  },
  {
    question: "Do you assist with company incorporation?",
    answer:
      "Yes, we provide end-to-end company incorporation services, including entity structuring, regulatory approvals, and documentation support. Whether setting up domestic or foreign entities, we ensure full compliance with local laws and facilitate a smooth registration process.",
  },
  {
    question: "Can you help with tax disputes or litigation?",
    answer:
      "Absolutely. Our team handles IT appeals, IT scrutiny, and tax litigation services. We represent clients before tax authorities, appellate tribunals, and courts, ensuring strategic advocacy and timely resolution for disputes related to Income Tax, GST, and international taxation.",
  },
  {
    question: "What makes your team qualified?",
    answer:
      "Our professionals are highly experienced Chartered Accountants and tax experts with extensive knowledge across industries. We combine technical expertise with practical insights, ensuring our clients receive accurate, actionable advice and effective compliance solutions.",
  },
  {
    question: "Do you offer ongoing support after service delivery?",
    answer:
      "Yes, we provide continuous support for taxation, compliance, and accounting services. Our team remains available for consultations, updates, and advisory needs to ensure your business maintains compliance and optimizes its financial operations.",
  },
  {
    question: "How transparent are your fees?",
    answer:
      "We offer clear and competitive pricing tailored to each client’s requirements. All fees are communicated upfront with no hidden costs. We provide detailed proposals, ensuring you understand the scope of work and associated costs before engagement.",
  },
];

const FaqItem = ({ question, answer, isOpen, onClick }: any) => {
  return (
    <div className="py-4 border-b border-gray-200 cursor-pointer">
      <h3
        onClick={onClick}
        className="flex items-center justify-between text-lg font-normal text-gray-900"
      >
        {question}
        <span className="font-bold text-gray-900">{isOpen ? "−" : "+"}</span>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="mt-2 overflow-hidden text-gray-700"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


// Animation Variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const slideInVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  whileHover: {
    scale: 1.03,
    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

const HomePage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Add instant scrolling
  useEffect(() => {
    // Add event listeners to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const href = anchor.getAttribute("href");
        if (href) {
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            const yOffset = -80; // Offset for fixed header
            const y =
              targetElement.getBoundingClientRect().top +
              window.pageYOffset +
              yOffset;
            window.scrollTo({ top: y, behavior: "auto" });
          }
        }
      });
    });

    // Clean up
    return () => {
      anchorLinks.forEach((anchor) => {
        anchor.removeEventListener("click", () => { });
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Bolia & Co. | Chartered Accountants</title>
        <meta
          name="description"
          content="Bolia & Co. provides expert Chartered Accountancy services in Income Tax, GST, VAT & ST, TDS & TCS, Company Incorporation, Compliance, and Tax Litigation. We ensure efficient tax management and full statutory compliance for businesses and individuals."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="Bolia & Co., Chartered Accountants, Income Tax, GST, VAT, TDS, TCS, Company Incorporation, Compliance Services, Tax Litigation, CA firm, Tax advisory, Accounting services"
        />
        <meta
          property="og:title"
          content="Bolia & Co. | Professional Chartered Accountancy Services"
        />
        <meta
          property="og:description"
          content="Expert CA firm providing Income Tax, GST, VAT & ST, TDS & TCS, Company Incorporation, Compliance, and Tax Litigation services to businesses and individuals."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://boliaandco.com" />
        <meta
          property="og:image"
          content="https://boliaandco.com/og-image.jpg"
        />
        <meta property="og:site_name" content="Bolia & Co." />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Bolia & Co. | Trusted Chartered Accountants"
        />
        <meta
          name="twitter:description"
          content="Providing comprehensive CA services including Income Tax, GST, VAT & ST, TDS & TCS, Company Incorporation, Compliance, and Tax Litigation."
        />
        <meta
          name="twitter:image"
          content="https://boliaandco.com/og-image.jpg"
        />

        <meta name="geo.region" content="IN-PB" />
        <meta name="geo.placename" content="Your City, State" />
        <meta name="geo.position" content="00.0000;00.0000" />
        <meta name="ICBM" content="00.0000, 00.0000" />

        <link rel="canonical" href="https://boliaandco.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Navbar />

      {/* Hero Section */}
     {/* Hero Section */}
      <header
        id="home"
        className="bg-white container mx-auto px-6 lg:px-8 pt-32 pb-32 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[90vh]"
      >
        {/* Floating icons */}
        <FloatingSVGGroup
          elements={[
            { icon: <Rocket className="text-indigo-500" />, position: { top: "5%", left: "15%" }, size: "lg", opacity: 0.7, delay: 0 },
            { icon: <Zap className="text-yellow-500" />, position: { top: "25%", right: "20%" }, size: "md", opacity: 0.6, delay: 2 },
            { icon: <Wand2 className="text-blue-500" />, position: { bottom: "10%", left: "40%" }, size: "lg", opacity: 0.7, delay: 1 },
          ]}
        />

        {/* Full-width text */}
        <div className="relative z-10 max-w-3xl">
          <motion.h1
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            className="mb-4 text-sm font-semibold tracking-widest text-indigo-500 uppercase"
          >
            Bolia &amp; Co.
          </motion.h1>

          <motion.h1
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            className="mb-6 text-5xl font-bold leading-tight text-gray-900 sm:text-6xl font-heading"
          >
            Chartered Accountants for
            <br className="hidden sm:block" /> Growth &amp; Compliance
          </motion.h1>

          <motion.p
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            className="mb-10 text-lg leading-relaxed text-gray-600"
          >
            Trusted advisors for taxation, audit &amp; assurance, accounting, and business compliance.
            We turn complex regulations into clear, actionable guidance—so you can grow with confidence.
          </motion.p>

          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="py-5 font-semibold text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:shadow-xl px-9"
              >
                <span className="flex items-center gap-2">
                  Book a Consultation
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    →
                  </motion.span>
                </span>
              </Button>
            </motion.a>

            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="py-5 font-semibold text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:shadow-xl px-9"
              >
                <Link href="/Brochure.pdf" target="_blank">
            Download Brochure
          </Link>
              </Button>
            </motion.a>
          </motion.div>
        </div>
      </header>




      {/* About Us Section */}
      {/* About Us Section */}
      <section
        id="about"
        className="container relative px-6 mx-auto overflow-hidden bg-white lg:px-8 py-36"
      >
        <FloatingSVGGroup
          elements={[
            {
              icon: <Gem className="text-blue-300/40" />,
              position: { top: "20%", right: "15%" },
              size: "xl",
              opacity: 0.8,
              delay: 0.3,
            },
            {
              icon: <Rocket className="text-blue-400/40" />,
              position: { bottom: "15%", left: "15%" },
              size: "lg",
              opacity: 0.8,
              delay: 0.7,
            },
            {
              icon: <BrainCircuit className="text-purple-300/40" />,
              position: { top: "40%", left: "25%" },
              size: "md",
              opacity: 0.7,
              delay: 0.5,
            },
          ]}
        />

        <div className="relative z-10 flex flex-col items-center gap-16 lg:flex-row">
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 text-4xl font-bold text-gray-900 md:text-4xl font-heading">
              <span className="bg-clip-text">
                About Bolia & Co.
              </span>
            </h2>
            <div className="w-32 h-1 mb-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>

            <div className="space-y-6 text-lg text-gray-700">
              <p>
                Bolia & Co. is a professional chartered accountancy firm specializing in taxation, audit, accounting, and business compliance. We help businesses navigate complex financial regulations with confidence.
              </p>
              <p>
                Our team of experienced chartered accountants provides accurate, reliable, and ethical advice tailored to your business needs, ensuring transparency and compliance at every step.
              </p>
              <p>
                We are committed to building long-term client relationships, offering practical solutions, and supporting growth through informed financial decisions.
              </p>
              <p className="text-xl font-semibold text-gray-900">
                Our Core Values:
              </p>
              <ul className="pl-6 space-y-2 text-gray-700 list-disc">
                <li>Integrity and professionalism in all engagements</li>
                <li>Transparent and client-focused solutions</li>
                <li>Accuracy and attention to detail in financial reporting</li>
                <li>Timely advice and proactive compliance support</li>
                <li>Dedicated to helping clients grow and succeed</li>
              </ul>
            </div>

            <div className="mt-10">
              <a href="#services">
                <Button
                  className="px-8 py-4 font-semibold text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:shadow-xl"
                  onClick={(e) => {
                    e.preventDefault();
                    const targetElement = document.getElementById("services");
                    if (targetElement) {
                      const yOffset = -80;
                      const y =
                        targetElement.getBoundingClientRect().top +
                        window.pageYOffset +
                        yOffset;
                      window.scrollTo({ top: y, behavior: "auto" });
                    }
                  }}
                >
                  Explore Our Services
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative group">
              <div className="absolute inset-0 transition-all duration-500 bg-white border border-gray-200 rounded-2xl group-hover:border-blue-300"></div>
              <div className="relative p-8 bg-white shadow-lg rounded-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Zap className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                    Our Commitment
                  </h3>
                </div>

                <div className="space-y-8">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-4 p-4 transition-all duration-300 cursor-pointer rounded-xl hover:bg-blue-50"
                  >
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Zap className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">
                        Trusted Expertise
                      </h4>
                      <p className="mt-2 text-gray-700">
                        Our team of chartered accountants delivers accurate, reliable, and ethical advice.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-4 p-4 transition-all duration-300 cursor-pointer rounded-xl hover:bg-purple-50"
                  >
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <BrainCircuit className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">
                        Compliance & Accuracy
                      </h4>
                      <p className="mt-2 text-gray-700">
                        We ensure your business meets all statutory requirements with precision and clarity.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-4 p-4 transition-all duration-300 cursor-pointer rounded-xl hover:bg-pink-50"
                  >
                    <div className="p-3 bg-pink-100 rounded-xl">
                      <Gem className="w-5 h-5 text-pink-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">
                        Client-Focused Solutions
                      </h4>
                      <p className="mt-2 text-gray-700">
                        We provide practical advice tailored to your business, supporting growth and success.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-4 p-4 transition-all duration-300 cursor-pointer rounded-xl hover:bg-blue-50"
                  >
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Users className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">
                        Long-Term Partnership
                      </h4>
                      <p className="mt-2 text-gray-700">
                        We build lasting relationships, offering ongoing support for your evolving business needs.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>




      {/* Services Section */}
      {/* Services Section */}
      <section
        id="services"
        className="container relative px-6 py-24 mx-auto overflow-hidden bg-white lg:px-8"
      >
        {/* Floating SVGs */}
        <FloatingSVGGroup
          elements={[
            {
              icon: <Cpu className="text-blue-600/70" />,
              position: { top: "10%", left: "5%" },
              size: "xl",
              opacity: 0.7,
              delay: 0.5,
            },
            {
              icon: <Code2 className="text-indigo-400/70" />,
              position: { bottom: "20%", right: "5%" },
              size: "lg",
              opacity: 0.7,
              delay: 0.9,
            },
            {
              icon: <Layers3 className="text-green-500/70" />,
              position: { bottom: "40%", left: "30%" },
              size: "md",
              opacity: 0.6,
              delay: 1.3,
            },
          ]}
        />

        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16 relative z-[1] font-heading">
          Our Services
          <div className="absolute bottom-[-16px] left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </h2>

        {/* Services Grid 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-[1]">
          {services.slice(0, 4).map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="p-8 transition-all duration-300 bg-white border border-gray-200 shadow-lg cursor-pointer rounded-2xl hover:shadow-xl"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">{service.title}</h3>
              <p className="text-gray-700">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>



      {/* Why Choose Us Section */}
      <section
        id="why-choose-us"
        className="container px-6 py-24 mx-auto bg-white lg:px-8"
      >
        <h2 className="relative mb-16 text-4xl font-bold text-center text-gray-900 font-heading">
          Why Choose Us?
          <div className="absolute bottom-[-16px] left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Card 1 */}
          <div className="p-8 text-center transition-all border shadow-lg cursor-pointer rounded-2xl hover:shadow-xl ">
            <div className="flex items-center justify-center mb-6">
              <Calculator className="w-12 h-12 text-blue-500" />
            </div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              Income Tax | GST | VAT & ST | TDS & TCS
            </h3>
            <p className="leading-relaxed text-gray-700">
              Our team provides Income Tax, GST, VAT & ST and TDS & TCS services,
              offering comprehensive solutions for registration, compliance,
              advisory, and regulatory filings. Our expertise ensures efficient tax
              management and full statutory compliance for businesses across sectors.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 text-center transition-all border shadow-lg cursor-pointer rounded-2xl hover:shadow-xl">
            <div className="flex items-center justify-center mb-6">
              <Building className="w-12 h-12 text-green-500" />
            </div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              Company Incorporation | Compliance Services
            </h3>
            <p className="leading-relaxed text-gray-700">
              We provide end-to-end company incorporation services, including entity
              structuring, regulatory approvals, and documentation support. Our
              expertise covers domestic and foreign company setup, ensuring full
              compliance with local laws and seamless business registration.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 transition-all border shadow-lg cursor-pointer rounded-2xl hover:shadow-xl">
            <div className="flex items-center justify-center mb-6">
              <Gavel className="w-12 h-12 text-purple-500" />
            </div>
            <h3 className="items-center mb-4 text-xl font-semibold text-center text-gray-900">
              IT Appeals | IT Scrutiny | Tax Litigation Services
            </h3>
            <p className="leading-relaxed text-center text-gray-700">
              We provide end-to-end tax litigation services, including
              representation before tax authorities, appellate tribunals, and courts.
              Our expertise spans income tax, GST, and international tax disputes,
              with a focus on timely resolution and strategic advocacy.
            </p>
          </div>
        </div>
      </section>


      {/* Team Section */}
      <section
        id="team"
        className="container relative px-6 mx-auto overflow-hidden bg-white lg:px-8 py-36"
      >
        <FloatingSVGGroup
          elements={[
            {
              icon: <UserCircle2 className="text-pink-400/50" />,
              position: { bottom: "10%", right: "5%" },
              size: "xl",
              opacity: 0.5,
              delay: 0.3,
            },
            {
              icon: <Users className="text-blue-400/50" />,
              position: { top: "15%", left: "8%" },
              size: "xl",
              opacity: 0.5,
              delay: 0.6,
            },
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative z-0 mb-20 text-center"
        >
          <h2 className="relative z-10 inline-block mb-6 text-4xl font-bold text-gray-900 md:text-5xl font-heading">
            Our Team
          </h2>
          <div className="w-32 h-2 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          <p className="max-w-3xl mx-auto mt-8 text-xl text-gray-700">
            Meet the professionals behind our firm. With years of expertise in
            Income Tax, GST, VAT, TDS, and corporate compliance, our team ensures
            precise and strategic financial guidance for businesses and individuals.
          </p>
        </motion.div>

        <div className="relative z-0 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.name}
              member={{
                ...member,
                // ensure text is visible on white background
                role: member.role,
                name: member.name,
                image: member.image,
                // description: member.description,
              }}
            />
          ))}
        </div>
      </section>


      {/* Testimonials */}

      <section id="testimonials" className="relative py-24 overflow-hidden bg-white">
        <div className="container relative z-0 px-6 mx-auto lg:px-8">
          <FloatingSVGGroup
            elements={[
              {
                icon: <Users className="text-purple-400/30" />,
                position: { top: "10%", right: "5%" },
                size: "lg",
                opacity: 0.5,
                delay: 0.3,
              },
              {
                icon: <Gem className="text-blue-400/30" />,
                position: { bottom: "15%", left: "8%" },
                size: "md",
                opacity: 0.5,
                delay: 0.5,
              },
            ]}
          />

          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative z-0 mb-16 text-center"
          >
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-5xl">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Clients Say</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-700">
              Hear from Businesses and Individuals who trust us with our services.
            </p>
            <div className="w-20 h-1 mx-auto mt-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          </motion.div>

          <div className="relative z-0 grid grid-cols-1 gap-8 mt-16 cursor-pointer md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl"
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="relative w-16 h-16 overflow-hidden border-2 border-gray-200 rounded-full">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          loading="lazy"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-gray-600">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-700">{testimonial.quote}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section
        id="faq"
        className="bg-white py-24 rounded-b-[4rem] border-b border-gray-200 relative overflow-hidden"
      >
        <div className="container px-6 mx-auto lg:px-8">
          <FloatingSVGGroup
            elements={[
              {
                icon: <Boxes className="text-blue-400/50" />,
                position: { top: "20%", right: "10%" },
                size: "xl",
                opacity: 0.5,
                delay: 0.7,
              },
              {
                icon: <Search className="text-purple-400/50" />,
                position: { bottom: "25%", left: "10%" },
                size: "lg",
                opacity: 0.5,
                delay: 0.4,
              },
            ]}
          />

          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-5xl">
              Frequently <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Asked Questions</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-700">
              Find answers to common questions about our services and processes.
            </p>
            <div className="w-20 h-1 mx-auto mt-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaqIndex === index}
                onClick={() => toggleFaq(index)}
                questionClassName="text-gray-900 font-semibold"
                answerClassName="text-gray-700"
              />
            ))}
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="relative py-24 overflow-hidden bg-gray-900">
        <div className="container px-6 mx-auto lg:px-8">
          {/* Floating SVGs */}
          <FloatingSVGGroup
            elements={[
              {
                icon: <Briefcase className="text-blue-400/50" />,
                position: { top: "15%", right: "10%" },
                size: "lg",
                opacity: 0.6,
                delay: 0.5,
              },
              {
                icon: <Laptop2 className="text-purple-500/50" />,
                position: { bottom: "10%", left: "5%" },
                size: "md",
                opacity: 0.6,
                delay: 0.7,
              },
            ]}
          />

          {/* Heading */}
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">
              Connect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">with us </span>
            </h2>
            <p className="max-w-2xl mx-auto mb-6 text-lg text-gray-400">
              Start your journey with us—connect now.
            </p>
            <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          </motion.div>

          {/* Contact Info & Form */}
          <div className="flex items-center justify-center">
            {/* Left Column: Contact Info */}
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <ContactInfo />
            </motion.div>

            {/* /* Right Column: Contact Form */}
            {/* <motion.div
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="w-full max-w-md p-8 mx-auto shadow-lg md:mx-0 bg-gray-800/70 backdrop-blur-md rounded-2xl"
            > */}
              {/* <ContactForm /> */}
            {/* </motion.div> */} 
          </div>
        </div>
      </section>


      {/* Footer - Enhanced with animated background text */}
      {/* Footer - Bolia & Co. */}
      <footer className="relative py-16 bg-gray-900 text-white min-h-[320px] flex items-center  border-t border-gray-800 overflow-hidden">

        {/* Animated background text */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
            className="flex items-center h-full whitespace-nowrap"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="text-[15vw] font-black text-white/[0.03] tracking-tight select-none leading-none h-full flex items-center"
              >
                BOLIA&CO.&nbsp;
              </span>
            ))}
          </motion.div>
        </div>

        {/* Floating SVG decorations */}
        <FloatingSVGGroup
          elements={[
            { icon: <Rocket className="text-blue-400/60" />, position: { bottom: "60%", left: "5%" }, size: "md", opacity: 0.3, delay: 0.3 },
            { icon: <BrainCircuit className="text-purple-400/60" />, position: { top: "30%", right: "8%" }, size: "md", opacity: 0.3, delay: 0.7 },
          ]}
          maxElements={2}
        />

        {/* Footer content */}
        <div className="container relative z-10 items-center justify-center px-6 mx-auto text-center lg:px-8">
          <div className="grid items-start grid-cols-1 gap-16 md:grid-cols-2">

            {/* Branding & Socials */}
            <div className="text-center md:text-left">
              <motion.div
                className="flex items-center justify-center mb-4 md:justify-start"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.span
                  className="relative inline-block text-4xl font-bold tracking-tighter text-center text-transparent cursor-pointer bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-heading"
                >
                  Bolia<span className="font-light">&Co.</span>
                </motion.span>
              </motion.div>
              <p className="items-center max-w-xs mt-2 ml-10 font-semibold text-center text-gray-400 md:text-start md:ml-0">
                Established - 2001 <br /> Founder - Gajendra Singh Bolia <br /> Sphere - Charted Accountants (Since 1997) <br /> HeadQuaters - Gujarat (India) 
              </p>
              <motion.div className="flex justify-center mt-6 space-x-6 md:justify-start">
                <motion.a href="https://www.facebook.com/boliaco" whileHover={{ y: -3, scale: 1.2 }} className="text-gray-400 hover:text-blue-400">
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a href="https://x.com/boliaco" whileHover={{ y: -3, scale: 1.2 }} className="text-gray-400 hover:text-blue-400">
                  <X className="w-5 h-5" />
                </motion.a>
                <motion.a href="https://www.linkedin.com/company/boliaco" whileHover={{ y: -3, scale: 1.2 }} className="text-gray-400 hover:text-blue-400">
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              </motion.div>
              <p className="mt-6 text-sm text-gray-400">&copy; 2025 Bolia & Co. All rights reserved.</p>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h4 className="mb-6 text-xl font-semibold text-white">Quick Links</h4>
              <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                {[
                  { text: "Home", href: "#home" },
                  { text: "Services", href: "#services" },
                  { text: "Why Choose Us", href: "#why-choose-us" },
                  { text: "Team", href: "#team" },
                  { text: "Testimonials", href: "#testimonials" },
                  { text: "FAQ", href: "#faq" },
                  { text: "Contact", href: "#contact" },
                  { text: "Email Us", href: "mailto:associatesbolia@gmail.com" },
                ].map((link, i) => (
                  <motion.a key={i} href={link.href} whileHover={{ x: 5, color: "#60A5FA" }} className="text-gray-400 hover:text-white">
                    {link.text}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            {/* <div className="text-center md:text-right">
              <h4 className="mb-6 text-xl font-semibold text-white">Contact Information</h4>
              <motion.div className="space-y-5 text-gray-400">
                <motion.div className="flex items-center justify-center gap-3 md:justify-end" whileHover={{ x: -5, color: "#60A5FA" }}>
                  <div className="p-2 rounded-full bg-blue-500/10"><MapPin className="w-5 h-5 text-blue-400" /></div>
                  <span>Office 09, P 597, Ward 12 C, Gandhidham, Gujarat INDIA 370201</span>
                </motion.div>
                <motion.div className="flex items-center justify-center gap-3 md:justify-end" whileHover={{ x: -5, color: "#60A5FA" }}>
                  <div className="p-2 rounded-full bg-blue-500/10"><Phone className="w-5 h-5 text-blue-400" /></div>
                  <span><a href="tel:+919876543210">+91 2836233033 / +91 9104402201</a></span>
                </motion.div>
                <motion.div className="flex items-center justify-center gap-3 md:justify-end" whileHover={{ x: -5, color: "#60A5FA" }}>
                  <div className="p-2 rounded-full bg-blue-500/10"><Mail className="w-5 h-5 text-blue-400" /></div>
                  <span><a href="mailto:contact@boliaco.com">associatesbolia@gmail.com</a></span>
                </motion.div>
              </motion.div>
            </div> */}
          </div>
        </div>
      </footer>

    </div>
  );
};
export default HomePage;