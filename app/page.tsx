import TopSearch from '@/components/TopSearch/TopSearch';

export default function Home() {
  return (
    <main className="flex flex-col">
      <header className="flex flex-col items-center w-full p-4">
        <TopSearch />
      </header>
      <section className="nft-grid flex min-h-screen flex-col items-center justify-between pl-24 pr-24">
        <h1 className="text-2xl font-bold text-left">Okay Bears</h1>
      </section>
    </main>
  );
}
