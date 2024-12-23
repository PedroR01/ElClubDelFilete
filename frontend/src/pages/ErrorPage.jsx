import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div
            className="flex flex-col space-y-4 h-screen justify-center items-center"
            id="error-page"
        >
            <h1 className="text-5xl font-bold">¿Te perdiste Fileteador?</h1>
            <p className="text-xl">Perdon, ocurrió un error inesperado al navegar. Por favor, vuelve al inicio</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}