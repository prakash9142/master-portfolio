import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
}

const SectionHeading = ({ eyebrow, title, description, id }: SectionHeadingProps) => {
  return (
    <motion.div
      id={id}
      className="mb-12 max-w-3xl text-left"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {eyebrow && (
        <span className="inline-block text-xs font-bold tracking-widest text-accent uppercase mb-3 bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-muted text-base sm:text-lg leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
