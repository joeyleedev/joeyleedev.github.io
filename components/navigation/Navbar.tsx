"use client";

import { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaBilibili } from "react-icons/fa6";
import { ModeToggle } from "@/components/theme/ModeToggle";
import NavbarScroll from "@/components/navigation/NavbarScroll";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Search, X, RotateCcw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Logo } from "@/components/ui/logo";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // 检查当前是否在搜索状态
  const currentSearch = searchParams.get("search");
  const isInSearchMode = !!currentSearch;

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

  return (
    <>
      <NavbarScroll />
      <nav className="sticky top-0 z-50 w-full border-b border-transparent bg-white/70 backdrop-blur-md transition-all duration-200 ease-in-out dark:bg-[hsl(0,0%,3.9%)]/70">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          {/* Logo部分 */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Logo width={32} height={32} priority />
              <h1 className="ml-1 text-2xl font-bold">YIZISPACE</h1>
            </Link>
          </div>

          {/* 右侧导航和按钮部分 */}
          <div className="flex items-center gap-2">
            {/* 桌面导航链接 - 在md以上屏幕显示 */}
            <div className="mr-4 hidden items-center space-x-6 text-sm md:flex">
              <Link
                className="py-2 text-gray-500 transition-colors duration-300 hover:text-black dark:hover:text-white"
                href="/"
              >
                首页
              </Link>
              <Link
                className="py-2 text-gray-500 transition-colors duration-300 hover:text-black dark:hover:text-white"
                href="/blog"
              >
                博客
              </Link>
              <Link
                className="py-2 text-gray-500 transition-colors duration-300 hover:text-black dark:hover:text-white"
                href="/about"
              >
                关于
              </Link>
            </div>

            {/* 搜索按钮 - 显示当前搜索状态 */}
            <div className="relative">
              <Button
                variant={isInSearchMode ? "default" : "ghost"}
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="搜索"
                title={isInSearchMode ? `当前搜索: ${currentSearch}` : "搜索 (Ctrl+K)"}
              >
                <Search className="h-4 w-4" />
              </Button>
              {/* 搜索状态指示器 */}
              {isInSearchMode && (
                <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary"></div>
              )}
            </div>

            {/* 移动端汉堡菜单 - 在md以下屏幕显示 */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <HamburgerMenuIcon className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="mt-2 w-40 bg-white/95 p-2 backdrop-blur-sm dark:bg-gray-900/95"
                >
                  <DropdownMenuItem
                    asChild
                    className="rounded-md py-2 focus:bg-gray-100 dark:focus:bg-gray-800"
                  >
                    <Link href="/" className="w-full cursor-pointer">
                      首页
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="rounded-md py-2 focus:bg-gray-100 dark:focus:bg-gray-800"
                  >
                    <Link href="/blog" className="w-full cursor-pointer">
                      博客
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="rounded-md py-2 focus:bg-gray-100 dark:focus:bg-gray-800"
                  >
                    <Link href="/about" className="w-full cursor-pointer">
                      关于
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* 社交媒体和主题切换按钮 */}
            <ModeToggle />
            <Button className="hidden h-10 w-10 sm:flex" variant={"outline"} size={"icon"} asChild>
              <Link
                href="https://space.bilibili.com/11438085?spm_id_from=333.999.0.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaBilibili className="h-4 w-4 dark:text-white" />
              </Link>
            </Button>
            <Button className="hidden h-10 w-10 sm:flex" variant={"outline"} size={"icon"} asChild>
              <Link href="https://github.com/joeyleedev" target="_blank" rel="noopener noreferrer">
                <FaGithub className="h-4 w-4 dark:text-white" />
              </Link>
            </Button>
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
