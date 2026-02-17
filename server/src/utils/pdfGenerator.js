const PDFDocument = require('pdfkit');
const { generateQRCode } = require('./qrGenerator');

/**
 * Generate visitor badge PDF
 * @param {Object} visitor - Visitor data
 * @param {string} qrCodeDataURL - QR code as data URL
 * @returns {PDFDocument} - PDF document stream
 */
const generateVisitorBadge = async (visitor, qrCodeDataURL) => {
    const doc = new PDFDocument({ size: [400, 600], margin: 20 });

    // Header
    doc
        .fillColor('#4F46E5')
        .rect(0, 0, 400, 80)
        .fill();

    doc
        .fillColor('#FFFFFF')
        .fontSize(24)
        .font('Helvetica-Bold')
        .text('VISITOR PASS', 0, 25, { align: 'center' });

    // Visitor Name
    doc
        .fillColor('#000000')
        .fontSize(20)
        .font('Helvetica-Bold')
        .text(visitor.name, 20, 100);

    // Details
    doc
        .fontSize(12)
        .font('Helvetica')
        .fillColor('#374151')
        .text(`Phone: ${visitor.phone}`, 20, 135);
    
    if (visitor.email) {
        doc.text(`Email: ${visitor.email}`, 20, 155);
    }

    doc
        .text(`Purpose: ${visitor.purpose}`, 20, 175, { width: 360 });

    doc
        .text(`Host: ${visitor.host?.name || 'N/A'}`, 20, 210);

    doc
        .fontSize(10)
        .fillColor('#6B7280')
        .text(`Created: ${new Date(visitor.createdAt).toLocaleDateString()}`, 20, 235);

    // QR Code
    if (qrCodeDataURL) {
        const qrImageBuffer = Buffer.from(qrCodeDataURL.split(',')[1], 'base64');
        doc.image(qrImageBuffer, 50, 270, { width: 300, height: 300 });
    }

    // Footer
    doc
        .fontSize(8)
        .fillColor('#9CA3AF')
        .text('Please present this pass at security desk', 0, 580, { align: 'center' });

    doc.end();
    return doc;
};

module.exports = { generateVisitorBadge };
