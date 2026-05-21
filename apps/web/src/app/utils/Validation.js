/** 
 * @param {string} value - The email or student number string to validate
 * @returns {string|null} - Error message if invalid, otherwise null
 */
export const validateEmail = (value) => {
  if (!value) return "This field is required";

  const studentNoRegex = /^\d{4}-\d{5}-[A-Z]{2}-\d$/;
  const webmailRegex = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!studentNoRegex.test(value) && !webmailRegex.test(value) && !emailRegex.test(value)) {
    return "Please enter a valid email address";
  }
  return null;
};

/**
 * Validates password input.
 * Ensures the password is not empty.
 * @param {string} value - The password string to validate
 * @returns {string|null} - Error message if invalid, otherwise null
 */
export const validatePassword = (value) => {
  if (!value) return "Password is required";
  return null;
};
