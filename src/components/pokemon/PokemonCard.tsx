'use client';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Zap, HeartPulse } from 'lucide-react';
import Link from 'next/link';
import { Pokemon } from '@/interfaces/pokemon';
import { useFavoritesStore } from '@/stores/favorites.store';
import TypeBadge from '../common/TypeBadge';
import Image from 'next/image';
import { Routes } from '@/config/routes';
import { cn } from '@/lib/utils';

interface PokemonCardProps {
   pokemon: Pokemon;
   className?: string;
}

export default function PokemonCard({ pokemon, className }: PokemonCardProps) {
   const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();

   const handleFavoriteToggle = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isFavorite(pokemon.id)) {
         removeFavorite(pokemon.id);
      } else {
         addFavorite(pokemon);
      }
   };

   const isPokemonFavorite = isFavorite(pokemon.id);

   return (
      <Link href={`${Routes.POKEMON_DETAILS}/${pokemon.id}`}>
         <Card
            className={cn(
               'group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm relative overflow-hidden',
               className
            )}
         >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 pt-4 px-4">
               <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                     #{pokemon.number.padStart(3, '0')}
                  </span>
               </div>
               <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleFavoriteToggle}
                  className={cn(
                     'h-7 w-7 rounded-full transition-all duration-200 z-10',
                     isPokemonFavorite
                        ? 'bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/30'
                        : 'hover:bg-muted/50'
                  )}
               >
                  <Heart
                     className={cn(
                        'h-3.5 w-3.5 transition-all duration-200',
                        isPokemonFavorite
                           ? 'fill-red-500 text-red-500 scale-110'
                           : 'text-muted-foreground group-hover:text-red-400'
                     )}
                  />
               </Button>
            </CardHeader>

            <CardContent className="flex flex-col items-center space-y-4 px-4 pb-3">
               {/* Pokemon Image */}
               <div className="relative w-32 h-32 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-muted/30 to-muted/10">
                  <Image
                     src={pokemon.image}
                     alt={pokemon.name}
                     fill
                     sizes="128px"
                     className="object-center scale-90 transition-transform duration-300 group-hover:scale-105 rounded-full"
                     priority
                     quality={90}
                     placeholder="blur"
                     blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                  />
               </div>

               {/* Pokemon Name */}
               <div className="text-center space-y-1">
                  <h3 className="font-bold text-lg capitalize tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                     {pokemon.name}
                  </h3>
                  <p className="text-xs text-muted-foreground capitalize">{pokemon.classification}</p>
               </div>

               {/* Types */}
               <div className="flex gap-1.5 flex-wrap justify-center">
                  {pokemon.types.map((type) => (
                     <TypeBadge key={type} type={type} size="sm" />
                  ))}
               </div>
            </CardContent>

            <CardFooter className="px-4 pb-4 pt-0">
               <div className="w-full grid grid-cols-2 gap-3 text-xs">
                  {/* CP Stats */}
                  <div className="flex items-center gap-1.5 text-muted-foreground bg-muted/30 rounded-lg p-2">
                     <Zap className="h-3 w-3 text-yellow-500" />
                     <div className="flex flex-col">
                        <span className="font-semibold text-foreground">{pokemon.maxCP}</span>
                        <span>CP</span>
                     </div>
                  </div>

                  {/* HP Stats */}
                  <div className="flex items-center gap-1.5 text-muted-foreground bg-muted/30 rounded-lg p-2">
                     <HeartPulse className="h-3 w-3 text-red-500" />
                     <div className="flex flex-col">
                        <span className="font-semibold text-foreground">{pokemon.maxHP}</span>
                        <span>HP</span>
                     </div>
                  </div>
               </div>
            </CardFooter>

            {/* Hover Border Effect */}
            <div
               className={cn(
                  'absolute inset-0 rounded-lg border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                  pokemon.types[0] === 'fire' && 'border-red-200/50',
                  pokemon.types[0] === 'water' && 'border-blue-200/50',
                  pokemon.types[0] === 'grass' && 'border-green-200/50',
                  pokemon.types[0] === 'electric' && 'border-yellow-200/50',
                  pokemon.types[0] === 'psychic' && 'border-purple-200/50',
                  pokemon.types[0] === 'ice' && 'border-cyan-200/50',
                  pokemon.types[0] === 'dragon' && 'border-indigo-200/50',
                  !['fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon'].includes(pokemon.types[0]) &&
                     'border-gray-200/50'
               )}
            />
         </Card>
      </Link>
   );
}
