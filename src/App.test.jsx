import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock the pdf export function since we don't want to test PDF generation in jsdom
vi.mock('./utils/pdfExport', () => ({
  exportInvoiceToPDF: vi.fn(),
}));

describe('BillKaro App', () => {
  test('renders BillKaro title', () => {
    render(<App />);
    const linkElement = screen.getByText(/BillKaro/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders default line item', () => {
    render(<App />);
    // There should be one row of inputs initially
    const descriptionInputs = screen.getAllByPlaceholderText(/Item description/i);
    expect(descriptionInputs).toHaveLength(1);

    // Check for "Line Items" header
    expect(screen.getByText(/Line Items/i)).toBeInTheDocument();
  });

  test('adds a new line item', () => {
    render(<App />);
    const addButton = screen.getByText(/Add Item/i);
    fireEvent.click(addButton);

    const descriptionInputs = screen.getAllByPlaceholderText(/Item description/i);
    expect(descriptionInputs).toHaveLength(2);
  });

  test('calculates totals correctly', () => {
    render(<App />);

    // Get inputs
    const quantityInput = screen.getByPlaceholderText('1');
    const rateInput = screen.getByPlaceholderText('₹0.00');

    // Change quantity to 2
    fireEvent.change(quantityInput, { target: { value: '2' } });

    // Change rate to 50
    fireEvent.change(rateInput, { target: { value: '50' } });

    // Check row amount (2 * 50 = 100)
    // We expect multiple 100.00 because subtotal and total will also be 100.00
    const amounts = screen.getAllByText('₹100.00');
    expect(amounts.length).toBeGreaterThan(0);
  });

  test('removes a line item', () => {
    render(<App />);
    const addButton = screen.getByText(/Add Item/i);

    // Add a second item
    fireEvent.click(addButton);

    let descriptionInputs = screen.getAllByPlaceholderText(/Item description/i);
    expect(descriptionInputs).toHaveLength(2);

    // Get all delete buttons
    const deleteButtons = screen.getAllByText('Delete');
    // Click the first one
    fireEvent.click(deleteButtons[0]);

    descriptionInputs = screen.getAllByPlaceholderText(/Item description/i);
    expect(descriptionInputs).toHaveLength(1);
  });
});
