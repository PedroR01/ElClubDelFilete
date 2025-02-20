import { useState, useEffect } from "react";

export function useNovedadesFetch() {
    const [novedades, setNovedades] = useState([]);
    const [novedadesTest, setNovedadesTest] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [response1, response2] = await Promise.all([
                    fetch("http://localhost:3001/api/blogs"),
                    fetch("http://localhost:3001/api/blogs/test")
                ]);

                if (!response1.ok || !response2.ok) {
                    throw new Error(`Error HTTP: ${response1.status} / ${response2.status}`);
                }

                const [data1, data2] = await Promise.all([
                    response1.json(),
                    response2.json()
                ]);

                setNovedades(data1.metaData);
                setNovedadesTest(data2.metaData);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { novedades, novedadesTest, loading, error };
}