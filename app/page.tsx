"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code, Github, Laptop, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SOCIAL_LINKS } from "@/lib/constants";

// 技能数据
const skills = [
  { name: "React", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "Next.js", level: 80 },
  { name: "Node.js", level: 75 },
  { name: "TailwindCSS", level: 95 },
];

// 代码示例
const codeLines = [
  "function HelloWorld() {",
  '  const [greeting, setGreeting] = useState("Hello");',
  "  ",
  "  useEffect(() => {",
  "    const timer = setTimeout(() => {",
  '      setGreeting("Welcome to");',
  "    }, 1500);",
  "    ",
  "    return () => clearTimeout(timer);",
  "  }, []);",
  "  ",
  "  return (",
  '    <h1>{greeting} <span className="text-blue-500">',
  "      Yizi Space",
  "    </span></h1>",
  "  );",
  "}",
];

export default function Home() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  // 模拟代码输入效果
  useEffect(() => {
    if (currentLine < codeLines.length) {
      const timeout = setTimeout(
        () => {
          setDisplayedLines((prev) => [...prev, codeLines[currentLine]]);
          setCurrentLine((prev) => prev + 1);

          // 自动滚动到底部
          if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
          }
        },
        Math.random() * 200 + 50
      ); // 随机打字速度，更真实

      return () => clearTimeout(timeout);
    }
  }, [currentLine]);

  return (
    <main className="min-h-screen px-4 py-12 sm:px-8">
      {/* 英雄区域 */}
      <section className="mb-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              <span className="block">Hey, I&apos;m Joey</span>
              <span className="mt-2 block text-primary">Full-Stack Developer</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              构建美观、高性能的现代网络应用，专注于React生态系统和TypeScript。
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg">
                <Link href="/blog">
                  浏览博客 <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">关于我</Link>
              </Button>
            </div>
          </motion.div>

          {/* 代码终端 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <Card className="overflow-hidden border-zinc-800 bg-zinc-900 shadow-xl">
              {/* 终端顶部栏 */}
              <div className="flex items-center gap-1.5 bg-zinc-800 px-4 py-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-sm text-zinc-400">~/yizi-space</span>
              </div>

              {/* 终端内容 */}
              <div
                ref={terminalRef}
                className="h-80 overflow-y-auto p-4 font-mono text-sm text-green-400"
              >
                <div className="flex">
                  <span className="mr-2 text-blue-400">$</span>
                  <span className="text-zinc-300">cat Welcome.tsx</span>
                </div>
                <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-xs sm:text-sm">
                  <code>
                    {displayedLines.map((line, index) => (
                      <div key={index} className="leading-relaxed">
                        {line}
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* 技能区域 */}
      <section className="mx-auto mb-20 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-8 flex items-center text-3xl font-bold">
            <Code className="mr-2" /> 技术栈
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium md:text-lg">{skill.name}</span>
                    <span className="text-sm font-semibold text-primary">{skill.level}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary/30 dark:bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 项目展示 */}
      <section className="mx-auto mb-20 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-8 flex items-center text-3xl font-bold">
            <Laptop className="mr-2" /> 最新项目
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full overflow-hidden border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/10">
                    <div className="bg-grid-pattern absolute inset-0 opacity-10"></div>
                    <Terminal size={48} className="text-primary/60" />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">项目 {i + 1}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      使用 Next.js 和 TailwindCSS 构建的现代网络应用。
                    </p>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" size="sm" asChild className="group">
                      <Link href="#" className="flex items-center">
                        <Github className="mr-1 h-4 w-4 transition-transform group-hover:scale-110" />{" "}
                        源码
                      </Link>
                    </Button>
                    <Button size="sm" asChild className="group">
                      <Link href="#" className="flex items-center">
                        查看{" "}
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 联系区域 */}
      <section className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-primary/10">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background"></div>
            <div className="bg-grid-pattern absolute inset-0 opacity-5"></div>
            <div className="relative p-8 md:p-12">
              <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="space-y-4 md:max-w-md">
                  <h2 className="text-3xl font-bold">Let&apos;s Connect</h2>
                  <p className="text-muted-foreground">
                    有问题想讨论？或者只是想打个招呼？欢迎随时通过以下方式联系我。
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="group relative h-12 w-12 rounded-full p-0 hover:bg-primary/10"
                  >
                    <a
                      href="https://github.com/joeyleedev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-full w-full items-center justify-center"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5 transition-transform group-hover:scale-110" />
                    </a>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100">
                      GitHub
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="group relative h-12 w-12 rounded-full p-0 hover:bg-primary/10"
                  >
                    <a
                      href="https://x.com/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-full w-full items-center justify-center"
                      aria-label="X (Twitter)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 transition-transform group-hover:scale-110"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100">
                      X
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="group relative h-12 w-12 rounded-full p-0 hover:bg-primary/10"
                  >
                    <a
                      href="https://linkedin.com/in/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-full w-full items-center justify-center"
                      aria-label="LinkedIn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 transition-transform group-hover:scale-110"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100">
                      LinkedIn
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="group relative h-12 w-12 rounded-full p-0 hover:bg-primary/10"
                  >
                    <a
                      href="mailto:your-email@example.com"
                      className="flex h-full w-full items-center justify-center"
                      aria-label="Email"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 transition-transform group-hover:scale-110"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </a>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100">
                      Email
                    </span>
                  </Button>
                </div>
              </div>

              <div className="mt-10 flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  <a href="/about" className="flex items-center">
                    了解更多关于我的信息 <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
