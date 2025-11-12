import { useState } from "react";

export default function Cadastro() {
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Usuário cadastrado:\nNome: ${form.nome}\nEmail: ${form.email}`);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-red-500 mb-4 text-center">Cadastro</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="nome" placeholder="Nome completo" className="p-2 bg-gray-900 border border-gray-700 text-white rounded" onChange={handleChange}/>
        <input name="email" placeholder="E-mail" className="p-2 bg-gray-900 border border-gray-700 text-white rounded" onChange={handleChange}/>
        <input type="password" name="senha" placeholder="Senha" className="p-2 bg-gray-900 border border-gray-700 text-white rounded" onChange={handleChange}/>
        <button className="bg-red-600 hover:bg-red-700 p-2 rounded text-white">Cadastrar</button>
      </form>
    </div>
  );
}
