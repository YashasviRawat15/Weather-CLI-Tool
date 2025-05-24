const { normalizePincode } = require('../utils');

describe("Pincode Normalization", () => {
    test("Valid Pincode", () => {
        expect(normalizePincode("110001")).toBe("110001");
    });

    test("Invalid Length", () => {
        expect(() => normalizePincode("123")).toThrow();
    });

    test("Non-numeric", () => {
        expect(() => normalizePincode("abc123")).toThrow();
    });
})