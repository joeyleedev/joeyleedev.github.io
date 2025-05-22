import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaBilibili } from "react-icons/fa6";
import { ModeToggle } from "./ModeToggle";
import NavbarScroll from "./NavbarScroll";

export default function Navbar() {
  return (
    <>
      <NavbarScroll />
      <nav className="sticky top-0 z-50 w-full border-b border-transparent bg-white/70 transition-all duration-200 ease-in-out dark:bg-[hsl(0,0%,3.9%)]/70">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex flex-shrink-0 items-center justify-between">
            <Link href="/">
              <Image
                src="/logo-light-bold.svg"
                alt="Yizi Space Logo"
                width={32}
                height={32}
                priority
              />
            </Link>
            <h1 className="ml-1 text-2xl font-bold">YIZISPACE</h1>
            <div className="ml-10">
              <div className="flex space-x-4 text-sm">
                <Link
                  className="text-gray-500 transition-colors duration-300 hover:text-black dark:hover:text-white"
                  href="/"
                >
                  首页
                </Link>
                <Link
                  className="text-gray-500 transition-colors duration-300 hover:text-black dark:hover:text-white"
                  href="/blog"
                >
                  博客
                </Link>
                <Link
                  className="text-gray-500 transition-colors duration-300 hover:text-black dark:hover:text-white"
                  href="/about"
                >
                  关于
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center gap-2 align-middle text-2xl">
            <ModeToggle />
            <Button className="h-10 w-10" variant={"outline"} size={"icon"} asChild>
              <Link
                href="https://space.bilibili.com/11438085?spm_id_from=333.999.0.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaBilibili className="h-4 w-4 dark:text-white" />
              </Link>
            </Button>
            <Button className="h-10 w-10" variant={"outline"} size={"icon"} asChild>
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
