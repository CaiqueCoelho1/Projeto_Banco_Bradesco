import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useEffect, useState } from "react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const { isLogged, login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLogged) {
      navigate("/painel")
    }
  }, [isLogged])

  async function loginFun(e) {
    e.preventDefault()

    const resposta = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: senha })
    })

    const dados = await resposta.json();
    console.log(dados)

    if (dados.sucesso) {
  login();
  localStorage.setItem("token", dados.token);
  localStorage.setItem("id", dados.usuario.id_usuario);

  navigate("/painel");
}else {
      alert("Credenciais inválidas!")
    }
  }

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-red-500 mb-4 text-center">Login</h2>

      <form onSubmit={loginFun} className="flex flex-col gap-4">
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

        <button className="bg-red-600 hover:bg-red-700 p-2 rounded text-white">
          Entrar
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Não tem conta?{" "}
        <Link to="/cadastro" className="text-red-400 hover:underline">
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}
