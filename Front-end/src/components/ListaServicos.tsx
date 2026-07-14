import React, { useState, useEffect } from "react";
import { ServicoCard } from "./ServicoCard";
import { buscarServicos } from "../services/api";

const ListaServicos: React.FC = () => {
  const [servicos, setServicos] = useState<any[]>([]);
  const [termoBusca, setTermoBusca] = useState("");
  const [carregando, setCarregando] = useState(false);

  const buscarDados = async () => {
    setCarregando(true);
    try {
      const response = await buscarServicos();
      setServicos(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarDados();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {/* Campo de busca não esta funcionando */}
        {/* <input
          type="text"
          placeholder="Buscar por nome do cliente..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
        /> */}

        <button onClick={buscarDados}>Atualizar Lista</button>
      </div>

      {carregando ? (
        <p className="text-gray-500">Carregando serviços...</p>
      ) : (
        <div>
          {servicos.length > 0 ? (
            servicos.map((servico: any) => (
              <ServicoCard key={servico.id} servico={servico} />
            ))
          ) : (
            <p className="text-gray-500">{"Nenhum serviço encontrado"}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ListaServicos;
