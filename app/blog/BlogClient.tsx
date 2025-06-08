"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Calendar, Tag, X, RotateCcw } from "lucide-react";
import { formatDate } from "@/lib/utils/date";

interface Post {
  id: string;
  title: string;
  desc: string;
  date: string;
}

interface BlogClientProps {
  posts: Post[];
}

export default function BlogClient({ posts }: BlogClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  // 从 URL 参数获取搜索词
  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchTerm(search);
    } else {
      setSearchTerm("");
    }
  }, [searchParams]);

  // 简单的搜索过滤
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 清除搜索
  const clearSearch = () => {
    router.push("/blog");
  };

  // 获取所有标签（暂时模拟，后续可以从posts中提取）
  const tags = ["技术", "前端", "生活", "思考"];

  return (
    <main className="min-h-screen px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* 页面头部 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className="flex items-center justify-center gap-3">
              <BookOpen className="h-10 w-10 text-primary" />
              博客文章
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            记录技术成长，分享开发心得，探索前端世界的无限可能
          </p>

          {/* 搜索状态和快速操作 */}
          {searchTerm && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 space-y-3"
            >
              {/* 搜索结果提示 */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                搜索 &ldquo;{searchTerm}&rdquo; 的结果：{filteredPosts.length} 篇文章
              </div>

              {/* 快速操作按钮 */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearSearch}
                  className="h-8 gap-1.5 text-xs"
                >
                  <X className="h-3 w-3" />
                  清除搜索
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="h-3 w-3" />
                  查看全部文章
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* 面包屑导航 */}
        {searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mb-8"
          >
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="h-auto p-0 text-sm font-normal text-muted-foreground hover:text-foreground hover:underline"
              >
                全部文章
              </Button>
              <span>/</span>
              <span className="text-foreground">搜索结果</span>
            </nav>
          </motion.div>
        )}

        {/* 统计信息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{posts.length}</div>
                <div className="text-sm text-muted-foreground">总文章数</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{filteredPosts.length}</div>
                <div className="text-sm text-muted-foreground">
                  {searchTerm ? "搜索结果" : "已发布"}
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{tags.length}</div>
                <div className="text-sm text-muted-foreground">标签数量</div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* 标签云 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="mb-4 flex items-center gap-3">
            <Tag className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">标签</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              >
                <Badge
                  variant="secondary"
                  className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 文章列表 */}
        <div className="blog-card-grid">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="h-full"
            >
              <Link href={`/blog/${post.id}`} className="group block h-full">
                <Card className="flex h-full min-h-[360px] flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group-hover:border-primary/50">
                  <CardHeader className="flex-shrink-0 pb-3">
                    <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {formatDate(post.date)}
                    </div>
                    <CardTitle className="line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-tight transition-colors group-hover:text-primary">
                      {post.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1 pb-4">
                    <p className="line-clamp-4 min-h-[5.5rem] text-sm leading-relaxed text-muted-foreground">
                      {post.desc}
                    </p>
                  </CardContent>

                  <CardFooter className="flex-shrink-0 pt-0">
                    <div className="flex items-center gap-2 text-sm font-medium text-primary transition-all group-hover:gap-3">
                      阅读更多
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 空状态 */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center"
          >
            <BookOpen className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">
              {searchTerm ? "没有找到相关文章" : "暂无文章"}
            </h3>
            <p className="mb-4 text-muted-foreground">
              {searchTerm ? "试试调整搜索关键词或查看全部文章" : "敬请期待更多精彩内容"}
            </p>
            {searchTerm && (
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button onClick={clearSearch} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  查看全部文章
                </Button>
                <Button variant="outline" onClick={clearSearch} className="gap-2">
                  <X className="h-4 w-4" />
                  清除搜索条件
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}
