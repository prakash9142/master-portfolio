import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "../../data/portfolioData";
import SectionHeading from "./SectionHeading";
import { FaExternalLinkAlt, FaGithub, FaTimes, FaArrowRight } from "react-icons/fa";

interface ProjectItem {
  title: string;
  description: string;
  image?: string;
  images?: string[];
  live: string;
  github: string;
  stack: string[];
  features: string[];
}

const ProjectImageSlider = ({ images, title }: { images: string[]; title: string }) => {
  const [index, setIndex] = useState(0);

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full group/slider">
      <img
        src={images[index]}
        alt={`${title} screenshot ${index + 1}`}
        loading="lazy"
        className="w-full h-full object-cover object-top transition-all duration-300"
        onError={(event) => {
          event.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60";
        }}
      />
      
      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#050814]/70 border border-white/5 text-white flex items-center justify-center hover:bg-[#050814] active:scale-95 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-200 z-10"
        type="button"
      >
        <span className="text-sm font-black">&lt;</span>
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#050814]/70 border border-white/5 text-white flex items-center justify-center hover:bg-[#050814] active:scale-95 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-200 z-10"
        type="button"
      >
        <span className="text-sm font-black">&gt;</span>
      </button>

      {/* Index indicator dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-[#050814]/65 px-2.5 py-1 rounded-full border border-white/5 z-10">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              index === i ? "bg-accent scale-125" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Determine category for filtering based on stack/features
  const getProjectCategory = (title: string) => {
    if (title.toLowerCase().includes("fashion") || title.toLowerCase().includes("booon")) return "E-Commerce";
    if (title.toLowerCase().includes("elevate") || title.toLowerCase().includes("marketing")) return "Marketing";
    return "Internal Tools";
  };

  const categories = ["All", "E-Commerce", "Marketing", "Internal Tools"];

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === "All") return true;
    return getProjectCategory(project.title) === activeFilter;
  });

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto" id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="Selected work for startups, SaaS, and modern digital products"
        description="Premium project showcases with impact-driven storytelling, stack transparency, and launch-ready outcomes."
      />

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-12 justify-start">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300 ${
              activeFilter === category
                ? "bg-accent text-[#050814] border-accent shadow-md shadow-accent/15"
                : "bg-white/5 border-white/5 text-muted hover:text-white hover:border-white/10"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const handleCardClick = () => {
              setSelectedProject(project);
            };

            return (
              <motion.article
                layout
                className="glass-card rounded-[32px] border border-white/5 overflow-hidden flex flex-col h-full shadow-lg group relative cursor-pointer"
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                whileHover={{ rotateX: 2, rotateY: -2, y: -4 }}
                onClick={handleCardClick}
              >
                {/* Image visual */}
                <div className="relative aspect-video overflow-hidden bg-white/5 border-b border-white/5">
                  {project.images && project.images.length > 0 ? (
                    <ProjectImageSlider images={project.images} title={project.title} />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full group-hover:scale-105 transition-transform duration-500 object-cover object-top"
                      onError={(event) => {
                        event.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60";
                      }}
                    />
                  )}
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex flex-col gap-3">
                    {/* Aligned Title Block */}
                    <div className="h-14 flex items-center justify-between gap-4">
                      <h3 className="text-lg font-bold text-white tracking-tight leading-snug line-clamp-2">
                        {project.title}
                      </h3>
                      <span className="text-[9px] font-bold text-accent uppercase tracking-widest bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded-full shrink-0">
                        {getProjectCategory(project.title)}
                      </span>
                    </div>

                    {/* Aligned Stack Row */}
                    <div className="h-7 flex items-center overflow-hidden gap-1.5">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] font-semibold text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/5 shrink-0"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 3 && (
                        <span className="text-[9px] font-semibold text-accent bg-accent/5 px-2 py-0.5 rounded border border-accent/10 shrink-0">
                          +{project.stack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Aligned Description Block */}
                  <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-3 h-[60px] overflow-hidden my-4">
                    {project.description}
                  </p>

                  {/* Aligned Bottom Action Line */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                    <span className="text-xs font-bold text-accent group-hover:underline flex items-center gap-1.5">
                      Inspect Details <FaArrowRight className="text-[9px] group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Interactive Project Details Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-[#050814]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.45 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card border border-white/5 bg-[#020617]/95 rounded-[32px] w-full max-w-4xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-6 top-6 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all cursor-pointer bg-white/5 z-20"
                type="button"
              >
                <FaTimes />
              </button>

              {/* Left Column: Visual & Stack */}
              <div className="flex-1 flex flex-col gap-6 min-w-0">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/5 shadow-md min-h-[180px] sm:min-h-[220px]">
                  {selectedProject.images && selectedProject.images.length > 0 ? (
                    <ProjectImageSlider images={selectedProject.images} title={selectedProject.title} />
                  ) : (
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover object-top"
                    />
                  )}
                </div>

                {/* Tech Stack Matrix */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[10px] font-bold font-mono text-accent uppercase tracking-widest">// TECHNOLOGY STACK</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-semibold text-white/60 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Information & Actions */}
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <span className="text-[9px] font-bold text-accent uppercase tracking-widest bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded-full">
                      {getProjectCategory(selectedProject.title)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug mb-4">
                    {selectedProject.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/60 leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="border-t border-white/5 pt-5 mb-8">
                    <span className="text-[10px] font-bold font-mono text-white/30 uppercase tracking-widest block mb-4">// KEY HIGHLIGHTS</span>
                    <ul className="flex flex-col gap-3 text-xs sm:text-sm text-white/50">
                      {selectedProject.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span className="text-accent font-bold mt-0.5">•</span>
                          <span className="leading-normal">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Button Action Rows */}
                <div className="flex flex-col gap-3.5 border-t border-white/5 pt-6 mt-auto">
                  <div className="flex gap-4">
                    {selectedProject.live && selectedProject.live !== "#" ? (
                      <a
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-[#050814] font-bold py-3 rounded-xl transition-all duration-300 text-xs sm:text-sm shadow-md shadow-accent/15"
                      >
                        <FaExternalLinkAlt className="text-xs" />
                        Explore Live Site
                      </a>
                    ) : (
                      <span className="flex-1 inline-flex items-center justify-center gap-2 bg-white/5 text-white/20 font-bold py-3 rounded-xl text-xs sm:text-sm select-none cursor-not-allowed border border-white/5">
                        Live Demo Offline
                      </span>
                    )}

                    <a
                      href={selectedProject.github && selectedProject.github !== "#" ? selectedProject.github : "https://github.com/prakash9142"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl border border-white/10 transition-all text-xs sm:text-sm"
                    >
                      <FaGithub className="text-sm" />
                      View Codebase
                    </a>
                  </div>

                  {/* Consult CTA Link */}
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      // prefill URL hash parameters
                      window.location.hash = `#contact?package=${encodeURIComponent("Custom build similar to " + selectedProject.title)}&price=0&days=0`;
                      // smooth scroll down
                      setTimeout(() => {
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-accent hover:text-[#050814] text-white border border-white/5 hover:border-accent font-bold py-3 rounded-xl transition-all duration-300 text-xs sm:text-sm group"
                  >
                    Discuss Similar Project Build
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
