import { CharacterCard } from "@/components/character-card";
import { CharacterSkeleton } from "@/components/character-skeleton";
import { Pagination } from "@/components/ui/pagination";
import type { Character, PaginationMeta } from "@/types/character";

interface CharacterGridProps {
  characters: Character[];
  view: "grid" | "list";
  loading?: boolean;
  pagination?: PaginationMeta;
  onPageChange?: (page: number) => void;
}

export function CharacterGrid({
  characters,
  view,
  loading,
  pagination,
  onPageChange,
}: CharacterGridProps) {
  if (loading) {
    return (
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "flex flex-col gap-4"
        }
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <CharacterSkeleton key={i} view={view} />
        ))}
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="border border-border bg-bg-secondary p-12 text-center">
        <p className="text-text-muted">No results found matching your criteria.</p>
      </div>
    );
  }

  return (
    <>
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "flex flex-col gap-4"
        }
      >
        {characters.map((char) => (
          <CharacterCard
            key={char.id}
            name={char.name}
            image={char.image}
            status={char.status}
            gender={char.gender}
            description={char.description}
            view={view}
          />
        ))}
      </div>
      {pagination && onPageChange && (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}
