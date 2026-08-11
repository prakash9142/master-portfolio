import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqData } from "../../data/portfolioData";
import SectionHeading from "./SectionHeading";
import { FaPlus, FaSearch, FaRobot } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Dynamically map categories to data to avoid breaking portfolioData.ts schema
  const faqs: FAQItem[] = faqData.map((faq, index) => {
    let category = "General";
    if (index === 0 || index === 1) category = "Pricing";
    else if (index === 2 || index === 3) category = "Timeline & Support";
    else if (index === 4 || index === 5) category = "Tech & SEO";
    return { ...faq, category };
  });

  const categories = ["All", "Pricing", "Timeline & Support", "Tech & SEO"];

  // Filter FAQs based on category AND search input
  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleLaunchAI = () => {
    const encodedQuery = encodeURIComponent(searchQuery || "Help");
    window.location.hash = `#skills?chat=${encodedQuery}`;
  };

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-16 max-w-4xl mx-auto" id="faq">
      <SectionHeading
        eyebrow="Questions"
        title="Frequently asked questions"
        description="Got questions about pricing, timelines, or my tech stack? Search the database or run queries below."
      />

      {/* Command Line Style Search Bar */}
      <div className="relative max-w-md mx-auto mt-10 mb-8 border-b border-white/10 focus-within:border-accent transition-colors duration-300 py-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setActiveIndex(null); // Close open accordions when typing
          }}
          placeholder="Query FAQ database..."
          className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-white/20 pl-8 select-text"
        />
        <FaSearch className="absolute left-1 top-1/2 -translate-y-1/2 text-white/20 text-sm" />
      </div>

      {/* Underline Filter Tabs */}
      <div className="flex flex-wrap gap-5 justify-center mb-10 text-[10px] font-mono tracking-widest uppercase">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setSearchQuery(""); // Clear search to avoid conflicts
              setActiveIndex(null);
            }}
            className={`pb-1.5 border-b-2 transition-all duration-300 ${
              activeCategory === cat
                ? "border-accent text-accent font-bold"
                : "border-transparent text-white/40 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion Stack Log */}
      <div className="flex flex-col border-t border-white/10">
        <AnimatePresence mode="popLayout">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = activeIndex === index;
              const globalIndex = faqData.findIndex(f => f.question === faq.question) + 1;
              const indexStr = globalIndex < 10 ? `Q0${globalIndex}` : `Q${globalIndex}`;

              return (
                <motion.div
                  layout
                  key={faq.question}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="border-b border-white/10 transition-colors duration-300"
                  style={{
                    borderBottomColor: isOpen ? "rgba(45, 212, 191, 0.2)" : "rgba(255, 255, 255, 0.1)"
                  }}
                >
                  <button
                    className="w-full py-6 flex items-center justify-between text-left group transition-all duration-300 focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-6 min-w-0">
                      {/* Question Index Marker */}
                      <span
                        className="font-mono text-xs font-bold tracking-widest transition-colors duration-300 shrink-0"
                        style={{ color: isOpen ? "#2dd4bf" : "rgba(255, 255, 255, 0.3)" }}
                      >
                        {indexStr}
                      </span>

                      {/* Question Title */}
                      <span className="text-sm sm:text-base font-bold text-white transition-transform duration-300 group-hover:translate-x-2">
                        {faq.question}
                      </span>
                    </div>

                    {/* Plus Icon toggler */}
                    <div
                      className="w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0"
                      style={{
                        borderColor: isOpen ? "rgba(45, 212, 191, 0.3)" : "rgba(255, 255, 255, 0.1)",
                        backgroundColor: isOpen ? "rgba(45, 212, 191, 0.08)" : "transparent",
                        color: isOpen ? "#2dd4bf" : "#ffffff",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)"
                      }}
                    >
                      <FaPlus className="text-[9px]" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pl-14 pr-6 text-xs sm:text-sm text-white/60 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            // No matches found Handoff Prompt
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="text-center py-12 px-6 glass-card rounded-[24px] border border-white/5 max-w-md mx-auto flex flex-col items-center shadow-lg mt-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent mb-4 shadow-sm shadow-accent/10">
                <FaRobot className="text-xl" />
              </div>
              <h4 className="text-white font-bold text-base mb-1.5">No Matches Found</h4>
              <p className="text-xs text-white/50 leading-relaxed mb-5">
                Can't find your answer? Query Prakash's console AI helper directly inside the developer terminal.
              </p>
              <button
                onClick={handleLaunchAI}
                className="bg-accent hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98] text-[#050814] font-bold px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 shadow-md shadow-accent/10"
              >
                Launch AI Chatbot
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FAQSection;
