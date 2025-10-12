'use client';

import { Pokemon } from '@/interfaces/pokemon';
import { Button } from '@/components/ui/button';
import { Heart, ArrowLeft } from 'lucide-react';
import { useFavoritesStore } from '@/stores/favorites.store';
import TypeBadge from '../common/TypeBadge';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Card, CardContent } from '../ui/card';
import { useRouter } from 'next/navigation';

interface PokemonDetailHeaderProps {
   pokemon: Pokemon;
}

export default function PokemonDetailHeader({ pokemon }: PokemonDetailHeaderProps) {
   const router = useRouter();
   const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();

   const handleFavoriteToggle = () => {
      if (isFavorite(pokemon.id)) {
         removeFavorite(pokemon.id);
         toast.success(`${pokemon.name} removed from favorites`);
      } else {
         addFavorite(pokemon);
         toast.success(`${pokemon.name} added to favorites`);
      }
   };

   const isPokemonFavorite = isFavorite(pokemon.id);

   return (
      <div className="relative">
         {/* Background Pattern */}
         <div
            className={cn(
               'absolute inset-0 rounded-3xl opacity-5',
               pokemon.types[0] === 'fire' && 'bg-red-500',
               pokemon.types[0] === 'water' && 'bg-blue-500',
               pokemon.types[0] === 'grass' && 'bg-green-500',
               pokemon.types[0] === 'electric' && 'bg-yellow-500',
               pokemon.types[0] === 'psychic' && 'bg-purple-500'
               // Add more type backgrounds as needed
            )}
         />

         <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
            <CardContent className="p-8">
               {/* Navigation & Actions */}
               <div className="flex items-center justify-between mb-6">
                  <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.back()}>
                     <ArrowLeft className="h-4 w-4" />
                     Back
                  </Button>

                  <div className="flex items-center gap-2">
                     <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleFavoriteToggle}
                        className={cn(
                           'rounded-full transition-all',
                           isPokemonFavorite && 'text-red-500 bg-red-50 dark:bg-red-950/20'
                        )}
                     >
                        <Heart className={cn('h-4 w-4 transition-all', isPokemonFavorite && 'fill-red-500')} />
                     </Button>
                  </div>
               </div>

               {/* Main Header Content */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  {/* Pokemon Image */}
                  <div className="flex justify-center lg:justify-start">
                     <div className="relative w-64 h-64">
                        <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/10 rounded-full blur-lg" />
                        <Image
                           src={pokemon.image}
                           alt={pokemon.name}
                           width={256}
                           height={256}
                           className="relative z-10 object-contain drop-shadow-2xl"
                           priority
                        />
                     </div>
                  </div>

                  {/* Pokemon Info */}
                  <div className="lg:col-span-2 text-center lg:text-left space-y-6">
                     <div>
                        <span className="text-lg font-mono text-muted-foreground">
                           #{pokemon.number.padStart(3, '0')}
                        </span>
                        <h1 className="text-4xl lg:text-5xl font-bold capitalize mt-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                           {pokemon.name}
                        </h1>
                        <p className="text-xl text-muted-foreground capitalize mt-2">{pokemon.classification}</p>
                     </div>

                     {/* Types */}
                     <div className="flex gap-3 justify-center lg:justify-start">
                        {pokemon.types.map((type) => (
                           <TypeBadge key={type} type={type} size="lg" />
                        ))}
                     </div>

                     {/* Quick Stats */}
                     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-md">
                        <div className="text-center">
                           <div className="text-2xl font-bold text-foreground">{pokemon.maxCP}</div>
                           <div className="text-sm text-muted-foreground">Max CP</div>
                        </div>
                        <div className="text-center">
                           <div className="text-2xl font-bold text-foreground">{pokemon.maxHP}</div>
                           <div className="text-sm text-muted-foreground">Max HP</div>
                        </div>
                        <div className="text-center">
                           <div className="text-2xl font-bold text-foreground">
                              {pokemon.weight
                                 ? (
                                      (parseFloat(pokemon.weight.minimum) + parseFloat(pokemon.weight.maximum)) /
                                      2
                                   ).toFixed(1)
                                 : 'N/A'}
                           </div>
                           <div className="text-sm text-muted-foreground">Weight</div>
                        </div>
                        <div className="text-center">
                           <div className="text-2xl font-bold text-foreground">
                              {pokemon.height
                                 ? (
                                      (parseFloat(pokemon.height.minimum) + parseFloat(pokemon.height.maximum)) /
                                      2
                                   ).toFixed(1)
                                 : 'N/A'}
                           </div>
                           <div className="text-sm text-muted-foreground">Height</div>
                        </div>
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
