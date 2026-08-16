import { motion } from "framer-motion";
import { educationData } from "../../data/portfolioData";
import SectionHeading from "./SectionHeading";
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const EducationSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl mx-auto w-full overflow-x-hidden" id="education">
      <SectionHeading
        eyebrow="Education"
        title="Academic Qualifications"
        description="Engineering background and education credentials."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-10">
        {educationData.map((edu, index) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#020617]/90 p-6 sm:p-7 flex flex-col justify-between shadow-xl hover:border-[#2dd4bf]/40 hover:shadow-2xl hover:shadow-[#2dd4bf]/10 transition-all duration-300 relative group"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#2dd4bf]/10 border border-[#2dd4bf]/20 flex items-center justify-center text-[#2dd4bf] text-xl">
                  <FaGraduationCap />
                </div>
                <span className="text-xs font-mono font-bold text-[#2dd4bf] bg-[#2dd4bf]/10 border border-[#2dd4bf]/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <FaCalendarAlt className="text-[10px]" />
                  {edu.year}
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug group-hover:text-[#2dd4bf] transition-colors mb-2">
                  {edu.degree}
                </h3>
                <p className="text-xs font-semibold text-white/70 flex items-center gap-1.5">
                  <FaMapMarkerAlt className="text-[#2dd4bf] text-[10px]" />
                  {edu.institution} — <span className="text-white/50">{edu.location}</span>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
