export default function validarInsercao(turma){
    if (!turma.nome) throw new Error('Nome é obrigatório');
    if (!turma.descricao) throw new Error('Descrição é obrigatória');
    if (!turma.anoLetivo) throw new Error('Ano Letivo é obrigatório');
    if (!turma.capacidade) throw new Error('Capacidade é obrigatória');
    if (turma.ativo == undefined) throw new Error('Curso ativo é obrigatório');
    if (!turma.data) throw new Error('Data de Inclusão é obrigatória');
}

