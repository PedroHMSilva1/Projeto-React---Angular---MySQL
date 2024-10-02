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

    async function salvar() {
        let body = {
            "nome": nome,
            "descricao": descricao,
            "anoLetivo": anoLetivo,
            "capacidade": capacidade,
            "ativo": ativo,
            "data": data
        };

        let resp = await axios.post('http://localhost:3010/turma', body)
        alert('Novo registro inserido: ' + resp.data.novoID);
    }

    async function buscar() {
        let resp = await axios.get('http://localhost:3010/turma')
        setLista(resp.data);
    }

    async function deletar(id) {
        await axios.delete('http://localhost:3010/turma/${id}')
        buscar();
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

            <hr />
            <h1> Informação da Turma </h1>
            <button onClick={buscar}> Buscar </button>

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
                        <th>Deletar</th>
                    </tr>
                </thead>

                <tbody>
                    {lista.map(item => 
                        <tr>
                            <td>{item.ID}</td>
                            <td>{item.Turma}</td>
                            <td>{item.Curso}</td>
                            <td>{item.AnoLetivo}</td>
                            <td>{item.Capacidade}</td>
                            <td>{item.Ativo ? 'Sim' : 'Não'}</td>
                            <td>{new Date(item.Inclusao).toLocaleDateString()}</td>
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
