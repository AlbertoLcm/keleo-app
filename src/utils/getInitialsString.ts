export const getInitialsString = (fullName: string) => {
  const letters = fullName
    .split(" ")
    .map((palabra) => palabra.charAt(0).toUpperCase());
  return letters.length > 1
    ? letters[0] + letters[letters.length - 1]
    : letters[0];
};
