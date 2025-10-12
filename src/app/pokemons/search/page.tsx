import SearchResultPokemons from '@/components/pokemon/SearchResultPokemons';
import { PokemonGridSkeleton } from '@/components/skeletons/PokemonCardGridSkeleton';
import { Suspense } from 'react';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
   const params = await searchParams;
   const searchTerm = decodeURIComponent(params.search || '');
   return (
      <div className="container mx-auto px-4 py-8">
         <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Search Results for: {searchTerm}</h1>
            <p className="text-muted-foreground">Pokémons matching your search query</p>
         </div>
         <div className="mb-4">
            <Suspense fallback={<PokemonGridSkeleton />}>
               <SearchResultPokemons search={searchTerm} />
            </Suspense>
         </div>
      </div>
   );
}
