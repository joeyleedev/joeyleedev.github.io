import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaBilibili } from "react-icons/fa6";
import { ModeToggle } from "@/components/theme/ModeToggle";
import NavbarScroll from "@/components/navigation/NavbarScroll";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/ui/logo";

export default function Navbar() {
  return (
    <>
      <NavbarScroll />
      <nav className="sticky top-0 z-50 w-full border-b border-transparent bg-white/70 transition-all duration-200 ease-in-out dark:bg-[hsl(0,0%,3.9%)]/70">
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
    </>
  );
}
