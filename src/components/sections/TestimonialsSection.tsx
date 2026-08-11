import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonialsData } from "../../data/portfolioData";
import SectionHeading from "./SectionHeading";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length
    );
  };

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto" id="testimonials">
      <SectionHeading
        eyebrow="Testimonials"
        title="Client feedback & references"
        description="Real-feeling client stories that highlight product quality, speed, and collaboration. Replace these with actual testimonials as you grow your freelance portfolio."
      />

      <div className="relative max-w-4xl mx-auto mt-12">
        {/* Quote overlay decoration */}
        <div className="absolute -top-10 -left-6 md:-left-12 opacity-5 text-white select-none pointer-events-none">
          <FaQuoteLeft className="text-8xl sm:text-9xl" />
        </div>

        {/* Carousel Frame */}
        <div className="overflow-hidden min-h-[300px] sm:min-h-[250px] relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="glass-card p-8 sm:p-12 rounded-[32px] border border-white/5 shadow-xl w-full flex flex-col justify-between gap-6"
            >
              <p className="text-base sm:text-lg md:text-xl text-white/90 italic leading-relaxed">
                “{testimonialsData[currentIndex].quote}”
              </p>

              <div className="border-t border-white/5 pt-6 flex items-center justify-between">
                <div>
                  <strong className="block text-base sm:text-lg text-white font-bold tracking-tight">
                    {testimonialsData[currentIndex].name}
                  </strong>
                  <span className="text-xs sm:text-sm text-muted">
                    {testimonialsData[currentIndex].role}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 px-2">
          {/* Indicator dots */}
          <div className="flex gap-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "w-8 bg-accent" : "w-1.5 bg-white/10"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/5 text-muted hover:text-white hover:border-white/10 active:scale-95 transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/5 text-muted hover:text-white hover:border-white/10 active:scale-95 transition-all duration-200"
              aria-label="Next testimonial"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
