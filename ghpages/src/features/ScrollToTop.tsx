import React, { useState } from 'react'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {

  const { pathname } = useLocation();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1000) { // 300px 이상 내려오면 버튼 표시
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 스크롤
    });
  };


  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "5%",
            right: "5%",
            padding: "20px 20px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "white",
            color: "black",
            cursor: "pointer",
            zIndex: "1000",
          }}
        >
          👆
        </button>
      )}
    </>
  );
}

export default ScrollToTop