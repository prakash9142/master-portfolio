import { useEffect, useState } from "react";
import Cursor from "./Cursor";
import FloatingParticles from "./FloatingParticles";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import Hero from "./sections/Hero";
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";
import ServicesSection from "./sections/ServicesSection";
import FAQSection from "./sections/FAQSection";
import ContactSection from "./sections/ContactSection";

const MainContainer = () => {
  const [showEffects, setShowEffects] = useState(false);

  useEffect(() => {
    const updateShowEffects = () => {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const isSmall = window.innerWidth < 900;
      setShowEffects(!isCoarse && !isSmall);
    };
    updateShowEffects();
    window.addEventListener("resize", updateShowEffects, { passive: true });
    return () => window.removeEventListener("resize", updateShowEffects);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050814] text-white selection:bg-accent/20 selection:text-white overflow-hidden">
      {showEffects && <FloatingParticles />}
      {showEffects && <Cursor />}
      
      {/* Floating Header Actions */}
      <Navbar />
      
      {/* Social anchors */}
      <SocialIcons />

      {/* Primary Landing Content */}
      <main className="relative z-10 flex flex-col w-full pb-20">
        <Hero />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ServicesSection />
        <FAQSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default MainContainer;
