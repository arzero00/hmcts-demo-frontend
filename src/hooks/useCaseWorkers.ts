import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = 'http://localhost:4000/api/v1/case-workers';


export const useCaseWorkers1 = () => {
  return useQuery({
    queryKey: ['case-workers'], // This is the unique key for caching
    queryFn: async () => {
          const url = API_URL;
          const res = await fetch(url);
          return res.json();
        },
    staleTime: 5 * 60 * 1000, // Optional: Cache stays "fresh" for 5 minutes
  });
};