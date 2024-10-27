import React from "react";
import { useState, useEffect } from "react";


export default function LoadingPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPropiedades = async () => {
            try {
                const response = await fetch("http://localhost/");
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);

                setLoading(false);
            } catch (e) {
                setError(e.message);
                setLoading(false);
            }
        };
        fetchPropiedades();
    }, []);

    return (
        <div className="w-full inline-flex justify-center items-center space-x-3 mt-24">
            <h2 className="text-3xl font-semibold animate-pulse">Cargando...</h2>
        </div>
    );
}