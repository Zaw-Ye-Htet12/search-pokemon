import PokemonsList from '@/components/pokemon/PokemonsList';
import { PokemonGridSkeleton } from '@/components/skeletons/PokemonCardGridSkeleton';
import { Suspense } from 'react';

export default function HomePage() {
   return (
      <div className="container mx-auto px-4 py-8">
         <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">All Pokemons Collection</h1>
            <p className="text-muted-foreground">Discover and explore all your favorite Pokémon</p>
         </div>

         <Suspense fallback={<PokemonGridSkeleton count={20} />}>
            <PokemonsList first={20} />
         </Suspense>
      </div>
   );
}
