import { NextRequest, NextResponse } from "next/server";
import { getCharacters } from "@/fetch/characters";
import type {
  CharacterResponse,
  CharacterFilterParams,
  PaginationParams,
  Status,
  Gender,
} from "@/types/character";

interface RequestBody {
  pagination?: Partial<PaginationParams>;
  filter?: {
    status?: string[];
    gender?: string[];
    search?: string;
  };
}

const VALID_STATUSES = new Set<string>(["ALIVE", "DEAD", "UNKNOWN"]);
const VALID_GENDERS = new Set<string>(["MALE", "FEMALE", "UNKNOWN"]);

function validatePagination(input?: Partial<PaginationParams>): PaginationParams {
  const page = Math.max(1, Math.floor(Number(input?.page) || 1));
  const limit = Math.min(100, Math.max(1, Math.floor(Number(input?.limit) || 20)));
  return { page, limit };
}

function validateFilter(input?: RequestBody["filter"]): CharacterFilterParams | undefined {
  if (!input) return undefined;

  const filter: CharacterFilterParams = {};

  if (input.status?.length) {
    const validStatuses = input.status.filter((s) => VALID_STATUSES.has(s));
    if (validStatuses.length) filter.status = validStatuses as Status[];
  }

  if (input.gender?.length) {
    const validGenders = input.gender.filter((g) => VALID_GENDERS.has(g));
    if (validGenders.length) filter.gender = validGenders as Gender[];
  }

  if (input.search && typeof input.search === "string") {
    const trimmed = input.search.trim().slice(0, 50);
    if (trimmed) filter.search = trimmed;
  }

  return Object.keys(filter).length > 0 ? filter : undefined;
}

export async function POST(request: NextRequest): Promise<NextResponse<CharacterResponse>> {
  try {
    const body: RequestBody = await request.json();
    const pagination = validatePagination(body.pagination);
    const filter = validateFilter(body.filter);

    const result = await getCharacters(pagination, filter);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        message,
        data: {
          items: [],
          pagination: {
            total: 0,
            page: 1,
            limit: 20,
            totalPages: 0,
            hasNext: false,
            hasPrev: false,
          },
        },
      },
      { status: 500 }
    );
  }
}
