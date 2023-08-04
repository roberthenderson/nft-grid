'use client';

import { NftGrid } from '@/components/NftGrid/NftGrid';
import { TopSearch } from '@/components/TopSearch/TopSearch';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <main className="flex flex-col pt-20">
          <header className="fixed top-0 left-0 right-0 z-10 flex flex-col items-center w-full h-20 p-4 bg-meLighter shadow">
            <TopSearch />
          </header>
          <NftGrid />
        </main>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
