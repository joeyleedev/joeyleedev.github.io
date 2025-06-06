"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function Logo({ width = 32, height = 32, className, priority = false }: LogoProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 确保组件在客户端挂载后再渲染，避免水合不匹配
  useEffect(() => {
    setMounted(true);
  }, []);

  // 在挂载前显示默认logo，避免闪烁
  if (!mounted) {
    return (
      <Image
        src="/logo-light-bold.svg"
        alt="Yizi Space Logo"
        width={width}
        height={height}
        className={className}
        priority={priority}
      />
    );
  }

  // 根据解析后的主题选择对应的logo
  const logoSrc = resolvedTheme === "dark" ? "/logo-dark-bold.svg" : "/logo-light-bold.svg";

  return (
    <Image
      src={logoSrc}
      alt="Yizi Space Logo"
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
