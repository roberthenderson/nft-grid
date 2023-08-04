import { allNftsAtom } from '@/app/recoil/allNftsAtom';
import { GET_LISTED_NFTS_BY_COLLECTION_SYMBOL_ENDPOINT } from '@/utils/contants';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';

type MeNft = {
  [key: string]: string;
};

export const useMeNfts = () => {
  const setAllNfts = useSetRecoilState(allNftsAtom);
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

  return { fetchNextPage, isLoading, isError };
};
