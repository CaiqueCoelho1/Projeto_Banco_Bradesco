import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-red-800 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="font-bold text-xl">Sistema de Golpes</h1>
      <div className="flex gap-4">
        <Link to="/">Golpes</Link>
        <Link to="/alertas">Alertas</Link>
        <Link to="/denunciar">Denunciar</Link>
        <Link to="/painel">Painel</Link>
        <Link to="/login" className="text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700">Login</Link>
      </div>
    </nav>
  );
}
