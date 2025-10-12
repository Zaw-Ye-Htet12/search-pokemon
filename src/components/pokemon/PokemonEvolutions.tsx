// src/components/pokemon/PokemonEvolutions.tsx
'use client';

import { Pokemon } from '@/interfaces/pokemon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Routes } from '@/config/routes';
import Image from 'next/image';
import TypeBadge from '../common/TypeBadge';

interface PokemonEvolutionsProps {
   pokemon: Pokemon;
}

export default function PokemonEvolutions({ pokemon }: PokemonEvolutionsProps) {
   const evolutions = pokemon.evolutions ?? [];

   if (evolutions.length === 0) {
      return (
         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Evolutions
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-center text-muted-foreground py-8">
                  <Sparkles className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>This Pokémon does not evolve.</p>
               </div>
            </CardContent>
         </Card>
      );
   }

   return (
      <Card>
         <CardHeader>
            <CardTitle className="flex items-center gap-2">
               <Sparkles className="h-5 w-5" />
               Evolution Chain
            </CardTitle>
         </CardHeader>
         <CardContent>
            <div className="space-y-4">
               {/* Current Pokemon (as starting point) */}
               <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                     <div className="w-12 h-12 relative">
                        <Image
                           src={pokemon.image}
                           alt={pokemon.name}
                           width={48}
                           height={48}
                           className="object-contain"
                        />
                     </div>
                     <div>
                        <div className="font-medium capitalize">{pokemon.name}</div>
                        <div className="flex gap-1 mt-1">
                           {pokemon.types.map((type) => (
                              <TypeBadge key={type} type={type} size="sm" />
                           ))}
                        </div>
                     </div>
                  </div>
                  <div className="text-xs text-muted-foreground text-center">
                     <div>#{pokemon.number}</div>
                  </div>
               </div>

               {/* Evolution Requirements */}
               {pokemon.evolutionRequirements && (
                  <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                     <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        Evolution Requirements
                     </div>
                     <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400 mt-1">
                        {pokemon.evolutionRequirements.amount} {pokemon.evolutionRequirements.name}
                     </div>
                  </div>
               )}

               {/* Evolutions */}
               {evolutions.map((evolution, index) => (
                  <div key={evolution.id} className="space-y-4">
                     {/* Arrow connector */}
                     {index === 0 && (
                        <div className="flex justify-center">
                           <ArrowRight className="h-6 w-6 text-muted-foreground" />
                        </div>
                     )}

                     {/* Evolution Pokemon */}
                     <Link href={`${Routes.POKEMON_DETAILS}/${evolution.id}`}>
                        <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer group">
                           <div className="flex items-center gap-3">
                              <div className="w-12 h-12 relative">
                                 <Image
                                    src={evolution.image}
                                    alt={evolution.name}
                                    width={48}
                                    height={48}
                                    className="object-contain group-hover:scale-110 transition-transform"
                                 />
                              </div>
                              <div>
                                 <div className="font-medium capitalize group-hover:text-blue-600 transition-colors">
                                    {evolution.name}
                                 </div>
                                 <div className="flex gap-1 mt-1">
                                    {evolution.types.map((type) => (
                                       <TypeBadge key={type} type={type} size="sm" />
                                    ))}
                                 </div>
                              </div>
                           </div>
                           <div className="text-xs text-muted-foreground text-center">
                              <div>#{evolution.number}</div>
                           </div>
                        </div>
                     </Link>
                  </div>
               ))}
            </div>
         </CardContent>
      </Card>
   );
}
