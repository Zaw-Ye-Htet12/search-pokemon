'use client';

import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { GET_POKEMONS } from '@/graphql/queries';
import { toast } from 'sonner';
import { Pokemon, PokemonsResponse } from '@/interfaces/pokemon';

interface UsePokemonsOptions {
   first?: number;
   skip?: boolean;
}

export function usePokemons({ first = 12, skip = false }: UsePokemonsOptions = {}) {
   const { data, loading, error, refetch } = useQuery<PokemonsResponse<Pokemon>>(GET_POKEMONS, {
      variables: { first },
      skip,
      errorPolicy: 'all',
   });

   // show toast when Apollo error changes (useEffect avoids setting local state inside onError)
   useEffect(() => {
      if (error) {
         toast('Failed to load pokémons. Please try again.', { description: error.message });
      }
   }, [error]);

   const handleRefetch = async () => {
      try {
         await refetch();
         toast('Data refreshed', { description: 'Pokémon list has been updated.' });
      } catch (error) {
         toast('Failed to refresh data. Please try again.', { description: (error as Error).message });
      }
   };
   return {
      data,
      loading,
      error: error as Error | undefined,
      refetch: handleRefetch,
   };
}
