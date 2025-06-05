"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User,
  Code,
  Heart,
  Coffee,
  Github,
  Mail,
  MapPin,
  Calendar,
  Laptop,
  BookOpen,
  Target,
  Lightbulb,
} from "lucide-react";
import { FaBilibili } from "react-icons/fa6";
import Link from "next/link";

export default function AboutPage() {
  const skills = [
    { name: "React", level: 90, category: "前端" },
    { name: "TypeScript", level: 85, category: "语言" },
    { name: "Next.js", level: 80, category: "框架" },
    { name: "Node.js", level: 75, category: "后端" },
    { name: "TailwindCSS", level: 95, category: "样式" },
    { name: "Python", level: 70, category: "语言" },
  ];

  const interests = [
    { icon: Code, title: "编程开发", desc: "热爱编写优雅的代码" },
    { icon: BookOpen, title: "技术分享", desc: "喜欢分享学习心得" },
    { icon: Coffee, title: "咖啡文化", desc: "咖啡是灵感的源泉" },
    { icon: Laptop, title: "开源项目", desc: "积极参与开源社区" },
  ];

  const timeline = [
    { year: "2024", event: "创建个人博客 YiziSpace", type: "project" },
    { year: "2023", event: "深入学习 React 生态系统", type: "skill" },
    { year: "2022", event: "开始前端开发之旅", type: "career" },
  ];

  return (
    <main className="min-h-screen px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* 个人介绍区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* 左侧文字介绍 */}
            <div className="space-y-6">
              <div>
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                  <span className="flex items-center gap-3">
                    <User className="h-10 w-10 text-primary" />
                    关于我
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Hey! 我是 Joey，一名热爱技术的前端开发工程师
                </p>
              </div>

              <div className="space-y-4 text-muted-foreground">
                <p>
                  🚀 专注于现代前端技术，特别是 React 生态系统。喜欢构建用户体验优秀的 Web 应用，
                  对代码质量和性能优化有着近乎偏执的追求。
                </p>
                <p>
                  💡 相信技术能够改变世界，热衷于学习新技术并将其应用到实际项目中。
                  同时也享受分享知识的过程，希望通过这个博客记录成长轨迹。
                </p>
                <p>☕ 平时除了编程，还喜欢品尝不同产地的咖啡，认为好的咖啡能激发更多创意灵感。</p>
              </div>

              {/* 联系信息 */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild variant="default">
                  <Link href="https://github.com/joeyleedev" target="_blank">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="https://space.bilibili.com/11438085" target="_blank">
                    <FaBilibili className="mr-2 h-4 w-4" />
                    Bilibili
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="mailto:contact@example.com">
                    <Mail className="mr-2 h-4 w-4" />
                    邮箱联系
                  </Link>
                </Button>
              </div>
            </div>

            {/* 右侧信息卡片 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    基本信息
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>前端开发 2+ 年经验</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>目前居住在中国</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <span>热爱开源和技术分享</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    当前专注
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge>React 18</Badge>
                    <Badge>Next.js 14</Badge>
                    <Badge>TypeScript</Badge>
                    <Badge>TailwindCSS</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* 技能展示 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="mb-8 flex items-center text-3xl font-bold">
            <Code className="mr-3 h-8 w-8 text-primary" />
            技能专长
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{skill.name}</h3>
                        <Badge variant="secondary">{skill.category}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>熟练度</span>
                          <span className="font-medium text-primary">{skill.level}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-secondary">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 兴趣爱好 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="mb-8 flex items-center text-3xl font-bold">
            <Lightbulb className="mr-3 h-8 w-8 text-primary" />
            兴趣爱好
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="p-6">
                    <interest.icon className="mx-auto mb-4 h-12 w-12 text-primary" />
                    <h3 className="mb-2 font-semibold">{interest.title}</h3>
                    <p className="text-sm text-muted-foreground">{interest.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 时间线 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="mb-8 flex items-center text-3xl font-bold">
            <Calendar className="mr-3 h-8 w-8 text-primary" />
            成长历程
          </h2>

          <div className="space-y-6">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                    {item.year}
                  </div>
                  {index < timeline.length - 1 && <div className="mt-2 h-16 w-0.5 bg-border"></div>}
                </div>
                <Card className="flex-1">
                  <CardContent className="p-4">
                    <p className="font-medium">{item.event}</p>
                    <Badge variant="outline" className="mt-2">
                      {item.type === "project" && "项目"}
                      {item.type === "skill" && "技能"}
                      {item.type === "career" && "职业"}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 联系我 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Card className="mx-auto max-w-2xl">
            <CardContent className="p-8">
              <h2 className="mb-4 text-2xl font-bold">让我们保持联系</h2>
              <p className="mb-6 text-muted-foreground">
                如果你对我的项目感兴趣，或者想要交流技术，欢迎随时联系我！
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link href="/blog">
                    <BookOpen className="mr-2 h-4 w-4" />
                    阅读我的博客
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="https://github.com/joeyleedev" target="_blank">
                    <Github className="mr-2 h-4 w-4" />
                    查看我的项目
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </main>
  );
}
