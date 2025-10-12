'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X, ArrowUp } from 'lucide-react';
import { Routes } from '@/config/routes';
import { usePokemons } from '@/hooks/usePokemons';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface SearchInputProps {
   onClose?: () => void;
   className?: string;
}

export default function SearchInput({ onClose, className }: SearchInputProps) {
   const router = useRouter();
   const searchParams = useSearchParams();
   const [searchTerm, setSearchTerm] = useState('');
   const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
   const [selectedIndex, setSelectedIndex] = useState(-1);
   const inputRef = useRef<HTMLInputElement>(null);
   const suggestionsRef = useRef<HTMLDivElement>(null);

   // Prefetch all pokemons for search suggestions
   const { data } = usePokemons({ skip: false }); // First generation pokemons

   const suggestions =
      data?.pokemons?.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5) ||
      [];

   useEffect(() => {
      const query = searchParams.get('search');
      if (query) {
         setSearchTerm(query);
      }
   }, [searchParams]);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
            setIsSuggestionsOpen(false);
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   const handleSearch = (e?: React.FormEvent, pokemonName?: string) => {
      e?.preventDefault();
      const term = pokemonName || searchTerm.trim();

      if (term) {
         router.push(`${Routes.SEARCH}?search=${encodeURIComponent(term)}`);
         setIsSuggestionsOpen(false);
         setSelectedIndex(-1);
         onClose?.();
      }
   };

   const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isSuggestionsOpen) return;

      switch (e.key) {
         case 'ArrowDown':
            e.preventDefault();
            setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
            break;
         case 'ArrowUp':
            e.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
            break;
         case 'Enter':
            e.preventDefault();
            if (selectedIndex >= 0 && suggestions[selectedIndex]) {
               handleSearch(undefined, suggestions[selectedIndex].name);
            } else {
               handleSearch();
            }
            break;
         case 'Escape':
            setIsSuggestionsOpen(false);
            setSelectedIndex(-1);
            break;
      }
   };

   const clearSearch = () => {
      setSearchTerm('');
      setSelectedIndex(-1);
      setIsSuggestionsOpen(false);
      inputRef.current?.focus();
   };

   return (
      <div className={cn('relative w-full max-w-md', className)}>
         <form onSubmit={handleSearch} className="relative">
            <div className="relative">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
               <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Search Pokémon..."
                  value={searchTerm}
                  onChange={(e) => {
                     setSearchTerm(e.target.value);
                     setIsSuggestionsOpen(true);
                     setSelectedIndex(-1);
                  }}
                  onFocus={() => setIsSuggestionsOpen(true)}
                  onKeyDown={handleKeyDown}
                  className="pl-10 pr-10 h-11 rounded-2xl bg-muted/50 border-muted focus:bg-background transition-all"
               />
               {searchTerm && (
                  <Button
                     type="button"
                     variant="ghost"
                     size="icon"
                     className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full"
                     onClick={clearSearch}
                  >
                     <X className="h-3 w-3" />
                  </Button>
               )}
            </div>
         </form>

         {/* Search Suggestions */}
         {isSuggestionsOpen && searchTerm && suggestions.length > 0 && (
            <div
               ref={suggestionsRef}
               className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-lg shadow-black/5 z-50 overflow-hidden animate-in fade-in-0 zoom-in-95"
            >
               <div className="p-2">
                  {suggestions.map((pokemon, index) => (
                     <button
                        key={pokemon.id}
                        className={cn(
                           'w-full flex items-center gap-3 p-3 rounded-lg text-sm transition-all hover:bg-accent',
                           selectedIndex === index && 'bg-accent'
                        )}
                        onClick={() => {
                           router.push(`${Routes.POKEMON_DETAILS}/${pokemon.id}`);
                           setIsSuggestionsOpen(false);
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                     >
                        <div className="flex-shrink-0 w-8 h-8 relative">
                           <Image
                              src={pokemon.image}
                              alt={pokemon.name}
                              width={32}
                              height={32}
                              className="w-full h-full object-contain"
                           />
                        </div>
                        <div className="flex-1 text-left">
                           <div className="font-medium capitalize">{pokemon.name}</div>
                           <div className="text-xs text-muted-foreground">
                              #{pokemon.number} • {pokemon.types.join(', ')}
                           </div>
                        </div>
                        <div className={cn('opacity-0 transition-opacity', selectedIndex === index && 'opacity-100')}>
                           <ArrowUp className="h-3 w-3 rotate-45" />
                        </div>
                     </button>
                  ))}
               </div>

               {/* Footer with keyboard hint */}
               <div className="border-t border-border bg-muted/30 px-3 py-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                     <span>Use arrow keys to navigate</span>
                     <span>Enter to select</span>
                  </div>
               </div>
            </div>
         )}

         {/* No results state */}
         {isSuggestionsOpen && searchTerm && suggestions.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-lg p-4 text-center animate-in fade-in-0 zoom-in-95">
               <div className="text-muted-foreground text-sm">No Pokémon found for &ldquo;{searchTerm}&rdquo;</div>
            </div>
         )}
      </div>
   );
}
