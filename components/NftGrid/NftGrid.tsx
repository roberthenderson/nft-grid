'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { NftCard } from '../NftCard/NftCard';

interface MeNft {
  [key: string]: string;
}

export interface GridNft {
  id: string;
  title: string;
  image: string;
  price: string;
}

export const NftGrid = () => {
  const [allNfts, setAllNfts] = useState<GridNft[]>([]);

  const fetchNfts = useCallback(async () => {
    const endpoint =
      'https://api-mainnet.magiceden.io/idxv2/getListedNftsByCollectionSymbol?collectionSymbol=okay_bears&limit=20&offset=0';
    const response = await fetch(endpoint).then((res) => res.json());
    const nfts = response.results.map((nft: MeNft) => {
      return {
        id: nft.id,
        title: nft.title,
        image: nft.img,
        price: nft.price,
      };
    });
    setAllNfts((existingNfts) => [...existingNfts, ...nfts]);
  }, []);

  useEffect(() => {
    fetchNfts();
  }, [fetchNfts]);
  return (
    <section className="nft-grid grid mt-4 mx-auto grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 max-w-screen-xl">
      {allNfts.map((nft) => (
        <NftCard nft={nft} key={nft.id} />
      ))}
    </section>
  );
};
