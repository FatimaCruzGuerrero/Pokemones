import Link from "next/link";

const pokemons = [
    "pikachu", "lunala", "charmander", "squirtle", "dialga", "snorlax", "rayquaza"
];

export default function PokemonLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <nav className="bg-red-600 p-4 flex flex-wrap gap-3 justify-center">

                {pokemons.map(p => (
                    <Link
                        key={p}
                        href={`/pokemonv0/${p}`}
                        className="bg-red-600 text-white p-4 flex gap-3 justify-center font-semibold capitalize
                        px-4 py-2 rounded-xl shadow-md hover:scale-105 transition"
                    >
                        {p}
                    </Link>
                ))}

            </nav>

            {children}

            <footer className="bg-red-600 text-center text-white py-2">
                PokéAPI
            </footer>
        </div>
    );
}