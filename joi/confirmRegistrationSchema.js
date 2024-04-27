import Joi from "joi";

export const confirmRegistrationSchema = Joi.object({
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
    verificationCode: Joi.string().alphanum().length(8).required().messages({
      "string.base": "Der Verifizierungscode muss ein String sein.",
      "string.length":
        "Der Verifizierungscode muss genau {#limit} Zeichen lang sein",
      "string.empty": "Der Verifizierungscode muss angegeben werden",
      "any.required": "Der Verifizierungscode ist erforderlich.",
    }),
  }),
}).messages({
  "object.unknown": "Sie haben ein Feld eingegeben, das nicht erlaubt ist",
});
