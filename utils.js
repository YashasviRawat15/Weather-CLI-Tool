function normalizePincode(input) {
    const pin = input.trim();
    if (!/^\d{6}$/.test(pin)) {
        throw new Error("Please enter a valid 6-digit Indian pincode.");
    }
    return pin;
}

module.exports = { normalizePincode };
