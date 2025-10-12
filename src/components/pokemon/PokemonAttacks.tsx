// src/components/pokemon/PokemonAttacks.tsx
'use client';

import { Pokemon } from '@/interfaces/pokemon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sword, Zap } from 'lucide-react';
import TypeBadge from '../common/TypeBadge';

interface PokemonAttacksProps {
   pokemon: Pokemon;
}

export default function PokemonAttacks({ pokemon }: PokemonAttacksProps) {
   return (
      <Card>
         <CardHeader>
            <CardTitle className="flex items-center gap-2">
               <Sword className="h-5 w-5" />
               Attacks
            </CardTitle>
         </CardHeader>
         <CardContent className="space-y-6">
            {/* Fast Attacks */}
            <div>
               <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <h3 className="font-semibold text-lg">Fast Attacks</h3>
                  <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                     {pokemon.attacks?.fast?.length ?? 0}
                  </span>
               </div>
               <div className="grid gap-2">
                  {(pokemon.attacks?.fast ?? []).map((attack, index) => (
                     <div
                        key={`${attack.name}-${index}`}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                     >
                        <div className="flex items-center gap-3">
                           <TypeBadge type={attack.type} size="sm" />
                           <span className="font-medium capitalize">{attack.name}</span>
                        </div>
                        <div className="text-right">
                           <div className="font-bold text-foreground">{attack.damage}</div>
                           <div className="text-xs text-muted-foreground">Damage</div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Special Attacks */}
            <div>
               <div className="flex items-center gap-2 mb-3">
                  <Sword className="h-4 w-4 text-red-500" />
                  <h3 className="font-semibold text-lg">Special Attacks</h3>
                  <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                     {pokemon.attacks?.special?.length ?? 0}
                  </span>
               </div>
               <div className="grid gap-2">
                  {(pokemon.attacks?.special ?? []).map((attack, index) => (
                     <div
                        key={`${attack.name}-${index}`}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                     >
                        <div className="flex items-center gap-3">
                           <TypeBadge type={attack.type} size="sm" />
                           <span className="font-medium capitalize">{attack.name}</span>
                        </div>
                        <div className="text-right">
                           <div className="font-bold text-foreground">{attack.damage}</div>
                           <div className="text-xs text-muted-foreground">Damage</div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
