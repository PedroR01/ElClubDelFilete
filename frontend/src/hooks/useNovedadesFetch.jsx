import { useState, useEffect } from "react";

export function useNovedadesFetch() {
    const [novedades, setNovedades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Deberia a su vez hacer el fetch de las imagenes en el bucket, y añadir la imágen a su noticia asociada.
    useEffect(() => {
        const fetchNovedades = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/blogs");
                if (!response.ok) throw new Error(`HTTP error! Res status: ${response.status}`);

                const data = await response.json();
                setNovedades(data.metaData);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        fetchNovedades();
    }, []);

    return { novedades, loading, error };
}
