import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DeveloperWorkspace3D from "./DeveloperWorkspace3D";
import { FaArrowUpRightFromSquare, FaGlobe, FaLocationDot } from "react-icons/fa6";

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "AI & Automation Engineer",
    "Full-Stack Developer",
    "Digital Product Builder",
    "SaaS MVP Specialist"
  ];

  useEffect(() => {
    let timer: number;
    const activeRole = roles[roleIndex];

    const tick = () => {
      if (!isDeleting) {
        setCurrentText(activeRole.substring(0, currentText.length + 1));
        if (currentText === activeRole) {
          timer = window.setTimeout(() => setIsDeleting(true), 2200);
        } else {
          timer = window.setTimeout(tick, 70);
        }
      } else {
        setCurrentText(activeRole.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          timer = window.setTimeout(tick, 300);
        } else {
          timer = window.setTimeout(tick, 35);
        }
      }
    };

    timer = window.setTimeout(tick, isDeleting ? 35 : 70);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, roles]);

  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 px-6 sm:px-12 lg:px-16"
      id="hero"
    >
      {/* 3D Interactive Background Canvas */}
      <DeveloperWorkspace3D />

      {/* Ambient Radial Background Lights */}
      <div className="absolute top-[18%] left-[8%] w-[400px] h-[400px] bg-[#2dd4bf]/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[15%] right-[8%] w-[400px] h-[400px] bg-[#a855f7]/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Copy Column */}
        <motion.div
          className="lg:col-span-7 flex flex-col text-left justify-center"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Location & Status Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-[#2dd4bf] bg-[#2dd4bf]/10 border border-[#2dd4bf]/25 px-3 py-1 rounded-full shadow-sm shadow-[#2dd4bf]/10">
              <FaLocationDot className="text-xs" />
              BENGALURU / INDIA
            </span>

            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              <FaGlobe className="text-xs text-[#a855f7]" />
              BUILDING FOR THE WORLD 🌍
            </span>
          </div>

          {/* Headline H1 */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-4 leading-[1.05]">
            Built in Bengaluru. <br />
            <span className="bg-gradient-to-r from-[#2dd4bf] via-cyan-400 to-[#a855f7] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(45,212,191,0.3)]">
              Built to Scale.
            </span>
          </h1>

          {/* Subheading / Name */}
          <div className="mb-4 flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white/90 tracking-tight flex items-center gap-2">
              Prakash KR. Arya
              <span className="inline-block w-2 h-2 rounded-full bg-[#22c55e] animate-ping" title="Available for projects" />
            </h2>
            
            {/* Animated Role Subtitle */}
            <div className="h-8 flex items-center font-mono">
              <span className="text-sm sm:text-base font-semibold text-white/70">
                <span className="text-[#2dd4bf] font-bold">› </span>
                <span className="text-white border-r-2 border-[#2dd4bf] pr-1 font-mono">
                  {currentText}
                </span>
              </span>
            </div>
          </div>

          {/* Bio Description */}
          <p className="text-base sm:text-lg text-white/65 max-w-xl leading-relaxed mb-8 font-normal">
            I turn ambitious ideas into{" "}
            <span className="text-white font-semibold underline decoration-[#2dd4bf]/40 underline-offset-4">
              AI-powered products
            </span>
            ,{" "}
            <span className="text-white font-semibold underline decoration-[#a855f7]/40 underline-offset-4">
              high-converting websites
            </span>
            , and{" "}
            <span className="text-white font-semibold underline decoration-[#fbbf24]/40 underline-offset-4">
              intelligent automation systems
            </span>{" "}
            — from Bengaluru to businesses anywhere in the world.
          </p>

          {/* Call To Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-10">
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#2dd4bf] to-cyan-500 hover:from-[#2dd4bf]/90 hover:to-cyan-500/90 text-[#050814] font-extrabold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg shadow-[#2dd4bf]/20 hover:shadow-[#2dd4bf]/35 transition-all duration-300 group"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <span>Start a Project</span>
              <FaArrowUpRightFromSquare className="text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </motion.a>

            <motion.a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-bold text-sm sm:text-base px-8 py-4 rounded-full transition-all duration-300"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              Explore My Work
            </motion.a>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8 max-w-md">
            <div>
              <strong className="block text-2xl font-black text-white mb-0.5">
                AI & Full-Stack
              </strong>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                Core Specialization
              </span>
            </div>
            <div>
              <strong className="block text-2xl font-black text-[#2dd4bf] mb-0.5">
                Bengaluru
              </strong>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                India HQ / Remote
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <strong className="block text-2xl font-black text-[#a855f7] mb-0.5">
                Global
              </strong>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                Scale & Delivery
              </span>
            </div>
          </div>
        </motion.div>

        {/* 3D Visual Showcase Card (Desktop) */}
        <motion.div
          className="lg:col-span-5 hidden lg:block"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="rounded-[32px] border border-white/10 bg-[#020617]/80 p-8 backdrop-blur-xl shadow-2xl relative group overflow-hidden"
            whileHover={{ rotateX: 3, rotateY: -3, scale: 1.02, y: -4 }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Ambient inner card glow */}
            <div className="absolute -top-24 -right-24 w-56 h-56 bg-[#2dd4bf]/20 rounded-full blur-3xl group-hover:bg-[#2dd4bf]/30 transition-all duration-500 pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-[#a855f7]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-6" style={{ transform: "translateZ(30px)" }}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#2dd4bf] uppercase tracking-widest bg-[#2dd4bf]/10 border border-[#2dd4bf]/20 px-3 py-1 rounded-full">
                  AI Product Architecture
                </span>
                <span className="text-[10px] font-mono text-white/40">
                  v2.5.0
                </span>
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight leading-snug">
                Intelligent Automation & Scalable Web Apps
              </h3>

              <p className="text-xs text-white/60 leading-relaxed">
                Engineering fast React frontends, robust Node.js backend pipelines, AI workflow automations, and custom SaaS products built to scale smoothly from 1 to 100k users.
              </p>

              {/* Technologies list */}
              <div className="flex flex-wrap gap-2 pt-1">
                {["React & Next.js", "AI Automations", "Node.js & Python", "Tailwind & 3D", "Cloud & APIs"].map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono font-semibold text-white/75 bg-white/5 border border-white/10 px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Key performance metrics */}
              <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-6 mt-2 text-center">
                <div>
                  <strong className="block text-xl font-black text-white mb-0.5">100%</strong>
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Custom Code</span>
                </div>
                <div>
                  <strong className="block text-xl font-black text-[#2dd4bf] mb-0.5">Fast</strong>
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Turnaround</span>
                </div>
                <div>
                  <strong className="block text-xl font-black text-[#a855f7] mb-0.5">Global</strong>
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Ready</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
