'use client';

import { NftGrid } from '@/components/NftGrid/NftGrid';
import { TopSearch } from '@/components/TopSearch/TopSearch';
import { RecoilRoot } from 'recoil';

export default function Home() {
  return (
    <RecoilRoot>
      <main className="flex flex-col">
        <header className="flex flex-col items-center w-full p-4 bg-meLighter shadow">
          <TopSearch />
        </header>
        <NftGrid />
      </main>
    </RecoilRoot>
  );
}
