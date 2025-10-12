'use client';

import { usePokemons } from '@/hooks/usePokemons';
import { PokemonGridSkeleton } from '@/components/skeletons/PokemonCardGridSkeleton';
import PokemonCard from './PokemonCard';
import { Search } from 'lucide-react';
import EmptyState from '../common/EmptyState';
import { usePagination } from '@/hooks/usePagination';
import Pagination from '../common/Pagination';

interface PokemonsListProps {
   className?: string;
}

export default function PokemonsList({ className }: PokemonsListProps) {
   const { page, limit, offset } = usePagination();
   const { data, loading } = usePokemons({ skip: false });

   if (loading) return <PokemonGridSkeleton />;

   const pokemons = data?.pokemons ?? [];
   const totalItems = pokemons.length;

   const paginatedPokemons = pokemons.slice(offset, offset + limit);

   if ((paginatedPokemons?.length ?? 0) === 0) {
      return (
         <EmptyState
            icon={<Search className="w-16 h-16 text-muted-foreground" />}
            title="No Pokémon Found"
            description="Try adjusting your search criteria or browse different Pokémon."
         />
      );
   }

   return (
      <div className={className}>
         {/* Pokemon Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
            {paginatedPokemons.map((pokemon) => (
               <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
         </div>
         <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
               <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
               Showing all {pokemons.length} results
            </div>
         </div>
         <Pagination totalItems={totalItems} itemsPerPage={limit} currentPage={page} />
      </div>
   );
}
