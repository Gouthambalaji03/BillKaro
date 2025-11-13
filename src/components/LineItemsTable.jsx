import React from 'react';
import LineItemRow from './LineItemRow';

function LineItemsTable({ lineItems, onItemChange, onAddItem, onRemoveItem }) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div className="flex items-center">
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Line Items</h2>
        </div>
        <button
          onClick={onAddItem}
          className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          <span className="text-lg">+</span>
          <span>Add Item</span>
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border-2 border-gray-200 shadow-sm">
        <table className="w-full border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
              <th className="border-b-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider">
                Description
              </th>
              <th className="border-b-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider">
                Quantity
              </th>
              <th className="border-b-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider">
                Unit Rate (₹)
              </th>
              <th className="border-b-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider">
                Amount (₹)
              </th>
              <th className="border-b-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-center text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lineItems.map((item) => (
              <LineItemRow
                key={item.id}
                item={item}
                onItemChange={onItemChange}
                onRemove={onRemoveItem}
                canDelete={lineItems.length > 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LineItemsTable;

