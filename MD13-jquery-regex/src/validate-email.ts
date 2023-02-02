const validateEmail = function(email: string): {
    isValid: boolean;
    errorMessage: string;
  } {
    if (!email) {
      return { isValid: false, errorMessage: "Email is required" };
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      return { isValid: false, errorMessage: "Invalid email address" };
    } else {
      return { isValid: true, errorMessage: "" };
    }
  }

  export default validateEmail;