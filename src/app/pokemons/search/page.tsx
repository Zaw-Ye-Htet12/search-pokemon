import SearchResultPokemons from '@/components/pokemon/SearchResultPokemons';
import { PokemonGridSkeleton } from '@/components/skeletons/PokemonCardGridSkeleton';
import { Suspense } from 'react';

export default function SearchPage({ searchParams }: { searchParams: { search: string } }) {
   const searchTerm = decodeURIComponent(searchParams.search || '');
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
