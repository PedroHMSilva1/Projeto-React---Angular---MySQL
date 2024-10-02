import { listarPorAno } from "../../repository/turmaRepository.js";

export default async function buscarPorAnoService(ano) {
    const resultado = await listarPorAno(ano);
    return resultado;
}