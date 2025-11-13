import React from 'react';

function ClientInfo({ invoiceData, handleInvoiceChange }) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center mb-4 sm:mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3"></div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Client Information</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="group">
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
            Client Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="clientName"
            value={invoiceData.clientName}
            onChange={handleInvoiceChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white placeholder:text-gray-400 text-sm sm:text-base"
            placeholder="Goutham(Client Name)"
          />
        </div>
        <div className="group">
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
            Email
          </label>
          <input
            type="email"
            name="clientEmail"
            value={invoiceData.clientEmail}
            onChange={handleInvoiceChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white placeholder:text-gray-400 text-sm sm:text-base"
            placeholder="client@gmail.com"
          />
        </div>
        <div className="sm:col-span-2 group">
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
            Address
          </label>
          <input
            type="text"
            name="clientAddress"
            value={invoiceData.clientAddress}
            onChange={handleInvoiceChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white placeholder:text-gray-400 text-sm sm:text-base"
            placeholder="123 Main Street"
          />
        </div>
        <div className="group">
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
            City
          </label>
          <input
            type="text"
            name="clientCity"
            value={invoiceData.clientCity}
            onChange={handleInvoiceChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white placeholder:text-gray-400 text-sm sm:text-base"
            placeholder="India"
          />
        </div>
        <div className="group">
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
            State
          </label>
          <input
            type="text"
            name="clientState"
            value={invoiceData.clientState}
            onChange={handleInvoiceChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white placeholder:text-gray-400 text-sm sm:text-base"
            placeholder="Tamil Nadu"
          />
        </div>
        <div className="group">
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
            ZIP Code
          </label>
          <input
            type="text"
            name="clientZip"
            value={invoiceData.clientZip}
            onChange={handleInvoiceChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white placeholder:text-gray-400 text-sm sm:text-base"
            placeholder="600015"
          />
        </div>
        <div className="group">
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
            Tax Rate (%)
          </label>
          <input
            type="number"
            name="taxRate"
            value={invoiceData.taxRate}
            onChange={handleInvoiceChange}
            min="0"
            max="100"
            step="0.01"
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white placeholder:text-gray-400 text-sm sm:text-base"
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
}

export default ClientInfo;

