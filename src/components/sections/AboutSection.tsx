import { motion } from "framer-motion";
import { aboutData } from "../../data/portfolioData";
import SectionHeading from "./SectionHeading";
import { FaGraduationCap, FaBriefcase, FaCode } from "react-icons/fa";

const AboutSection = () => {
  // Stats data
  const stats = [
    { value: "3+", label: "Major Live Projects" },
    { value: "99%", label: "Client Satisfaction" },
    { value: "15+", label: "Technologies Mastered" },
    { value: "24/7", label: "Startup Support" },
  ];

  const getTimelineIcon = (title: string) => {
    if (title.toLowerCase().includes("graduate") || title.toLowerCase().includes("cs")) {
      return <FaGraduationCap className="text-accent text-lg" />;
    } else if (title.toLowerCase().includes("freelance")) {
      return <FaCode className="text-accent text-lg" />;
    }
    return <FaBriefcase className="text-accent text-lg" />;
  };

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto" id="about">
      <SectionHeading
        eyebrow="About"
        title={aboutData.heading}
        description={aboutData.description}
      />

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
        
        {/* Left Column: Highlights & Quick Stats */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          <ul className="flex flex-col gap-4">
            {aboutData.highlights.map((text, index) => (
              <motion.li
                key={text}
                className="glass-card p-6 rounded-2xl border border-white/5 text-sm sm:text-base text-muted leading-relaxed hover:border-accent/20 hover:bg-white/5 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                {text}
              </motion.li>
            ))}
          </ul>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass-card p-6 rounded-2xl border border-white/5 text-center hover:border-accent-strong/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <strong className="block text-3xl font-black text-white bg-gradient-to-r from-accent to-accent-strong bg-clip-text text-transparent mb-1">
                  {stat.value}
                </strong>
                <span className="text-xs text-muted uppercase tracking-wider font-semibold">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Experience Timeline */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <h3 className="text-xl font-bold text-white tracking-tight mb-2 pl-2 border-l-2 border-accent">
            Professional Timeline
          </h3>
          <div className="flex flex-col gap-4">
            {aboutData.timeline.map((item, index) => (
              <motion.div
                key={item.year}
                className="glass-card p-6 rounded-2xl border border-white/5 flex gap-4 hover:border-accent/20 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                  {getTimelineIcon(item.title)}
                </div>
                <div>
                  <span className="inline-block text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/10 px-2 py-0.5 rounded-full mb-2">
                    {item.year}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-tight mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
