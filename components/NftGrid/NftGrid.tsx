'use client';

import { NftCard } from '../NftCard/NftCard';
import { queryAllNftsSelector } from '@/app/recoil/allNftsAtom';
import { useRecoilValue } from 'recoil';
import { searchTermAtom } from '@/app/recoil/searchTermAtom';
import { VirtuosoGrid } from 'react-virtuoso';
import { Message } from '../Message/Message';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useMeNfts } from '@/hooks/useMeNfts';

export const NftGrid = () => {
  const { fetchNextPage, isLoading, isError } = useMeNfts();
  const searchTerm = useRecoilValue(searchTermAtom);
  const filteredNfts = useRecoilValue(queryAllNftsSelector(searchTerm));

  return (
    <div data-testid="nft-grid" className="h-[calc(100vh-80px)] w-full mx-auto">
      {filteredNfts.length === 0 && !isLoading && (
        <Message
          title="No NFTs found"
          subtitle="Please try a different search term."
        />
      )}
      {isLoading && (
        <Message
          data-testid="loading-message"
          iconConfig={{
            iconProps: { icon: faSpinner, spin: true },
            iconColor: 'text-meLightest',
          }}
        />
      )}
      {isError && (
        <Message
          data-testid="error-message"
          title="Oops, something went wrong"
          subtitle="Please refresh the page."
        />
      )}
      <VirtuosoGrid
        listClassName="nft-grid w-full grid my-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4"
        itemClassName="w-full relative"
        data={filteredNfts}
        itemContent={(index, nft) => <NftCard nft={nft} key={nft.id} />}
        useWindowScroll
        overscan={20}
        endReached={() => fetchNextPage()}
      />
    </div>
  );
};
