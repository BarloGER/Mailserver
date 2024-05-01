import { transporter } from "../config/transporterConfig.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorResponse } from "../utils/ErrorResponse.js";

const myEmailAddress = process.env.USER;
const MAX_RETRIES = 3;
// Queue for mails, if there is capacity, added emails will be send from here
const mailQueue = [];

const sendEmailsFromQueue = () => {
  while (transporter.isIdle() && mailQueue.length > 0) {
    const mailOptions = mailQueue.shift();
    mailOptions.attempts = (mailOptions.attempts || 0) + 1;
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Send Mail Error:", error);
        if (mailOptions.attempts < MAX_RETRIES) {
          console.log(`Retrying... Attempt ${mailOptions.attempts}`);
          mailQueue.unshift(mailOptions);
        } else {
          console.error(
            "Max retries reached, giving up on this mail:",
            mailOptions
          );
          // Generation of an ErrorResponse in the event of final failure
          const errorResponse = new ErrorResponse({
            message: `E-Mail konnte nicht gesendet werden nach ${MAX_RETRIES} Versuchen.`,
            statusCode: 500,
            errorType: "EmailDeliveryFailure",
            errorCode: "EMAIL_MAX_RETRIES_REACHED",
          });
          console.error("Error Handling:", errorResponse);
        }
      } else {
        console.log("Mail sent successfully:", info);
      }
    });
  }
};

// Event listener for "idle"
transporter.on("idle", () => {
  if (mailQueue.length > 0) {
    sendEmailsFromQueue();
  }
});

// Immediate idle state check to prevent emails from having to wait for the transporter to idle next time
if (transporter.isIdle() && mailQueue.length > 0) {
  sendEmailsFromQueue();
}

export const sendMail = asyncHandler(async (req, res) => {
  const { email, subject, html } = req.body;
  const mailOptions = {
    from: myEmailAddress,
    to: email,
    subject: subject,
    html: html,
    attempts: 0,
  };

  // Add mail to queue
  mailQueue.push(mailOptions);
  if (transporter.isIdle()) {
    sendEmailsFromQueue();
  }

  res.status(200).json({
    message:
      "E-Mail wurde zur Warteschlange hinzugefügt und wird bald gesendet.",
  });
});

export const sendNewsletter = asyncHandler(async (req, res) => {
  const { emailList, subject, html } = req.body;
  const mailOptions = {
    from: myEmailAddress,
    to: emailList,
    subject: subject,
    html: html,
    attempts: 0,
  };

  // Add mail to queue
  mailQueue.push(mailOptions);
  if (transporter.isIdle()) {
    sendEmailsFromQueue();
  }

  res.status(200).json({
    message:
      "Newsletter wurde zur Warteschlange hinzugefügt und wird bald gesendet.",
  });
});
