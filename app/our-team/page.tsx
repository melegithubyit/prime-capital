"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, Linkedin, Mail, Send, X, Youtube } from "lucide-react";
import { FaTiktok, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

import MemberModal from "@/components/Member";
import { useState } from "react";
// import { FaTiktok, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

type SocialLink = { platform: string; url: string };
type BoardMember = {
  name: string;
  role: string;
  edu: string;
  img: string;
  socialLinks?: SocialLink[];
  qualifications?: string;
  occupation?: string;
  bio?: string;
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { margin: "-50px" },
  transition: { duration: 0.6, ease: EASE },
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: {},
  transition: { staggerChildren: 0.2 },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { margin: "-50px" },
  transition: { duration: 0.5, ease: EASE },
};

const boardMembers = [
  {
    name: "Mukemil Bedru",
    role: "Board Chairperson",
    edu: "MBA • BSc",
    img: "/mukemil.png",
    
    qualifications: "MBA (AAU), BA in Management (Haramaya University)",
    occupation: "Managing Partner, Elegance Group",
    bio: "17+ years in consulting, finance, and governance. Former Chair, Hijra Bank. Expertise in corporate strategy and financial sector leadership.",
  },
  {
    name: "Tewdros M. Delelgn",
    role: "D/Board Chairman",
    edu: "MBA • BA",
    img: "/tewdros.png",
    
    qualifications: "MBA (AAU), BA in Management (Haramaya University)",
    occupation: "Managing Partner, Elegance Group",
    bio: "17+ years in consulting, finance, and governance. Former Chair, Hijra Bank. Brings extensive expertise in corporate strategy and financial sector leadership.",
  },
  {
    name: "Habib Mohammed",
    role: "Executive Board Director",
    edu: "MSc • BSc",
    img: "/habib.png",
    
  },
  {
    name: "Behailu Aregahgn",
    role: "Board Secretary",
    edu: "MBA, BA in Management",
    img: "/behailu.jpg",
    
  },
  {
    name: "Kalkidan Niguse",
    role: "Board Director",
    edu: "MBA, BA in Management",
    img: "/kalkidan.png",
    
  },
  {
    name: "Banteyrga Kebede",
    role: "Board Director",
    edu: "MBA, BA in Management",
    img: "/banteyrga.png",
    
  }
];

const execMembers = [
  {
    name: "Habib Mohammed",
    role: "Chief Executive Officer",
    edu: "FCCA, MBA (University of Greenwich), BA (Jimma University)",
    img: "/habib.png",
    
  },
  {
    name: "Haileleul Kassa",
    role: "Chief Risk and Compliance Officer",
    edu: "",
    img: "/haileleul.jpg",
    
  },
  {
    name: "Yonas Alemayehu",
    role: "CTO (Chief Technology Officer)",
    edu: "",
    img: "/placeholder.png",
    
  },
  {
    name: "Muluen Asrat",
    role: "Chief Financial Officer",
    edu: "",
    img: "/placeholder.png",
    
  },
  {
    name: "Getahun Worku",
    role: "Legal Advisor",
    edu: "",
    img: "/placeholder.png",
    
  },
];

const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "linkedin":
      return <Linkedin size={18} />;
    case "instagram":
      return <Instagram size={18} />;
    case "twitter":
      return <FaXTwitter size={18} />;
    case "youtube":
      return <Youtube size={18} />;
    case "telegram":
      return <Send size={18} />;
    case "facebook":
      return <Facebook size={18} />;
    case "whatsapp":
      return <FaWhatsapp size={18} />;
    case "tiktok":
      return <FaTiktok size={18} />;
    case "email":
      return <Mail size={18} />;
    default:
      return null;
  }
};

export default function OurTeamPage() {
  const [selected, setSelected] = useState<BoardMember | null>(null);

  return (
    <main className="min-h-screen w-full bg-white text-gray-900 overflow-x-hidden">
      {/* Header */}
      <section className="py-16 px-6 md:px-12 text-center">
        <motion.div {...fadeInUp}>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Meet the people behind Prime Capital S.C. Our leadership and staff are dedicated to driving Ethiopia's financial future through integrity, innovation, and excellence.
          </p>
        </motion.div>
      </section>

      {/* Board of Directors */}
      <section className="py-20 pt-10 px-6 md:px-12 bg-white">
        <motion.div {...fadeInUp} className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Board of Directors
          </h2>
          <p className="text-md text-[#504785] mt-4 max-w-2xl mx-auto leading-tight">
            Our distinguished board brings directors of combined expertise in
            finance, technology, and strategic leadership.
          </p>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="mt-10 grid gap-8 md:grid-cols-3 sm:grid-cols-1 max-w-5xl mx-auto"
        >
          {boardMembers.map((m, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => setSelected(m)}
              className="cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl overflow-hidden flex flex-col hover:border-[#0E0066]"
            >
              {/* Image */}
              <div className="relative w-full h-56 overflow-hidden">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-full object-fill transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-3 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-[#0E0066] text-lg">
                    {m.name}
                  </h3>
                  <p className="text-sm text-[#2014FF] font-semibold mt-1">
                    {m.role}
                  </p>
                  <p className="text-[13px] text-[#504785] mt-2">{m.edu}</p>
                </div>

                {/* <div className="border-t border-gray-200 mt-2 mb-1"></div>

                {m.socialLinks && m.socialLinks.length > 0 && (
                  <div className="flex gap-3 mt-2">
                    {m.socialLinks.map((link) => (
                      <button
                        key={link.platform}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(link.url, "_blank", "noopener");
                        }}
                        className="p-2 bg-[#EEF2FF] text-[#0E0066] rounded-full hover:bg-[#0E0066] hover:text-white transition"
                      >
                        {getPlatformIcon(link.platform)}
                      </button>
                    ))}
                  </div>
                )} */}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Executive Management */}
      <section className="py-20 px-6 md:px-12 bg-[#F9FAFB]">
        <motion.div {...fadeInUp} className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Founding Members
          </h2>
          <p className="text-md text-[#504785] mt-2 max-w-2xl mx-auto">
            Experienced leaders driving operational excellence and strategic
            innovation.
          </p>
        </motion.div>

        <motion.div
          {...scaleIn}
          className="max-w-5xl mx-auto mt-10 rounded-2xl overflow-hidden shadow-lg"
        >
          <img
            src="/grouppic.jpg"
            alt="Executive Team"
            className="w-full object-cover"
          />
        </motion.div>

        <div className="mt-40 text-center max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Executive Management</h2>
          <p className="text-md text-[#504785] mt-2 max-w-2xl mx-auto leading-tight">
            Experienced leaders driving operational excellence and strategic innovation.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <motion.div
            key={execMembers[0].name}
            variants={fadeInUp}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            // onClick={() => setSelected(execMembers[0])}
            className="cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl overflow-hidden flex flex-col hover:border-[#0E0066] w-full max-w-sm"
          >
            {/* Image */}
            <div className="relative w-full h-56 overflow-hidden">
              <img
                src={execMembers[0].img}
                alt={execMembers[0].name}
                className="w-full h-full object-fill transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="p-3 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-[#0E0066] text-lg">
                  {execMembers[0].name}
                </h3>
                <p className="text-sm text-[#2014FF] font-semibold mt-1">
                  {execMembers[0].role}
                </p>
                {/* <p className="text-[13px] text-[#504785] mt-2">{execMembers[0].edu}</p> */}
              </div>

              {/* <div className="border-t border-gray-200 mt-2 mb-1"></div>

              {execMembers[0].socialLinks && execMembers[0].socialLinks.length > 0 && (
                <div className="flex gap-3 mt-2">
                  {execMembers[0].socialLinks.map((link) => (
                    <button
                      key={link.platform}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(link.url, "_blank", "noopener");
                      }}
                      className="p-2 bg-[#EEF2FF] text-[#0E0066] rounded-full hover:bg-[#0E0066] hover:text-white transition"
                    >
                      {getPlatformIcon(link.platform)}
                    </button>
                  ))}
                </div>
              )} */}
            </div>
          </motion.div>
        </div>

        <motion.div
          {...staggerContainer}
          className="mt-10 grid gap-8 sm:grid-cols-1 md:grid-cols-4 max-w-7xl mx-auto"
        >
          {execMembers.slice(1).map((m, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              // onClick={() => setSelected(m)}
              className="cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl overflow-hidden flex flex-col hover:border-[#0E0066]"
            >
              {/* Image */}
              <div className="relative w-full h-56 overflow-hidden">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-full object-fill transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-3 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-[#0E0066] text-lg">
                    {m.name}
                  </h3>
                  <p className="text-sm text-[#2014FF] font-semibold mt-1">
                    {m.role}
                  </p>
                  <p className="text-[13px] text-[#504785] mt-2">{m.edu}</p>
                </div>

                {/* <div className="border-t border-gray-200 mt-2 mb-1"></div>

                {m.socialLinks && m.socialLinks.length > 0 && (
                  <div className="flex gap-3 mt-2">
                    {m.socialLinks.map((link) => (
                      <button
                        key={link.platform}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(link.url, "_blank", "noopener");
                        }}
                        className="p-2 bg-[#EEF2FF] text-[#0E0066] rounded-full hover:bg-[#0E0066] hover:text-white transition"
                      >
                        {getPlatformIcon(link.platform)}
                      </button>
                    ))}
                  </div>
                )} */}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* <MemberModal
        open={!!selected}
        member={selected}
        onClose={() => setSelected(null)}
      /> */}
    </main>
  );
}
