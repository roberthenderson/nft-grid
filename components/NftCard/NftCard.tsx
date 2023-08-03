'use client';

import Image from 'next/image';
import { GridNft } from '../NftGrid/NftGrid';

interface NftCardProps {
  nft: GridNft;
}

export const NftCard = ({ nft }: NftCardProps) => {
  return (
    <div className="nft-card w-full relative">
      <Image
        width={220}
        height={220}
        src={nft.image}
        alt={nft.title}
        className="w-full h-full static"
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-header">
        <div className="my-auto p-2 h-1/3 flex text-md lg:text-xs">
          <p className="nft-title shadow">{nft.title}</p>
          <p className="flex nft-price shadow ml-auto">
            <Image
              src={'/static/icons/solanaIcon.png'}
              width={15}
              height={13}
              alt="Solana Icon"
              className="w-auto h-4 mt-1 mr-1 lg:h-3 lg:mt-[2px] lg:mr-0.5"
            />
            <span>{nft.price}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
