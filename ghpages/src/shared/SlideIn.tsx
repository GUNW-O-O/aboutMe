import { motion } from "framer-motion";
import React from "react";

interface SlideInProps {
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  children: React.ReactNode;
}

const SlideIn: React.FC<SlideInProps> = ({ children, delay = 0, direction = "up" }) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <motion.div
      // style={{ display: "contents" }}
      variants={variants}
      initial="hidden"
      animate="visible"   // 👈 페이지 로드 시 실행
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default SlideIn;
