import React, { useState } from 'react';
import InvoiceHeader from './components/InvoiceHeader';
import ClientInfo from './components/ClientInfo';
import LineItemsTable from './components/LineItemsTable';
import InvoiceTotals from './components/InvoiceTotals';
import ExportButton from './components/ExportButton';
import { exportInvoiceToPDF } from './utils/pdfExport';

function App() {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    clientName: '',
    clientAddress: '',
    clientCity: '',
    clientState: '',
    clientZip: '',
    clientEmail: '',
    taxRate: 0,
  });

  const [lineItems, setLineItems] = useState(() => [
    {
      id: Date.now(),
      description: '',
      quantity: 1,
      unitRate: '',
      amount: 0,
    },
  ]);

  const handleInvoiceChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLineItemChange = (id, field, value) => {
    setLineItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const updatedItem = {
            ...item,
            [field]: field === 'quantity' || field === 'unitRate' 
              ? (value === '' ? '' : parseFloat(value) || 0)
              : value,
          };
          // Calculate amount - handle empty strings as 0 for calculation
          const qty = updatedItem.quantity === '' ? 0 : updatedItem.quantity;
          const rate = updatedItem.unitRate === '' ? 0 : updatedItem.unitRate;
          updatedItem.amount = qty * rate;
          return updatedItem;
        }
        return item;
      })
    );
  };

  const addLineItem = () => {
    setLineItems((prevItems) => [
      ...prevItems,
      {
        id: Date.now(),
        description: '',
        quantity: 1,
        unitRate: '',
        amount: 0,
      },
    ]);
  };

  const removeLineItem = (id) => {
    if (lineItems.length > 1) {
      setLineItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return (subtotal * parseFloat(invoiceData.taxRate || 0)) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleExportToPDF = () => {
    const calculations = {
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal(),
    };
    exportInvoiceToPDF(invoiceData, lineItems, calculations);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Invoice Builder
          </h1>
          <p className="text-sm sm:text-base text-gray-600">Create professional invoices in minutes</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-300 hover:shadow-2xl">
          <InvoiceHeader
            invoiceData={invoiceData}
            handleInvoiceChange={handleInvoiceChange}
          />

          <ClientInfo
            invoiceData={invoiceData}
            handleInvoiceChange={handleInvoiceChange}
          />

          <LineItemsTable
            lineItems={lineItems}
            onItemChange={handleLineItemChange}
            onAddItem={addLineItem}
            onRemoveItem={removeLineItem}
          />

          <InvoiceTotals
            subtotal={calculateSubtotal()}
            tax={calculateTax()}
            total={calculateTotal()}
            taxRate={invoiceData.taxRate}
          />

          <ExportButton onExport={handleExportToPDF} />
        </div>
      </div>
    </div>
  );
}

export default App;
