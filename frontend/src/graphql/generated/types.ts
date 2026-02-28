export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Character = {
  __typename?: 'Character';
  description: Scalars['String']['output'];
  gender: Gender;
  id: Scalars['Int']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: Status;
};

export type CharacterFilterInput = {
  gender?: InputMaybe<Array<Gender>>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Array<Status>>;
};

export type CharacterPaginatedData = {
  __typename?: 'CharacterPaginatedData';
  items: Array<Character>;
  pagination: PaginationMeta;
};

export type CharacterResponse = {
  __typename?: 'CharacterResponse';
  data: CharacterPaginatedData;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Unknown = 'UNKNOWN'
}

export type PaginationInput = {
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
};

export type PaginationMeta = {
  __typename?: 'PaginationMeta';
  hasNext: Scalars['Boolean']['output'];
  hasPrev: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  characters: CharacterResponse;
};


export type QueryCharactersArgs = {
  filter?: InputMaybe<CharacterFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
};

export enum Status {
  Alive = 'ALIVE',
  Dead = 'DEAD',
  Unknown = 'UNKNOWN'
}

export type GetCharactersQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInput>;
  filter?: InputMaybe<CharacterFilterInput>;
}>;


export type GetCharactersQuery = { __typename?: 'Query', characters: { __typename?: 'CharacterResponse', success: boolean, message: string, data: { __typename?: 'CharacterPaginatedData', items: Array<{ __typename?: 'Character', id: number, name: string, image: string, status: Status, gender: Gender, description: string }>, pagination: { __typename?: 'PaginationMeta', total: number, page: number, limit: number, totalPages: number, hasNext: boolean, hasPrev: boolean } } } };
