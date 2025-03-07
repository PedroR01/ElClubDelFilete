const nameStandarized = (name) => {
    /*
    Esta función estandariza los nombres de la carpeta de la novedad a subir.
    - Elimina caracteres especiales, excepto () y números.
    - Reemplaza múltiples espacios por uno solo.
    - Elimina tildes de las vocales.
    */

    // 1. Eliminar tildes (acentos)
    const nameWithoutAccents = name.normalize("NFD").replace(/\p{M}/gu, "");

    // 2. Eliminar caracteres especiales, excepto () y números
    const nameWithoutSpecialChar = nameWithoutAccents.replace(/[^\p{L}\d\s()]/gu, '');

    // 3. Quitar espacios extra
    const nameStandarized = nameWithoutSpecialChar.replace(/\s+/g, ' ').trim();

    return nameStandarized;
};
export { nameStandarized};