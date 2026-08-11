import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { socialLinks } from "../data/portfolioData";

const getIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case "github":
      return <FaGithub className="text-lg" />;
    case "linkedin":
      return <FaLinkedin className="text-lg" />;
    case "instagram":
      return <FaInstagram className="text-lg" />;
    case "whatsapp":
      return <FaWhatsapp className="text-lg" />;
    default:
      return null;
  }
};

const SocialIcons = () => {
  return (
    <aside className="fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-6 z-40 hidden md:flex">
      <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-accent [writing-mode:vertical-lr] select-none opacity-40 mb-2">
        Connect
      </div>
      <div className="w-[1px] h-12 bg-white/10 mx-auto mb-2" />
      <div className="flex flex-col gap-4">
        {socialLinks.map((link) => {
          const icon = getIcon(link.label);
          if (!icon) return null;
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              title={link.label}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/5 text-muted hover:text-accent hover:border-accent/40 hover:bg-accent/5 hover:scale-110 shadow-md hover:shadow-accent/5 transition-all duration-300 group"
            >
              {icon}
            </a>
          );
        })}
      </div>
    </aside>
  );
};

export default SocialIcons;
