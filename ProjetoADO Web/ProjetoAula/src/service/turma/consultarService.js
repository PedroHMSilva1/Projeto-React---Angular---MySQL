import{ listar } from "../../repository/turmaRepository.js"

export default async function consultarService(){
    let registros = await listar();
    return registros;
}