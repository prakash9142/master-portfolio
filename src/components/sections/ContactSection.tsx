import { useState, useEffect, FormEvent } from "react";
import { heroData } from "../../data/portfolioData";
import SectionHeading from "./SectionHeading";
import { FaEnvelope, FaPaperPlane, FaWhatsapp, FaGithub, FaInstagram } from "react-icons/fa";

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState("Ready to send");

  // Auto-populate message based on package URL parameters
  useEffect(() => {
    const handleHashParam = () => {
      if (window.location.hash.includes("?package=")) {
        const parts = window.location.hash.split("?");
        if (parts.length > 1) {
          const params = new URLSearchParams(parts[1]);
          const pkg = params.get("package");
          const price = params.get("price");
          const days = params.get("days");
          if (pkg) {
            const formattedPrice = parseInt(price || "0").toLocaleString("en-IN");
            setMessage(
              `Hi Prakash, I would like to discuss a custom service package:\n- ${pkg.split(",").join("\n- ")}\n\nEstimated Budget: ₹${formattedPrice}\nEstimated Duration: ~${days} days.`
            );
          }
        }
      }
    };
    handleHashParam();
    window.addEventListener("hashchange", handleHashParam);
    return () => window.removeEventListener("hashchange", handleHashParam);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("Sending...");

    try {
      const response = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setFormStatus("✓ Message sent! Check your email for confirmation.");
        setName("");
        setEmail("");
        setMessage("");
        setTimeout(() => setFormStatus("Ready to send"), 4000);
      } else {
        const error = await response.json();
        setFormStatus(`✗ Error: ${error.error}`);
      }
    } catch (error) {
      setFormStatus("✗ Connection failed. Check if backend is running.");
      console.error(error);
    }
  };

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto" id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Let’s build your next product together"
        description="Reach out for freelance projects, remote opportunities, or product partnerships. I’m available for startups, SaaS launches, and global remote teams."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
        
        {/* Contact Info Card */}
        <div className="lg:col-span-5 glass-card p-8 rounded-[32px] border border-white/5 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />

          <div>
            <h3 className="text-xl font-bold text-white tracking-tight mb-4 pl-3 border-l-2 border-accent">
              Get in touch
            </h3>
            <p className="text-sm sm:text-base text-muted leading-relaxed mb-8">
              Email me directly at{" "}
              <a
                href={`mailto:${heroData.email}`}
                className="text-white hover:text-accent font-semibold underline decoration-accent/30 transition-colors"
              >
                {heroData.email}
              </a>{" "}
              or send a quick message on{" "}
              <a
                href={heroData.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 font-semibold underline decoration-accent/30 transition-colors"
              >
                WhatsApp
              </a>.
            </p>

            {/* Structured Social Handles */}
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${heroData.email}`}
                className="flex items-center gap-3 text-muted hover:text-white transition-colors group"
              >
                <span className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 text-accent group-hover:border-accent/40 transition-colors">
                  <FaEnvelope className="text-sm" />
                </span>
                <span className="text-sm font-semibold">{heroData.email}</span>
              </a>
              <a
                href={heroData.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted hover:text-white transition-colors group"
              >
                <span className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 text-accent group-hover:border-accent/40 transition-colors">
                  <FaWhatsapp className="text-base" />
                </span>
                <span className="text-sm font-semibold">Message on WhatsApp</span>
              </a>
              <a
                href="https://github.com/prakash9142"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted hover:text-white transition-colors group"
              >
                <span className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 text-accent group-hover:border-accent/40 transition-colors">
                  <FaGithub className="text-base" />
                </span>
                <span className="text-sm font-semibold">Follow on GitHub</span>
              </a>
              <a
                href="https://www.instagram.com/prakashhzero1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted hover:text-white transition-colors group"
              >
                <span className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 text-accent group-hover:border-accent/40 transition-colors">
                  <FaInstagram className="text-base" />
                </span>
                <span className="text-sm font-semibold">Follow on Instagram</span>
              </a>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 mt-8 flex flex-col gap-1.5 text-xs text-muted">
            <span>Currently at AVACS</span>
            <span>International freelance & contract services</span>
          </div>
        </div>

        {/* Contact Form */}
        <form
          className="lg:col-span-7 glass-card p-8 rounded-[32px] border border-white/5 flex flex-col gap-6 shadow-xl"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <label className="flex flex-col gap-2 text-xs font-bold text-white/70 uppercase tracking-wider">
              Name
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="Your name"
                required
                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-accent focus:bg-white/10 transition-all"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs font-bold text-white/70 uppercase tracking-wider">
              Email
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="Your email"
                required
                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-accent focus:bg-white/10 transition-all"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-xs font-bold text-white/70 uppercase tracking-wider">
            Project brief
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Tell me about your project or opportunity..."
              rows={4}
              required
              className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-accent focus:bg-white/10 transition-all resize-none"
            />
          </label>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-cyan-500 hover:from-accent/90 hover:to-cyan-500/90 text-[#050814] font-bold px-8 py-4 rounded-full shadow-lg shadow-accent/15 hover:shadow-accent/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto shrink-0"
            >
              <FaPaperPlane className="text-xs" />
              Send Inquiry
            </button>
            <span className="text-xs font-semibold text-muted text-center sm:text-right">
              {formStatus}
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
