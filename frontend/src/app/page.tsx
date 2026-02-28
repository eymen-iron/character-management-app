import { Suspense } from "react";
import { CharactersView } from "@/components/characters-view";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg selection:bg-bg-hover">
      <Suspense>
        <CharactersView />
      </Suspense>
    </div>
  );
}
