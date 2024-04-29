import { transporter } from "../config/transporterConfig.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorResponse } from "../utils/ErrorResponse.js";

const myEmailAddress = process.env.USER;

export const sendMail = asyncHandler(async (req, res) => {
  const { email, subject, html } = req.body;

  const mailOptions = {
    from: myEmailAddress,
    to: email,
    subject: subject,
    html: html,
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
  res.status(200).json();
});

export const sendNewsletter = asyncHandler(async (req, res) => {
  const { emailList, subject, html } = req.body;

  const mailOptions = {
    from: myEmailAddress,
    to: emailList,
    subject: subject,
    html: html,
  };

  const sendEmails = await transporter.sendMail(mailOptions);
  if (!sendEmails) {
    throw new ErrorResponse({
      message: "Fehler beim senden der Emails.",
      statusCode: 500,
      statusMessage: "Internal Server Error",
      errorType: "InternalServerError",
      errorCode: "SYS_ERROR_002",
    });
  }
  res.status(200).json();
});
