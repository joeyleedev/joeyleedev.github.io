import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { FiArrowRight } from "react-icons/fi";
import { getAllPosts } from "@/lib/utils/blog";
import { formatDate } from "@/lib/utils/date";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold">My Blog</h1>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group" tabIndex={-1}>
              <Card className="flex h-full cursor-pointer flex-col border border-gray-200 bg-transparent transition-colors hover:bg-accent hover:text-accent-foreground dark:border-neutral-700 dark:bg-transparent dark:hover:bg-accent dark:hover:text-accent-foreground">
                <CardHeader className="pb-2">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 pb-4 text-gray-500 dark:text-gray-400">
                  {post.desc}
                </CardContent>
                <CardFooter>
                  <span className="flex items-center gap-1 px-0 py-0 text-sm font-medium text-gray-700 outline-none transition hover:underline hover:decoration-2 hover:underline-offset-4 dark:text-gray-200">
                    Read More <FiArrowRight className="inline-block" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
