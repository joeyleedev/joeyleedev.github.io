import BlogClient from "./BlogClient";
import { getAllPosts } from "@/lib/utils/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogClient posts={posts} />;
}
