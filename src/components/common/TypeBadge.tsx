'use client';
import { cn } from '@/lib/utils';

interface TypeBadgeProps {
   type: string;
   size?: 'sm' | 'md' | 'lg';
   className?: string;
}

export default function TypeBadge({ type, size = 'md', className }: TypeBadgeProps) {
   // Map Pokemon types to our CSS classes
   const getTypeClass = (type: string) => {
      const typeMap: { [key: string]: string } = {
         normal: 'type-normal',
         fire: 'type-fire',
         water: 'type-water',
         electric: 'type-electric',
         grass: 'type-grass',
         ice: 'type-ice',
         fighting: 'type-fighting',
         poison: 'type-poison',
         ground: 'type-ground',
         flying: 'type-flying',
         psychic: 'type-psychic',
         bug: 'type-bug',
         rock: 'type-rock',
         ghost: 'type-ghost',
         dragon: 'type-dragon',
         dark: 'type-dark',
         steel: 'type-steel',
         fairy: 'type-fairy',
      };

      return typeMap[type.toLowerCase()] || 'type-normal';
   };

   const sizeClasses = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1.5 text-sm',
      lg: 'px-4 py-2 text-base',
   };

   return (
      <span
         className={cn(
            'inline-flex items-center justify-center rounded-full font-medium capitalize border border-current/20 shadow-sm',
            getTypeClass(type),
            sizeClasses[size],
            className
         )}
      >
         {type}
      </span>
   );
}
