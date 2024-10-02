import { atualizar } from "../../repository/turmaRepository.js";

export default async function atualizarService(id, dados) {
    const resultado = await atualizar(id, dados);
        
    return resultado;
}
