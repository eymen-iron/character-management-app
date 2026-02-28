export {
  Status,
  Gender,
  type Character,
  type PaginationMeta,
  type CharacterPaginatedData,
  type CharacterResponse,
  type CharacterFilterInput,
  type PaginationInput,
  type GetCharactersQuery,
  type GetCharactersQueryVariables,
} from "@/graphql/generated/types";

// Aliases for existing usage across the codebase
export type { CharacterFilterInput as CharacterFilterParams } from "@/graphql/generated/types";
export type { PaginationInput as PaginationParams } from "@/graphql/generated/types";

export interface GetCharactersParams {
  pagination: { page: number; limit: number };
  filter?: {
    status?: string[];
    gender?: string[];
    search?: string;
  };
}
