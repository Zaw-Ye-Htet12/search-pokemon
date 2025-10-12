// src/components/common/PokemonGridSkeleton.tsx
import { PokemonCardSkeleton } from './PokemonCardSkeleton';

interface PokemonGridSkeletonProps {
   count?: number;
   className?: string;
}

export function PokemonGridSkeleton({ count = 12, className }: PokemonGridSkeletonProps) {
   return (
      <div className={className}>

         {/* Skeleton Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-fr">
            {Array.from({ length: count }).map((_, index) => (
               <PokemonCardSkeleton key={index} />
            ))}
         </div>
      </div>
   );
}
