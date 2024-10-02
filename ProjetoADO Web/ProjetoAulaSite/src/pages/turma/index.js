import axios from "axios";
import { useState } from "react";
import './index.scss';

export default function Turma() {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [anoLetivo, setAnoLetivo] = useState('');
    const [capacidade, setCapacidade] = useState('');
    const [ativo, setAtivo] = useState(false);
    const [data, setData] = useState('');
    const [lista, setLista] = useState([]);
    const [idAtualizar, setIdAtualizar] = useState('');
    const [anoBuscado, setAnoBuscado] = useState('');
    const [cursoBuscado, setCursoBuscado] = useState('');

    function prepararAtualizacao(item) {
        setNome(item.Turma);
        setDescricao(item.Curso);
        setAnoLetivo(item.AnoLetivo);
        setCapacidade(item.Capacidade);
        setAtivo(item.Ativo);
        setData(item.Inclusao);
        setIdAtualizar(item.ID);
    }

    async function salvar() {
        let body = {
            "nome": nome,
            "descricao": descricao,
            "anoLetivo": anoLetivo,
            "capacidade": capacidade,
            "ativo": ativo,
            "data": data
        };

        let resp;

        if (idAtualizar) {
            resp = await axios.put(`http://localhost:3010/turma/${idAtualizar}`, body);
            alert('Registro atualizado: ' + idAtualizar);
            setIdAtualizar(null);
        } else {
            resp = await axios.post('http://localhost:3010/turma', body);
            alert('Novo registro inserido: ' + resp.data.novoID);
        }

        setNome('');
        setDescricao('');
        setAnoLetivo('');
        setCapacidade('');
        setAtivo(false);
        setData('');
    }

    async function buscar() {
        let resp = await axios.get('http://localhost:3010/turma');
        setLista(resp.data);
    }

    async function buscarPorAno() {
        const anoBuscado = prompt("Digite o ano que deseja buscar:");
        if (anoBuscado) {
            let resp = await axios.get(`http://localhost:3010/turma/busca/ano?ano=${anoBuscado}`);
            setLista(resp.data);
        }
    }

    async function buscarPorAnoECurso() {
        if (!anoBuscado || !cursoBuscado) {
            alert("Por favor, preencha o ano e o curso.");
            return;
        }

        try {
            let resp = await axios.get(`http://localhost:3010/turma/${anoBuscado}/curso?curso=${cursoBuscado}`);
            setLista(resp.data);
        } catch (error) {
            alert("Erro ao buscar turmas: " + error.message);
        }
    }

    async function deletar(id) {
        if (window.confirm("Você tem certeza que deseja deletar esta turma?")) {
            let resp = await axios.delete(`http://localhost:3010/turma/${id}`);
            alert(resp.data.mensagem);
            buscar();
        }
    }

    return (
        <div className='pagina-turma'>
            <h1> Turma </h1>
            <div className='form'>
                <div>
                    <label>Nome</label>
                    <input type='text' value={nome} onChange={e => setNome(e.target.value)} />
                </div>
                <div>
                    <label>Descricao</label>
                    <input type='text' value={descricao} onChange={e => setDescricao(e.target.value)} />
                </div>
                <div>
                    <label>Ano Letivo</label>
                    <input type='number' value={anoLetivo} onChange={e => setAnoLetivo(e.target.value)} />
                </div>
                <div>
                    <label>Capacidade</label>
                    <input type='number' value={capacidade} onChange={e => setCapacidade(e.target.value)} />
                </div>
                <div>
                    <label>Ativo</label>
                    <input type='checkbox' checked={ativo} onChange={e => setAtivo(e.target.checked)} />
                </div>
                <div>
                    <label>Data</label>
                    <input type='date' value={data} onChange={e => setData(e.target.value)} />
                </div>
                <div>
                    <button onClick={salvar}> Salvar </button>
                </div>
            </div>
            <div className="busca">
                <h1> Informação da Turma </h1>
                <button onClick={buscar}> Buscar </button>
                <button onClick={buscarPorAno}> Buscar por Ano </button>

                <h2>Buscar por Ano e Curso</h2>
                <div>
                    <input
                        type='number'
                        placeholder='Ano'
                        value={anoBuscado}
                        onChange={e => setAnoBuscado(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Curso'
                        value={cursoBuscado}
                        onChange={e => setCursoBuscado(e.target.value)}
                    />
                    <button onClick={buscarPorAnoECurso}>Buscar</button>
                </div>
            </div>

            <hr />


            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Turma</th>
                        <th>Curso</th>
                        <th>Ano Letivo</th>
                        <th>Capacidade</th>
                        <th>Ativo</th>
                        <th>Data</th>
                        <th>Atualizar</th>
                        <th>Deletar</th>
                    </tr>
                </thead>

                <tbody>
                    {lista.map(item =>
                        <tr key={item.ID}>
                            <td>{item.ID}</td>
                            <td>{item.Turma}</td>
                            <td>{item.Curso}</td>
                            <td>{item.AnoLetivo}</td>
                            <td>{item.Capacidade}</td>
                            <td>{item.Ativo ? 'Sim' : 'Não'}</td>
                            <td>{new Date(item.Inclusao).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => prepararAtualizacao(item)}>Atualizar</button>
                            </td>
                            <td>
                                <button onClick={() => deletar(item.ID)}>Deletar</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
