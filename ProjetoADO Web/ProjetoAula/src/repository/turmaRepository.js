import con from "./connection.js"

export async function inserir(turma) {
    const comando = `insert into turma(nm_turma, ds_curso, nr_ano_letivo, qtd_capacidade, bt_ativo, dt_inclusao) values(?, ?, ?, ?, ?, ?);`

    let [info] = await con.query(comando, [turma.nome, turma.descricao, turma.anoLetivo, turma.capacidade, turma.ativo, turma.data])
    return info.insertId
}

export async function listar() {
    const comando = `
        SELECT  
            id_turma ID,
            nm_turma Turma,
            ds_curso Curso,
            nr_ano_letivo AnoLetivo,
            qtd_capacidade 	Capacidade,
            bt_ativo	Ativo,
            dt_inclusao	Inclusao
        FROM
            turma;
    `

    let [registros] = await con.query(comando);
    return registros;
}