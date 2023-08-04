import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NftCard } from '../NftCard';

describe('NftCard', () => {
  const title = 'NFT';
  const image = 'https://placekitten.com/200/200';
  const price = '42.69';

  beforeEach(() => {
    const nft = {
      id: '1',
      title,
      image,
      price,
    };
    render(<NftCard nft={nft} />);
  });

  it('renders an nft', () => {
    // Arrange
    const imageEl = screen.getByTestId('nft-image');
    const titleEl = screen.getByTestId('nft-title');
    const priceEl = screen.getByTestId('nft-price');

    // Assert
    expect(imageEl).toBeInTheDocument();
    waitFor(() => {
      // Next Image component lazily loads the image
      expect(imageEl).toHaveAttribute('src', image);
    });
    expect(titleEl).toBeInTheDocument();
    expect(titleEl).toHaveTextContent(title);
    expect(priceEl).toBeInTheDocument();
    expect(priceEl).toHaveTextContent(price);
  });
});
