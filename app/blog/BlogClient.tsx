"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, BookOpen, Calendar, Search, Tag } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");

  // 简单的搜索过滤
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        </motion.div>

        {/* 搜索和统计区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="grid gap-6 md:grid-cols-3">
            {/* 搜索框 */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索文章标题或内容..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* 统计信息 */}
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{posts.length}</div>
                <div className="text-sm text-muted-foreground">篇文章</div>
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
            <h3 className="mb-2 text-lg font-semibold">没有找到相关文章</h3>
            <p className="text-muted-foreground">试试调整搜索关键词</p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
