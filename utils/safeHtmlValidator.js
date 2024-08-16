import sanitizeHtml from "sanitize-html";

export const safeHtmlValidator = (value, helpers) => {
  console.log(value);
  // Allow only certain tags and attributes to prevent XSS attacks
  const cleanHtml = sanitizeHtml(value, {
    allowedTags: [
      "b",
      "i",
      "em",
      "strong",
      "a",
      "ul",
      "ol",
      "li",
      "p",
      "br",
      "span",
    ],
    allowedAttributes: {
      a: ["href", "title", "target"],
      span: ["class"],
    },
    allowedIframeHostnames: ["www.youtube.com"],
  });
  console.log(cleanHtml);

  // Check whether the cleaned HTML code matches the original
  if (cleanHtml !== value) {
    return helpers.error("string.unsafeHtml", { value });
  }
  console.log(cleanHtml);

  return cleanHtml;
};
