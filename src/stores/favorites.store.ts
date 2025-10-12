import { create } from 'zustand';
import Cookies from 'js-cookie';
import { Pokemon } from '@/interfaces/pokemon';

interface FavoritesState {
   favorites: string[];
   addFavorite: (pokemonOrId: string | Pokemon) => void;
   removeFavorite: (pokemonId: string) => void;
   isFavorite: (pokemonId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
   favorites: [],
   addFavorite: (pokemonOrId) => {
      const id = typeof pokemonOrId === 'string' ? pokemonOrId : pokemonOrId.id;
      set((state) => {
         if (state.favorites.includes(id)) return state;
         const updatedFavorites = [...state.favorites, id];
         // persist just the ids
         Cookies.set('favorites', JSON.stringify(updatedFavorites));
         return { favorites: updatedFavorites };
      });
   },
   removeFavorite: (pokemonId) => {
      set((state) => {
         const updatedFavorites = state.favorites.filter((id) => id !== pokemonId);
         Cookies.set('favorites', JSON.stringify(updatedFavorites));
         return { favorites: updatedFavorites };
      });
   },
   isFavorite: (pokemonId) => {
      return get().favorites.includes(pokemonId);
   },
}));

if (typeof window !== 'undefined') {
   const saved = Cookies.get('favorites');
   if (saved) {
      try {
         const parsed: unknown = JSON.parse(saved);
         let ids: string[] = [];
         if (Array.isArray(parsed)) {
            if (parsed.length > 0 && typeof parsed[0] === 'object') {
               ids = (parsed as Array<Record<string, unknown>>)
                  .map((p) => {
                     const maybeId = (p as Record<string, unknown>)['id'];
                     return typeof maybeId === 'string' ? maybeId : undefined;
                  })
                  .filter((v): v is string => typeof v === 'string');
            } else {
               ids = (parsed as Array<unknown>).filter((x): x is string => typeof x === 'string');
            }
         }
         useFavoritesStore.setState({ favorites: ids });
      } catch (err) {
         if (process.env.NODE_ENV === 'development') console.warn('Failed to parse favorites cookie', err);
         Cookies.remove('favorites');
         useFavoritesStore.setState({ favorites: [] });
      }
   }
}
