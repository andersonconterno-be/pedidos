import { translations, locales } from "./translations-source";

function deepTransform(obj) {
  const result = locales.reduce((acc, lang) => ({ ...acc, [lang]: {} }), {});
  
  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      // É uma tradução direta
      locales.forEach((lang, i) => {
        result[lang][key] = value[i] ?? value[0]; // fallback
      });
    } else if (typeof value === "object" && value !== null) {
      // Recursão para objetos aninhados
      const nested = deepTransform(value);
      locales.forEach(lang => {
        result[lang][key] = nested[lang];
      });
    }
  }

  return result;
}

export const messages = deepTransform(translations);