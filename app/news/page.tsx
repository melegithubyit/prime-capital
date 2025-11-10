"use client";

import React, { useMemo, useState } from "react";
import { NewsHero } from "@/components/news-comp/news-hero";
import { NewsCard } from "@/components/news-comp/news-card";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePublishedNews } from "@/hooks/queries/useNewsQuery";
import { ParagraphBlock, Block, Blog } from "@/services/news";
import { AlertCircle } from "lucide-react";

const NewsPage = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "oldest">("latest");

  const { data, isFetching, isError } = usePublishedNews({ page, limit, sortBy });

  const blogs = useMemo(() => data?.data.blogs ?? [], [data]);
  console.log("Blogs data:", blogs);
  const pagination = data?.data.pagination;

  const formatDate = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  };

  const filteredBlogs = useMemo(() => {
    if (!blogs) return [] as Blog[];
    if (!q.trim()) return blogs;
    const query = q.toLowerCase();
    return blogs.filter((blog: Blog) => {
      const title = String(blog.title?.en || blog.title || "").toLowerCase();
      const paraBlock = blog.blocks.find((b: Block) => b.type === "paragraph") as ParagraphBlock | undefined;
      const excerpt = String(paraBlock?.content?.en || paraBlock?.content || "").toLowerCase();
      return title.includes(query) || excerpt.includes(query);
    });
  }, [blogs, q]);

  const featured = filteredBlogs.length > 0 ? filteredBlogs[0] : undefined;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NewsHero />
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Latest Articles
          </h2>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-muted-foreground">Sort:</label>
            <select
              id="sort"
              className="border border-blue-200 rounded-md px-3 py-2 text-sm bg-white text-gray-900"
              value={sortBy}
              onChange={(e) => {
                setPage(1);
                const v = e.target.value === "oldest" ? "oldest" : "latest";
                setSortBy(v);
              }}
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <div className="w-full sm:w-64">
            <input
              type="search"
              placeholder="Search articles..."
              className="w-full border border-blue-200 rounded-md px-3 py-2 text-sm bg-white text-gray-900"
              value={q}
              onChange={(e) => { setPage(1); setQ(e.target.value); }}
            />
          </div>
        </div>

        {isError && (
          <div className="text-red-500">Failed to load news.</div>
        )}

        {/* Featured article */}
        {!isFetching && featured && page === 1 && !q && (
          <Link href={`/news/${featured._id}`} className="block group mb-10">
            <div className="relative overflow-hidden rounded-2xl border border-blue-200 bg-blue-50">
              {featured.thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={featured.thumbnail as string} alt="Featured" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500" />
              )}
              <div className="relative z-10 p-6 md:p-10 bg-linear-to-t from-white/90 to-white/30">
                <span className="inline-block text-xs font-semibold bg-blue-200 text-blue-800 px-2 py-1 rounded border border-blue-300">Featured</span>
                <h3 className="mt-3 text-2xl md:text-3xl font-extrabold text-textPrimary line-clamp-2">
                  {String(featured.title?.en || featured.title)}
                </h3>
                {(() => {
                  const pb = featured.blocks.find((b: Block) => b.type === "paragraph") as ParagraphBlock | undefined;
                  const desc = pb ? String(pb.content?.en || pb.content) : "";
                  return <p className="mt-3 text-gray-700 line-clamp-3 md:line-clamp-2">{desc}</p>;
                })()}
                <div className="mt-4">
                  <span className="inline-flex items-center gap-2 text-blue-700 font-semibold">Read article →</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isFetching && filteredBlogs.length === 0 &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-lg bg-muted" />
            ))}

          {!isFetching && filteredBlogs.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 bg-blue-50 border border-blue-200 rounded-2xl">
              <div className="flex items-center justify-center mb-4 text-blue-600">
                <AlertCircle className="w-12 h-12" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center text-textPrimary">
                No News Available
              </h3>
              <p className="text-gray-700 text-sm text-center max-w-md">
                No news articles found at the moment. Please check back later.
              </p>
            </div>
          )}

          {filteredBlogs.map((blog: Blog) => {
            const title = (blog.title?.en || blog.title) as string;
            // Find first paragraph block (for excerpt)
            const paragraph = blog.blocks.find((b: Block) => b.type === "paragraph") as ParagraphBlock | undefined;
            const description = paragraph ? ((paragraph.content?.en || paragraph.content) as string) : "";
            return (
              <Link key={blog._id} href={`/news/${blog._id}`}>
                <NewsCard
                  title={title}
                  description={description}
                  image={blog.thumbnail}
                  category={"News"}
                  date={formatDate(blog.createdAt)}
                />
              </Link>
            );
          })}
        </div>

        {pagination && pagination.totalPages > 1 && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) setPage(page - 1);
                    }}
                    className={page === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).slice(0, 5).map((p) => (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => { e.preventDefault(); setPage(p); }}
                      isActive={page === p}
                      className={page === p ? "bg-primary text-white hover:bg-primary/70" : ""}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {pagination.totalPages > 5 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < pagination.totalPages) setPage(page + 1);
                    }}
                    className={page === pagination.totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </section>
      {/* <MajorCard type="news" /> */}
    </div>
  );
};

export default NewsPage;
