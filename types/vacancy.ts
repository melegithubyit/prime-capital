export interface Vacancy {
  _id: string;
  job_title: string;
  info_tags: string[];
  level: string;
  period: string;
  createdAt: string;
  location?: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  offer: string[];
  apply: string;
}

export interface Pagination {
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}

export interface VacancyResponse {
  data: {
    vacancies: Vacancy[];
    pagination: Pagination;
  };
}

export interface VacancyQueryParams {
  page?: number;
  limit?: number;
  sortBy?: "createdAt";
  order?: "asc" | "desc";
  period?: "fulltime" | "part-time";
  level?: "junior" | "intermediate" | "senior";
}
