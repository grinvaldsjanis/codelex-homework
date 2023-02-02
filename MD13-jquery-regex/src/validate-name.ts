const validateName = function (name: string): {
  isValid: boolean;
  errorMessage: string;
} {
  if (!name) {
    return { isValid: false, errorMessage: "Name is required" };
  } else if (name.length < 2) {
    return {
      isValid: false,
      errorMessage: "Name must have at least 2 characters",
    };
  } else if (name.length > 50) {
    return {
      isValid: false,
      errorMessage: "Name can have at most 50 characters",
    };
  } else if (!/^[A-Za-z\s]*$/.test(name)) {
    return {
      isValid: false,
      errorMessage: "Name can only contain letters",
    };
  } else {
    return { isValid: true, errorMessage: "" };
  }
};

export default validateName;
