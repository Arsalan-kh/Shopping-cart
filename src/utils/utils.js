export const formatCurrency = (value) => {
    if (isNaN(value) || value === null) {
        return '$0.00'; // Return default for invalid input
    }

    // Convert to number and format as currency
    const options = {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    };

    return new Intl.NumberFormat('en-US', options).format(value);
};