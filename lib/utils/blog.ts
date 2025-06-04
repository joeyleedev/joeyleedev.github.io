import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/types/blog";

/**
 * 获取所有博客文章
 */
export function getAllPosts(): Post[] {
  const postsDir = path.join(process.cwd(), "content/posts");
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const filePath = path.join(postsDir, file);
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(filePath, "utf8");
      const { data } = matter(raw);

      return {
        ...(data as { title: string; date: string; desc: string }),
        id: slug,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * 获取单篇博客文章内容
 */
export function getPostById(id: string): { content: string; data: any } | null {
  const postsDir = path.join(process.cwd(), "content/posts");
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  let filePath = "";
  for (const file of files) {
    if (file.replace(/\.md$/, "") === id) {
      filePath = path.join(postsDir, file);
      break;
    }
  }

  if (!filePath) return null;

  try {
    const file = fs.readFileSync(filePath, "utf8");
    const parsed = matter(file);
    return {
      content: parsed.content,
      data: parsed.data,
    };
  } catch (e) {
    return null;
  }
}

/**
 * 移除Markdown文本中的第一个H1标题
 */
export function removeFirstH1(markdown: string): string {
  // 匹配第一个以 # 开头的一级标题并移除（不要求在首行）
  return markdown.replace(/^# .+$(\r?\n)?/m, "");
}
