import { NftGrid } from '@/components/NftGrid/NftGrid';
import { TopSearch } from '@/components/TopSearch/TopSearch';

export default function Home() {
  return (
    <main className="flex flex-col bg-bgMain">
      <header className="flex flex-col items-center w-full p-4 bg-header">
        <TopSearch />
      </header>
      <NftGrid />
    </main>
  );
}
