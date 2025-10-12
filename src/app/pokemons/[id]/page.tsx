import PokemonDetail from '@/components/pokemon/PokemonDetail';

export default function DetailPokemonPage({ params: { id } }: { params: { id: string } }) {
   const decodedId = decodeURIComponent(id);

   return <PokemonDetail id={decodedId} />;
}
