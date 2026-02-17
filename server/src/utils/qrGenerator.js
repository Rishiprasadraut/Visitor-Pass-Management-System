const QRCode = require('qrcode');

/**
 * Generate QR code as Data URL
 * @param {string} data - Data to encode in QR code
 * @returns {Promise<string>} - QR code as Data URL
 */
const generateQRCode = async (data) => {
    try {
        const qrCodeDataURL = await QRCode.toDataURL(data, {
            errorCorrectionLevel: 'H',
            type: 'image/png',
            quality: 0.92,
            margin: 1,
            width: 300
        });
        return qrCodeDataURL;
    } catch (err) {
        console.error('QR Code generation error:', err);
        throw new Error('Failed to generate QR code');
    }
};

module.exports = { generateQRCode };
