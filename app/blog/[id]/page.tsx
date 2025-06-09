import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import BlogDetailClient from "./BlogDetailClient";
import { getAllPosts, getPostById } from "@/lib/utils/blog";
import BlogDetailLoading from "./components/BlogDetailLoading";
import { SITE_NAME } from "@/lib/constants";

// 为静态导出生成所有可能的参数
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    id: post.id,
  }));
}

// 生成动态元数据
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = getPostById(params.id);

  if (!post) {
    return {
      title: "文章未找到",
      description: "您访问的文章不存在",
    };
  }

  const { data } = post;

  return {
    title: `${data.title} - ${SITE_NAME}`,
    description: data.desc || data.title,
    keywords: ["技术博客", "前端开发", "编程", data.title],
    authors: [{ name: "Joey Lee" }],
    openGraph: {
      title: data.title,
      description: data.desc || data.title,
      type: "article",
      publishedTime: data.date,
      authors: ["Joey Lee"],
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.desc || data.title,
    },
    alternates: {
      canonical: `/blog/${params.id}`,
    },
  };
}

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const post = getPostById(params.id);

  if (!post) {
    return notFound();
  }

  const posts = getAllPosts();
  const currentIndex = posts.findIndex((p) => p.id === params.id);
  // 上一篇：更新的文章（index - 1）
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  // 下一篇：更旧的文章（index + 1）
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <Suspense fallback={<BlogDetailLoading />}>
      <BlogDetailClient post={post} postId={params.id} prevPost={prevPost} nextPost={nextPost} />
    </Suspense>
  );
}
