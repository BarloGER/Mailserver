import Joi from "joi";
import { safeHtmlValidator } from "../utils/safeHtmlValidator.js";

export const sendMailSchema = Joi.object({
  params: Joi.valid({}),
  body: Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "de", "net"] } })
      .max(254)
      .required()
      .messages({
        "string.base": "Die Email muss ein String sein.",
        "string.email":
          "Die E-Mail muss eine gültige E-Mail-Adresse sein und mit .com, .de oder .net enden",
        "string.max": "Die E-Mail darf nicht länger als {#limit} Zeichen sein.",
        "string.empty": "Die E-Mail muss angegeben werden",
        "any.required": "Die Email ist erforderlich.",
      }),
    subject: Joi.string()
      .regex(/^[\w\säöüÄÖÜß]+$/)
      .min(1)
      .max(60)
      .required()
      .messages({
        "string.base": "Der Betreff muss ein String sein.",
        "string.pattern.base":
          "Der Betreff darf nur alphanumerische Zeichen und Leerzeichen enthalten.",
        "string.min": "Der Betreff muss mindestens {#limit} Zeichen lang sein",
        "string.max": "Der Betreff darf höchstens {#limit} Zeichen lang sein",
        "string.empty": "Der Betreff muss angegeben werden",
        "any.required": "Der Betreff ist erforderlich.",
      }),
    html: Joi.string().custom(safeHtmlValidator).required().messages({
      "string.base": "Der HTML-Inhalt muss ein String sein.",
      "string.empty": "Der HTML-Inhalt darf nicht leer sein",
      "any.required": "HTML-Inhalt ist erforderlich",
      "string.unsafeHtml": "Der HTML-Inhalt enthält unsichere Elemente",
    }),
  }),
}).messages({
  "object.unknown": "Sie haben ein Feld eingegeben, das nicht erlaubt ist",
});
