// src/app/pokemons/[name]/page.tsx
import PokemonDetail from '@/components/pokemon/PokemonDetail';

// Main page component
export default function DetailPokemonPage({ params: { id } }: { params: { id: string } }) {
   const decodedId = decodeURIComponent(id);

   return <PokemonDetail id={decodedId} />;
}
