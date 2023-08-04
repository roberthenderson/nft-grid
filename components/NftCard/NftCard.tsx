'use client';

import { GridNft } from '@/app/recoil/allNftsAtom';
import Image from 'next/image';

interface NftCardProps {
  nft: GridNft;
}

export const NftCard = ({ nft }: NftCardProps) => {
  return (
    <div className="nft-card">
      <Image
        width={400}
        height={400}
        src={nft.image}
        alt={nft.title}
        className="w-full h-full static rounded-md"
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-meDarkest rounded-b-sm">
        <div className="my-auto p-2 h-10 flex text-md lg:text-xs">
          <p className="nft-title shadow leading-6">{nft.title}</p>
          <p className="flex nft-price shadow ml-auto leading-6">
            <Image
              src={'/static/icons/solanaIcon.png'}
              width={15}
              height={13}
              alt="Solana Icon"
              className="w-auto h-4 my-auto mr-1 lg:h-3 lg:mr-0.5"
            />
            <span>{nft.price}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
