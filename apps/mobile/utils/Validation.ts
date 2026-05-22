/**
 * Validates full name.
 * Ensures the name is not empty, is at least 2 characters, and contains only letters and spaces.
 */
export const validateName = (value: string): string | null => {
  if (!value || !value.trim()) return "Full name is required";
  if (value.trim().length < 2) return "Name must be at least 2 characters long";
  
  const nameRegex = /^[a-zA-Z\s.,'-]+$/;
  if (!nameRegex.test(value)) {
    return "Name must only contain letters and standard characters";
  }
  return null;
};

/** 
 * Validates email address.
 * Ensures it's not empty and matches a valid email regex pattern.
 */
export const validateEmail = (value: string): string | null => {
  if (!value || !value.trim()) return "Email address is required";

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(value.trim())) {
    return "Please enter a valid email address";
  }
  return null;
};

/**
 * Validates Philippine phone numbers.
 * Ensures it's a 10-digit number starting with '9' (e.g. 9123456789 or +639123456789).
 */
export const validatePhone = (value: string): string | null => {
  if (!value || !value.trim()) return "Phone number is required";
  
  // Remove spaces, dashes, or +63 prefix to isolate the raw digits
  const cleanPhone = value.replace(/[\s()-]/g, '').replace(/^\+63/, '');
  
  const phoneRegex = /^9\d{9}$/;
  if (!phoneRegex.test(cleanPhone)) {
    return "Enter a valid 10-digit PH number starting with 9";
  }
  return null;
};

/**
 * Validates password input.
 * Ensures the password is not empty and is at least 6 characters long.
 */
export const validatePassword = (value: string): string | null => {
  if (!value) return "Password is required";
  if (value.length < 6) return "Password must be at least 6 characters long";
  return null;
};

/**
 * Validates password confirmation matching.
 */
export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword) return "Confirm password is required";
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return null;
};

/**
 * Validates a generic required field (e.g., dropdowns, selections).
 */
export const validateRequired = (value: any, fieldName: string = "This field"): string | null => {
  if (value === undefined || value === null || (typeof value === "string" && !value.trim())) {
    return `${fieldName} is required`;
  }
  return null;
};
