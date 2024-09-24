import { TOTAL_TRAIT, TraitMetadata } from "@/lib/traits";

const pinataBaseUrl =
  "https://cyan-acute-python-533.mypinata.cloud/ipfs/QmNeQxytHa5BfSXANUnJ3FWGhKryTe8mxReLFhpyn9HQqE";

export async function getTraitMetadata(): Promise<TraitMetadata[]> {
  const urls: string[] = [];
  for (let i = 1; i < TOTAL_TRAIT; i++) {
    urls.push(`${pinataBaseUrl}/${i}.json`);
  }
  return await Promise.all(
    urls.map(async (url) => {
      const response = await fetch(url);
      return (await response.json()) as TraitMetadata;
    }),
  );
}
