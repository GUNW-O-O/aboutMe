import React, { useState } from 'react'
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ScrollToTop: React.FC = () => {

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const [atTop, setAtTop] = useState(true);

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
      if (window.scrollY < 300) {
        setAtTop(true);
      } else {
        setAtTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 스크롤
    });
  };

  const goBack = () => {
    navigate(-1);
  }


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
            border: "1px solid white",
            backgroundColor: "gray",
            color: "black",
            cursor: "pointer",
            zIndex: "1000",
          }}
        >
          👆
        </button>
      )}
      {atTop && (
        <button
          onClick={goBack}
          style={{
            position: "fixed",
            bottom: "90%",
            right: "90%",
            padding: "15px 15px",
            borderRadius: "30%",
            border: "1px solid white",
            backgroundColor: "gray",
            color: "black",
            cursor: "pointer",
            zIndex: "1000",
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          👈
        </button>
      )}
    </>
  );
}

export default ScrollToTop