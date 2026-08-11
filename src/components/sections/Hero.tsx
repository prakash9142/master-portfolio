import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { heroData } from "../../data/portfolioData";
import DeveloperWorkspace3D from "./DeveloperWorkspace3D";
import { FaChevronRight } from "react-icons/fa";

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const roles = heroData.roles;

  useEffect(() => {
    let timer: number;
    const activeRole = roles[roleIndex];

    const tick = () => {
      if (!isDeleting) {
        setCurrentText(activeRole.substring(0, currentText.length + 1));
        if (currentText === activeRole) {
          timer = window.setTimeout(() => setIsDeleting(true), 2000);
        } else {
          timer = window.setTimeout(tick, 80);
        }
      } else {
        setCurrentText(activeRole.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          timer = window.setTimeout(tick, 300);
        } else {
          timer = window.setTimeout(tick, 40);
        }
      }
    };

    timer = window.setTimeout(tick, isDeleting ? 30 : 80);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, roles]);

  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20 px-6 sm:px-12 lg:px-16"
      id="hero"
    >
      {/* 3D Background workspace */}
      <DeveloperWorkspace3D />

      {/* Ambient background glow elements */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-accent/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-accent-strong/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Copy Column */}
        <motion.div
          className="lg:col-span-7 flex flex-col text-left justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent mb-4 bg-accent/10 border border-accent/20 px-3 py-1.5 rounded-full w-fit">
            Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6 leading-[1.08]">
            Hi, I’m <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-accent via-cyan-400 to-accent-strong bg-clip-text text-transparent glow-text-cyan">
              {heroData.name}
            </span>
          </h1>

          {/* Typewriter role */}
          <div className="h-8 mb-6 flex items-center">
            <span className="text-base sm:text-lg md:text-xl font-semibold text-muted tracking-wide">
              I am a{" "}
              <span className="text-white border-r-2 border-accent pr-1 animate-pulse">
                {currentText}
              </span>
            </span>
          </div>

          <p className="text-base sm:text-lg text-muted max-w-xl leading-relaxed mb-8">
            {heroData.subtitle}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-cyan-500 hover:from-accent/90 hover:to-cyan-500/90 text-[#050814] font-bold px-8 py-4 rounded-full shadow-lg shadow-accent/15 hover:shadow-accent/25 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              Hire Me
              <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform duration-200" />
            </motion.a>
            <motion.a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-bold px-8 py-4 rounded-full"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              View Projects
            </motion.a>
          </div>

          {/* Mini Stats Banner */}
          <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-8 max-w-md">
            <div>
              <strong className="block text-2xl font-extrabold text-white mb-1">
                2025 CS Graduate
              </strong>
              <span className="text-xs text-muted uppercase tracking-wider font-semibold">
                AVACS Full Stack Engineer
              </span>
            </div>
            <div>
              <strong className="block text-2xl font-extrabold text-white mb-1">
                Startup-ready
              </strong>
              <span className="text-xs text-muted uppercase tracking-wider font-semibold">
                Freelance + Remote Friendly
              </span>
            </div>
          </div>
        </motion.div>

        {/* Visual Showcase (Desktop-only representation) */}
        <motion.div
          className="lg:col-span-5 hidden lg:block"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
        >
          <motion.div
            className="glass-card p-8 rounded-[32px] border border-white/5 shadow-2xl relative group overflow-hidden"
            whileHover={{ rotateX: 4, rotateY: -4, scale: 1.02, y: -4 }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Soft decorative background lights */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-accent/20 rounded-full blur-3xl group-hover:bg-accent/30 transition-all duration-500" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-accent-strong/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col gap-6" style={{ transform: "translateZ(30px)" }}>
              <span className="text-xs font-bold text-accent uppercase tracking-widest bg-accent/15 px-3 py-1.5 rounded-full w-fit">
                AVACS Accelerator
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight leading-snug">
                Launch Beautiful, Scalable Products
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Create high-performance React experiences with API-driven backend systems, seamless deployment,
                and premium UX designed for startup growth.
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-2">
                {["React", "Node.js", "Cloud", "Automation"].map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-semibold text-white/70 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Stat grid inside visual */}
              <div className="grid grid-cols-3 gap-3 border-t border-white/5 pt-6 mt-2 text-center">
                <motion.div whileHover={{ scale: 1.08, color: "#2dd4bf" }} transition={{ duration: 0.2 }}>
                  <strong className="block text-xl font-bold text-white mb-0.5">8x</strong>
                  <span className="text-[10px] text-muted uppercase tracking-wider">MVP Delivery</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.08, color: "#2dd4bf" }} transition={{ duration: 0.2 }}>
                  <strong className="block text-xl font-bold text-white mb-0.5">99.9%</strong>
                  <span className="text-[10px] text-muted uppercase tracking-wider">Uptime Ready</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.08, color: "#2dd4bf" }} transition={{ duration: 0.2 }}>
                  <strong className="block text-xl font-bold text-white mb-0.5">48h</strong>
                  <span className="text-[10px] text-muted uppercase tracking-wider">Deploy Cycle</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
