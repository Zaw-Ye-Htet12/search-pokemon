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
export const GET_POKEMON_BY_ID = gql`
   query GetPokemonById($id: String!) {
      pokemon(id: $id) {
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

export const GET_POKEMONS_BY_IDS = gql`
   query GetPokemonsByIds($id: String) {
      pokemons(id: $id) {
         id
         name
         types
         maxCP
         maxHP
         image
      }
   }
`;
