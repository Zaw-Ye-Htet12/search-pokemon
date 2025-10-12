'use client';
import { useApolloClient } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { GET_POKEMONS_BY_IDS } from '@/graphql/queries';
import type { Pokemon } from '@/interfaces/pokemon';

export function useGetInfoByIds(ids: string[]) {
   const client = useApolloClient();
   const [pokemons, setPokemons] = useState<Pokemon[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<Error | undefined>(undefined);

   // derive a stable key from ids so dependencies don't change on each render
   const idsKey = Array.isArray(ids) && ids.length > 0 ? ids.join('|') : '';

   const fetchByIds = useCallback(async () => {
      // If no ids, nothing to fetch
      if (!idsKey) {
         setPokemons([]);
         setError(undefined);
         setLoading(false);
         return;
      }

      setLoading(true);
      setError(undefined);

      try {
         // Query the API once per id using the GET_POKEMONS_BY_IDS operation (which accepts id/name)
         const results = await Promise.all(
            ids.map((id) =>
               client.query<{ pokemons?: Pokemon[] }>({
                  query: GET_POKEMONS_BY_IDS,
                  variables: { id },
                  fetchPolicy: 'network-only',
               })
            )
         );

         // Flatten results and dedupe, preserving the order of `ids`
         const merged = results.flatMap((r) => r.data.pokemons ?? []);
         const map = new Map<string, Pokemon>();
         for (const p of merged) {
            if (p?.id) map.set(p.id, p);
         }
         const ordered = ids.map((id) => map.get(id)).filter(Boolean) as Pokemon[];

         setPokemons(ordered);
      } catch (err) {
         setError(err as Error);
         setPokemons([]); // fallback to empty; caller may use cookie data if needed
      } finally {
         setLoading(false);
      }
   }, [client, idsKey]);

   useEffect(() => {
      fetchByIds();
   }, [fetchByIds]);

   return {
      pokemons,
      loading,
      error,
      refetch: fetchByIds,
   };
}
