export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const statusMessage = err.statusMessage || "Internal Server Error";

  res.status(statusCode).json({
    message: err.message || "Ein unbekannter Fehler ist aufgetreten.",
    statusCode: statusCode,
    statusMessage: statusMessage,
    errorType: err.errorType || "InternalServerError",
    errorCode: err.errorCode || "UNHANDLED_ERROR",
  });
};
