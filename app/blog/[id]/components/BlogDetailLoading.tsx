import { BookOpen } from "lucide-react";

export default function BlogDetailLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* 导航区域 */}
      <div className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="h-6 w-24 animate-pulse rounded bg-muted"></div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* 侧边栏占位 */}
          <div className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-8">
              <div className="mb-4 h-6 w-20 animate-pulse rounded bg-muted"></div>
              <div className="space-y-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-4 w-full animate-pulse rounded bg-muted"></div>
                ))}
              </div>
            </div>
          </div>

          {/* 主内容区域 */}
          <div className="lg:col-span-9">
            {/* 文章头部 */}
            <div className="mb-8">
              <div className="mb-4 h-12 w-3/4 animate-pulse rounded bg-muted"></div>
              <div className="flex items-center gap-4">
                <div className="h-4 w-24 animate-pulse rounded bg-muted"></div>
                <div className="h-4 w-32 animate-pulse rounded bg-muted"></div>
              </div>
            </div>

            {/* 文章内容 */}
            <div className="space-y-4">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="h-4 w-full animate-pulse rounded bg-muted"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
