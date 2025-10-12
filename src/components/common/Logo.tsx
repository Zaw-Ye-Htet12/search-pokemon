'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Routes } from '@/config/routes';
import { cn } from '@/lib/utils';

interface PokemonLogoProps {
   className?: string;
   showText?: boolean;
   size?: 'sm' | 'md' | 'lg';
}

export function PokemonLogo({ className, showText = true, size = 'md' }: PokemonLogoProps) {
   const [isHovered, setIsHovered] = useState(false);

   const sizeClasses = {
      sm: 'w-6 h-6',
      md: 'w-8 h-8',
      lg: 'w-10 h-10',
   };

   const textSizes = {
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl',
   };

   return (
      <Link
         href={Routes.HOME}
         className="flex items-center space-x-2 group"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         {/* Animated Poké Ball */}
         <div
            className={cn(
               'relative transition-all duration-500 group-hover:scale-110 group-hover:rotate-12',
               sizeClasses[size],
               className
            )}
         >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg border-2 border-white/20 overflow-hidden">
               <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-red-500 to-red-600" />

               <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white" />

               <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-800 transform -translate-y-1/2" />

               <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gray-800 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute inset-0.5 bg-gray-600 rounded-full" />
               </div>

               <div
                  className={cn(
                     'absolute top-1/2 left-1/2 w-4 h-4 bg-blue-400 rounded-full opacity-0 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300',
                     isHovered && 'opacity-20 animate-pulse'
                  )}
               />

               <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full blur-sm" />
            </div>

            <div
               className={cn(
                  'absolute inset-0 rounded-full bg-red-400 opacity-0 blur-md transition-opacity duration-300',
                  isHovered && 'opacity-40'
               )}
            />
         </div>

         {showText && (
            <span
               className={cn(
                  'font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent transition-all duration-300',
                  textSizes[size],
                  isHovered && 'tracking-wider'
               )}
            >
               PokéSearch
            </span>
         )}
      </Link>
   );
}

export default PokemonLogo;
