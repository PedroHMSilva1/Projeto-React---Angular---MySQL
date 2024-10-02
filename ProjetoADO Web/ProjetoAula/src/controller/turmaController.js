import inserirService from "../service/turma/inserirService.js";
import consultarService from "../service/turma/consultarService.js";
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

endpoints.delete('/turma/:id', async (req, resp) => {
    const id = req.params.id;
    let turma = await consultarService(id);
    resp.send(turma);
});

export default endpoints;
