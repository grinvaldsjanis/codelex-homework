import validateName from "./validate-name";

describe("validateName", () => {
    it("returns isValid false and error message 'Name is required' when name is empty", () => {
      const result = validateName("");
      expect(result).toEqual({ isValid: false, errorMessage: "Name is required" });
    });
  
    it("returns isValid false and error message 'Name must have at least 2 characters' when name has less than 2 characters", () => {
      const result = validateName("a");
      expect(result).toEqual({
        isValid: false,
        errorMessage: "Name must have at least 2 characters",
      });
    });
  
    it("returns isValid false and error message 'Name can only contain letters' when name has non-letter characters", () => {
      const result = validateName("John Doe1");
      expect(result).toEqual({
        isValid: false,
        errorMessage: "Name can only contain letters",
      });
    });
  
    it("returns isValid false and error message 'Name can have at most 50 characters' when name has more than 50 characters", () => {
      const result = validateName(
        "John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe"
      );
      expect(result).toEqual({
        isValid: false,
        errorMessage: "Name can have at most 50 characters",
      });
    });
  
    it("returns isValid true and empty error message when name is valid", () => {
      const result = validateName("John Doe");
      expect(result).toEqual({ isValid: true, errorMessage: "" });
    });
  });