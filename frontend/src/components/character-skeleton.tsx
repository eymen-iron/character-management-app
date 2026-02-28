import { Skeleton } from "@/components/ui/skeleton";

interface CharacterSkeletonProps {
  view?: "grid" | "list";
}

export function CharacterSkeleton({ view = "grid" }: CharacterSkeletonProps) {
  if (view === "list") {
    return (
      <div className="border border-border bg-bg-card flex flex-col sm:flex-row gap-4 sm:gap-6 items-start p-4">
        <Skeleton className="w-full sm:w-48 aspect-square shrink-0" />
        <div className="flex flex-col flex-1 w-full gap-3">
          <div className="flex justify-between">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="mt-auto pt-3 border-t border-bg-hover flex justify-between">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-5 w-14" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-border bg-bg-card flex flex-col p-4">
      <Skeleton className="aspect-square w-full mb-4" />
      <div className="flex justify-between mb-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="pt-3 border-t border-bg-hover flex justify-between">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-5 w-14" />
      </div>
    </div>
  );
}
