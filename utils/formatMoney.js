// Format money with commas
module.exports = (amount) =>
    Number(parseFloat(amount).toFixed(2)).toLocaleString("en");
