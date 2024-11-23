// Remove escape characters from a string
export const removeEscapeCharacters = (str: string) => {
  return str.replace(/\\/g, "");
};
