import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TopSearch } from '../TopSearch';
import { act } from 'react-dom/test-utils';

describe('TopSearch', () => {
  beforeEach(() => {
    render(<TopSearch />);
  });

  it('renders an input', () => {
    // Arrange
    const input = screen.getByTestId('top-search-input');

    // Assert
    expect(input).toBeInTheDocument();
  });

  it('changes the icon to pink when focused', () => {
    // Arrange
    const input = screen.getByTestId('top-search-input');
    const icon = screen.getByTestId('top-search-icon');

    // Act
    act(() => {
      input.focus();
    });

    // Assert
    waitFor(() => {
      expect(icon).toHaveClass('text-meLightest');
      expect(icon).not.toHaveClass('text-gray-200');
    });
  });
});
