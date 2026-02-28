import { Badge } from "@/components/ui/badge";

interface CharacterCardProps {
  name: string;
  image: string;
  status: string;
  gender: string;
  description: string;
  view?: "grid" | "list";
}

const statusVariant: Record<string, "alive" | "dead" | "unknown"> = {
  ALIVE: "alive",
  DEAD: "dead",
  UNKNOWN: "unknown",
};

export function CharacterCard({
  name,
  image,
  status,
  gender,
  description,
  view = "grid",
}: CharacterCardProps) {
  if (view === "list") {
    return (
      <div className="border border-border bg-bg-card hover:border-border-hover transition-colors group flex flex-col sm:flex-row gap-4 sm:gap-6 items-start p-4">
        <div className="w-full sm:w-48 aspect-square shrink-0 border border-border group-hover:border-border-hover overflow-hidden bg-bg-secondary transition-colors">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
        <div className="flex flex-col flex-1 h-full w-full">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg leading-tight group-hover:underline decoration-2 underline-offset-4">
              {name}
            </h3>
            <Badge variant={statusVariant[status] || "unknown"}>{status}</Badge>
          </div>
          <p className="text-sm text-text-secondary mb-4 flex-1">{description}</p>
          <div className="mt-auto pt-3 border-t border-bg-hover flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-text-muted font-medium">
              Gender
            </span>
            <Badge>{gender}</Badge>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-border bg-bg-card hover:border-border-hover transition-colors group flex flex-col p-4">
      <div className="aspect-square w-full mb-4 border border-border group-hover:border-border-hover overflow-hidden bg-bg-secondary transition-colors">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg leading-tight group-hover:underline decoration-2 underline-offset-4">
          {name}
        </h3>
        <Badge variant={statusVariant[status] || "unknown"}>{status}</Badge>
      </div>
      <p className="text-sm text-text-secondary mb-4 flex-1">{description}</p>
      <div className="mt-auto pt-3 border-t border-bg-hover flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-text-muted font-medium">
          Gender
        </span>
        <Badge>{gender}</Badge>
      </div>
    </div>
  );
}
