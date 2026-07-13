export type servico = {
  nome_cliente: string;
  data_inicio: string; // ISO string
  data_fim: string; // ISO string
  bandeira: string;
  status: "Finalizado" | "Em andamento";
  tempo_trabalhado: number; // Tempo total em segundos
  observacao?: string; // Campo opcional
};
