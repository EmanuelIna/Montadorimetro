import React, { useState } from "react";
import { salvarServico } from "../services/api";
import Cronometro from "./Cronometro"; // Ajuste o caminho do import se necessário

const Form: React.FC = () => {
  const [nomeCliente, setNomeCliente] = useState("");
  const [bandeira, setBandeira] = useState("1");
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [erro, setErro] = useState("");
  const [status, setStatus] = useState<"Finalizado" | "Em andamento">(
    "Em andamento",
  );

  // Novo estado para controlar o disable do input com base no Cronômetro
  const [isRodando, setIsRodando] = useState(false);

  const handleIniciarServico = (): boolean => {
    if (nomeCliente.trim() === "") {
      setErro("O nome do cliente é obrigatório para iniciar.");
      return false; // Impede o cronômetro de rodar
    }

    setErro("");
    setDataInicio(new Date());
    return true; // Libera o cronômetro
  };

  const handleFinalizarServico = async () => {
    if (!dataInicio) return;

    const dataFim = new Date();

    await salvarServico({
      nome_cliente: nomeCliente,
      data_inicio: dataInicio.toISOString(),
      data_fim: dataFim.toISOString(),
      bandeira: bandeira,
      status: status,
      observacao: ` `,
    });

    // Reseta o formulário após salvar com sucesso
    setNomeCliente("");
    setBandeira("1");
    setDataInicio(null);
  };

  return (
    <form>
      {erro && <span style={{ color: "red" }}>{erro}</span>}
      <input
        type="text"
        placeholder="Nome do cliente"
        value={nomeCliente}
        onChange={(e) => setNomeCliente(e.target.value)}
        disabled={isRodando}
      />

      <div>
        <p>Selecione a Bandeira:</p>
        <select value={bandeira} onChange={(e) => setBandeira(e.target.value)}>
          <option value="1">Verde</option>
          <option value="2">Amarela</option>
          <option value="3">Vermelha</option>
        </select>
      </div>

      <Cronometro
        onStart={handleIniciarServico}
        onFinish={handleFinalizarServico}
        onRodandoChange={setIsRodando}
      />
    </form>
  );
};

export default Form;
