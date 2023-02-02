import validatePassword from "./validate-pass";

describe("validatePassword", () => {
    it("should return isValid: false and errorMessage 'Password is required' when the password is not provided", () => {
      const result = validatePassword("");
      expect(result).toEqual({ isValid: false, errorMessage: "Password is required" });
    });
  
    it("should return isValid: false and errorMessage 'Password must be at least 8 characters long' when the password is shorter than 8 characters", () => {
      const result = validatePassword("1234567");
      expect(result).toEqual({
        isValid: false,
        errorMessage: "Password must be at least 8 characters long",
      });
    });
  
    it("should return isValid: false and errorMessage 'Password must contain at least one number' when the password doesn't contain any numbers", () => {
      const result = validatePassword("abcdefgh");
      expect(result).toEqual({
        isValid: false,
        errorMessage: "Password must contain at least one number",
      });
    });
  
    it("should return isValid: false and errorMessage 'Password must contain at least one special character' when the password doesn't contain any special characters", () => {
      const result = validatePassword("abcdefgh1234");
      expect(result).toEqual({
        isValid: false,
        errorMessage: "Password must contain at least one special character",
      });
    });
  
    it("should return isValid: true and errorMessage '' when the password is valid", () => {
      const result = validatePassword("abcdefgh1234!");
      expect(result).toEqual({ isValid: true, errorMessage: "" });
    });
  });