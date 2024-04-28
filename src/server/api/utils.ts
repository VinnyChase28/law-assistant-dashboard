export function handleError(error: unknown): void {
  if (error instanceof Error) {
    // Handle known Error types here
    console.error("Handled Error:", error.message);
  } else {
    // Handle cases where the error is not an instance of Error
    console.error("Unhandled type of error:", error);
  }
}
