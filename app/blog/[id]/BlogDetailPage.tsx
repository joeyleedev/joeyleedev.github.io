import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./markdown-overrides.css";
import "github-markdown-css/github-markdown.css";
import BlogDetailClient from "./BlogDetailClient";

function removeFirstH1(markdown: string): string {
  // 匹配第一个以 # 开头的一级标题并移除（不要求在首行）
  return markdown.replace(/^# .+$(\r?\n)?/m, "");
}

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const postsDir = path.join(process.cwd(), "app/blog/posts");
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  let filePath = "";
  for (const file of files) {
    if (file.replace(/\.md$/, "") === params.id) {
      filePath = path.join(postsDir, file);
      break;
    }
  }
  if (!filePath) return notFound();
  let content = "";
  let data: any = {};
  try {
    const file = fs.readFileSync(filePath, "utf8");
    const parsed = matter(file);
    content = parsed.content;
    data = parsed.data;
  } catch (e) {
    return notFound();
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
  }

  // 自动隐藏正文第一个 # 一级标题
  const contentWithoutFirstH1 = removeFirstH1(content);

  return (
    <main className="px-4 py-8">
      <BlogDetailClient />
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="group relative mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-gray-100"
        >
          <span className="group-hover:animate-wiggle inline-block font-mono text-lg transition-transform group-hover:-translate-x-1">
            ../
          </span>
          <span className="sr-only">返回博客列表</span>
        </Link>
        <h1 className="mb-2 text-4xl font-extrabold leading-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          {data.title}
        </h1>
        <div className="mb-8 text-xs text-gray-400 dark:text-gray-500">{formatDate(data.date)}</div>
        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{contentWithoutFirstH1}</ReactMarkdown>
        </div>
      </div>
    </main>
  );
}
