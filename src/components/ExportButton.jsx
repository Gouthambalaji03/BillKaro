import React from 'react';

function ExportButton({ onExport }) {
  return (
    <div className="flex justify-center gap-4 pt-4 sm:pt-6">
      <button
        onClick={onExport}
        className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span>Export to PDF</span>
      </button>
    </div>
  );
}

export default ExportButton;

