"use client";

import {
  useQueryState,
  parseAsString,
  parseAsInteger,
  parseAsArrayOf,
} from "nuqs";
import { Status, Gender } from "@/types/character";

const statusParser = parseAsArrayOf(parseAsString).withDefault([]);
const genderParser = parseAsArrayOf(parseAsString).withDefault([]);
const searchParser = parseAsString.withDefault("");
const pageParser = parseAsInteger.withDefault(1);

export function useCharacterFilters() {
  const [status, setStatus] = useQueryState("status", statusParser);
  const [gender, setGender] = useQueryState("gender", genderParser);
  const [search, setSearch] = useQueryState("search", searchParser);
  const [page, setPage] = useQueryState("page", pageParser);

  const clearFilters = () => {
    setStatus([]);
    setGender([]);
    setSearch("");
    setPage(1);
  };

  const hasActiveFilters =
    status.length > 0 || gender.length > 0 || search.length > 0;

  return {
    status: status as Status[],
    setStatus: (val: Status[]) => setStatus(val.length > 0 ? val : []),
    gender: gender as Gender[],
    setGender: (val: Gender[]) => setGender(val.length > 0 ? val : []),
    search,
    setSearch,
    page,
    setPage,
    clearFilters,
    hasActiveFilters,
  };
}
