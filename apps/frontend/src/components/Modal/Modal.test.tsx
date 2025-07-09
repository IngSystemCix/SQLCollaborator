import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: 'Test Title',
    description: 'Test Description',
    children: <div>Modal Content</div>,
    size: 'md' as const,
    footer: <div>Footer Content</div>,
    icon: <span data-testid="icon">Icon</span>,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<Modal {...defaultProps} />);
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('renders correct size for sm', () => {
    render(<Modal {...defaultProps} size="sm" />);
    const modalContent = screen.getByText('Test Title').closest('.modal-content');
    expect(modalContent).toHaveStyle('max-width: 400px');
  });

  it('renders correct size for md', () => {
    render(<Modal {...defaultProps} size="md" />);
    const modalContent = screen.getByText('Test Title').closest('.modal-content');
    expect(modalContent).toHaveStyle('max-width: 600px');
  });

  it('renders correct size for lg', () => {
    render(<Modal {...defaultProps} size="lg" />);
    const modalContent = screen.getByText('Test Title').closest('.modal-content');
    expect(modalContent).toHaveStyle('max-width: 800px');
  });

  it('renders correct size for xl', () => {
    render(<Modal {...defaultProps} size="xl" />);
    const modalContent = screen.getByText('Test Title').closest('.modal-content');
    expect(modalContent).toHaveStyle('max-width: 1000px');
  });

  it('does not render icon, title, description, or footer if not provided', () => {
    render(
      <Modal
        isOpen={true}
        onClose={defaultProps.onClose}
        size="md"
        children={<div>Only Content</div>}
      />
    );
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
    expect(screen.queryByText('Footer Content')).not.toBeInTheDocument();
    expect(screen.getByText('Only Content')).toBeInTheDocument();
  });
});

// We recommend installing an extension to run jest tests.