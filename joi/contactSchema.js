import Joi from "joi";

export const contactSchema = Joi.object({
  params: Joi.object({}),
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
    subject: Joi.string().min(3).max(100).required().messages({
      "string.base": "Der Betreff muss ein String sein.",
      "string.min": "Der Betreff muss mindestens {#limit} Zeichen lang sein.",
      "string.max": "Der Betreff darf nicht länger als {#limit} Zeichen sein.",
      "any.required": "Der Betreff ist erforderlich.",
    }),
    message: Joi.string().min(10).max(1000).required().messages({
      "string.base": "Die Nachricht muss ein String sein.",
      "string.min": "Die Nachricht muss mindestens {#limit} Zeichen lang sein.",
      "string.max":
        "Die Nachricht darf nicht länger als {#limit} Zeichen sein.",
      "any.required": "Eine Nachricht ist erforderlich.",
    }),
  }).messages({
    "object.unknown": "Sie haben ein Feld eingegeben, das nicht erlaubt ist.",
  }),
});
