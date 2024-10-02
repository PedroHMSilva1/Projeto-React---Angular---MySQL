import turma from './controller/turmaController.js'


export default function adicionarRotas(servidor) {
    servidor.use(turma);

}