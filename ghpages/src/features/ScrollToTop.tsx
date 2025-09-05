import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const [atTop, setAtTop] = useState(true);

  const scrollY = useMotionValue(0); // 스크롤 위치 추적
  const width = useTransform(scrollY, (v) => `${v * 100}%`);
  const barColor = useTransform(
    scrollY,
    [0, 1],
    ["rgb(107,114,128)", "rgb(59,130,246)"] // 연회색 → 파랑
  );

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      scrollY.set(progress);

      setIsVisible(scrollTop > 1000);
      setAtTop(scrollTop < 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const goBack = () => navigate(-1);

  return (
    <>
      {/* 스크롤 진행 바 */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "5px",
          width: width,
          backgroundColor: barColor,
          zIndex: 2000,
        }}
        transition={{ ease: "easeOut", duration: 0.2 }}
      />

      {/* 스크롤 올리기 버튼 */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            key="scrollToTopBtn"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              bottom: "5%",
              right: "5%",
              padding: "20px",
              borderRadius: "50%",
              border: "1px solid white",
              backgroundColor: "gray",
              color: "black",
              cursor: "pointer",
              zIndex: 1000,
            }}
          >
            👆
          </motion.button>
        )}
      </AnimatePresence>

      {/* 뒤로가기 버튼 */}
      <AnimatePresence>
        {atTop && (
          <motion.button
            key="goBackBtn"
            onClick={goBack}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              bottom: "90%",
              right: "90%",
              padding: "15px",
              borderRadius: "30%",
              border: "1px solid white",
              backgroundColor: "gray",
              color: "black",
              cursor: "pointer",
              zIndex: 1000,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            👈
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollToTop;
