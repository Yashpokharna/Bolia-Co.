import React from "react";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { motion } from "framer-motion";

// Enhanced contact info component with better visual design
const ContactInfo = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="space-y-8 text-gray-300"
    >
      <h3 className="pb-4 mb-6 text-2xl font-semibold text-center text-white border-b border-white/10">
        Contact Information
      </h3>
      <motion.div 
        className="flex items-start gap-4 group"
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="p-3 transition-colors rounded-full bg-blue-500/10 group-hover:bg-blue-500/20">
          <MapPin className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <p className="mb-1 font-medium text-white">Address</p>
          <p className="transition-colors group-hover:text-blue-400">Office 09, P 597, Ward 12 C, Gandhidham, Gujarat INDIA 370201</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="flex items-start gap-4 group"
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="p-3 transition-colors rounded-full bg-purple-500/10 group-hover:bg-purple-500/20">
          <Phone className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <p className="mb-1 font-medium text-white">Phone</p>
          <a 
            href="tel:+977 9817996672" 
            aria-label="Call +977 9817996672"
            className="transition-colors group-hover:text-purple-400"
          >
            +91 2836233033 / +91 9104402201
          </a>
        </div>
      </motion.div>
      
      <motion.div 
        className="flex items-start gap-4 group"
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="p-3 transition-colors rounded-full bg-green-500/10 group-hover:bg-green-500/20">
          <Mail className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <p className="mb-1 font-medium text-white">Email</p>
          <a
            href="mailto:admin@koshilabs.com"
            aria-label="Email admin@koshilabs.com"
            className="transition-colors group-hover:text-green-400"
          >
            associatesbolia@gmail.com
          </a>
        </div>
      </motion.div>
      
      <motion.div 
        className="flex items-start gap-4 group"
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="p-3 transition-colors rounded-full bg-yellow-500/10 group-hover:bg-yellow-500/20">
          <Globe className="w-5 h-5 text-yellow-400" />
        </div>
        <div>
          <p className="mb-1 font-medium text-white">Website</p>
          <p className="transition-colors group-hover:text-yellow-400">www.bolia.co.in</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactInfo;
