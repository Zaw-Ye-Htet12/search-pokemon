'use client';

import { usePokemons } from '@/hooks/usePokemons';
import React from 'react';
import PokemonCard from './PokemonCard';
import { Search } from 'lucide-react';
import { PokemonGridSkeleton } from '../skeletons/PokemonCardGridSkeleton';
import EmptyState from '../common/EmptyState';
import { usePokemonsByIds } from '@/hooks/usePokemonsByIds';

const SearchResultPokemons = ({ search }: { search: string }) => {
   const { data } = usePokemons({ first: -1 });

   const filteredPokemons = data?.pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
   );

   const { loading, pokemons } = usePokemonsByIds(filteredPokemons?.map((p) => p.id) || []);

   if (loading) {
      return <PokemonGridSkeleton count={12} />;
   }

   return (
      <div className="container mx-auto px-4 py-8">
         {search ? (
            pokemons && pokemons.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {pokemons.map((pokemon) => (
                     <PokemonCard key={pokemon.id} pokemon={pokemon} />
                  ))}
               </div>
            ) : (
               <EmptyState
                  title="No Pokémon Found"
                  description={`No Pokémon found for “${search}”. Try searching for something else.`}
                  showHomeButton
               />
            )
         ) : (
            <EmptyState
               icon={<Search className="w-16 h-16 text-muted-foreground" />}
               title="No Search Term"
               description="Please enter a search term to find Pokémon."
            />
         )}

         {/* Load More Section (for future pagination) */}
         {pokemons && pokemons.length > 0 && (
            <div className="text-center mt-12">
               <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Showing all {pokemons.length} results
               </div>
            </div>
         )}
      </div>
   );
};

export default SearchResultPokemons;
