import { Clock, Eye, List, ChevronLeft, ChevronRight, ArrowUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BlogDetailLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* 主内容区域 */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 顶部导航 */}
        <div className="mb-8 flex items-center justify-between">
          <div className="group relative inline-flex items-center gap-1 text-sm text-gray-500">
            <span className="inline-block font-mono text-lg">../</span>
          </div>
        </div>

        <div className="relative lg:flex lg:gap-8">
          {/* 文章内容 */}
          <article className="min-w-0 flex-1 lg:max-w-4xl">
            {/* 文章头部 */}
            <header className="mb-12">
              {/* 标题骨架 */}
              <div className="mb-4 space-y-3">
                <div className="h-9 w-3/4 animate-pulse rounded bg-muted sm:h-10"></div>
                <div className="h-9 w-1/2 animate-pulse rounded bg-muted sm:h-10"></div>
              </div>

              {/* 元信息骨架 */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div className="h-4 w-24 animate-pulse rounded bg-muted"></div>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <div className="h-4 w-32 animate-pulse rounded bg-muted"></div>
                </div>
              </div>
            </header>

            {/* 文章内容骨架 */}
            <div className="prose prose-gray max-w-none">
              <div className="space-y-4">
                {/* 段落骨架 */}
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                    <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                    <div className="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
                    {i % 3 === 0 && <div className="h-2"></div>} {/* 段落间距 */}
                  </div>
                ))}

                {/* 标题骨架 */}
                <div className="mt-8 space-y-4">
                  <div className="h-8 w-2/3 animate-pulse rounded bg-muted"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                    <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                    <div className="h-4 w-5/6 animate-pulse rounded bg-muted"></div>
                  </div>
                </div>

                {/* 代码块骨架 */}
                <div className="mt-6">
                  <div className="h-32 w-full animate-pulse rounded-lg bg-muted"></div>
                </div>

                {/* 更多段落 */}
                {[...Array(8)].map((_, i) => (
                  <div key={`para-${i}`} className="space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                    <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                    <div className="h-4 w-4/5 animate-pulse rounded bg-muted"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* 文章导航骨架 */}
            <div className="mt-16 border-t pt-12">
              <div className="grid gap-6 md:grid-cols-2">
                {/* 上一篇骨架 */}
                <Card className="p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <ChevronLeft className="h-4 w-4" />
                    上一篇
                  </div>
                  <div className="space-y-2">
                    <div className="h-5 w-full animate-pulse rounded bg-muted"></div>
                    <div className="h-5 w-2/3 animate-pulse rounded bg-muted"></div>
                  </div>
                </Card>

                {/* 下一篇骨架 */}
                <Card className="p-4">
                  <div className="mb-2 flex items-center justify-end gap-2 text-sm text-muted-foreground">
                    下一篇
                    <ChevronRight className="h-4 w-4" />
                  </div>
                  <div className="space-y-2 text-right">
                    <div className="ml-auto h-5 w-full animate-pulse rounded bg-muted"></div>
                    <div className="ml-auto h-5 w-3/4 animate-pulse rounded bg-muted"></div>
                  </div>
                </Card>
              </div>
            </div>
          </article>

          {/* 侧边栏目录骨架 - 仅桌面端显示 */}
          <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <Card className="p-4">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold">
                  <List className="h-4 w-4" />
                  目录
                </h3>
                <nav className="space-y-1">
                  {/* 目录项骨架 */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="block w-full rounded px-2 py-1.5"
                      style={{ paddingLeft: `${(i % 3) * 12 + 8}px` }}
                    >
                      <div
                        className="h-4 animate-pulse rounded bg-muted"
                        style={{ width: `${80 + (i % 4) * 20}%` }}
                      ></div>
                    </div>
                  ))}
                </nav>
              </Card>
            </div>
          </aside>
        </div>
      </div>

      {/* 回到顶部按钮骨架 */}
      <div className="fixed bottom-8 right-8 z-30">
        <Button
          size="icon"
          className="h-12 w-12 rounded-full bg-white/95 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-sm dark:bg-gray-800/90 dark:ring-gray-700/50"
          disabled
        >
          <ArrowUp className="h-5 w-5 animate-pulse" />
        </Button>
      </div>
    </div>
  );
}
