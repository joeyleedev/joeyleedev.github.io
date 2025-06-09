"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowUp, ChevronLeft, ChevronRight, Clock, Eye, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils/date";
import { Post } from "@/types/blog";
import "github-markdown-css/github-markdown.css";
import "@/styles/markdown.css";

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface BlogDetailClientProps {
  post: { content: string; data: any };
  postId: string;
  prevPost: Post | null;
  nextPost: Post | null;
}

// 移除Markdown文本中的第一个H1标题
function removeFirstH1(markdown: string): string {
  return markdown.replace(/^# .+$(\r?\n)?/m, "");
}

export default function BlogDetailClient({
  post,
  postId,
  prevPost,
  nextPost,
}: BlogDetailClientProps) {
  const [toc, setToc] = useState<TableOfContentsItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const { content, data } = post;
  const contentWithoutFirstH1 = removeFirstH1(content);

  // 生成目录
  useEffect(() => {
    const headings = contentWithoutFirstH1.match(/^#{1,6}\s+.+$/gm) || [];
    const tocItems: TableOfContentsItem[] = headings.map((heading, index) => {
      const level = (heading.match(/^#+/) || [""])[0].length;
      const title = heading.replace(/^#+\s+/, "");
      const id = `heading-${index}`;
      return { id, title, level };
    });
    setToc(tocItems);
  }, [contentWithoutFirstH1]);

  // 监听滚动，更新活跃的标题和滚动状态
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);

      const headingElements = document.querySelectorAll('[id^="heading-"]');
      let current = "";
      headingElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 150) {
          current = element.id;
        }
      });
      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 滚动到指定标题
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // 计算目标位置，考虑页面底部情况
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.scrollY;
      const middlePosition = absoluteElementTop - window.innerHeight / 2;

      window.scrollTo({
        top: Math.max(0, middlePosition),
        behavior: "smooth",
      });
    }
  };

  // 自定义Markdown组件
  const components = {
    h1: ({ children, ...props }: any) => {
      const index = toc.findIndex((item) => item.title === children);
      const id = index >= 0 ? toc[index].id : "";
      return (
        <h1 id={id} {...props}>
          {children}
        </h1>
      );
    },
    h2: ({ children, ...props }: any) => {
      const index = toc.findIndex((item) => item.title === children);
      const id = index >= 0 ? toc[index].id : "";
      return (
        <h2 id={id} {...props}>
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }: any) => {
      const index = toc.findIndex((item) => item.title === children);
      const id = index >= 0 ? toc[index].id : "";
      return (
        <h3 id={id} {...props}>
          {children}
        </h3>
      );
    },
    h4: ({ children, ...props }: any) => {
      const index = toc.findIndex((item) => item.title === children);
      const id = index >= 0 ? toc[index].id : "";
      return (
        <h4 id={id} {...props}>
          {children}
        </h4>
      );
    },
    h5: ({ children, ...props }: any) => {
      const index = toc.findIndex((item) => item.title === children);
      const id = index >= 0 ? toc[index].id : "";
      return (
        <h5 id={id} {...props}>
          {children}
        </h5>
      );
    },
    h6: ({ children, ...props }: any) => {
      const index = toc.findIndex((item) => item.title === children);
      const id = index >= 0 ? toc[index].id : "";
      return (
        <h6 id={id} {...props}>
          {children}
        </h6>
      );
    },
    // 表格组件 - 添加响应式容器
    table: ({ children, ...props }: any) => {
      return (
        <div className="table-container">
          <table {...props}>{children}</table>
        </div>
      );
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 主内容区域 */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 顶部导航 */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/blog"
            className="group relative inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-gray-100"
          >
            <span className="group-hover:animate-wiggle inline-block font-mono text-lg transition-transform group-hover:-translate-x-1">
              ../
            </span>
            <span className="sr-only">返回博客列表</span>
          </Link>
        </div>

        <div className="relative lg:flex lg:gap-8">
          {/* 文章内容 */}
          <article className="min-w-0 flex-1 lg:max-w-4xl">
            {/* 文章头部 */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h1 className="mb-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                {data.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {formatDate(data.date)}
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  阅读时间约 {Math.ceil(content.length / 500)} 分钟
                </div>
              </div>
            </motion.header>

            {/* 文章内容 */}
            <motion.div
              ref={contentRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="markdown-body prose prose-gray prose-headings:scroll-mt-20 max-w-none"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                {contentWithoutFirstH1}
              </ReactMarkdown>
            </motion.div>

            {/* 文章导航 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-16 border-t pt-12"
            >
              <div className="grid gap-6 md:grid-cols-2">
                {prevPost && (
                  <Link href={`/blog/${prevPost.id}`}>
                    <Card className="group p-4 transition-all hover:border-primary/50 hover:shadow-md">
                      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <ChevronLeft className="h-4 w-4" />
                        上一篇
                      </div>
                      <h3 className="text-base font-medium transition-colors group-hover:text-primary">
                        {prevPost.title}
                      </h3>
                    </Card>
                  </Link>
                )}

                {nextPost && (
                  <Link href={`/blog/${nextPost.id}`} className={!prevPost ? "md:col-start-2" : ""}>
                    <Card className="group p-4 transition-all hover:border-primary/50 hover:shadow-md">
                      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground md:justify-end">
                        <ChevronRight className="h-4 w-4 md:order-2" />
                        <span className="md:order-1">下一篇</span>
                      </div>
                      <h3 className="text-base font-medium transition-colors group-hover:text-primary md:text-right">
                        {nextPost.title}
                      </h3>
                    </Card>
                  </Link>
                )}
              </div>
            </motion.div>
          </article>

          {/* 侧边栏目录 - 仅桌面端显示 */}
          {toc.length > 0 && (
            <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0">
              <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <Card className="p-4">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold">
                    <List className="h-4 w-4" />
                    目录
                  </h3>
                  <nav className="space-y-1">
                    {toc.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToHeading(item.id)}
                        className={`block w-full rounded px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted hover:text-primary ${
                          activeId === item.id
                            ? "border-l-2 border-primary bg-primary/10 font-medium text-primary"
                            : "text-muted-foreground"
                        }`}
                        style={{ paddingLeft: `${(item.level - 1) * 12 + 8}px` }}
                        title={item.title}
                      >
                        <span className="line-clamp-2">{item.title}</span>
                      </button>
                    ))}
                  </nav>
                </Card>
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* 回到顶部按钮 */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-30"
          >
            <Button
              size="icon"
              onClick={scrollToTop}
              className="group h-12 w-12 rounded-full bg-white/95 text-gray-700 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-gray-900 hover:shadow-xl hover:ring-gray-300 dark:bg-gray-800/90 dark:text-gray-300 dark:ring-gray-700/50 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:hover:ring-gray-600"
              title="返回顶部"
            >
              <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
