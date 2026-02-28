import type {
  CharacterResponse,
  GetCharactersParams,
} from "@/types/character";

export async function fetchCharacters(
  params: GetCharactersParams
): Promise<CharacterResponse> {
  const res = await fetch("/api/characters", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json() as Promise<CharacterResponse>;
}
