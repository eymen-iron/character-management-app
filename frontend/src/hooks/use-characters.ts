"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCharacters } from "@/fetch/client";
import type {
  CharacterResponse,
  Status,
  Gender,
} from "@/types/character";

const DEFAULT_LIMIT = 20;

interface UseCharactersParams {
  page: number;
  status: Status[];
  gender: Gender[];
  search: string;
}

export function useCharacters({ page, status, gender, search }: UseCharactersParams) {
  return useQuery<CharacterResponse>({
    queryKey: ["characters", { page, status, gender, search }],
    queryFn: () =>
      fetchCharacters({
        pagination: { page, limit: DEFAULT_LIMIT },
        filter: {
          status: status.length > 0 ? status : undefined,
          gender: gender.length > 0 ? gender : undefined,
          search: search || undefined,
        },
      }),
  });
}
