# BillKaro

BillKaro is a responsive React application for creating, managing, and exporting professional invoices. It lets you maintain client details, add multiple line items, calculate totals in real time, and export the final invoice as a PDF.

## Features

- Client information management (name, address, city/state, email, tax rate)
- Dynamic line items with add, edit, delete options
- Auto-calculated subtotal, tax, and grand total
- PDF export with styled invoice layout and rupee currency formatting
- TailwindCSS styling and responsive layout

## Tech Stack

- React 19 with Vite
- TailwindCSS (built via PostCSS in `index.css`)
- jsPDF for PDF generation
- ESLint for linting

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to use the app.

### Building for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/
    ClientInfo.jsx          // Client form section
    ExportButton.jsx        // PDF export button
    InvoiceHeader.jsx       // Invoice metadata inputs
    InvoiceTotals.jsx       // Totals summary card
    LineItemsTable.jsx      // Line items table
    LineItemRow.jsx         // Individual line item row
  utils/
    pdfExport.js            // jsPDF export logic
  App.jsx                   // Root application layout
  main.jsx                  // React entry point
  index.css                 // Tailwind directives and global styles
```

## PDF Export Notes

- Amounts are formatted using the Indian numbering system with the `Rs.` prefix.
- Table layout is generated manually with jsPDF primitives to ensure proper alignment.
- If you extend the invoice to span multiple pages, update `pdfExport.js` to re-render the table header on each new page.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/my-feature`)
5. Open a pull request

## License

This project is MIT licensed. See the [LICENSE](LICENSE) file for details.
