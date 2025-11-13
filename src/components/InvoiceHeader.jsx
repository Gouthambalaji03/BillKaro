import React from 'react';

function InvoiceHeader({ invoiceData, handleInvoiceChange }) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center mb-4 sm:mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3"></div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Invoice Details</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="group">
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
            Invoice Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="invoiceNumber"
            value={invoiceData.invoiceNumber}
            onChange={handleInvoiceChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white placeholder:text-gray-400 text-sm sm:text-base"
            placeholder="INV-001"
          />
        </div>
        <div className="group">
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
            Invoice Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="invoiceDate"
            value={invoiceData.invoiceDate}
            onChange={handleInvoiceChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white text-sm sm:text-base"
          />
        </div>
      </div>
    </div>
  );
}

export default InvoiceHeader;

