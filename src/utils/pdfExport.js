import jsPDF from 'jspdf';

export const exportInvoiceToPDF = (invoiceData, lineItems, calculations) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = margin;

  const currencyPrefix = 'Rs.';

  const formatNumber = (value, fractionDigits = 0) =>
    (Number.isFinite(Number(value)) ? Number(value) : 0).toLocaleString('en-IN', {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });

  const formatCurrency = (value) =>
    `${currencyPrefix} ${(Number.isFinite(Number(value)) ? Number(value) : 0).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  // Header
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', margin, yPosition);
  yPosition += 15;

  // Invoice details
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Invoice #: ${invoiceData.invoiceNumber || 'N/A'}`, pageWidth - margin, yPosition - 10, { align: 'right' });
  doc.text(`Date: ${invoiceData.invoiceDate || 'N/A'}`, pageWidth - margin, yPosition - 5, { align: 'right' });
  yPosition += 10;

  // Client information
  doc.setFont('helvetica', 'bold');
  doc.text('Bill To:', margin, yPosition);
  yPosition += 7;
  doc.setFont('helvetica', 'normal');
  doc.text(invoiceData.clientName || '', margin, yPosition);
  yPosition += 5;
  doc.text(invoiceData.clientAddress || '', margin, yPosition);
  yPosition += 5;
  const cityStateZip = [invoiceData.clientCity, invoiceData.clientState, invoiceData.clientZip]
    .filter(Boolean)
    .join(', ');
  if (cityStateZip) {
    doc.text(cityStateZip, margin, yPosition);
    yPosition += 5;
  }
  if (invoiceData.clientEmail) {
    doc.text(invoiceData.clientEmail, margin, yPosition);
    yPosition += 5;
  }
  yPosition += 10;

  // Table layout definitions
  const tableStartY = yPosition;
  const tableLeft = margin;
  const tableRight = pageWidth - margin;
  const tableWidth = tableRight - tableLeft;
  const headerRowHeight = 10;
  const rowPadding = 4;
  const lineHeight = 5;

  // Column widths (Description, Qty, Rate, Amount)
  const qtyWidth = 25;
  const rateWidth = 35;
  const amountWidth = 50;
  const descriptionWidth = tableWidth - (qtyWidth + rateWidth + amountWidth);

  const columnStarts = [tableLeft, tableLeft + descriptionWidth, tableLeft + descriptionWidth + qtyWidth, tableLeft + descriptionWidth + qtyWidth + rateWidth];
  const columnWidths = [descriptionWidth, qtyWidth, rateWidth, amountWidth];
  const cellCenter = (index) => columnStarts[index] + columnWidths[index] / 2;
  const cellRight = (index, padding = 5) => columnStarts[index] + columnWidths[index] - padding;

  // Header background
  doc.setFillColor(240, 240, 240);
  doc.rect(tableLeft, tableStartY, tableWidth, headerRowHeight, 'F');

  // Header labels
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text('Description', cellCenter(0), tableStartY + 6, { align: 'center' });
  doc.text('Qty', cellCenter(1), tableStartY + 6, { align: 'center' });
  doc.text('Rate', cellCenter(2), tableStartY + 6, { align: 'center' });
  doc.text('Amount', cellCenter(3), tableStartY + 6, { align: 'center' });

  // Draw header bottom border
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.line(tableLeft, tableStartY + headerRowHeight, tableRight, tableStartY + headerRowHeight);

  yPosition = tableStartY + headerRowHeight;

  // Line items
  doc.setFont('helvetica', 'normal');
  lineItems.forEach((item, index) => {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = margin;
    }
    
    const quantityValue = Number(item.quantity) || 0;
    const rateValue = Number(item.unitRate) || 0;
    const amountValue =
      Number.isFinite(Number(item.amount)) ? Number(item.amount) : quantityValue * rateValue;

    const quantityText = formatNumber(quantityValue);
    const rateText = formatCurrency(rateValue);
    const amountText = formatCurrency(amountValue);

    const descriptionLines = doc.splitTextToSize(item.description || '', descriptionWidth - 10);
    const textHeight = descriptionLines.length * lineHeight;
    const rowHeight = Math.max(headerRowHeight, textHeight + rowPadding * 2);
    
    // Draw horizontal row divider before each row (except first)
    if (index > 0) {
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.3);
      doc.line(tableLeft, yPosition, tableRight, yPosition);
    }
    
    // Description text
    const textBlockHeight = descriptionLines.length * lineHeight;
    const descriptionStartY = yPosition + (rowHeight - textBlockHeight) / 2 + lineHeight / 2;
    descriptionLines.forEach((line, lineIndex) => {
      const lineY = descriptionStartY + lineIndex * lineHeight;
      doc.text(line, cellCenter(0), lineY, { align: 'center' });
    });

    const centerY = yPosition + rowHeight / 2 + lineHeight / 2 - 1;

    doc.text(quantityText, cellCenter(1), centerY, {
      align: 'center',
    });

    doc.text(rateText, cellRight(2), centerY, { align: 'right' });

    doc.text(amountText, cellRight(3), centerY, { align: 'right' });
    
    yPosition += rowHeight;
  });

  // Draw table border (outer box) - after calculating all rows
  const tableHeight = yPosition - tableStartY;
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.rect(tableLeft, tableStartY, tableRight - tableLeft, tableHeight);

  // Vertical column dividers
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.4);
  for (let i = 1; i < columnStarts.length; i += 1) {
    doc.line(columnStarts[i], tableStartY, columnStarts[i], tableStartY + tableHeight);
  }

  yPosition += 10;

  // Totals
  const subtotal = calculations.subtotal;
  const tax = calculations.tax;
  const total = calculations.total;

  doc.setFont('helvetica', 'normal');
  doc.text('Subtotal:', pageWidth - margin - 50, yPosition, { align: 'right' });
  doc.text(formatCurrency(subtotal), pageWidth - margin, yPosition, { align: 'right' });
  yPosition += 7;

  if (invoiceData.taxRate > 0) {
    doc.text(`Tax (${invoiceData.taxRate}%):`, pageWidth - margin - 50, yPosition, { align: 'right' });
    doc.text(formatCurrency(tax), pageWidth - margin, yPosition, { align: 'right' });
    yPosition += 7;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Total:', pageWidth - margin - 50, yPosition, { align: 'right' });
  doc.text(formatCurrency(total), pageWidth - margin, yPosition, { align: 'right' });

  // Save PDF
  const fileName = `Invoice_${invoiceData.invoiceNumber || 'Invoice'}_${invoiceData.invoiceDate || 'Date'}.pdf`;
  doc.save(fileName);
};
