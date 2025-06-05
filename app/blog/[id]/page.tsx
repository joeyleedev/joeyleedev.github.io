import BlogPost from "./components/BlogPost";
import BlogDetailClient from "./BlogDetailClient";
import { getAllPosts } from "@/lib/utils/blog";

// 为静态导出生成所有可能的参数
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    id: post.id,
  }));
}

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="px-4 py-8">
      <BlogDetailClient />
      <BlogPost id={params.id} />
    </main>
  );
}
