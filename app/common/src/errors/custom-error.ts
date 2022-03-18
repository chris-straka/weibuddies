export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  // Make sure all my errors look the same
  abstract serializeErrors(): { message: string; field?: string }[];
}
