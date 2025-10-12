'use client';

import apolloClient from '@/lib/apollo-client';
import { ApolloProvider } from '@apollo/client/react';
import { useState } from 'react';

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
   const [client] = useState(apolloClient());

   return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
