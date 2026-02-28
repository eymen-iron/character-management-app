import { gql } from "graphql-tag";

export const GET_CHARACTERS = gql`
  query GetCharacters($pagination: PaginationInput, $filter: CharacterFilterInput) {
    characters(pagination: $pagination, filter: $filter) {
      success
      message
      data {
        items {
          id
          name
          image
          status
          gender
          description
        }
        pagination {
          total
          page
          limit
          totalPages
          hasNext
          hasPrev
        }
      }
    }
  }
`;
