import { useState, useEffect } from "react";
import serverUrl from "../components/utils/serverUrl";

export function useNovedadesFetch() {
    const [novedades, setNovedades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${serverUrl.produccion}/api/blogs`, {
                    method: 'GET',
                })
                if (!response.ok)
                    throw new Error(`Error HTTP: ${response.status}`);

                const data = await response.json();
                setNovedades(data.metaData);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { novedades, loading, error };
}