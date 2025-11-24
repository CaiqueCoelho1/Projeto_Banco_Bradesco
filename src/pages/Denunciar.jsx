import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Denunciar() {
  const [numero, setNumero] = useState("");
  const [descricao, setDescricao] = useState("");
  const [date, setDate] = useState("");
  const { isLogged, login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    const dateISO = date ? new Date(date + ":00").toISOString() : null;
    const id_usuario = localStorage.getItem("id")
    console.log("TEXTETESTETE");
    console.log("ID do usuário:", id_usuario);
    console.log("DATA ORIGINAL:", date);
console.log("DATE ISO:", dateISO);

  const resposta = await fetch("http://localhost:3000/api/registrar", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  body: JSON.stringify({
    phone: numero,
    description: descricao,
    date_ligacao: dateISO,
  }),
});
;

    const dados = await resposta.json();
    console.log(dados);
    alert(`Denúncia registrada:\nNúmero: ${numero}\nDescrição: ${descricao}`);
    setNumero("");
    setDescricao("");
    setDate("");
  }

  return (
    <>
      {isLogged ? (
        <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold text-red-500 mb-4 text-center">
            Registrar Denúncia
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Número suspeito"
              className="p-2 rounded bg-gray-900 border border-gray-700 text-white"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              required
            />
            <span className="text-xs">Data e Hora da ligação</span>
            <input
              type="datetime-local"
              placeholder="Data e Hora"
              style={{ marginTop: -10 }}
              className="p-2 rounded bg-gray-900 border border-gray-700 text-white"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <textarea
              placeholder="Descreva o ocorrido"
              className="p-2 rounded bg-gray-900 border border-gray-700 text-white"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 p-2 rounded text-white"
            >
              Enviar Denúncia
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h2>É necessário efetuar Login antes de registrar uma denuncia</h2>
        </div>
      )}
    </>
  );
}
