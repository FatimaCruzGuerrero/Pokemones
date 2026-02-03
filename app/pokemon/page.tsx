import Image from "next/image";
import Link from "next/link";

const pokemons = [
  "pikachu",
  "bulbasaur",
  "charmander",
  "squirtle",
  "jigglypuff",
  "meowth",
  "psyduck",
  "eevee",
  "snorlax",
  "gengar",
  "dragonite",
  "lucario",
];

type PokemonApi = {
  sprites: {
    front_default: string;
    versions: {
      "generation-v": {
        "black-white": {
          front_default: string;
          animated: {
            front_default: string;
          };
        };
      };
    };
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
};
async function getPokemonImage(name: string): Promise<string | null> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const data: PokemonApi = await res.json();
  return data.sprites.front_default;
}

export default async function PokemonPage() {
  const cards = await Promise.all(
    pokemons.map(async (name) => ({
      name,
      image: await getPokemonImage(name),
    }))
  );

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-h-svh bg-slate-900/10">
      {cards.map(({ name, image }) => (
        <Link
          key={name}
          href={`/pokemon/${name}`}
          className="min-w-62.5 shrink-0 m-4"
        >
          <div className="text-center flex flex-col gap-2 justify-center bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-transform hover:scale-105 duration-200">

            {image ? (
              <div className="relative h-64 w-full overflow-hidden rounded-2xl">
                <Image
                  src={image}
                  alt={`Pokemon ${name}`}
                  fill
                  className="p-4 object-contain"
                />
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center bg-gray-200">
                Imagen no disponible
              </div>
            )}

            <div className="p-4">
              <h3 className="text-lg font-semibold capitalize">{name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}