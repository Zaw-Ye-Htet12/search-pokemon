'use client';

import { useApolloClient } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { GET_POKEMON_BY_ID } from '@/graphql/queries';
import type { Pokemon } from '@/interfaces/pokemon';

export function usePokemonsByIds(ids: string[]) {
   const client = useApolloClient();
   const [pokemons, setPokemons] = useState<Pokemon[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<Error | undefined>(undefined);

   // Stable key so effects don't re-run on new array identity
   const idsKey = Array.isArray(ids) && ids.length > 0 ? ids.join('|') : '';

   const fetchByIds = useCallback(async (): Promise<boolean> => {
      if (!idsKey) {
         setPokemons([]);
         setError(undefined);
         setLoading(false);
         return true;
      }

      setLoading(true);
      setError(undefined);

      try {
         const results = await Promise.all(
            ids.map((id) =>
               client.query<{ pokemon?: Pokemon }>({
                  query: GET_POKEMON_BY_ID,
                  variables: { id },
                  fetchPolicy: 'network-only',
               })
            )
         );

         const merged = results.flatMap((r) => r.data.pokemon ?? []);
         const map = new Map<string, Pokemon>();
         for (const p of merged) {
            if (p?.id) map.set(p.id, p);
         }

         const ordered = ids.map((id) => map.get(id)).filter(Boolean) as Pokemon[];
         setPokemons(ordered);
         return true;
      } catch (err) {
         const e = err as Error;
         setError(e);
         setPokemons([]);
         toast('Failed to fetch pokémons', { description: e.message });
         return false;
      } finally {
         setLoading(false);
      }
   }, [client, idsKey]);

   useEffect(() => {
      // fire-and-forget on mount / ids change
      fetchByIds();
   }, [fetchByIds]);

   const refetch = useCallback(async () => {
      const ok = await fetchByIds();
      if (ok) toast('Data refreshed', { description: 'Pokémons have been updated.' });
   }, [fetchByIds]);

   return {
      pokemons,
      loading,
      error,
      refetch,
   } as const;
}
