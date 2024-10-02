import { listarPorAnoECurso } from "../../repository/turmaRepository.js";

export default async function buscarPorAnoECursoService(ano, curso) {
    const resultado = await listarPorAnoECurso(ano, curso);
    return resultado;
}