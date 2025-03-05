const nameStandarized = (name) => {
    /*
    Esta función estandariza los nombres de la carpeta de la novedad a subir
    por ejemplo si el nombre posee caracteres especiales, exceptuando () y números
    estos serán borrados. Ej: si name es: "Hola@  como estas v2()"
    retorna: "Hola como estas v2()"
    */
    const nameWithoutSpecialChar = name.replace(/[^\p{L}\d\s()]/gu, '');
    // Quito los espacios extra, por ejemplo, en palabras que quedan:"Hola  como estas", queda: "Hola como estas"
    const nameStandarized = nameWithoutSpecialChar.replace(/\s+/g, ' ').trim();

    return nameStandarized;
}

export { nameStandarized};