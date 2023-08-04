'use client';

import { GridNft } from '@/app/recoil/allNftsAtom';
import { BLUR_DATA_URL } from '@/utils/contants';
import Image from 'next/image';

type NftCardProps = {
  nft: GridNft;
};

export const NftCard = ({ nft }: NftCardProps) => {
  return (
    <div className="nft-card">
      <Image
        width={400}
        height={400}
        src={nft.image}
        alt={nft.title}
        className="w-full h-full static rounded-md"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-meDarkest rounded-b-sm">
        <div className="my-auto p-2 h-10 flex">
          <p className="nft-title shadow leading-6 text-sm">{nft.title}</p>
          <p className="flex nft-price shadow ml-auto leading-6 text-md">
            <Image
              src={'/static/icons/solanaIcon.png'}
              width={15}
              height={13}
              alt="Solana Icon"
              className="w-auto h-4 my-auto mr-1 lg:mr-0.5"
            />
            <span>{nft.price}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
