import { getAllPosts } from "@/lib/utils/blog";

export default function BlogData({ children }: { children: (posts: any[]) => React.ReactNode }) {
  const posts = getAllPosts();
  return children(posts);
}
