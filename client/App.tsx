import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';
import { createTRPCReact } from '@trpc/react-query';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Example from './Example';
 
export const trpc = createTRPCReact<AppRouter>();

export default function App() {
   const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'PUT_SERVER_URL_HERE_AFTER_DEPLOY',
        }),
      ],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Example />
      </QueryClientProvider>
    </trpc.Provider>
  );;
}
