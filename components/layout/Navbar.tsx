import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef(null);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 70,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.nav
      ref={navRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 w-full bg-white shadow-md"
    >
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#home");
          }}
        >
          <span className="text-2xl font-semibold text-indigo-700 -tight font-heading">
            Bolia<span className=" text-gray-950">&nbsp;&amp; Co.</span>
          </span>
        </a>

        {/* Menu */}
        <div className="flex items-center space-x-2">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className={cn(
                "relative px-3 py-2 text-sm md:text-base font-medium rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300",
                "text-gray-800 hover:text-indigo-600",
                "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-indigo-600 after:transition-all after:duration-300 after:w-0 hover:after:w-full"
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
