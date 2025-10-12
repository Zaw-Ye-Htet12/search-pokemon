import { create } from 'zustand';
import Cookies from 'js-cookie';
import { Pokemon } from '@/interfaces/pokemon';

interface FavoritesState {
   favorites: Pokemon[];
   addFavorite: (pokemon: Pokemon) => void;
   removeFavorite: (pokemonId: string) => void;
   isFavorite: (pokemonId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
   favorites: [],
   addFavorite: (pokemon) => {
      set((state) => {
         const updatedFavorites = [...state.favorites, pokemon];
         Cookies.set('favorites', JSON.stringify(updatedFavorites));
         return { favorites: updatedFavorites };
      });
   },
   removeFavorite: (pokemonId) => {
      set((state) => {
         const updatedFavorites = state.favorites.filter((p) => p.id !== pokemonId);
         Cookies.set('favorites', JSON.stringify(updatedFavorites));
         return { favorites: updatedFavorites };
      });
   },
   isFavorite: (pokemonId) => {
      return get().favorites.some((p) => p.id === pokemonId);
   },
}));

// Initialize from cookies on client side
if (typeof window !== 'undefined') {
   const savedFavorites = Cookies.get('favorites');
   if (savedFavorites) {
      useFavoritesStore.setState({ favorites: JSON.parse(savedFavorites) });
   }
}
