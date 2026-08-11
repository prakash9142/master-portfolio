import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "../../data/portfolioData";
import SectionHeading from "./SectionHeading";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaTimes,
  FaArrowRight,
  FaExpand,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
} from "react-icons/fa";

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

// Multi-Image Gallery Slider & Lightbox Trigger
const ProjectImageGallery = ({
  images,
  title,
  onExpand,
}: {
  images: string[];
  title: string;
  onExpand: (index: number) => void;
}) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full group/gallery overflow-hidden bg-[#020617]">
      <img
        src={images[activeIdx]}
        alt={`${title} screenshot ${activeIdx + 1}`}
        loading="lazy"
        className="w-full h-full object-cover object-top transition-all duration-500 group-hover/gallery:scale-105"
        onError={(event) => {
          event.currentTarget.src =
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60";
        }}
      />

      {/* Subtle bottom gradient shadow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent opacity-60 pointer-events-none" />

      {/* Prev / Next Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#050814]/80 border border-white/10 text-white flex items-center justify-center hover:bg-[#2dd4bf] hover:text-[#050814] active:scale-95 opacity-0 group-hover/gallery:opacity-100 transition-all duration-200 z-20 shadow-md"
            type="button"
            title="Previous screenshot"
          >
            <FaChevronLeft className="text-xs" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#050814]/80 border border-white/10 text-white flex items-center justify-center hover:bg-[#2dd4bf] hover:text-[#050814] active:scale-95 opacity-0 group-hover/gallery:opacity-100 transition-all duration-200 z-20 shadow-md"
            type="button"
            title="Next screenshot"
          >
            <FaChevronRight className="text-xs" />
          </button>
        </>
      )}

      {/* Expand Fullscreen Lightbox Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onExpand(activeIdx);
        }}
        className="absolute top-3 right-3 px-2.5 py-1.5 rounded-lg bg-[#050814]/80 border border-white/15 text-white/80 hover:text-white hover:border-[#2dd4bf] hover:bg-[#2dd4bf]/20 text-[10px] font-mono flex items-center gap-1.5 opacity-0 group-hover/gallery:opacity-100 transition-all duration-200 z-20 backdrop-blur-md"
        type="button"
        title="View full image"
      >
        <FaExpand className="text-[10px]" />
        <span>Expand</span>
      </button>

      {/* Thumbnails strip for multi-image projects */}
      {images.length > 1 && (
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#050814]/80 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md z-20">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIdx(i);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                activeIdx === i
                  ? "bg-[#2dd4bf] scale-125 shadow-sm shadow-[#2dd4bf]"
                  : "bg-white/30 hover:bg-white/60"
              }`}
              type="button"
              title={`View image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Lightbox Modal State
  const [lightboxImage, setLightboxImage] = useState<{
    images: string[];
    index: number;
    title: string;
  } | null>(null);

  const getProjectCategory = (title: string) => {
    if (title.toLowerCase().includes("fashion") || title.toLowerCase().includes("booon"))
      return "E-Commerce";
    if (title.toLowerCase().includes("elevate") || title.toLowerCase().includes("marketing"))
      return "Marketing";
    return "Internal Tools";
  };

  const categories = ["All", "E-Commerce", "Marketing", "Internal Tools"];

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === "All") return true;
    return getProjectCategory(project.title) === activeFilter;
  });

  const openLightbox = (images: string[], index: number, title: string) => {
    setLightboxImage({ images, index, title });
  };

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto" id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="Selected work for startups, SaaS, and modern digital products"
        description="Explore live product showcases with high-resolution image galleries, tech stack transparency, and live deployment links."
      />

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-12 justify-start">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider border transition-all duration-300 ${
              activeFilter === category
                ? "bg-[#2dd4bf] text-[#050814] border-[#2dd4bf] shadow-lg shadow-[#2dd4bf]/20"
                : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/20"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const projectImages =
              project.images && project.images.length > 0
                ? project.images
                : project.image
                ? [project.image]
                : [];

            return (
              <motion.article
                layout
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="rounded-[28px] border border-white/10 bg-[#020617]/90 overflow-hidden flex flex-col h-full shadow-xl hover:border-[#2dd4bf]/40 hover:shadow-2xl hover:shadow-[#2dd4bf]/10 transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Visual Image Showcase */}
                <div className="relative aspect-[16/10] overflow-hidden bg-white/5 border-b border-white/10">
                  <ProjectImageGallery
                    images={projectImages}
                    title={project.title}
                    onExpand={(idx) => openLightbox(projectImages, idx, project.title)}
                  />
                </div>

                {/* Body Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex flex-col gap-3">
                    {/* Header line: Title + Category Tag */}
                    <div className="flex items-start justify-between gap-3 min-h-[48px]">
                      <h3 className="text-lg font-black text-white tracking-tight leading-snug group-hover:text-[#2dd4bf] transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-[9px] font-mono font-bold text-[#2dd4bf] uppercase tracking-widest bg-[#2dd4bf]/10 border border-[#2dd4bf]/25 px-2.5 py-0.5 rounded-full shrink-0">
                        {getProjectCategory(project.title)}
                      </span>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 min-h-[28px] items-center">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] font-mono font-semibold text-white/60 bg-white/5 px-2 py-0.5 rounded-md border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 4 && (
                        <span className="text-[9px] font-mono font-semibold text-[#2dd4bf] bg-[#2dd4bf]/10 px-2 py-0.5 rounded-md border border-[#2dd4bf]/20">
                          +{project.stack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed line-clamp-3 my-4 min-h-[54px]">
                    {project.description}
                  </p>

                  {/* Footer Actions */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                    <span className="text-xs font-bold text-[#2dd4bf] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                      Inspect Case Study <FaArrowRight className="text-[10px]" />
                    </span>

                    {project.live && project.live !== "#" && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[11px] font-mono font-bold text-white/70 hover:text-white flex items-center gap-1 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full transition-all"
                      >
                        Live <FaExternalLinkAlt className="text-[9px]" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* ── Interactive Project Details Modal ── */}
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
              className="rounded-[32px] border border-white/10 bg-[#020617] w-full max-w-4xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-6 top-6 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#2dd4bf] transition-all cursor-pointer bg-white/5 z-20"
                type="button"
              >
                <FaTimes />
              </button>

              {/* Left Column: Visual Gallery */}
              <div className="flex-1 flex flex-col gap-5 min-w-0">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-lg">
                  <ProjectImageGallery
                    images={
                      selectedProject.images && selectedProject.images.length > 0
                        ? selectedProject.images
                        : selectedProject.image
                        ? [selectedProject.image]
                        : []
                    }
                    title={selectedProject.title}
                    onExpand={(idx) =>
                      openLightbox(
                        selectedProject.images && selectedProject.images.length > 0
                          ? selectedProject.images
                          : selectedProject.image
                          ? [selectedProject.image]
                          : [],
                        idx,
                        selectedProject.title
                      )
                    }
                  />
                </div>

                {/* Click to expand prompt */}
                <p className="text-[10px] font-mono text-white/40 text-center flex items-center justify-center gap-1.5">
                  <FaEye className="text-[#2dd4bf]" /> Click image to enlarge full resolution
                </p>

                {/* Tech Stack Matrix */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[10px] font-mono font-bold text-[#2dd4bf] uppercase tracking-widest">
                    // TECH STACK & ARCHITECTURE
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono font-semibold text-white/80 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Project Overview & Features */}
              <div className="flex-1 flex flex-col justify-between gap-6 min-w-0">
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#2dd4bf] uppercase tracking-widest bg-[#2dd4bf]/10 border border-[#2dd4bf]/20 px-2.5 py-1 rounded-full">
                      {getProjectCategory(selectedProject.title)}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-3">
                      {selectedProject.title}
                    </h3>
                  </div>

                  <p className="text-sm text-white/70 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  {/* Key Features List */}
                  {selectedProject.features && selectedProject.features.length > 0 && (
                    <div className="flex flex-col gap-2.5 pt-2 border-t border-white/10">
                      <span className="text-[10px] font-mono font-bold text-[#2dd4bf] uppercase tracking-widest">
                        // KEY DELIVERABLES & FEATURES
                      </span>
                      <ul className="flex flex-col gap-2">
                        {selectedProject.features.map((feat, i) => (
                          <li key={i} className="text-xs text-white/70 flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf] mt-1.5 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* External Action Links */}
                <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
                  {selectedProject.live && selectedProject.live !== "#" && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-[#2dd4bf] hover:bg-[#2dd4bf]/90 text-[#050814] font-extrabold text-sm py-3 px-6 rounded-xl shadow-lg shadow-[#2dd4bf]/20 transition-all"
                    >
                      <span>Visit Live Platform</span>
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  )}

                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-sm py-3 px-6 rounded-xl transition-all"
                    >
                      <FaGithub className="text-base" />
                      <span>Code Repo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── High-Resolution Lightbox Modal (Full Screen Screenshot Inspection) ── */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-[#020617]/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 select-none"
          >
            {/* Top Bar */}
            <div className="w-full max-w-6xl flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-white font-mono">
                  {lightboxImage.title}
                </span>
                <span className="text-xs font-mono text-[#2dd4bf] bg-[#2dd4bf]/10 border border-[#2dd4bf]/20 px-2 py-0.5 rounded-full">
                  {lightboxImage.index + 1} / {lightboxImage.images.length}
                </span>
              </div>

              <button
                onClick={() => setLightboxImage(null)}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all cursor-pointer"
                type="button"
              >
                <FaTimes />
              </button>
            </div>

            {/* Main Image Container */}
            <div
              className="relative max-w-6xl max-h-[80vh] w-full flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#050814]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage.images[lightboxImage.index]}
                alt={lightboxImage.title}
                className="max-w-full max-h-[78vh] object-contain"
              />

              {/* Prev / Next controls in Lightbox */}
              {lightboxImage.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setLightboxImage((prev) =>
                        prev
                          ? {
                              ...prev,
                              index:
                                (prev.index - 1 + prev.images.length) %
                                prev.images.length,
                            }
                          : null
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#050814]/80 border border-white/20 text-white flex items-center justify-center hover:bg-[#2dd4bf] hover:text-[#050814] transition-all"
                    type="button"
                  >
                    <FaChevronLeft className="text-base" />
                  </button>

                  <button
                    onClick={() =>
                      setLightboxImage((prev) =>
                        prev
                          ? {
                              ...prev,
                              index: (prev.index + 1) % prev.images.length,
                            }
                          : null
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#050814]/80 border border-white/20 text-white flex items-center justify-center hover:bg-[#2dd4bf] hover:text-[#050814] transition-all"
                    type="button"
                  >
                    <FaChevronRight className="text-base" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
