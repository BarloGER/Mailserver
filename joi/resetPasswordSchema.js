import Joi from "joi";

export const resetPasswordSchema = Joi.object({
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
    newPassword: Joi.string().length(12).required().messages({
      "string.base": "Das Passwort muss ein String sein.",
      "string.length": "Das Passwort muss genau {#limit} Zeichen lang sein",
      "string.empty": "Das Passwort muss angegeben werden",
      "any.required": "Das Passwort ist erforderlich.",
    }),
  }),
}).messages({
  "object.unknown": "Sie haben ein Feld eingegeben, das nicht erlaubt ist",
});
