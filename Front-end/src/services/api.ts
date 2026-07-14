export interface ServicoPayload {
  nome_cliente: string;
  data_inicio: string; // ISO string
  data_fim: string; // ISO string
  bandeira: string;
  status: "Finalizado" | "Em andamento";
  observacao?: string; // Campo opcional
}

const BASE_URL = "http://localhost:3000/servico";

export const buscarServicos = async () => {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error("Falha ao buscar os serviços");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro no Service (buscarServicos):", error);
    throw error;
  }
};

export const salvarServico = async (servico: ServicoPayload) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(servico),
    });

    if (!response.ok) {
      throw new Error("Falha ao salvar o serviço");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Falha ao salvar o serviço:", error);
    throw error;
  }
};
