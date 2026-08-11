import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { navLinks, heroData } from "../data/portfolioData";

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
            className="text-xl font-black tracking-wider text-white hover:text-accent transition-colors duration-200"
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

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white hover:text-accent transition-colors duration-200 focus:outline-none relative z-40"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-0 w-screen h-screen bg-[#050814]/98 backdrop-blur-lg transition-all duration-300 ease-in-out z-40 flex flex-col items-center justify-center gap-8 ${
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
      </div>
    </header>
  );
};

export default Navbar;
