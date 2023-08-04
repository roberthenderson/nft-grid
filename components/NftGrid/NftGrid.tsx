'use client';

import { useCallback, useEffect } from 'react';
import { NftCard } from '../NftCard/NftCard';
import { allNftsAtom, queryAllNftsSelector } from '@/app/recoil/allNftsAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchTermAtom } from '@/app/recoil/searchTermAtom';
import { GET_LISTED_NFTS_BY_COLLECTION_SYMBOL_ENDPOINT } from '@/utils/contants';
import { VirtuosoGrid } from 'react-virtuoso';

interface MeNft {
  [key: string]: string;
}

export const NftGrid = () => {
  const [allNfts, setAllNfts] = useRecoilState(allNftsAtom);
  const searchTerm = useRecoilValue(searchTermAtom);
  const filteredNfts = useRecoilValue(queryAllNftsSelector(searchTerm));

  const fetchNfts = useCallback(async () => {
    const response = await fetch(
      GET_LISTED_NFTS_BY_COLLECTION_SYMBOL_ENDPOINT
    ).then((res) => res.json());
    const nfts = response.results.map((nft: MeNft) => {
      return {
        id: nft.id,
        title: nft.title,
        image: nft.img,
        price: nft.price,
      };
    });
    console.log('nfts', nfts, filteredNfts);
    setAllNfts((existingNfts) => [...existingNfts, ...nfts]);
  }, [setAllNfts]);

  useEffect(() => {
    if (allNfts.length === 0) {
      fetchNfts();
    }
  }, [fetchNfts, allNfts]);

  return (
    <div className="h-[calc(100vh-80px)] w-full mx-auto">
      <VirtuosoGrid
        listClassName="nft-grid w-full grid mt-8 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4"
        itemClassName="w-full relative"
        data={filteredNfts}
        itemContent={(index, nft) => <NftCard nft={nft} key={nft.id} />}
      />
    </div>
  );
};
