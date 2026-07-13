import { useState, useEffect } from "react";

export const useCronometro = () => {
  const [segundos, setSegundos] = useState(0);
  const [iniciado, setIniciado] = useState(false);
  const [rodando, setRodando] = useState(false);

  useEffect(() => {
    let intervalo: ReturnType<typeof setInterval>;

    // Só conta o tempo se estiver "rodando"
    if (rodando) {
      intervalo = setInterval(() => {
        setSegundos((prev) => prev + 1);
      }, 1000);
    }

    // Limpa o intervalo para não vazar memória
    return () => clearInterval(intervalo);
  }, [rodando]);

  // Ações do cronômetro
  const iniciar = () => {
    setIniciado(true);
    setRodando(true);
    setSegundos(0);
  };

  const pausar = () => {
    setRodando(false);
  };

  const continuar = () => {
    setRodando(true);
  };

  const finalizar = () => {
    setIniciado(false);
    setRodando(false);
    const tempoTrabalhado = segundos; // Salva o tempo antes de zerar
    setSegundos(0); // Zera o cronômetro para o próximo cliente
    return tempoTrabalhado; // Devolve os segundos para você enviar pro banco
  };

  // Formata automaticamente para HH:MM:SS (horas, minutos e segundos)
  const tempoFormatado = () => {
    const horas = Math.floor(segundos / 3600)
      .toString()
      .padStart(2, "0");
    const minutos = Math.floor((segundos % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const segs = (segundos % 60).toString().padStart(2, "0");
    return `${horas}:${minutos}:${segs}`;
  };

  // Aqui nós "exportamos" para o componente tudo o que ele vai precisar usar
  return {
    segundos,
    iniciado,
    rodando,
    iniciar,
    pausar,
    continuar,
    finalizar,
    tempoFormatado: tempoFormatado(),
  };
};
