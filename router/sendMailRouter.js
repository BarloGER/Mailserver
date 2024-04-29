import { Router } from "express";
import { validateJoi } from "../middlewares/validateJoi.js";
import { confirmRegistrationSchema } from "../joi/confirmRegistrationSchema.js";
import { resetPasswordSchema } from "../joi/resetPasswordSchema.js";
import {
  confirmRegistration,
  resetPassword,
} from "../controllers/mailController.js";

export const sendMailRouter = Router();

sendMailRouter.post(
  "/send/confirm-registration",
  validateJoi(confirmRegistrationSchema),
  confirmRegistration
);

sendMailRouter.post(
  "/send/reset-password",
  validateJoi(resetPasswordSchema),
  resetPassword
);
