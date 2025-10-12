'use client';

import { Pokemon } from '@/interfaces/pokemon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Zap } from 'lucide-react';
import TypeBadge from '../common/TypeBadge';

interface PokemonResistancesProps {
   pokemon: Pokemon;
}

export default function PokemonResistances({ pokemon }: PokemonResistancesProps) {
   return (
      <Card>
         <CardHeader>
            <CardTitle className="flex items-center gap-2">
               <Shield className="h-5 w-5" />
               Defense
            </CardTitle>
         </CardHeader>
         <CardContent className="space-y-6">
            {/* Resistances */}
            <div>
               <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-4 w-4 text-green-500" />
                  <h3 className="font-semibold">Resistant To</h3>
                  <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                     {pokemon.resistant?.length ?? 0}
                  </span>
               </div>
               <div className="flex flex-wrap gap-2">
                  {(pokemon.resistant?.length ?? 0) > 0 ? (
                     (pokemon.resistant ?? []).map((type) => <TypeBadge key={type} type={type} size="sm" />)
                  ) : (
                     <p className="text-sm text-muted-foreground">No resistances</p>
                  )}
               </div>
            </div>

            {/* Weaknesses */}
            <div>
               <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-4 w-4 text-red-500" />
                  <h3 className="font-semibold">Weak To</h3>
                  <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                     {pokemon.weaknesses?.length ?? 0}
                  </span>
               </div>
               <div className="flex flex-wrap gap-2">
                  {(pokemon.weaknesses?.length ?? 0) > 0 ? (
                     (pokemon.weaknesses ?? []).map((type) => <TypeBadge key={type} type={type} size="sm" />)
                  ) : (
                     <p className="text-sm text-muted-foreground">No weaknesses</p>
                  )}
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
