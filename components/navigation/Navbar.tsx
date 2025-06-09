"use client";

import { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaBilibili } from "react-icons/fa6";
import { ModeToggle } from "@/components/theme/ModeToggle";
import NavbarScroll from "@/components/navigation/NavbarScroll";
import { Search, X, RotateCcw, Menu, Home, BookOpen, User, Globe } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // 检查当前是否在搜索状态
  const currentSearch = searchParams.get("search");
  const isInSearchMode = !!currentSearch;

  // 导航链接配置
  const navLinks = [
    { name: "首页", path: "/", icon: Home },
    { name: "博客", path: "/blog", icon: BookOpen },
    { name: "关于", path: "/about", icon: User },
  ];

  // 监听滚动状态
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 当对话框打开时，如果当前有搜索状态，则预填充搜索框
  useEffect(() => {
    if (isSearchOpen && currentSearch) {
      setSearchTerm(currentSearch);
    }
  }, [isSearchOpen, currentSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // 跳转到博客页面并传递搜索参数
      router.push(`/blog?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
      setSearchTerm("");
    }
  };

  const clearCurrentSearch = () => {
    router.push("/blog");
    setIsSearchOpen(false);
    setSearchTerm("");
  };

  // 键盘快捷键支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K 打开搜索
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      // ESC 关闭搜索
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  const isCurrentPath = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <NavbarScroll />
      <nav
        className={`sticky top-0 z-50 w-full border-b transition-all duration-200 ease-in-out ${
          isScrolled
            ? "border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            : "border-transparent bg-background/90 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          {/* 左侧：Logo + 桌面端导航 */}
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
              <Logo width={32} height={32} priority />
              <h1 className="ml-2 text-xl font-bold">YIZISPACE</h1>
            </Link>

            {/* 桌面端导航链接 - 紧挨着Logo */}
            <div className="ml-8 hidden items-center space-x-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isCurrentPath(link.path)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* 右侧工具栏 */}
          <div className="flex items-center gap-2">
            {/* 桌面端搜索框 - 类似 Next.js 官网 */}
            <div className="hidden md:block">
              <Button
                variant="outline"
                onClick={() => setIsSearchOpen(true)}
                className={`h-9 min-w-[200px] justify-start gap-2 px-3 text-muted-foreground hover:text-foreground lg:min-w-[280px] ${
                  isInSearchMode ? "border-primary bg-primary/5" : ""
                }`}
              >
                <Search className="h-4 w-4" />
                <span className="text-sm">
                  {isInSearchMode ? `搜索: ${currentSearch}` : "搜索文章..."}
                </span>
                <div className="ml-auto flex items-center gap-1">
                  <kbd className="hidden items-center gap-1 rounded border bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground lg:inline-flex">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </div>
              </Button>
            </div>

            {/* 移动端搜索按钮 */}
            <Button
              variant={isInSearchMode ? "default" : "ghost"}
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="h-9 w-9 md:hidden"
              title={isInSearchMode ? `当前搜索: ${currentSearch}` : "搜索 (Ctrl+K)"}
            >
              <Search className="h-4 w-4" />
              {/* 搜索状态指示器 */}
              {isInSearchMode && (
                <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary"></div>
              )}
            </Button>

            {/* 主题切换 */}
            <ModeToggle />

            {/* 社交媒体链接 */}
            <Button className="hidden h-9 w-9 md:flex" variant="ghost" size="icon" asChild>
              <Link
                href="https://space.bilibili.com/11438085"
                target="_blank"
                rel="noopener noreferrer"
                title="Bilibili"
              >
                <FaBilibili className="h-4 w-4" />
              </Link>
            </Button>
            <Button className="hidden h-9 w-9 md:flex" variant="ghost" size="icon" asChild>
              <Link
                href="https://github.com/joeyleedev"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
              >
                <FaGithub className="h-4 w-4" />
              </Link>
            </Button>

            {/* 移动端菜单 */}
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">打开菜单</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Logo width={24} height={24} />
                      YIZISPACE
                    </SheetTitle>
                  </SheetHeader>

                  {/* 移动端导航链接 */}
                  <div className="mt-8 space-y-1">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.path}
                          href={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                            isCurrentPath(link.path)
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-accent hover:text-foreground"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>

                  {/* 移动端社交媒体 */}
                  <div className="mt-6 border-t pt-6">
                    <div className="mb-3 text-sm font-medium text-muted-foreground">关注我</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href="https://space.bilibili.com/11438085"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <FaBilibili className="h-4 w-4" />
                          Bilibili
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href="https://github.com/joeyleedev"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <FaGithub className="h-4 w-4" />
                          GitHub
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* 移动端语言切换（预留） */}
                  <div className="mt-6 border-t pt-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-2"
                      disabled
                    >
                      <Globe className="h-4 w-4" />
                      中文
                      <Badge variant="secondary" className="ml-auto">
                        即将推出
                      </Badge>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* 搜索对话框 */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              搜索博客文章
              {isInSearchMode && (
                <span className="text-sm font-normal text-muted-foreground">
                  (当前搜索: {currentSearch})
                </span>
              )}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="输入关键词搜索文章标题或内容..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10"
                autoFocus
              />
              {searchTerm && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* 当前搜索状态提示 */}
            {isInSearchMode && (
              <div className="rounded-lg bg-muted p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-muted-foreground">当前搜索:</span>
                    <span className="ml-2 font-medium">{currentSearch}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearCurrentSearch}
                    className="h-8 gap-1.5 text-xs"
                  >
                    <RotateCcw className="h-3 w-3" />
                    查看全部
                  </Button>
                </div>
              </div>
            )}

            <div className="py-8 text-center text-muted-foreground">
              <Search className="mx-auto mb-2 h-8 w-8" />
              <p>输入关键词并按回车搜索</p>
              <p className="text-sm">将跳转到博客页面显示搜索结果</p>
              <p className="mt-2 text-xs">快捷键: Ctrl+K 打开搜索, ESC 关闭</p>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={!searchTerm.trim()}>
                搜索文章
              </Button>
              {isInSearchMode && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={clearCurrentSearch}
                  className="gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  清除搜索
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
