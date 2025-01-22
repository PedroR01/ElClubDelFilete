import { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();

export default function AuthContextProvider ({ children }) {
  const [lastRefreshed, setLastRefreshed] = useState(Date.now());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const TOKEN_EXPIRATION_TIME = 50 * 60 * 1000; // 50 minutos en ms
    const REFRESH_BEFORE_EXPIRATION = 5 * 60 * 1000; // Refrescar 5 minutos antes de que expire
    
    const verifyOrRefreshSession = async (refresh = false) => {
      console.log('Verificando sesión o refrescando token...');
      try {
        const response = await fetch('http://localhost:3001/api/verify', {
          method: 'POST',
          credentials: "include", 
        });
  
        if (!response.ok) {
          setIsAuthenticated(false);
          throw new Error('Error al verificar o refrescar sesión');
        }
  
        setIsAuthenticated(true);
        if (refresh) {
          console.log("Token refrescado");
        } else {
          console.log("Sesión verificada");
        }
      } catch (err) {
        console.log('Error al verificar/refrescar sesión:', err);
      } finally {
        setLoading(false);
      }
    };
  
    // Llamada inicial para refrescar el token al montar el componente
    verifyOrRefreshSession(true);
  
    // Guardar el tiempo de la primera verificación (inicio de la sesión)
    const sessionStartTime = Date.now();
  
    // Solo se ejecuta si el usuario está autenticado
    if (isAuthenticated) {
      // Verificar el tiempo restante antes de que expire el token
      const checkTokenExpiration = () => {
        const timeRemaining = Date.now() - sessionStartTime;
        if (timeRemaining >= (TOKEN_EXPIRATION_TIME - REFRESH_BEFORE_EXPIRATION)) {
          verifyOrRefreshSession(true); // Refrescar el token si está por expirar
        }
      };
  
      // Intervalo para verificar el tiempo restante y refrescar el token
      const intervalId = setInterval(checkTokenExpiration, 2 * 60 * 1000); // Verificación cada minuto
      
      return () => {
        clearInterval(intervalId); // Limpiar intervalo al desmontar el componente
      };
    }
  
  }, [isAuthenticated]); // Dependencias mínimas
  

    return(
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};