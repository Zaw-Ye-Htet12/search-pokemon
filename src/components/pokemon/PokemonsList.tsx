// src/components/pokemon/PokemonsList.tsx
'use client';

import { usePokemons } from '@/hooks/usePokemons';
import { PokemonGridSkeleton } from '@/components/skeletons/PokemonCardGridSkeleton';
import PokemonCard from './PokemonCard';
import { Search } from 'lucide-react';
import EmptyState from '../common/EmptyState';

interface PokemonsListProps {
   first?: number;
   className?: string;
}

export default function PokemonsList({ first = 12, className }: PokemonsListProps) {
   const { data, loading } = usePokemons({ first });

   if (loading) return <PokemonGridSkeleton count={first} />;

   const pokemons = data?.pokemons ?? [];

   if ((pokemons?.length ?? 0) === 0) {
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
            {pokemons.map((pokemon) => (
               <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
         </div>
      </div>
   );
}
