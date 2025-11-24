import { useState } from "react";

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();

    const resposta = await fetch("http://localhost:3000/api/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const dados = await resposta.json();
    console.log(dados);

    if (resposta.ok) {
      alert(`Usuário cadastrado:\nNome: ${form.nome}\nEmail: ${form.email}`);
    } else {
      alert("Erro ao cadastrar: " + dados.erro);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-red-500 mb-4 text-center">
        Cadastro
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          name="nome"
          placeholder="Nome completo"
          className="p-2 bg-gray-900 border border-gray-700 text-white rounded"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="E-mail"
          className="p-2 bg-gray-900 border border-gray-700 text-white rounded"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="senha"
          placeholder="Senha"
          className="p-2 bg-gray-900 border border-gray-700 text-white rounded"
          onChange={handleChange}
          required
        />

        <input
          name="telefone"
          placeholder="Telefone"
          className="p-2 bg-gray-900 border border-gray-700 text-white rounded"
          onChange={handleChange}
          required
        />

        <button className="bg-red-600 hover:bg-red-700 p-2 rounded text-white">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
