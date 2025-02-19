import { atom, selectorFamily } from 'recoil';

export interface GridNft {
  id: string;
  title: string;
  image: string;
  price: number;
}

export const allNftsAtom = atom<GridNft[]>({
  key: 'allNfts',
  default: [],
});

export const queryAllNftsSelector = selectorFamily({
  key: 'queryAllNfts',
  get:
    (searchTerm: string) =>
    ({ get }) => {
      const allNfts = get(allNftsAtom);
      return allNfts.filter((nft) =>
        nft.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
});
