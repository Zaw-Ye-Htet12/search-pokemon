import React, { Suspense } from 'react';
import FavoritePokemonsList from '@/components/pokemon/FavoritePokemonsList';
import { PokemonGridSkeleton } from '@/components/skeletons/PokemonCardGridSkeleton';

export default function FavoritesPage() {
   return (
      <div className="container mx-auto px-4 py-8">
         <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Favorites</h1>
            <p className="text-muted-foreground">Your saved Pokémon</p>
         </div>

         <Suspense fallback={<PokemonGridSkeleton />}>
            <FavoritePokemonsList />
         </Suspense>
      </div>
   );
}
