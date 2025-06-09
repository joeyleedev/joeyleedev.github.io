import { Suspense } from "react";
import BlogClient from "./BlogClient";
import { getAllPosts } from "@/lib/utils/blog";
import { BookOpen, Calendar, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";

function BlogLoading() {
  return (
    <main className="min-h-screen px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* 页面头部 */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className="flex items-center justify-center gap-3">
              <BookOpen className="h-10 w-10 animate-pulse text-primary" />
              博客文章
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            记录技术成长，分享开发心得，探索前端世界的无限可能
          </p>
        </div>

        {/* 统计信息骨架 */}
        <div className="mb-12">
          <div className="grid gap-6 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="p-4">
                <div className="text-center">
                  <div className="mx-auto mb-2 h-8 w-12 animate-pulse rounded bg-muted"></div>
                  <div className="mx-auto h-4 w-16 animate-pulse rounded bg-muted"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 标签云骨架 */}
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <Tag className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">标签</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-6 w-12 animate-pulse rounded-full bg-muted"
                style={{ width: `${60 + i * 20}px` }}
              ></div>
            ))}
          </div>
        </div>

        {/* 文章列表骨架 */}
        <div className="blog-card-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-full">
              <Card className="flex h-full min-h-[360px] flex-col overflow-hidden">
                {/* 卡片头部骨架 */}
                <div className="flex-shrink-0 p-6 pb-3">
                  {/* 日期骨架 */}
                  <div className="mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="h-4 w-24 animate-pulse rounded bg-muted"></div>
                  </div>
                  {/* 标题骨架 */}
                  <div className="space-y-2">
                    <div className="h-6 w-full animate-pulse rounded bg-muted"></div>
                    <div className="h-6 w-3/4 animate-pulse rounded bg-muted"></div>
                  </div>
                </div>

                {/* 内容骨架 */}
                <div className="flex-1 px-6 pb-4">
                  <div className="space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                    <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                    <div className="h-4 w-5/6 animate-pulse rounded bg-muted"></div>
                    <div className="h-4 w-4/6 animate-pulse rounded bg-muted"></div>
                  </div>
                </div>

                {/* 底部骨架 */}
                <div className="flex-shrink-0 px-6 pb-6">
                  <div className="h-4 w-20 animate-pulse rounded bg-muted"></div>
                </div>
              </Card>
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
