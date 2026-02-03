interface PokemonProps {
    params: Promise<{
        name: string;
    }>;
}

export default async function PokemonDetail({ params }: PokemonProps) {
    const { name } = await params;

    console.log("Pokemon solicitado:", name);

    const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        return <div className="text-center mt-20">Error en PokéAPI</div>;
    }

    const data = await res.json();

    const image = data.sprites.front_default; 

    return (
        <div className="flex justify-center items-center min-h-svh bg-gray-200">
            <div className="w-96 bg-white rounded-xl shadow-md p-6 text-center">
                <img src={image} alt={name} className="w-64 mx-auto" />
                <h1 className="text-3xl font-bold mt-4 capitalize">{name}</h1>
                <p className="mt-2">Altura: {data.height}</p>
                <p>Peso: {data.weight}</p>
            </div>
        </div>
    );
}