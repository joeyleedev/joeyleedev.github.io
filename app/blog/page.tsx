import { Suspense } from "react";
import BlogClient from "./BlogClient";
import { getAllPosts } from "@/lib/utils/blog";
import { BookOpen } from "lucide-react";

function BlogLoading() {
  return (
    <main className="min-h-screen px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className="flex items-center justify-center gap-3">
              <BookOpen className="h-10 w-10 animate-pulse text-primary" />
              博客文章
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">正在加载文章...</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-64 rounded-lg bg-muted"></div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogClient posts={posts} />
    </Suspense>
  );
}
