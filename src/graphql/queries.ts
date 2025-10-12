import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
   query GetPokemons($first: Int!) {
      pokemons(first: $first) {
         id
         number
         name
         types
         maxCP
         maxHP
         image
      }
   }
`;
export const GET_POKEMON_BY_NAME = gql`
   query GetPokemonByName($name: String!) {
      pokemon(name: $name) {
         id
         number
         name
         weight {
            minimum
            maximum
         }
         height {
            minimum
            maximum
         }
         classification
         types
         resistant
         weaknesses
         fleeRate
         maxCP
         maxHP
         image
         attacks {
            fast {
               name
               type
               damage
            }
            special {
               name
               type
               damage
            }
         }
         evolutions {
            id
            name
            number
            image
            types
         }
         evolutionRequirements {
            amount
            name
         }
      }
   }
`;

export const SEARCH_POKEMON = gql`
   query SearchPokemon($name: String!) {
      pokemon(name: $name) {
         id
         number
         name
         types
         image
      }
   }
`;

export const GET_POKEMONS_BY_IDS = gql`
   query GetPokemonsByIds($id: String, $name: String) {
      pokemons(id: $id, name: $name) {
         id
         name
         types
         maxCP
         maxHP
         image
      }
   }
`;
