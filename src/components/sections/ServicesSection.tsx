import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { FaPlus, FaChevronRight } from "react-icons/fa";

interface ServiceItem {
  id: string;
  name: string;
  price: string;
  items: string[];
  color: string;
}

const ServicesSection = () => {
  const [expandedRow, setExpandedRow] = useState<string | null>("01");

  const services: ServiceItem[] = [
    {
      id: "01",
      name: "Web Design & Dev",
      price: "₹39,999",
      items: [
        "Custom responsive web designs suited for startups and SaaS products",
        "Stunning WebGL 3D elements & smooth interactive motion scripting",
        "Full technical SEO architecture & Google Search Console indexing setup"
      ],
      color: "#2dd4bf" // Cyan
    },
    {
      id: "02",
      name: "SaaS MVP Development",
      price: "₹1,19,999",
      items: [
        "Rapid prototype construction and structural database modeling",
        "Robust Full-stack React (Vite/Next.js) & Node.js backend setup",
        "Secure database mappings & UPI/Razorpay custom payment gateways"
      ],
      color: "#a855f7" // Purple
    },
    {
      id: "03",
      name: "Interactive UI/UX Design",
      price: "₹24,999",
      items: [
        "High-converting landing page layouts and semantic grids",
        "Figma wireframes, component design systems, and interactive prototypes",
        "Modern vibrant branding style sheets, custom assets, and logo packages"
      ],
      color: "#f43f5e" // Rose
    },
    {
      id: "04",
      name: "Automation & API Systems",
      price: "₹29,999",
      items: [
        "No-code workflow integrations, data automation, and server cron jobs",
        "Custom CRM integrations, analytics trackers, and dashboard metrics",
        "Highly secure RESTful backend APIs, middleware controls, and tokens"
      ],
      color: "#fbbf24" // Amber
    }
  ];

  const handleBookService = (service: ServiceItem) => {
    const cleanPrice = service.price.replace(/[^\d]/g, "");
    let days = 7;
    if (service.id === "02") days = 21;
    if (service.id === "03") days = 5;
    if (service.id === "04") days = 6;

    // Navigate with hash parameter to pre-fill contact form message
    window.location.hash = `#contact?package=${encodeURIComponent(service.name)}&price=${cleanPrice}&days=${days}`;
    
    // Manually scroll to contact section
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 55);
  };

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-16 max-w-5xl mx-auto" id="services">
      <SectionHeading
        eyebrow="Services"
        title="Premium freelance services"
        description="Strategic development for founders, startups, and remote teams who need polished product delivery and fast go-to-market execution."
      />

      {/* Accordion Stack Container */}
      <div className="mt-12 flex flex-col border-t border-white/10">
        {services.map((service) => {
          const isOpen = expandedRow === service.id;

          return (
            <div
              key={service.id}
              className="border-b border-white/10 transition-colors duration-300"
              style={{
                borderBottomColor: isOpen ? `${service.color}30` : "rgba(255, 255, 255, 0.1)"
              }}
            >
              {/* Row Header Button */}
              <button
                onClick={() => setExpandedRow(isOpen ? null : service.id)}
                className="w-full py-7 flex items-center justify-between text-left group transition-all duration-300 focus:outline-none"
              >
                <div className="flex items-center gap-6 md:gap-10 min-w-0">
                  {/* Service Index ID */}
                  <span
                    className="font-mono text-xs sm:text-sm font-bold tracking-widest transition-colors duration-300 shrink-0"
                    style={{ color: isOpen ? service.color : "rgba(255, 255, 255, 0.3)" }}
                  >
                    {service.id}
                  </span>

                  {/* Service Title */}
                  <h3
                    className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:group-hover:translate-x-4"
                    style={{ color: isOpen ? "#ffffff" : "" }}
                  >
                    {service.name}
                  </h3>
                </div>

                {/* Right Area (Price + Toggle Icon) */}
                <div className="flex items-center gap-4 sm:gap-8 shrink-0">
                  <span
                    className="font-mono text-xs sm:text-sm font-bold tracking-wider opacity-80"
                    style={{ color: service.color }}
                  >
                    From {service.price}
                  </span>

                  {/* Rotating Plus Icon */}
                  <div
                    className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0"
                    style={{
                      borderColor: isOpen ? `${service.color}40` : "rgba(255, 255, 255, 0.1)",
                      backgroundColor: isOpen ? `${service.color}10` : "transparent",
                      color: isOpen ? service.color : "#ffffff",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)"
                    }}
                  >
                    <FaPlus className="text-[10px]" />
                  </div>
                </div>
              </button>

              {/* Row Expanded Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pt-2 pl-12 md:pl-20 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      {/* Checklists */}
                      <ul className="flex flex-col gap-4 text-xs sm:text-sm text-white/60 max-w-xl">
                        {service.items.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="font-bold mt-0.5" style={{ color: service.color }}>•</span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Action button */}
                      <button
                        onClick={() => handleBookService(service)}
                        className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-bold px-6 py-3.5 rounded-full shrink-0 self-start md:self-center transition-all duration-300 group text-xs sm:text-sm shadow-md"
                        style={{
                          borderColor: `${service.color}30`,
                          boxShadow: `0 4px 12px ${service.color}05`
                        }}
                      >
                        Discuss Service
                        <FaChevronRight className="text-[10px] group-hover:translate-x-1 transition-transform duration-200" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;
