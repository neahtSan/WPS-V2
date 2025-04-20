"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { Typography, Chip } from "@mui/material";
import { BlogPost } from "@/types/blog";
import Image from "next/image";

interface EachBlogProps {
  blog: BlogPost;
}

export default function EachBlog({ blog }: EachBlogProps) {
  const [imageSize, setImageSize] = useState({ width: 960, height: 540 });

    const [currentUrl, setCurrentUrl] = useState("");

    useEffect(() => {
    if (typeof window !== "undefined") {
        setCurrentUrl(window.location.href);
    }
    }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const width = isMobile ? 960 : 960;
    const height = isMobile ? Math.round((960 * 3) / 4) : Math.round((960 * 9) / 16);
    setImageSize({ width, height });
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Typography variant="h3" className="font-bold mb-4">
        {blog.title}
      </Typography>

      <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-600">
        <span>โดย <strong>{blog.writer}</strong></span>
        <span>| {format(new Date(blog.date), "PPP", { locale: th })}</span>
      </div>

      <div className="flex gap-2 mb-6">
        <Chip label={blog.tag} color="primary" size="small" />
        {blog.subtag && <Chip label={blog.subtag} color="secondary" size="small" />}
      </div>

      {blog.slug && (
        <div className="w-full mb-6 rounded overflow-hidden">
          <Image
            src={`${blog.coverImage}`}
            alt={blog.title}
            width={imageSize.width}
            height={imageSize.height}
            className="w-full h-auto object-cover rounded"
          />
        </div>
      )}

        {/* Share Buttons */}
        <div className="mb-8 flex gap-4 items-center">
            <span className="text-sm font-semibold text-gray-600">แชร์บทความ:</span>

            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                >
                <Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} />
            </a>

            <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition"
            >
                <Image
                src="/icons/x.svg"
                alt="Share on X"
                width={24}
                height={24}
                />
            </a>

            <a
                href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition"
            >
                <Image
                src="/icons/line.svg"
                alt="Share on LINE"
                width={24}
                height={24}
                />
            </a>
        </div>

      <article className="prose prose-lg max-w-none">
        {blog.content.split("\n").map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </article>
    </div>
  );
}