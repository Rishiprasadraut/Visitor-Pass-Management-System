const { Parser } = require('json2csv');

/**
 * Export visitors to CSV
 * @param {Array} visitors - Array of visitor objects
 * @returns {string} - CSV string
 */
const exportToCSV = (visitors) => {
    const fields = [
        { label: 'Name', value: 'name' },
        { label: 'Phone', value: 'phone' },
        { label: 'Email', value: 'email' },
        { label: 'Purpose', value: 'purpose' },
        { label: 'Host Name', value: 'host.name' },
        { label: 'Host Email', value: 'host.email' },
        { label: 'Status', value: 'status' },
        { label: 'Created At', value: (row) => new Date(row.createdAt).toLocaleString() },
        { label: 'Updated At', value: (row) => new Date(row.updatedAt).toLocaleString() }
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(visitors);
    return csv;
};

module.exports = { exportToCSV };
