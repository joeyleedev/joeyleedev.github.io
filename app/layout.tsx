import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

function NavbarFallback() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-transparent bg-white/70 backdrop-blur-md transition-all duration-200 ease-in-out dark:bg-[hsl(0,0%,3.9%)]/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="h-8 w-8 animate-pulse rounded bg-muted"></div>
            <h1 className="ml-1 text-2xl font-bold">YIZISPACE</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="mr-4 hidden items-center space-x-6 text-sm md:flex">
            <div className="h-4 w-8 animate-pulse rounded bg-muted"></div>
            <div className="h-4 w-8 animate-pulse rounded bg-muted"></div>
            <div className="h-4 w-8 animate-pulse rounded bg-muted"></div>
          </div>
          <div className="h-9 w-9 animate-pulse rounded bg-muted"></div>
          <div className="h-9 w-9 animate-pulse rounded bg-muted"></div>
          <div className="h-10 w-10 animate-pulse rounded bg-muted"></div>
          <div className="h-10 w-10 animate-pulse rounded bg-muted"></div>
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<NavbarFallback />}>
            <Navbar />
          </Suspense>
          <div className="relative z-0">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
