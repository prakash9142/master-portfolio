import { useEffect, useState } from "react";
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { navLinks, heroData, socialLinks } from "../data/portfolioData";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Automatically detect when a modal/lightbox is active and hide Navbar
  useEffect(() => {
    const checkModalState = () => {
      const isFixed = document.body.style.position === "fixed" || document.body.style.overflow === "hidden";
      setIsModalActive(isFixed);
    };
    checkModalState();

    const observer = new MutationObserver(checkModalState);
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    return () => observer.disconnect();
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isModalActive ? "opacity-0 pointer-events-none hidden" : "opacity-100"
      } ${
        scrolled
          ? "bg-[#050814]/75 border-b border-white/5 backdrop-blur-md py-4 shadow-lg shadow-black/20"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-40">
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            aria-label="Go to home"
            className="text-xl font-black tracking-wider text-white hover:text-accent transition-colors duration-200 bg-[#050814]/90 border border-white/15 px-3 py-1 rounded-full shadow-md"
          >
            PKA
          </a>
          <span className="hidden sm:inline-block text-[10px] tracking-wider font-semibold text-muted bg-white/5 px-2.5 py-1 rounded-full border border-white/5 uppercase">
            AVACS · Full Stack
          </span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-accent transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          {heroData.resume && (
            <a
              href={heroData.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#050814] bg-accent hover:bg-accent/80 px-5 py-2.5 rounded-full shadow-md shadow-accent/10 transition-all duration-200"
            >
              Resume
            </a>
          )}
        </nav>

        {/* Mobile Toggle Button (Solid Dark Glass Pill) */}
        <button
          className="md:hidden w-10 h-10 rounded-full bg-[#050814] border border-white/20 text-white hover:text-accent hover:border-accent/40 flex items-center justify-center shadow-lg shadow-black/50 transition-all duration-200 focus:outline-none relative z-50 cursor-pointer"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
        </button>
      </div>

      {/* Mobile Drawer (100% Solid Dark Background - Zero Transparency Bleed) */}
      <div
        className={`md:hidden fixed inset-0 w-screen h-screen bg-[#020617] transition-all duration-300 ease-in-out z-40 flex flex-col items-center justify-center gap-7 px-6 ${
          menuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={closeMenu}
            className="text-lg font-semibold text-muted hover:text-accent transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
        {heroData.resume && (
          <a
            href={heroData.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="text-lg font-bold text-[#050814] bg-accent hover:bg-accent/80 px-8 py-3.5 rounded-full shadow-lg shadow-accent/10 transition-all duration-200"
          >
            Resume
          </a>
        )}

        {/* Mobile Social Links */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/10 mt-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/70 hover:text-accent hover:bg-white/10 transition-all"
            >
              {link.label.toLowerCase() === "github" && <FaGithub className="text-lg" />}
              {link.label.toLowerCase() === "linkedin" && <FaLinkedin className="text-lg" />}
              {link.label.toLowerCase() === "instagram" && <FaInstagram className="text-lg" />}
              {link.label.toLowerCase() === "whatsapp" && <FaWhatsapp className="text-lg" />}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
