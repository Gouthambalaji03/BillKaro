import React from 'react';

function LineItemRow({ item, onItemChange, onRemove, canDelete }) {
  return (
    <tr className="hover:bg-blue-50/50 transition-colors duration-150 border-b border-gray-200">
      <td className="px-3 sm:px-4 py-2.5 sm:py-3">
        <input
          type="text"
          value={item.description}
          onChange={(e) => onItemChange(item.id, 'description', e.target.value)}
          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm sm:text-base placeholder:text-gray-400"
          placeholder="Item description"
        />
      </td>
      <td className="px-3 sm:px-4 py-2.5 sm:py-3">
        <input
          type="text"
          value={item.quantity === 0 ? '' : item.quantity}
          onChange={(e) => {
            const val = e.target.value;
            // Only allow numbers
            if (val === '' || /^\d+$/.test(val)) {
              onItemChange(item.id, 'quantity', val);
            }
          }}
          inputMode="numeric"
          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm sm:text-base"
          placeholder="1"
        />
      </td>
      <td className="px-3 sm:px-4 py-2.5 sm:py-3">
        <input
          type="text"
          value={item.unitRate === 0 || item.unitRate === '' ? '' : item.unitRate}
          onChange={(e) => onItemChange(item.id, 'unitRate', e.target.value)}
          inputMode="decimal"
          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm sm:text-base"
          placeholder="₹0.00"
        />
      </td>
      <td className="px-3 sm:px-4 py-2.5 sm:py-3">
        <span className="font-semibold text-gray-800 text-sm sm:text-base">₹{item.amount.toFixed(2)}</span>
      </td>
      <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-center">
        <button
          onClick={() => onRemove(item.id)}
          disabled={!canDelete}
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transform hover:scale-105 disabled:transform-none"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default LineItemRow;

