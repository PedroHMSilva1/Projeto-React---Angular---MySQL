import inserirService from "../service/turma/inserirService.js";
import consultarService from "../service/turma/consultarService.js";
import atualizarService from "../service/turma/atualizarService.js";
import deletarService from "../service/turma/deletarService.js";
import buscarPorAnoService from "../service/turma/buscarPorAnoService.js";
import buscarPorAnoECursoService from "../service/turma/buscarPorAnoECursoService.js";




import { Router } from "express";

const endpoints = Router();

endpoints.post('/turma', async (req, resp) => {
    try {
        let turma = req.body;
        let id = await inserirService(turma);
        resp.send({
            novoID: id
        });
    } catch (erro) {
        resp.status(400).send({
            erro: erro.message
        });
    }
});

endpoints.get('/turma', async (req, resp) => {
    try {
        let reg = await consultarService();
        resp.send(reg);
    } catch (erro) {
        resp.status(400).send({
            erro: erro.message
        });
    }
});

endpoints.put('/turma/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let { nome, descricao, anoLetivo, capacidade, ativo, data } = req.body;

        if (!nome || !descricao || !anoLetivo || !capacidade || typeof ativo !== 'boolean' || !data) {
            return resp.status(400).send({ erro: 'Todos os campos são obrigatórios.' });
        }

        let resultado = await atualizarService(id, { nome, descricao, anoLetivo, capacidade, ativo, data });

        if (resultado.affectedRows === 0) {
            return resp.status(404).send({ erro: 'Turma não encontrada.' });
        }

        resp.send({
            mensagem: 'Turma atualizada com sucesso',
            dados: resultado
        });
    } catch (erro) {
        resp.status(500).send({
            erro: erro.message
        });
    }
});



endpoints.delete('/turma/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let resultado = await deletarService(id);

        if (resultado.affectedRows === 0) {
            return resp.status(404).send({ erro: 'Turma não encontrada.' });
        }

        resp.send({
            mensagem: 'Turma deletada com sucesso'
        });
    } catch (erro) {
        resp.status(500).send({
            erro: erro.message
        });
    }
});

endpoints.get('/turma/busca/ano', async (req, resp) => {
    try {
        const ano = req.query.ano;
        const resultado = await buscarPorAnoService(ano);
        
        resp.send(resultado);
    } catch (erro) {
        resp.status(400).send({
            erro: erro.message
        });
    }
});

endpoints.get('/turma/:ano/curso', async (req, resp) => {
    try {
        const ano = req.params.ano;
        const curso = req.query.curso;
        
        if (!curso) {
            return resp.status(400).send({ erro: 'O parâmetro "curso" é obrigatório.' });
        }

        const resultado = await buscarPorAnoECursoService(ano, curso);
        
        if (resultado.length === 0) {
            return resp.status(404).send({ mensagem: 'Nenhuma turma encontrada.' });
        }

        resp.send(resultado);
    } catch (erro) {
        resp.status(500).send({ erro: 'Erro ao buscar turmas.' });
    }
});

export default endpoints;
