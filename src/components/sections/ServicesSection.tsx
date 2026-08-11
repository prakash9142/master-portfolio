import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { FaChevronRight, FaCode, FaRocket, FaPalette, FaCogs } from "react-icons/fa";

interface ServiceItem {
  id: string;
  name: string;
  price: string;
  tagline: string;
  items: string[];
  color: string;
  icon: React.ReactNode;
  deliverables: string[];
  timeline: string;
}

const ServicesSection = () => {
  const [expandedRow, setExpandedRow] = useState<string | null>("01");
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const services: ServiceItem[] = [
    {
      id: "01",
      name: "Web Design & Dev",
      price: "₹39,999",
      tagline: "Stunning websites that convert visitors into clients",
      icon: <FaCode />,
      items: [
        "Custom responsive designs for startups and SaaS products",
        "WebGL 3D elements & smooth interactive motion scripting",
        "Full technical SEO architecture & Google Search Console setup",
      ],
      deliverables: ["Figma mockup", "Mobile-first build", "SEO config", "Deployment"],
      timeline: "5–7 days",
      color: "#2dd4bf",
    },
    {
      id: "02",
      name: "SaaS MVP Development",
      price: "₹1,19,999",
      tagline: "Ship your product idea to market in weeks, not months",
      icon: <FaRocket />,
      items: [
        "Rapid prototype construction and database modeling",
        "Full-stack React (Vite/Next.js) & Node.js backend setup",
        "Secure database & UPI/Razorpay custom payment gateways",
      ],
      deliverables: ["Architecture plan", "Frontend + API", "Auth system", "Payment gateway"],
      timeline: "2–3 weeks",
      color: "#a855f7",
    },
    {
      id: "03",
      name: "Interactive UI/UX Design",
      price: "₹24,999",
      tagline: "Pixel-perfect interfaces users love to interact with",
      icon: <FaPalette />,
      items: [
        "High-converting landing page layouts and semantic grids",
        "Figma wireframes, design systems and interactive prototypes",
        "Modern branding style sheets, custom assets & logo packages",
      ],
      deliverables: ["Wireframes", "Design system", "Figma file", "Brand assets"],
      timeline: "4–5 days",
      color: "#f43f5e",
    },
    {
      id: "04",
      name: "Automation & API Systems",
      price: "₹29,999",
      tagline: "Eliminate manual work with smart backend automation",
      icon: <FaCogs />,
      items: [
        "No-code workflow integrations, data automation & cron jobs",
        "Custom CRM integrations, analytics trackers & dashboards",
        "Secure RESTful backend APIs, middleware & auth tokens",
      ],
      deliverables: ["API docs", "Automation scripts", "CRM integration", "Dashboard"],
      timeline: "5–6 days",
      color: "#fbbf24",
    },
  ];

  const handleBookService = (service: ServiceItem) => {
    const cleanPrice = service.price.replace(/[^\d]/g, "");
    const days = service.id === "02" ? 21 : service.id === "03" ? 5 : service.id === "04" ? 6 : 7;
    window.location.hash = `#contact?package=${encodeURIComponent(service.name)}&price=${cleanPrice}&days=${days}`;
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 55);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 sm:px-12 lg:px-16 max-w-5xl mx-auto"
      id="services"
    >
      <SectionHeading
        eyebrow="Services"
        title="Premium freelance services"
        description="Strategic development for founders, startups, and remote teams who need polished product delivery and fast go-to-market execution."
      />

      <motion.div
        className="mt-12 flex flex-col"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Glow line at top */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-1" />

        {services.map((service, index) => {
          const isOpen = expandedRow === service.id;
          const isHovered = hoveredRow === service.id;

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
              onMouseEnter={() => setHoveredRow(service.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {/* Left color accent bar */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
                style={{ backgroundColor: service.color }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{
                  scaleY: isOpen ? 1 : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Row background glow on hover/open */}
              <AnimatePresence>
                {(isOpen || isHovered) && (
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      background: `linear-gradient(90deg, ${service.color}08 0%, transparent 70%)`,
                      borderLeft: `1px solid ${service.color}20`,
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Row Header */}
              <button
                onClick={() => setExpandedRow(isOpen ? null : service.id)}
                className="w-full py-6 pl-6 pr-4 flex items-center justify-between text-left group focus:outline-none"
              >
                <div className="flex items-center gap-5 min-w-0">
                  {/* Number + Icon combo */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className="font-mono text-xs font-bold tracking-widest transition-colors duration-300"
                      style={{ color: isOpen ? service.color : "rgba(255,255,255,0.25)" }}
                    >
                      {service.id}
                    </span>
                    <motion.span
                      className="text-base"
                      style={{ color: isOpen ? service.color : "rgba(255,255,255,0.3)" }}
                      animate={{ scale: isOpen ? 1.2 : 1, rotate: isOpen ? 10 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {service.icon}
                    </motion.span>
                  </div>

                  {/* Title + tagline */}
                  <div className="min-w-0">
                    <h3
                      className="text-lg sm:text-xl md:text-2xl font-black tracking-tight transition-all duration-300"
                      style={{ color: isOpen ? "#ffffff" : "rgba(255,255,255,0.85)" }}
                    >
                      {service.name}
                    </h3>
                    <AnimatePresence>
                      {!isOpen && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs text-white/35 mt-0.5 hidden sm:block truncate"
                        >
                          {service.tagline}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Right: Price + Timeline badge + Toggle */}
                <div className="flex items-center gap-3 sm:gap-5 shrink-0 ml-4">
                  {/* Timeline badge - only show when open */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="hidden sm:block text-[10px] font-mono px-2.5 py-1 rounded-full border"
                        style={{
                          color: service.color,
                          borderColor: `${service.color}40`,
                          backgroundColor: `${service.color}10`,
                        }}
                      >
                        ⏱ {service.timeline}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  <span
                    className="font-mono text-xs sm:text-sm font-bold tracking-wider"
                    style={{ color: service.color }}
                  >
                    From {service.price}
                  </span>

                  {/* Animated toggle icon */}
                  <motion.div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-300"
                    animate={{
                      rotate: isOpen ? 90 : 0,
                      borderColor: isOpen ? `${service.color}50` : "rgba(255,255,255,0.1)",
                      backgroundColor: isOpen ? `${service.color}15` : "transparent",
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ color: isOpen ? service.color : "rgba(255,255,255,0.6)" }}
                  >
                    <FaChevronRight className="text-[10px]" />
                  </motion.div>
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pl-6 pr-4 pb-8 pt-1">
                      {/* Tagline */}
                      <motion.p
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-sm text-white/50 mb-5 pl-12 italic"
                      >
                        {service.tagline}
                      </motion.p>

                      <div className="flex flex-col md:flex-row gap-6 pl-12">
                        {/* Left: What's included */}
                        <div className="flex-1">
                          <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-3">
                            What's included
                          </p>
                          <ul className="flex flex-col gap-3">
                            {service.items.map((item, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + i * 0.07 }}
                                className="flex items-start gap-3 text-sm text-white/60"
                              >
                                <span
                                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                                  style={{ backgroundColor: service.color }}
                                />
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Right: Deliverables + CTA */}
                        <div className="md:w-56 flex flex-col gap-4">
                          <div>
                            <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-3">
                              Deliverables
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {service.deliverables.map((d, i) => (
                                <motion.span
                                  key={i}
                                  initial={{ opacity: 0, scale: 0.85 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.15 + i * 0.06 }}
                                  className="text-[10px] font-mono px-2.5 py-1 rounded-lg border"
                                  style={{
                                    color: "rgba(255,255,255,0.6)",
                                    borderColor: "rgba(255,255,255,0.08)",
                                    backgroundColor: "rgba(255,255,255,0.04)",
                                  }}
                                >
                                  {d}
                                </motion.span>
                              ))}
                            </div>
                          </div>

                          {/* CTA Button */}
                          <motion.button
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            onClick={() => handleBookService(service)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="mt-2 flex items-center justify-center gap-2 font-bold px-5 py-3 rounded-xl text-sm transition-all duration-200"
                            style={{
                              backgroundColor: `${service.color}15`,
                              border: `1px solid ${service.color}40`,
                              color: service.color,
                              boxShadow: `0 4px 20px ${service.color}10`,
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.backgroundColor = `${service.color}25`;
                              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 20px ${service.color}20`;
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.backgroundColor = `${service.color}15`;
                              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 20px ${service.color}10`;
                            }}
                          >
                            Discuss this project
                            <FaChevronRight className="text-[10px]" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom separator */}
              <div
                className="h-px w-full transition-all duration-300"
                style={{
                  background: isOpen
                    ? `linear-gradient(90deg, ${service.color}30, transparent)`
                    : "rgba(255,255,255,0.06)",
                }}
              />
            </motion.div>
          );
        })}

        {/* Bottom glow line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-1" />
      </motion.div>
    </section>
  );
};

export default ServicesSection;
