import { Router } from "express";
import { validateJoi } from "../middlewares/validateJoi.js";
import { sendMailSchema } from "../joi/sendMailSchema.js";
import { sendNewsletterSchema } from "../joi/sendNewsletterSchema.js";

import { sendMail, sendNewsletter } from "../controllers/mailController.js";

export const mailRouter = Router();

mailRouter.post("/send-mail", validateJoi(sendMailSchema), sendMail);
mailRouter.post(
  "/send-newsletter",
  validateJoi(sendNewsletterSchema),
  sendNewsletter
);
