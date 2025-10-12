'use client';
import React from 'react';
import Link from 'next/link';
import { useFavoritesStore } from '@/stores/favorites.store';
import { useGetInfoByIds } from '@/hooks/useGetInfoByIds';
import PokemonCard from '@/components/pokemon/PokemonCard';
import { PokemonGridSkeleton } from '@/components/skeletons/PokemonCardGridSkeleton';
import type { Pokemon } from '@/interfaces/pokemon';
import EmptyState from '../common/EmptyState';

export default function FavoritePokemonsList() {
   const storedFavorites = useFavoritesStore((s) => s.favorites);
   const ids = storedFavorites.map((p) => p.id);

   const { pokemons: apiFavorites, loading: apiLoading, error, refetch } = useGetInfoByIds(ids);

   // prefer fresh API data when available, otherwise fall back to cookie data
   const displayList: Pokemon[] = apiFavorites && apiFavorites.length > 0 ? apiFavorites : storedFavorites;

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {displayList.map((p) => (
                  <PokemonCard key={p.id} pokemon={p} />
               ))}
            </div>
         )}

         {/* Show notice if API failed and we're using cookie fallback */}
         {error && (!apiFavorites || apiFavorites.length === 0) && storedFavorites.length > 0 && (
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
