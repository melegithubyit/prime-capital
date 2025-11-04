import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { VacancyResponse, VacancyQueryParams } from "@/types/vacancy";

export const useGetVacancyQuery = (params: VacancyQueryParams) => {
  return useQuery<VacancyResponse>({
    queryKey: ["vacancies", params],
    queryFn: async () => {
      const response = await api.get("/vacancies", { params });
      return response.data;
    },
  });
};
