"use client";

import { useEffect, useState } from "react";
import { ChevronUpIcon } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // 监听滚动事件，决定按钮是否显示
  useEffect(() => {
    const toggleVisibility = () => {
      // 当页面滚动超过300px时显示按钮
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // 清理函数
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 滚动到顶部的函数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 平滑滚动
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 flex h-10 w-10 animate-fade-in items-center justify-center rounded-md bg-gray-200/80 p-2 text-gray-700 shadow-md transition-all duration-300 hover:-translate-y-1 hover:transform hover:bg-gray-300 hover:shadow-lg dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="回到顶部"
        >
          <ChevronUpIcon className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
