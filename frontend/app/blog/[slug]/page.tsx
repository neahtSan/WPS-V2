// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import mockBlogs from "@/data/mock_blogs.json";
import EachBlog from "@/components/blog/EachBlog";
import { BlogPost } from "@/types/blog";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = mockBlogs.find((b) => b.slug === decodeURIComponent(slug)) as BlogPost;
  
    if (!blog) return notFound();
  
    return <EachBlog blog={blog} />;
  }
  