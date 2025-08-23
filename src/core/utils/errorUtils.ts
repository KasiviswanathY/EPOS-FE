/**
 * Utility functions for error handling and message display
 */

/**
 * Extracts a readable error message from various error types
 * @param error - The error object, string, or null
 * @returns A user-friendly error message string
 */
export const getErrorMessage = (error: string | object | null): string => {
  if (!error) return "";
  if (typeof error === "string") return error;
  if (typeof error === "object" && error !== null) {
    if ("message" in error) return String(error.message);
    if ("error" in error) return String(error.error);
  }
  return "An unexpected error occurred";
};

/**
 * Formats error messages for display in UI components
 * @param error - The error to format
 * @param prefix - Optional prefix for the error message
 * @returns Formatted error message
 */
export const formatErrorMessage = (
  error: string | object | null,
  prefix = "Error"
): string => {
  const message = getErrorMessage(error);
  return message ? `${prefix}: ${message}` : "";
};

/**
 * Checks if an error is a network-related error
 * @param error - The error to check
 * @returns True if the error is network-related
 */
export const isNetworkError = (error: unknown): boolean => {
  if (typeof error === "object" && error !== null) {
    const errorObj = error as { 
      name?: string; 
      code?: string; 
      message?: string; 
    };
    return Boolean(
      errorObj.name === "NetworkError" ||
      errorObj.code === "NETWORK_ERROR" ||
      (errorObj.message && 
       typeof errorObj.message === "string" && 
       errorObj.message.toLowerCase().includes("network"))
    );
  }
  return false;
};
