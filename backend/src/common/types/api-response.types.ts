import { PaginationMeta } from '../models/pagination-meta.model';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedData<T> {
  items: T[];
  pagination: PaginationMeta;
}

export type PaginatedApiResponse<T> = ApiResponse<PaginatedData<T>>;
