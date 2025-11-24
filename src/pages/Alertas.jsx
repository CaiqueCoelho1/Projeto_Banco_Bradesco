import { alertas } from "../data/mockData";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Alertas() {
  const [loading, setLoading] = useState(true);
  const [alertas, setAlertas] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    alert("É necessário efetuar o login");
    return null;
  }

  useEffect(() => {
    async function carregarAlertas() {
      try {
        const resposta = await fetch("http://localhost:3000/api/alertas", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (resposta.status === 401) {
          alert("Sua sessão expirou. Faça login novamente.");
          localStorage.removeItem("token");
          return navigate("/login");
        }

        const dados = await resposta.json();
        setAlertas(dados);
        console.log(dados);
      } catch (err) {
        console.error("Erro ao carregar denúncias:", err);
      } finally {
        setLoading(false);
      }
    }

    carregarAlertas();
  }, []);
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-red-500">
        Alertas de Segurança
      </h2>
      {alertas.map((a) => (
        <div
          id="alertasItens"
          key={a.id}
          className="bg-gray-800 p-4 mb-4 rounded-lg border border-gray-700"
        >
          <h3 className="text-xl font-semibold text-red-400">{a.titulo}</h3>
          <p className="text-sm text-gray-300 mt-2">{a.conteudo}</p>
        </div>
      ))}
    </div>
  );
}
