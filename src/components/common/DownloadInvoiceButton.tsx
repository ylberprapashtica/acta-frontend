import React, { useState } from 'react';
import { Invoice } from '../../types/invoice';
import { invoiceService } from '../../services/invoice.service';

interface DownloadInvoiceButtonProps {
  invoice: Invoice;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}

export const DownloadInvoiceButton: React.FC<DownloadInvoiceButtonProps> = ({
  invoice,
  variant = 'secondary',
  className = '',
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const pdfBlob = await invoiceService.downloadPdf(Number(invoice.id));
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(pdfBlob);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${invoice.invoiceNumber}.pdf`;
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download invoice:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const getButtonClassName = () => {
    const baseClasses = "inline-flex items-center justify-center px-3 py-1 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 relative";
    switch (variant) {
      case 'primary':
        return `${baseClasses} text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 ${className}`;
      case 'secondary':
        return `${baseClasses} text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 ${className}`;
      case 'danger':
        return `${baseClasses} text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 ${className}`;
      default:
        return `${baseClasses} text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 ${className}`;
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={getButtonClassName()}
    >
      Download
      {isDownloading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit">
          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
    </button>
  );
}; 