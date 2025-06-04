import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css/github-markdown.css";
import "@/styles/markdown.css";
import { getPostById, removeFirstH1 } from "@/lib/utils/blog";
import { formatDate } from "@/lib/utils/date";

interface BlogPostProps {
  id: string;
}

export default function BlogPost({ id }: BlogPostProps) {
  const post = getPostById(id);

  if (!post) {
    return notFound();
  }

  const { content, data } = post;

  // 自动隐藏正文第一个 # 一级标题
  const contentWithoutFirstH1 = removeFirstH1(content);

  return (
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
  );
}
