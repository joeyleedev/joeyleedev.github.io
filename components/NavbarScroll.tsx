"use client";

import { useEffect, useState } from "react";

export default function NavbarScroll() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);

        // 获取navbar元素并添加/移除样式
        const navbar = document.querySelector("nav");
        if (navbar) {
          if (isScrolled) {
            navbar.classList.add("scrolled");
          } else {
            navbar.classList.remove("scrolled");
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // 初始检查
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return null; // 这个组件不渲染任何UI
}
