import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PainelUsuario() {
  const [denuncias, setDenuncias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nomeA, setNomeA] = useState("")
  const [descricaoA, setDescricaoA] = useState("")
  const [nomeG, setNomeG] = useState("")
  const [descricaoG, setDescricaoG] = useState("")
  const [nivelRisco, setNivelRisco] = useState("")
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (!token) {
  navigate("/login");
  alert("É necessário efetuar o login")
  return null;
}
  const payload = JSON.parse(atob(token.split(".")[1]));

  console.log(payload.role);

  async function registraGolpe(e) {
     e.preventDefault();
    try {
      const resposta = await fetch("http://localhost:3000/api/registraGolpe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          nomeG,
          description: descricaoG,
          nivel_risco: nivelRisco
        }),
      });

      if (resposta.status === 401) {
        alert("Sua sessão expirou. Faça login novamente.");
        localStorage.removeItem("token");
        return navigate("/login");
      }
    } catch (err) {
      console.log(err)
    }
    alert("Golpe Registrado com Sucesso")
    setDescricaoG("")
    setNomeG("")
  }

    async function registraAlerta(e) {
          e.preventDefault();
    try {
      const resposta = await fetch("http://localhost:3000/api/registraAlerta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: nomeA,
          content: descricaoA
        }),
      });

      if (resposta.status === 401) {
        alert("Sua sessão expirou. Faça login novamente.");
        localStorage.removeItem("token");
        return navigate("/login");
      }
    } catch (err) {
      console.log(err)
    }
    alert("Alerta Registrado com Sucesso")
    setDescricaoA("")
    setNomeA("")
  }


  useEffect(() => {
    async function carregarDenuncias() {
      try {
        const resposta = await fetch("http://localhost:3000/api/denuncias", {
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
        setDenuncias(dados);
      } catch (err) {
        console.error("Erro ao carregar denúncias:", err);
      } finally {
        setLoading(false);
      }
    }

    carregarDenuncias();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400">Carregando...</p>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-red-500 mb-4">
        Painel do Usuário
      </h2>

      {denuncias.length === 0 && (
        <p className="text-center text-gray-400">
          Nenhuma denúncia registrada.
        </p>
      )}
      <div className="flex" style={{ justifyContent: "space-between" }}>
        <div className="flex-col flex">
          {denuncias.map((denuncia) => (
            <div
              id="denunciasItens"
              className="bg-slate-800 rounded-3xl p-3 ml-7 mr-7 mb-3 transition-all"
              key={denuncia.id_denuncia}
            >
              <h2 className="m-1 text-xl font-semibold text-red-400">
                Telefone: {denuncia.numero_suspeito}
              </h2>

              <p className="m-1 text-sm text-gray-300 mt-2">
                {denuncia.descricao}
              </p>

              <h4 className="text-right mr-1 font-bold text-gray-500">
                Registro feito em{" "}
                {new Date(denuncia.data_registro).toLocaleDateString()}
              </h4>

              <h4 className="text-right mr-1 font-bold text-gray-500">
                Ligação feita em{" "}
                {new Date(denuncia.data_ligacao).toLocaleDateString()} às{" "}
                {new Date(denuncia.data_ligacao).toLocaleTimeString()}
              </h4>
            </div>
          ))}
        </div>
        {payload.role == "Admin" ? (
          <div style={{}}>
            <div className="text-center bg-slate-800 p-3 rounded-md">
              <h2 className="mb-3">Registrar Alertas</h2>
              <form onSubmit={registraAlerta} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nome do Alerta"
              className="p-2 rounded bg-gray-900 border border-gray-700 text-white"
              value={nomeA}
              onChange={(e) => setNomeA(e.target.value)}
              required
            />
            <textarea
              placeholder="Instruções do Alerta"
              className="p-2 rounded bg-gray-900 border border-gray-700 text-white"
              value={descricaoA}
              onChange={(e) => setDescricaoA(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 p-2 rounded text-white"
            >
              Registrar Alerta
            </button>
          </form>
            </div>
            <div className="text-center bg-slate-800 mt-4 p-3 rounded-md">
              <h2 className="mb-3">Registrar Golpes</h2>
              <form onSubmit={registraGolpe} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nome do Golpe"
              className="p-2 rounded bg-gray-900 border border-gray-700 text-white"
              value={nomeG}
              onChange={(e) => setNomeG(e.target.value)}
              required
            />
            <textarea
              placeholder="Descreva o Golpe"
              className="p-2 rounded bg-gray-900 border border-gray-700 text-white"
              value={descricaoG}
              onChange={(e) => setDescricaoG(e.target.value)}
              required
            />
            <div className="flex">
              <div className="w-16">
                <span className="pr-1">Baixo</span>
              <input
              type="radio"
              className="p-2 rounded bg-gray-900 border border-gray-700 text-white"
              name="nivel_risco"
              value="Baixo"
              onChange={(e) => setNivelRisco(e.target.value)}
              required
            />
            </div>
            <div className="w-16">
              <span className="pr-1">Médio</span>
              <input
              type="radio"
              className="p-2 rounded bg-gray-900 border border-gray-700 text-white"
              name="nivel_risco"
              value="Médio"
              onChange={(e) => setNivelRisco(e.target.value)}
              required
            />
            </div>
            <div className="w-16">
              <span className="pr-1">Alto</span>
              <input
              type="radio"
              className="p-2 rounded bg-gray-900 border border-gray-700 text-white"
              name="nivel_risco"
              value="Alto"
              onChange={(e) => setNivelRisco(e.target.value)}
              required
            />
            </div>
            </div>
            
            
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 p-2 rounded text-white"
            >
              Registrar Golpe
            </button>
          </form>
              
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
