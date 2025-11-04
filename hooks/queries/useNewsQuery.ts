import { useQuery } from "@tanstack/react-query";
import {
  getPublishedNews,
  getBlogById,
  PublishedNewsApiResponse,
  SingleBlogApiResponse,
} from "@/services/news";

// Query keys for consistent caching
export const newsQueryKeys = {
  all: ["news"] as const,
  published: (params?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: "asc" | "desc";
    sort?: "asc" | "desc";
  }) => [...newsQueryKeys.all, "published", params] as const,
  blog: (id: string) => [...newsQueryKeys.all, "blog", id] as const,
};

/**
 * Hook for fetching published news with pagination and sorting
 */
export const usePublishedNews = (params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  sort?: "asc" | "desc";
}) => {
  return useQuery<PublishedNewsApiResponse>({
    queryKey: newsQueryKeys.published(params),
    queryFn: () => getPublishedNews(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  });
};

/**
 * Hook for fetching a single blog by ID
 */
export const useBlogById = (id: string) => {
  return useQuery<SingleBlogApiResponse>({
    queryKey: newsQueryKeys.blog(id),
    queryFn: () => getBlogById(id),
    enabled: !!id, // Only run query if id is provided
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  });
};
