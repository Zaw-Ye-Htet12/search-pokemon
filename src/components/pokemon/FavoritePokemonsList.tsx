'use client';
import React from 'react';
import Link from 'next/link';
import { useFavoritesStore } from '@/stores/favorites.store';
import { usePokemonsByIds } from '@/hooks/usePokemonsByIds';
import PokemonCard from '@/components/pokemon/PokemonCard';
import { PokemonGridSkeleton } from '@/components/skeletons/PokemonCardGridSkeleton';
import type { Pokemon } from '@/interfaces/pokemon';
import EmptyState from '../common/EmptyState';

export default function FavoritePokemonsList() {
   // favorites store now contains an array of pokemon ids (string[])
   const favoriteIds = useFavoritesStore((s) => s.favorites);

   const ids = favoriteIds ?? [];

   const { pokemons: apiFavorites, loading: apiLoading, error, refetch } = usePokemonsByIds(ids);

   // prefer fresh API data when available; otherwise show nothing (we only store ids now)
   const displayList: Pokemon[] = apiFavorites ?? [];

   return (
      <>
         {apiLoading ? (
            <PokemonGridSkeleton count={8} />
         ) : displayList.length === 0 ? (
            <EmptyState
               title="No Favorite Pokémon"
               description="Start adding Pokémon to your favorites by clicking the heart icon."
               showHomeButton={true}
            />
         ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
               {displayList.map((p) => (
                  <PokemonCard key={p.id} pokemon={p} className="h-full" />
               ))}
            </div>
         )}

         {/* Show notice if API failed and we're using cookie fallback */}
         {error && (!apiFavorites || apiFavorites.length === 0) && favoriteIds.length > 0 && (
            <div className="mt-4 text-sm text-yellow-600 flex items-center justify-between">
               <span>Failed to refresh favorites from API — showing saved data.</span>
               <button onClick={() => refetch()} className="ml-4 rounded-md bg-secondary px-3 py-1 text-sm text-white">
                  Retry
               </button>
            </div>
         )}
      </>
   );
}
