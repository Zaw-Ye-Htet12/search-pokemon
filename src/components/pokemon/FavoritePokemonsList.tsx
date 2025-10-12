'use client';
import React from 'react';
import { useFavoritesStore } from '@/stores/favorites.store';
import { usePokemonsByIds } from '@/hooks/usePokemonsByIds';
import PokemonCard from '@/components/pokemon/PokemonCard';
import { PokemonGridSkeleton } from '@/components/skeletons/PokemonCardGridSkeleton';
import EmptyState from '../common/EmptyState';
import { usePagination } from '@/hooks/usePagination';
import Pagination from '../common/Pagination';

export default function FavoritePokemonsList() {
   // favorites store now contains an array of pokemon ids (string[])
   const { limit, offset, page } = usePagination();
   const favoriteIds = useFavoritesStore((s) => s.favorites);

   const { pokemons, loading } = usePokemonsByIds(favoriteIds || []);
   const paginatedPokemons = pokemons.slice(offset, offset + limit);

   return (
      <>
         {loading ? (
            <PokemonGridSkeleton count={8} />
         ) : pokemons.length === 0 ? (
            <EmptyState
               title="No Favorite Pokémon"
               description="Start adding Pokémon to your favorites by clicking the heart icon."
               showHomeButton={true}
            />
         ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
               {paginatedPokemons.map((p) => (
                  <PokemonCard key={p.id} pokemon={p} className="h-full" />
               ))}
            </div>
         )}

         {pokemons && pokemons.length > 0 && (
            <>
               <div className="text-center mt-12">
                  <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                     Showing all {pokemons.length} results
                  </div>
               </div>
               <Pagination currentPage={page} itemsPerPage={limit} totalItems={pokemons.length} />
            </>
         )}
      </>
   );
}
