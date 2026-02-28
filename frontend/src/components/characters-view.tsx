"use client";

import { useState, useEffect } from "react";
import { Filter, X } from "lucide-react";
import { FilterBar } from "@/components/filter-bar";
import { CharacterGrid } from "@/components/character-grid";
import { ViewToggle } from "@/components/ui/view-toggle";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useDebounce } from "@/hooks/use-debounce";
import { useCharacterFilters } from "@/hooks/use-character-filters";
import { useCharacters } from "@/hooks/use-characters";
import type { Status, Gender } from "@/types/character";

export function CharactersView() {
  const filters = useCharacterFilters();
  const [view, setView] = useLocalStorage<"grid" | "list">("filter-view", "grid");
  const [mobileFilters, setMobileFilters] = useState(false);

  const debouncedSearch = useDebounce(filters.search, 300);
  const isSearching = filters.search !== debouncedSearch;

  // Reset to page 1 when filters change
  useEffect(() => {
    filters.setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, filters.status.join(","), filters.gender.join(",")]);

  const { data, isLoading, isError } = useCharacters({
    page: filters.page,
    status: filters.status,
    gender: filters.gender,
    search: debouncedSearch,
  });

  const characters = data?.data.items ?? [];
  const pagination = data?.data.pagination;

  const handlePageChange = (newPage: number) => {
    filters.setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className="border-b border-border bg-bg-secondary p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight uppercase">Characters</h1>
          <div className="w-full sm:w-auto flex gap-2">
            <div className="flex-1 sm:w-80">
              <Input
                placeholder="Search name or description..."
                value={filters.search}
                onChange={(e) => filters.setSearch(e.target.value)}
                loading={isSearching}
              />
            </div>
            <button
              onClick={() => setMobileFilters(!mobileFilters)}
              className="sm:hidden flex items-center justify-center px-3 py-2 border border-border bg-bg-card hover:bg-bg-hover"
            >
              {mobileFilters ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 flex flex-col sm:flex-row gap-6">
        {/* Mobile filter overlay */}
        {mobileFilters && (
          <div
            className="fixed inset-0 bg-black/30 z-20 sm:hidden"
            onClick={() => setMobileFilters(false)}
          />
        )}

        <aside
          className={`
            ${mobileFilters ? "translate-x-0" : "-translate-x-full"}
            fixed top-0 left-0 h-full w-72 bg-bg-card border-r border-border z-30 p-4 pt-16 overflow-y-auto transition-transform
            sm:translate-x-0 sm:static sm:h-auto sm:w-64 sm:border-r-0 sm:p-0 sm:pt-0 sm:z-auto sm:bg-transparent sm:self-start
          `}
        >
          <button
            onClick={() => setMobileFilters(false)}
            className="absolute top-4 right-4 p-1 border border-border hover:bg-bg-hover sm:hidden"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="sm:sticky sm:top-20 space-y-6">
            <FilterBar
              search={filters.search}
              onSearchChange={filters.setSearch}
              searchLoading={isSearching}
              statusFilters={filters.status}
              onStatusChange={(selected) => filters.setStatus(selected as Status[])}
              genderFilters={filters.gender}
              onGenderChange={(selected) => filters.setGender(selected as Gender[])}
              onClear={filters.clearFilters}
              hasActiveFilters={filters.hasActiveFilters}
            />
          </div>
        </aside>

        <section className="flex-1 min-w-0">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-text-muted">
              {isLoading ? "" : isError ? (
                <span className="text-status-dead">Failed to load characters</span>
              ) : (
                <>
                  Showing{" "}
                  <span className="font-bold text-text">
                    {pagination?.total ?? 0}
                  </span>{" "}
                  results
                </>
              )}
            </p>
            <ViewToggle view={view} onChange={setView} />
          </div>
          <CharacterGrid
            characters={characters}
            view={view}
            loading={isLoading}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </section>
      </main>
    </>
  );
}
