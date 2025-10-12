// src/components/pokemon/PokemonStats.tsx
'use client';

import { Pokemon } from '@/interfaces/pokemon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gauge, HeartPulse, Zap, Shield } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PokemonStatsProps {
   pokemon: Pokemon;
}

export default function PokemonStats({ pokemon }: PokemonStatsProps) {
   // Normalize stats for progress bars (assuming max values)
   const maxCP = 5000; // Approximate max CP in Pokemon games
   const maxHP = 500; // Approximate max HP
   const maxFleeRate = 0.2; // Maximum flee rate

   const cpPercentage = (pokemon.maxCP / maxCP) * 100;
   const hpPercentage = (pokemon.maxHP / maxHP) * 100;
   const fleePercentage = (pokemon.fleeRate / maxFleeRate) * 100;

   return (
      <Card>
         <CardHeader>
            <CardTitle className="flex items-center gap-2">
               <Gauge className="h-5 w-5" />
               Base Stats
            </CardTitle>
         </CardHeader>
         <CardContent className="space-y-4">
            {/* CP Stat */}
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <Zap className="h-4 w-4 text-yellow-500" />
                     <span className="font-medium">Combat Power</span>
                  </div>
                  <span className="font-bold">{pokemon.maxCP}</span>
               </div>
               <Progress value={cpPercentage} className="h-2" />
            </div>

            {/* HP Stat */}
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <HeartPulse className="h-4 w-4 text-red-500" />
                     <span className="font-medium">Hit Points</span>
                  </div>
                  <span className="font-bold">{pokemon.maxHP}</span>
               </div>
               <Progress value={hpPercentage} className="h-2" />
            </div>

            {/* Flee Rate */}
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <Shield className="h-4 w-4 text-blue-500" />
                     <span className="font-medium">Flee Rate</span>
                  </div>
                  <span className="font-bold">{(pokemon.fleeRate * 100).toFixed(1)}%</span>
               </div>
               <Progress value={fleePercentage} className="h-2" />
            </div>

            {/* Physical Stats */}
            <div className="grid grid-cols-2 gap-4 pt-2">
               <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-sm text-muted-foreground">Weight</div>
                  <div className="font-bold text-lg">
                     {pokemon.weight
                        ? `${((parseFloat(pokemon.weight.minimum) + parseFloat(pokemon.weight.maximum)) / 2).toFixed(1)} kg`
                        : 'N/A'}
                  </div>
               </div>
               <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-sm text-muted-foreground">Height</div>
                  <div className="font-bold text-lg">
                     {pokemon.height
                        ? `${((parseFloat(pokemon.height.minimum) + parseFloat(pokemon.height.maximum)) / 2).toFixed(1)} m`
                        : 'N/A'}
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
