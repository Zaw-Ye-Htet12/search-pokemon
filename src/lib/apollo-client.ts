'use client';
import ENV from '@/config/constants';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const apolloClient = () => {
   return new ApolloClient({
      link: new HttpLink({
         uri: ENV.API_URL,
      }),
      cache: new InMemoryCache(),
   });
};

export default apolloClient;
