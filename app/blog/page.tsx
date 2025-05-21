import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { FiArrowRight } from "react-icons/fi";

export default function BlogPage() {
  // 示例博客数据，增加标签
  const posts = [
    { id: 1, title: "第一篇博客", desc: "这是第一篇博客的简介。", date: "2024-06-01" },
    { id: 2, title: "第二篇博客", desc: "这是第二篇博客的简介。", date: "2024-05-28" },
    { id: 3, title: "第三篇博客", desc: "这是第三篇博客的简介。", date: "2024-05-20" },
    { id: 4, title: "第四篇博客", desc: "这是第四篇博客的简介。", date: "2024-05-10" },
  ];

  // 日期格式化
  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
  }

  return (
    <main className="px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold">My Blog</h1>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group" tabIndex={-1}>
              <Card className="flex h-full cursor-pointer flex-col transition-colors hover:bg-neutral-50">
                <CardHeader className="pb-2">
                  <div className="mb-1 flex items-center gap-2">
                    {/* tag 移除，仅保留时间 */}
                    <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 pb-4 text-gray-700">{post.desc}</CardContent>
                <CardFooter>
                  <span className="flex items-center gap-1 px-0 py-0 text-sm font-medium text-gray-700 outline-none transition hover:underline hover:decoration-2 hover:underline-offset-4">
                    Read More <FiArrowRight className="inline-block" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
