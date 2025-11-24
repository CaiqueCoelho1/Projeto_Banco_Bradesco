import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("logado") === "true";
    setIsLogged(saved);
  }, []);

  const login = () => {
    localStorage.setItem("logado", "true");
    setIsLogged(true);
  };

  const logout = () => {
    localStorage.removeItem("logado");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setIsLogged(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
