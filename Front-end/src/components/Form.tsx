import React, { useState } from "react";
import { salvarServico } from "../services/api";
import { useCronometro } from "../hooks/useCronometro";

const Form: React.FC = () => {
  const cronometroHook = useCronometro();

  const [nomeCliente, setNomeCliente] = useState("");
  const [bandeira, setBandeira] = useState("1");
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [erro, setErro] = useState("");
  const [status, setStatus] = useState<"Finalizado" | "Em andamento">(
    "Em andamento",
  );

  const IniciarServico = (e: React.MouseEvent) => {
    e.preventDefault();

    if (nomeCliente.trim() === "") {
      setErro("O nome do cliente é obrigatório para iniciar.");
      return;
    }

    setErro("");
    setDataInicio(new Date());
    cronometroHook.iniciar();
  };

  const PausarServico = (e: React.MouseEvent) => {
    e.preventDefault();
    setStatus("Em andamento");
    cronometroHook.pausar();
  };

  const ContinuarServico = (e: React.MouseEvent) => {
    e.preventDefault();
    cronometroHook.continuar();
  };

  const FinalizarServico = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!dataInicio) return;

    const dataFim = new Date();

    // Salva os dados no banco de dados
    await salvarServico({
      nome_cliente: nomeCliente,
      data_inicio: dataInicio.toISOString(),
      data_fim: dataFim.toISOString(),
      bandeira: bandeira,
      status: status,
      observacao: ` `,
    });

    cronometroHook.finalizar();
    setNomeCliente("");
    setBandeira("1");
    setDataInicio(null);
    cronometroHook.finalizar();
  };

  // Função auxiliar para mostrar o tempo bonito na tela (MM:SS)
  const formatarTempo = (segundos: number) => {
    const min = Math.floor(segundos / 60)
      .toString()
      .padStart(2, "0");
    const seg = (segundos % 60).toString().padStart(2, "0");
    return `${min}:${seg}`;
  };

  return (
    <form>
      {erro && <span>{erro}</span>}
      <input
        type="text"
        placeholder="Nome do cliente"
        value={nomeCliente}
        onChange={(e) => setNomeCliente(e.target.value)}
        disabled={cronometroHook.rodando}
      />
      <div>
        <p>Selecione a Bandeira:</p>

        <select value={bandeira} onChange={(e) => setBandeira(e.target.value)}>
          <option value="1">Verde</option>
          <option value="2">Amarela</option>
          <option value="3">Vermelha</option>
        </select>
      </div>
      <h2>{formatarTempo(cronometroHook.segundos)}</h2>
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        {!cronometroHook.iniciado && (
          <button
            onClick={IniciarServico}
            style={{ background: "green", color: "white", padding: "10px" }}
          >
            Iniciar Serviço
          </button>
        )}

        {/* CONDIÇÃO 2: Se o serviço está iniciado E o tempo está rodando */}
        {cronometroHook.iniciado && cronometroHook.rodando && (
          <button
            onClick={PausarServico}
            style={{ background: "orange", color: "white", padding: "10px" }}
          >
            Pausar Serviço
          </button>
        )}

        {/* CONDIÇÃO 3: Se o serviço está iniciado E o tempo está pausado */}
        {cronometroHook.iniciado && !cronometroHook.rodando && (
          <>
            <button
              onClick={ContinuarServico} // Você precisará criar esta função
              style={{ background: "green", color: "white", padding: "10px" }}
            >
              Continuar Serviço
            </button>

            <button
              onClick={FinalizarServico}
              style={{ background: "blue", color: "white", padding: "10px" }}
            >
              Finalizar Serviço
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default Form;
