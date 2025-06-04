import BlogPost from "./components/BlogPost";
import BlogDetailClient from "./BlogDetailClient";

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="px-4 py-8">
      <BlogDetailClient />
      <BlogPost id={params.id} />
    </main>
  );
}
