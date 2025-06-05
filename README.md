# <div align="center">🌟 YiziSpace</div>

<div align="center">
  <p>一个现代化的个人博客网站，用于记录生活点滴和技术成长</p>
  
  ![Next.js](https://img.shields.io/badge/Next.js-14.1.4-black?style=for-the-badge&logo=next.js)
  ![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
  ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
  
  <p>
    <a href="#预览">预览</a> •
    <a href="#特性">特性</a> •
    <a href="#快速开始">快速开始</a> •
    <a href="#项目结构">项目结构</a> •
    <a href="#贡献">贡献</a>
  </p>
</div>

## ✨ 特性

### 🎯 核心功能
- **📝 Markdown 博客系统** - 支持 MDX，代码高亮，数学公式
- **🔍 智能搜索** - 支持标题、内容、标签的模糊搜索
- **🏷️ 标签系统** - 博客分类管理，支持多标签
- **🌓 主题切换** - 支持明暗主题，系统自适应
- **📱 响应式设计** - 完美适配 PC、平板、手机

### 🚀 技术特性
- **⚡ 性能优化** - Next.js 14 App Router，静态生成
- **🎨 现代 UI** - Shadcn/ui + TailwindCSS，美观易用
- **🔧 开发体验** - TypeScript + ESLint + Prettier
- **📊 SEO 友好** - 自动生成 meta 标签，sitemap
- **🗂️ 文件管理** - 基于文件系统的内容管理

### 🎯 计划功能
- **📡 RSS 订阅** - 自动生成 RSS feed
- **💬 评论系统** - 集成第三方评论服务
- **📈 访问统计** - 页面浏览量统计
- **🔖 阅读进度** - 文章阅读进度条
- **🌍 国际化** - 多语言支持
- **🔄 自动部署** - CI/CD 工作流
- **📧 订阅功能** - 邮件订阅更新
- **🎭 动画效果** - 页面过渡动画

## 🛠️ 技术栈

### 前端框架
- **Next.js 14** - React 全栈框架，App Router
- **React 18** - 用户界面库
- **TypeScript** - 类型安全的 JavaScript

### 样式与 UI
- **TailwindCSS** - 原子化 CSS 框架
- **Shadcn/ui** - 现代化组件库
- **Radix UI** - 无样式组件基础
- **Lucide Icons** - 美观的图标库
- **Framer Motion** - 动画库

### 内容管理
- **MDX** - Markdown + JSX
- **Gray Matter** - Front Matter 解析
- **React Markdown** - Markdown 渲染
- **Highlight.js** - 代码语法高亮

### 开发工具
- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **Next Themes** - 主题管理

## 🚀 快速开始

### 环境要求
- Node.js 18.0 或更高版本
- npm、yarn 或 pnpm

### 安装

```bash
# 克隆项目
git clone https://github.com/joeyleedev/yizi-space.git
cd yizi-space

# 安装依赖
npm install
# 或者
yarn install
# 或者
pnpm install
```

### 开发

```bash
# 启动开发服务器
npm run dev
# 或者
yarn dev
# 或者
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 在浏览器中查看结果。

### 构建

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm run start
```

## 📁 项目结构

```
yizi-space/
├── app/                    # Next.js 14 App Router
│   ├── blog/              # 博客页面
│   ├── about/             # 关于页面
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── ui/               # UI 基础组件 (Shadcn/ui)
│   ├── layout/           # 布局组件
│   ├── theme/            # 主题相关组件
│   └── navigation/       # 导航组件
├── content/              # 博客内容
│   └── posts/           # Markdown 博客文章
├── lib/                 # 工具函数和配置
├── types/               # TypeScript 类型定义
├── styles/              # 样式文件
├── public/              # 静态资源
└── package.json         # 项目配置
```

## 📝 内容管理

### 创建博客文章

在 `content/posts/` 目录下创建 `.md` 或 `.mdx` 文件：

```markdown
---
title: "文章标题"
description: "文章描述"
date: "2024-01-01"
tags: ["技术", "前端"]
author: "作者名"
---

# 文章内容

这里是文章的正文内容...
```

### Front Matter 字段

- `title`: 文章标题（必需）
- `description`: 文章描述
- `date`: 发布日期
- `tags`: 标签数组
- `author`: 作者
- `draft`: 是否为草稿（可选）

## 🎨 自定义

### 修改网站信息

编辑 `lib/constants.ts` 文件：

```typescript
export const SITE_NAME = "你的网站名称";
export const SITE_DESCRIPTION = "你的网站描述";
export const SOCIAL_LINKS = {
  GITHUB: "你的GitHub链接",
  // 添加更多社交链接
};
```

### 自定义主题

修改 `tailwind.config.ts` 中的颜色配置，或在 `app/globals.css` 中添加自定义 CSS 变量。

## 🤝 贡献

欢迎所有形式的贡献！无论是新功能、bug 修复还是文档改进。

### 贡献流程

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 开发规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 和 Prettier 配置
- 编写清晰的提交信息
- 为新功能添加适当的文档

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

## 🙏 致谢

感谢以下优秀的开源项目：

- [Next.js](https://nextjs.org/) - React 框架
- [TailwindCSS](https://tailwindcss.com/) - CSS 框架
- [Shadcn/ui](https://ui.shadcn.com/) - 组件库
- [Radix UI](https://www.radix-ui.com/) - 组件基础
- 以及所有依赖的开源项目

## 📞 联系

- GitHub: [@joeyleedev](https://github.com/joeyleedev)
- Bilibili: [个人空间](https://space.bilibili.com/11438085)

---

<div align="center">
  如果这个项目对你有帮助，请给个 ⭐️ 支持一下！
</div>
