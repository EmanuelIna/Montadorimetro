import type { Servico } from "../types/Servico";

interface ServicoCardProps {
  servico: Servico;
}

export function ListarServicos({ dados }: { dados: Servico[] }) {
  if (!dados || dados.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">
        Nenhum serviço encontrado.
      </p>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Resultados da Busca</h2>

      {dados.map((servico) => (
        <ServicoCard key={servico.id} servico={servico} />
      ))}
    </div>
  );
}

export function ServicoCard({ servico }: ServicoCardProps) {
  const formatarData = (dataIso?: string) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dataIso || new Date()));
  };

  const EmAndamento = servico.status === "Em andamento";

  return (
    <button
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex justify-between items-center mb-3"
      onClick={() => alert(`Serviço selecionado: ${servico.nome_cliente}`)}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {servico.nome_cliente}
          </h3>
          <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            Bandeira: {servico.bandeira}
          </span>
        </div>

        <span className="text-sm text-gray-500">
          Criado em: {formatarData(servico.data_inicio)}
        </span>

        {servico.tempo_trabalhado !== null && (
          <span className="text-sm text-gray-500">
            Tempo: {servico.tempo_trabalhado}s
          </span>
        )}
      </div>

      <div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            EmAndamento
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {servico.status}
        </span>
      </div>
    </button>
  );
}
