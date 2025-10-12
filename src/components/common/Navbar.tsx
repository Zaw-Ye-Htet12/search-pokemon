'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Routes } from '@/config/routes';
import SearchInput from './SearchInput';
import SwitchWithThemeAnimation from '../ui/switch-07';
import PokemonLogo from './Logo';

export default function Navbar() {
   const pathname = usePathname();
   const [isSearchOpen, setIsSearchOpen] = useState(false);

   return (
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
         <div className="container max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
               {/* Logo */}
               <PokemonLogo />

               {/* Desktop Search */}
               <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                  <SearchInput />
               </div>

               {/* Right Actions */}
               <div className="flex items-center space-x-2">
                  {/* Mobile Search Toggle */}
                  <Button
                     variant="ghost"
                     size="icon"
                     className="md:hidden"
                     onClick={() => setIsSearchOpen(!isSearchOpen)}
                  >
                     <Search className="h-4 w-4" />
                  </Button>

                  {/* Favorites */}
                  <Link href={Routes.FAVORITES}>
                     <Button
                        variant="outline"
                        className={cn(
                           'relative transition-all',
                           pathname === Routes.FAVORITES && 'text-red-500 bg-red-50 dark:bg-red-950/20'
                        )}
                     >
                        <Heart
                           className={cn('h-4 w-4 transition-all', pathname === Routes.FAVORITES && 'fill-red-500')}
                        />
                        Favorites
                     </Button>
                  </Link>

                  {/* Theme Switch */}
                  <SwitchWithThemeAnimation />
               </div>
            </div>

            {/* Mobile Search */}
            {isSearchOpen && (
               <div className="md:hidden pb-4">
                  <SearchInput onClose={() => setIsSearchOpen(false)} />
               </div>
            )}
         </div>
      </nav>
   );
}
