import validateEmail from "./validate-email";

describe("validateEmail", () => {
    it("returns isValid false and error message 'Email is required' when email is empty", () => {
      const result = validateEmail("");
      expect(result).toEqual({ isValid: false, errorMessage: "Email is required" });
    });
  
    it("returns isValid false and error message 'Invalid email address' when email is invalid", () => {
      const result = validateEmail("john.doe.com");
      expect(result).toEqual({
        isValid: false,
        errorMessage: "Invalid email address",
      });
    });
  
    it("returns isValid true and empty error message when email is valid", () => {
      const result = validateEmail("john.doe@example.com");
      expect(result).toEqual({ isValid: true, errorMessage: "" });
    });
  });