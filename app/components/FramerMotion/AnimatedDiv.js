import { motion } from "framer-motion";

export default function AnimatedDiv({
  variants,
  className,
  children,
  infinity,
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !infinity }}
      variants={variants}
      className={className}
      transition={{ staggerChildren: 0.5 }}
    >
      {children}
    </motion.div>
  );
}