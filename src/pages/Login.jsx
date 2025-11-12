import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Login efetuado para ${email}`);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-red-500 mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="E-mail"
          className="p-2 rounded bg-gray-900 border border-gray-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="p-2 rounded bg-gray-900 border border-gray-700 text-white"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button className="bg-red-600 hover:bg-red-700 p-2 rounded text-white">Entrar</button>
      </form>
      <p className="text-sm text-center mt-4">
        Não tem conta? <Link to="/cadastro" className="text-red-400 hover:underline">Cadastre-se</Link>
      </p>
    </div>
  );
}
