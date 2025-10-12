// src/hooks/useGetPokemonDetail.ts
'use client';

import { GET_POKEMON_BY_ID } from '@/graphql/queries';
import { Pokemon, PokemonResponse } from '@/interfaces/pokemon';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useGetPokemonDetail(id: string) {
   const { data, loading, error } = useQuery<PokemonResponse<Pokemon>>(GET_POKEMON_BY_ID, {
      variables: { id },
      errorPolicy: 'all',
   });

   useEffect(() => {
      if (error) {
         toast('Failed to load Pokémon details. Please try again.', {
            description: error.message,
         });
      }
   }, [error]);

   return {
      data: data?.pokemon,
      loading,
      error,
   };
}
