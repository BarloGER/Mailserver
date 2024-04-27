import { Router } from "express";
import { validateJoi } from "../middlewares/validateJoi.js";
import { contactSchema } from "../joi/contactSchema.js";

import { contact } from "../controllers/mailController.js";

export const receiveMailRouter = Router();

receiveMailRouter.post("/receive/contact", validateJoi(contactSchema), contact);
