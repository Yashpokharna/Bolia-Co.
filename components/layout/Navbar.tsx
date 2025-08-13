import { useRef, useState, useEffect } from "react";
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
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 70,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      navItems.forEach((item) => {
        const section = document.querySelector(item.href);
        if (section) {
          const sectionTop = section.getBoundingClientRect().top + window.scrollY;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(item.href.substring(1));
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <span className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-heading">
            Bolia<span className="font-light"> & Co.</span>
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
                "px-3 py-2 text-sm md:text-base font-medium transition-all duration-200 rounded-lg",
                activeSection === item.href.substring(1)
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
                  : "text-gray-800 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500"
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
