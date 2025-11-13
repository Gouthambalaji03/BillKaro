import React from 'react';

function InvoiceTotals({ subtotal, tax, total, taxRate }) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex justify-end">
        <div className="w-full sm:w-full md:w-2/3 lg:w-1/2 xl:w-2/5">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6 rounded-xl border-2 border-gray-200 shadow-lg">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                <span className="text-sm sm:text-base text-gray-700 font-semibold">Subtotal:</span>
                <span className="text-sm sm:text-base text-gray-800 font-bold">₹{subtotal.toFixed(2)}</span>
              </div>
              {taxRate > 0 && (
                <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                  <span className="text-sm sm:text-base text-gray-700 font-semibold">
                    Tax ({taxRate}%):
                  </span>
                  <span className="text-sm sm:text-base text-gray-800 font-bold">₹{tax.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t-2 border-gray-400 bg-white/50 rounded-lg px-3 sm:px-4 py-2 sm:py-3">
                <span className="text-base sm:text-lg md:text-xl text-gray-900 font-extrabold">Total:</span>
                <span className="text-base sm:text-lg md:text-xl text-blue-600 font-extrabold">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceTotals;

