import { deletar } from "../../repository/turmaRepository.js";

export default async function deletarService(id) {
    const resultado = await deletar(id);
    
    return resultado;
}
