import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error("Faltam variáveis de ambiente do Supabase no arquivo .env");
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

//Busca dos serviços contados no banco de dados
app.get("/servico", async (req, res) => {
  const { data, error } = await supabase.from("servico").select("*");

  if (error) {
    console.error("Erro no Supabase:", error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
});

//Criação de um novo serviço no banco de dados
app.post("/servico", async (req, res) => {
  const {
    nome_cliente,
    data_inicio,
    data_fim,
    bandeira,
    status,
    observacao,
    tempo_trabalhado,
  } = req.body;

  if (!nome_cliente || !data_inicio || !data_fim || !bandeira || !status) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const { data, error } = await supabase
    .from("servico")
    .insert([
      {
        nome_cliente,
        bandeira,
        criado_em: new Date(),
        status,
        tempo_trabalhado,
      },
    ])
    .select();

  const {} = await supabase
    .from("sessao_servico")
    .insert([{ id_servico: data[0].id, data_inicio, data_fim }])
    .select();

  if (error) {
    console.error("Erro no Supabase:", error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json({ message: "Serviço criado com sucesso.", data });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
