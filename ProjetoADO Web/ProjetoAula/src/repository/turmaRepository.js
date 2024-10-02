import con from "./connection.js";

export async function inserir(turma) {
    const comando = `insert into turma(nm_turma, ds_curso, nr_ano_letivo, qtd_capacidade, bt_ativo, dt_inclusao) values(?, ?, ?, ?, ?, ?);`;

    let [info] = await con.query(comando, [turma.nome, turma.descricao, turma.anoLetivo, turma.capacidade, turma.ativo, turma.data]);
    return info.insertId;
}

export async function listar() {
    const comando = `
        SELECT  
            id_turma ID,
            nm_turma Turma,
            ds_curso Curso,
            nr_ano_letivo AnoLetivo,
            qtd_capacidade Capacidade,
            bt_ativo Ativo,
            dt_inclusao Inclusao
        FROM
            turma;
    `;

    let [registros] = await con.query(comando);
    return registros;
}

export async function deletar(id) {
    const comando = `
        DELETE FROM turma
        WHERE id_turma = ?;
    `;

    let [resultado] = await con.query(comando, [id]);

    return resultado;
}

export async function atualizar(id, dados) {
    const comando = `
        UPDATE turma
        SET 
            nm_turma = ?, 
            ds_curso = ?, 
            nr_ano_letivo = ?, 
            qtd_capacidade = ?, 
            bt_ativo = ?,
            dt_inclusao = ?
        WHERE 
            id_turma = ?;
    `;

    let [resultado] = await con.query(comando, [
        dados.nome,
        dados.descricao,    
        dados.anoLetivo,
        dados.capacidade,
        dados.ativo,
        dados.data,
        id
    ]);
    

    return resultado;
}

export async function listarPorAno(ano) {
    const comando = `
        SELECT  
            id_turma ID,
            nm_turma Turma,
            ds_curso Curso,
            nr_ano_letivo AnoLetivo,
            qtd_capacidade Capacidade,
            bt_ativo Ativo,
            dt_inclusao Inclusao
        FROM
            turma
        WHERE
            nr_ano_letivo = ?; 
    `;

    let [registros] = await con.query(comando, [ano]);
    return registros;
}

export async function listarPorAnoECurso(ano, curso) {
    const comando = `
        SELECT  
            id_turma ID,
            nm_turma Turma,
            ds_curso Curso,
            nr_ano_letivo AnoLetivo,
            qtd_capacidade Capacidade,
            bt_ativo Ativo,
            dt_inclusao Inclusao
        FROM
            turma
        WHERE 
            nr_ano_letivo = ? AND
            ds_curso = ?;
    `;

    let [registros] = await con.query(comando, [ano, curso]);
    return registros;
}