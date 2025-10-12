import PokemonDetail from '@/components/pokemon/PokemonDetail';

export default async function DetailPokemonPage({ params }: { params: Promise<{ id: string }> }) {
   const { id } = await params;
   const decodedId = decodeURIComponent(id);

   return <PokemonDetail id={decodedId} />;
}
