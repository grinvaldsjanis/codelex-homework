const validatePassword = function(password: string): {
    isValid: boolean;
    errorMessage: string;
  } {
    if (!password) {
      return { isValid: false, errorMessage: "Password is required" };
    } else if (password.length < 8) {
      return {
        isValid: false,
        errorMessage: "Password must be at least 8 characters long",
      };
    } else if (!/[0-9]/.test(password)) {
      return {
        isValid: false,
        errorMessage: "Password must contain at least one number",
      };
    } else if (!/[`!@#$%^&*]/.test(password)) {
      return {
        isValid: false,
        errorMessage: "Password must contain at least one special character",
      };
    } else {
      return { isValid: true, errorMessage: "" };
    }
  }

  export default validatePassword;