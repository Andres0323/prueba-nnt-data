/**
 * @name upperCaseString
 * @desc Función para retornar string con la primera letra mayuscula
 * @param string
 * @returns {string}
 */
export const upperCaseString = (string) => {
  const firstItem = string.charAt(0).toUpperCase(); // Obtemgo la primera letra del string
  const secondItem = string.slice(1); // Obtengo el residuo

  return firstItem.toUpperCase() + secondItem;
};
