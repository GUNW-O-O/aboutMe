import { motion } from "framer-motion";
import React from "react";

interface SlideInOnViewProps {
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  children: React.ReactNode;
}

const SlideInOnView: React.FC<SlideInOnViewProps> = ({ children, delay = 0, direction = "up" }) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible" // 👈 뷰포트 감지
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default SlideInOnView;
