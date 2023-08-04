'use client';

import { useCallback, useState } from 'react';
import { NftCard } from '../NftCard/NftCard';
import { allNftsAtom, queryAllNftsSelector } from '@/app/recoil/allNftsAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { searchTermAtom } from '@/app/recoil/searchTermAtom';
import { GET_LISTED_NFTS_BY_COLLECTION_SYMBOL_ENDPOINT } from '@/utils/contants';
import { VirtuosoGrid } from 'react-virtuoso';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Message } from '../Message/Message';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

type MeNft = {
  [key: string]: string;
};

export const NftGrid = () => {
  const setAllNfts = useSetRecoilState(allNftsAtom);
  const searchTerm = useRecoilValue(searchTermAtom);
  const filteredNfts = useRecoilValue(queryAllNftsSelector(searchTerm));
  const [offset, setOffset] = useState<number>(0);

  const fetchNfts = useCallback(
    async ({ pageParam: nextOffset = 0 }) => {
      const response = await fetch(
        GET_LISTED_NFTS_BY_COLLECTION_SYMBOL_ENDPOINT + nextOffset
      ).then((res) => res.json());

      setOffset(nextOffset);

      const nfts = response.results.map((nft: MeNft) => {
        return {
          id: nft.id,
          title: nft.title,
          image: nft.img,
          price: nft.price,
        };
      });
      setAllNfts((existingNfts) => [...existingNfts, ...nfts]);

      return response;
    },
    [setAllNfts]
  );

  const { fetchNextPage, isLoading, isError } = useInfiniteQuery({
    queryKey: ['nfts'],
    queryFn: fetchNfts,
    getNextPageParam: (lastPage, pages) => {
      return offset + lastPage.results.length;
    },
    retry: 10,
  });

  return (
    <div className="h-[calc(100vh-80px)] w-full mx-auto">
      {filteredNfts.length === 0 && !isLoading && (
        <Message
          title="No NFTs found"
          subtitle="Please try a different search term."
        />
      )}
      {isLoading && (
        <Message
          iconConfig={{
            iconProps: { icon: faSpinner, spin: true },
            iconColor: 'text-meLightest',
          }}
        />
      )}
      {isError && (
        <Message
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
