import { alertas } from "../data/mockData";

export default function Alertas() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-red-500">Alertas de Segurança</h2>
      {alertas.map((a) => (
        <div key={a.id} className="bg-gray-800 p-4 mb-4 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-red-400">{a.titulo}</h3>
          <p className="text-sm text-gray-300 mt-2">{a.conteudo}</p>
        </div>
      ))}
    </div>
  );
}
