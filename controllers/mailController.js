import { transporter } from "../config/transporterConfig.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorResponse } from "../utils/ErrorResponse.js";

const myEmailAddress = process.env.USER;

export const confirmRegistration = asyncHandler(async (req, res) => {
  const { email, verificationCode } = req.body;

  // Setup email data with HTML content
  const mailOptions = {
    from: myEmailAddress,
    to: email,
    subject: "Registrierungsbestätigung",
    html: `<h1>Hier dein Verifizierungscode</h1><span>Verifizierungscode: ${verificationCode}</span>`,
  };

  const sendEmail = await transporter.sendMail(mailOptions);
  if (!sendEmail) {
    throw new ErrorResponse({
      message: "Fehler beim senden der Email.",
      statusCode: 500,
      statusMessage: "Internal Server Error",
      errorType: "InternalServerError",
      errorCode: "SYS_ERROR_001",
    });
  }
  res.status(200).json({
    message:
      "Deine Verifizierungscode wurde versendet. Überprüfe deine Emails und vergiss dabei den Spam Ordner nicht.",
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;

  // Setup email data with HTML content
  const mailOptions = {
    from: myEmailAddress,
    to: email,
    subject: "Neues Passwort",
    html: `<h1>Hier dein neues Passwort</h1><span>Neues Passwort: ${newPassword}</span>`,
  };

  const sendEmail = await transporter.sendMail(mailOptions);
  if (!sendEmail) {
    throw new ErrorResponse({
      message: "Fehler beim senden der Email.",
      statusCode: 500,
      statusMessage: "Internal Server Error",
      errorType: "InternalServerError",
      errorCode: "SYS_ERROR_001",
    });
  }
  res.status(200).json({
    message:
      "Dein neues Passwort wurde versendet. Überprüfe deine Emails und vergiss dabei den Spam Ordner nicht.",
  });
});

export const contact = asyncHandler(async (req, res) => {
  const { email, subject, message } = req.body;

  // Setup email data with HTML content
  const mailOptions = {
    from: myEmailAddress,
    to: myEmailAddress,
    subject: subject,
    html: `<h1>Kontaktanfrage</h1><p>Von: ${email}</p><p>${message}</p>`,
  };

  const sendEmail = await transporter.sendMail(mailOptions);
  if (!sendEmail) {
    throw new ErrorResponse({
      message: "Fehler beim senden der Email.",
      statusCode: 500,
      statusMessage: "Internal Server Error",
      errorType: "InternalServerError",
      errorCode: "SYS_ERROR_001",
    });
  }
  res.status(200).json({
    message:
      "Deine Kontaktanfrage wurde versendet. Sie wird sobald möglich bearbeitet.",
  });
});
