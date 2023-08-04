import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Message } from '../Message';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

describe('Message', () => {
  it('renders a title, subtitle, and icon', () => {
    // Arrange
    const title = 'Something went wrong';
    const subtitle = 'Please try again later';
    const iconConfig = {
      iconProps: { icon: faSpinner, spin: true },
      iconColor: 'text-meLightest',
    };
    render(
      <Message title={title} subtitle={subtitle} iconConfig={iconConfig} />
    );

    const titleEl = screen.getByTestId('message-title');
    const subtitleEl = screen.getByTestId('message-subtitle');
    const iconEl = screen.getByTestId('message-icon');

    // Assert
    expect(titleEl).toBeInTheDocument();
    expect(titleEl).toHaveTextContent(title);
    expect(subtitleEl).toBeInTheDocument();
    expect(subtitleEl).toHaveTextContent(subtitle);
    expect(iconEl).toBeInTheDocument();
    expect(iconEl).toHaveClass('text-meLightest');
  });
});
