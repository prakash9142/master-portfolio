import { motion } from "framer-motion";
import { experienceData } from "../../data/portfolioData";
import SectionHeading from "./SectionHeading";
import { FaBuilding, FaRegCalendarAlt } from "react-icons/fa";

const ExperienceSection = () => {
  return (
    <section className="py-24 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto" id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Real-world product experience at AVACS"
        description="A practical blend of frontend polish, backend reliability, and dashboard-first thinking applied to modern product development."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8 items-start">
        {/* Left Column: Work Experience Card */}
        <motion.div
          className="lg:col-span-8 glass-card p-8 rounded-[32px] border border-white/5 shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />

          {/* Header Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-widest bg-accent/10 border border-accent/20 px-3 py-1 rounded-full mb-3">
                <FaBuilding className="text-[10px]" />
                {experienceData.company}
              </span>
              <h3 className="text-2xl font-black text-white tracking-tight">
                {experienceData.role}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted bg-white/5 border border-white/5 px-4 py-2 rounded-xl shrink-0">
              <FaRegCalendarAlt className="text-xs text-accent" />
              <span>{experienceData.duration}</span>
            </div>
          </div>

          {/* Impact list */}
          <ul className="flex flex-col gap-4 text-sm sm:text-base text-muted leading-relaxed">
            {experienceData.impact.map((item, index) => (
              <motion.li
                key={item}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <span className="text-accent font-bold mt-1 shrink-0">•</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Right Column: Key metrics cards */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted mb-2 pl-2 border-l border-white/20">
            Key Metrics & Impact
          </h4>
          {experienceData.metrics.map((metric, index) => (
            <motion.div
              className="glass-card p-6 rounded-2xl border border-white/5 hover:border-accent/25 transition-all duration-300 relative overflow-hidden group"
              key={metric}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {/* Highlight line on hover */}
              <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-accent to-accent-strong scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
              <strong className="block text-lg font-bold text-white tracking-tight leading-relaxed">
                {metric}
              </strong>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
