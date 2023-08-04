import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NftGrid } from '../NftGrid';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();
const createWrapper = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <NftGrid />
      </RecoilRoot>
    </QueryClientProvider>
  );
};

describe('NftGrid', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading spinner', () => {
    // Arrange
    jest.mock('@tanstack/react-query', () => ({
      useInfiniteQuery: jest.fn().mockReturnValue({
        isLoading: true,
      }),
    }));

    // Act
    createWrapper();

    // Assert
    waitFor(() => {
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
  });

  it('shows error message', () => {
    // Arrange
    jest.mock('@tanstack/react-query', () => ({
      useInfiniteQuery: jest.fn().mockReturnValue({
        isError: true,
      }),
    }));

    // Act
    createWrapper();

    // Assert
    waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });

  it('shows nfts', () => {
    // Arrange
    jest.mock('@tanstack/react-query', () => ({
      useInfiniteQuery: jest.fn().mockReturnValue({
        results: [
          {
            id: '1',
            title: 'NFT',
            image: 'https://placekitten.com/200/200',
            price: '42.69',
          },
        ],
        isSuccess: true,
      }),
    }));

    // Act
    createWrapper();

    // Assert
    waitFor(() => {
      const nftGrid = screen.getByTestId('nft-grid');
      const nfts = nftGrid.querySelectorAll('.nft-card');
      expect(nfts.length).toBe(1);
    });
  });
});
