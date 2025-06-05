"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Edit, Trash2, Eye } from "lucide-react";

// 这是一个概念原型，展示管理界面可能的样子
export default function AdminPage() {
  const [posts, setPosts] = useState([
    {
      id: "2024-06-01-first-blog",
      title: "第一篇博客",
      date: "2024-06-01",
      status: "published",
      tags: ["技术", "前端"],
    },
    {
      id: "2024-05-28-second-blog",
      title: "第二篇博客",
      date: "2024-05-28",
      status: "draft",
      tags: ["生活"],
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl">
        {/* 头部 */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">博客管理</h1>
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            新建文章
          </Button>
        </div>

        {/* 统计卡片 */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">12</div>
              <p className="text-gray-600">总文章数</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">8</div>
              <p className="text-gray-600">已发布</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">4</div>
              <p className="text-gray-600">草稿</p>
            </CardContent>
          </Card>
        </div>

        {/* 文章列表 */}
        <Card>
          <CardHeader>
            <CardTitle>文章列表</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-gray-500">{post.date}</p>
                    <div className="mt-2 flex gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={post.status === "published" ? "default" : "secondary"}>
                      {post.status === "published" ? "已发布" : "草稿"}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 注意提示 */}
        <div className="mt-8 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            ⚠️ 这是一个概念原型。实际实现需要添加文件操作API和安全认证。
          </p>
        </div>
      </div>
    </div>
  );
}
