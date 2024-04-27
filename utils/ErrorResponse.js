export class ErrorResponse extends Error {
  constructor({ message, statusCode, statusMessage, errorType, errorCode }) {
    super(message);
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
    this.errorType = errorType;
    this.errorCode = errorCode;
  }
}
