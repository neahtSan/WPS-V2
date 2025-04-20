"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Pagination,
  Typography
} from "@mui/material";
import { BlogPost } from "@/types/blog";
import mockBlogs from "@/data/mock_blogs.json";
import Link from "next/link";
import { format } from "date-fns";
import { th } from "date-fns/locale/th";
import Image from "next/image";

const BlogComponent = () => {
  const searchParams = useSearchParams();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedWriter, setSelectedWriter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);

  const blogsPerPage = 10;

  useEffect(() => {
    const sorted = [...mockBlogs].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    const filtered = sorted.filter((blog) => {
      return (
        (!query || blog.title.toLowerCase().includes(query.toLowerCase())) &&
        (!selectedTag || blog.tag === selectedTag) &&
        (!selectedWriter || blog.writer === selectedWriter)
      );
    });

    setBlogs(filtered);
  }, [query, selectedTag, selectedWriter, sortOrder]);

  const uniqueTags = [...new Set(mockBlogs.map((b) => b.tag))];
  const uniqueWriters = [...new Set(mockBlogs.map((b) => b.writer))];

  const paginatedBlogs = blogs.slice(
    (page - 1) * blogsPerPage,
    page * blogsPerPage
  );

  return (
    <Box className="max-w-screen-xl mx-auto px-6 py-8">
      {/* Navbar Style Filters */}
      <Box className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <TextField
          label="Search"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="md:w-1/3"
        />

        <Box className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
          <FormControl fullWidth>
            <InputLabel>Tag</InputLabel>
            <Select
              value={selectedTag}
              label="Tag"
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <MenuItem value="">All Tags</MenuItem>
              {uniqueTags.map((tag) => (
                <MenuItem key={tag} value={tag}>{tag}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Writer</InputLabel>
            <Select
              value={selectedWriter}
              label="Writer"
              onChange={(e) => setSelectedWriter(e.target.value)}
            >
              <MenuItem value="">All Writers</MenuItem>
              {uniqueWriters.map((writer) => (
                <MenuItem key={writer} value={writer}>{writer}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Date</InputLabel>
            <Select
              value={sortOrder}
              label="Date"
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <MenuItem value="desc">Newest</MenuItem>
              <MenuItem value="asc">Oldest</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <ul className="space-y-6">
        {paginatedBlogs.map((blog) => (
            <li
                key={blog.slug}
                className="border p-4 rounded shadow-sm hover:shadow-md transition flex flex-col sm:flex-row gap-4"
                >
                <div className="w-full sm:w-28 h-48 sm:h-28 relative flex-shrink-0">
                    <Image
                    src={blog.coverImage || ""}
                    alt={blog.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                    />
                </div>
                <Link href={`/blog/${blog.slug}`} className="block flex-1">
                    <h3 className="text-lg font-semibold text-[#8B4513] hover:underline line-clamp-2">
                    {blog.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-1">✍️ {blog.writer} • 🏷️ {blog.tag}</p>
                    <p className="text-xs text-gray-500 mb-2">
                    🕒 {format(new Date(blog.date), 'PPP', { locale: th })}
                    </p>
                    <p className="text-sm text-gray-700 line-clamp-2">{blog.content}</p>
                </Link>
            </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-center">
        <Pagination
          count={Math.ceil(blogs.length / blogsPerPage)}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </div>
    </Box>
  );
};

export default BlogComponent;