// Format money with commas and two decimal places
module.exports = (amount) =>
    Number(parseFloat(amount).toFixed(2)).toLocaleString("en", {
        minimumFractionDigits: 2,
    });
