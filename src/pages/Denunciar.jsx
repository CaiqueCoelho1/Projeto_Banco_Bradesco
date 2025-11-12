import { useState } from "react";

export default function Denunciar() {
  const [numero, setNumero] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Denúncia registrada:\nNúmero: ${numero}\nDescrição: ${descricao}`);
    setNumero("");
    setDescricao("");
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-red-500 mb-4 text-center">Registrar Denúncia</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Número suspeito"
          className="p-2 rounded bg-gray-900 border border-gray-700 text-white"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
        />
        <textarea
          placeholder="Descreva o ocorrido"
          className="p-2 rounded bg-gray-900 border border-gray-700 text-white"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <button className="bg-red-600 hover:bg-red-700 p-2 rounded text-white">Enviar Denúncia</button>
      </form>
    </div>
  );
}
