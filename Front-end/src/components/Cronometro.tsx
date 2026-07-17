import React, { useEffect } from "react";
import { useCronometro } from "../hooks/useCronometro";

interface CronometroProps {
  onStart: () => boolean; // Retorna true se a validação do Form passar
  onFinish: () => Promise<void> | void; // Executa a chamada de API no Form
  onRodandoChange: (rodando: boolean) => void; // Avisa o Form se o tempo está correndo
}

const Cronometro: React.FC<CronometroProps> = ({
  onStart,
  onFinish,
  onRodandoChange,
}) => {
  const { iniciar, pausar, continuar, finalizar, segundos, iniciado, rodando } =
    useCronometro();

  // Sincroniza o status 'rodando' com o componente pai (Form) para bloquear o input
  useEffect(() => {
    onRodandoChange(rodando);
  }, [rodando, onRodandoChange]);

  const formatarTempo = (segundos: number) => {
    const min = Math.floor(segundos / 60)
      .toString()
      .padStart(2, "0");
    const seg = (segundos % 60).toString().padStart(2, "0");
    return `${min}:${seg}`;
  };

  const handleIniciar = (e: React.MouseEvent) => {
    e.preventDefault();
    // Só inicia o cronômetro se a validação do pai (onStart) retornar true
    if (onStart()) {
      iniciar();
    }
  };

  const handlePausar = (e: React.MouseEvent) => {
    e.preventDefault();
    pausar();
  };

  const handleContinuar = (e: React.MouseEvent) => {
    e.preventDefault();
    continuar();
  };

  const handleFinalizar = async (e: React.MouseEvent) => {
    e.preventDefault();
    await onFinish(); // Aguarda o Form salvar os dados na API
    finalizar(); // Zera o cronômetro
  };

  return (
    <>
      <h2>{formatarTempo(segundos)}</h2>
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        {!iniciado && (
          <button
            onClick={handleIniciar}
            style={{ background: "green", color: "white", padding: "10px" }}
          >
            Iniciar Serviço
          </button>
        )}

        {iniciado && rodando && (
          <button
            onClick={handlePausar}
            style={{ background: "orange", color: "white", padding: "10px" }}
          >
            Pausar Serviço
          </button>
        )}

        {iniciado && !rodando && (
          <>
            <button
              onClick={handleContinuar}
              style={{ background: "green", color: "white", padding: "10px" }}
            >
              Continuar Serviço
            </button>

            <button
              onClick={handleFinalizar}
              style={{ background: "blue", color: "white", padding: "10px" }}
            >
              Finalizar Serviço
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Cronometro;
