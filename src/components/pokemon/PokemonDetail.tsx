// src/components/pokemon/PokemonDetail.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import PokemonDetailHeader from './PokemonDetailHeader';
import PokemonStats from './PokemonStats';
import PokemonResistances from './PokemonResistances';
import PokemonAttacks from './PokemonAttacks';
import PokemonEvolutions from './PokemonEvolutions';
import { useGetPokemonDetail } from '@/hooks/useGetPokemonDetail';
import EmptyState from '../common/EmptyState';
import PokemonDetailSkeleton from '../skeletons/PokemonDetailSkeleton';

export default function PokemonDetail({ id }: { id: string }) {
   const { data: pokemon, loading } = useGetPokemonDetail(id);

   if (loading) {
      return <PokemonDetailSkeleton />;
   }

   if (!pokemon) {
       return <EmptyState description='Could not find Pokémon with the given ID.' title='No Pokémon Found!' showHomeButton />;
   }

   return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-12">
         <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <PokemonDetailHeader pokemon={pokemon} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
               {/* Left Column - Stats & Resistances */}
               <div className="lg:col-span-1 space-y-6">
                  <PokemonStats pokemon={pokemon} />
                  <PokemonResistances pokemon={pokemon} />
               </div>

               {/* Middle Column - Attacks */}
               <div className="lg:col-span-1">
                  <PokemonAttacks pokemon={pokemon} />
               </div>

               {/* Right Column - Evolutions */}
               <div className="lg:col-span-1">
                  <PokemonEvolutions pokemon={pokemon} />
               </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8">
               <Card>
                  <CardContent className="p-6">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                        <div className="text-center">
                           <div className="font-semibold text-muted-foreground">Flee Rate</div>
                           <div className="text-2xl font-bold text-foreground mt-1">
                              {(pokemon.fleeRate * 100).toFixed(1)}%
                           </div>
                        </div>
                        <div className="text-center">
                           <div className="font-semibold text-muted-foreground">Classification</div>
                           <div className="text-lg font-medium text-foreground mt-1 capitalize">
                              {pokemon.classification}
                           </div>
                        </div>
                        <div className="text-center">
                           <div className="font-semibold text-muted-foreground">Evolution Requirements</div>
                           <div className="text-lg font-medium text-foreground mt-1">
                              {pokemon.evolutionRequirements
                                 ? `${pokemon.evolutionRequirements.amount} ${pokemon.evolutionRequirements.name}`
                                 : 'None'}
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}
