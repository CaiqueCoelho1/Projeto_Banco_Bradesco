import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

export default function Navbar() {
  const { isLogged, logout } = useAuth()

  return (
    <nav className="bg-red-800 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="font-bold text-xl">Trap Alert</h1>
      
      <div className="flex gap-4">
        <Link to="/">Golpes</Link>
        <Link to="/alertas">Alertas</Link>
        <Link to="/denunciar">Denunciar</Link>
        <Link to="/painel">Painel</Link>

        {isLogged ? (
          <button
            onClick={logout}
            className="text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          >
            Sair
          </button>
        ) : (
          <Link
            to="/login"
            className="text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
