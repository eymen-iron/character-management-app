import { print } from "graphql";
import { graphqlFetch } from "./graphql";
import { GET_CHARACTERS } from "@/graphql/queries";
import type {
  GetCharactersQuery,
  GetCharactersQueryVariables,
  CharacterResponse,
  CharacterFilterParams,
  PaginationParams,
} from "@/types/character";

export async function getCharacters(
  pagination: PaginationParams,
  filter?: CharacterFilterParams
): Promise<CharacterResponse> {
  const variables: GetCharactersQueryVariables = { pagination };

  if (filter) {
    const cleanFilter: GetCharactersQueryVariables["filter"] = {};
    if (filter.status?.length) cleanFilter.status = filter.status;
    if (filter.gender?.length) cleanFilter.gender = filter.gender;
    if (filter.search?.trim()) cleanFilter.search = filter.search.trim();

    if (Object.keys(cleanFilter).length > 0) {
      variables.filter = cleanFilter;
    }
  }

  const data = await graphqlFetch<GetCharactersQuery>(
    print(GET_CHARACTERS),
    variables
  );

  return data.characters;
}
