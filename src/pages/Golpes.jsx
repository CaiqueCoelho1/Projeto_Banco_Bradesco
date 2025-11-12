import { golpes } from "../data/mockData";

export default function Golpes() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-red-500">Golpes Cadastrados</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {golpes.map((g) => (
          <div key={g.id} className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
            <h3 className="text-xl font-semibold text-red-400">{g.nome}</h3>
            <p className="text-sm text-gray-300 mt-2">{g.descricao}</p>
            <span className="text-xs mt-2 inline-block text-gray-400">Risco: {g.nivel_risco}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
