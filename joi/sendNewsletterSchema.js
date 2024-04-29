import Joi from "joi";
import { safeHtmlValidator } from "../utils/safeHtmlValidator.js";

export const sendNewsletterSchema = Joi.object({
  params: Joi.valid({}),
  body: Joi.object({
    emailList: Joi.array()
      .items(
        Joi.string()
          .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "de", "net"] },
          })
          .max(254)
          .required()
      )
      .min(1)
      .required()
      .messages({
        "array.base": "Die EmailListe muss ein Array sein.",
        "array.min": "Die EmailListe darf nicht leer sein.",
        "array.includesRequiredUnknowns":
          "Jedes Element in der EmailListe muss eine gültige E-Mail-Adresse sein.",
        "any.required": "Die EmailListe ist erforderlich.",
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
