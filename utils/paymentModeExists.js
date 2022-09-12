module.exports = (payment_modes, paymentModeName) =>
	payment_modes.findIndex(
		(payment_mode) => payment_mode === paymentModeName
	) !== -1;
