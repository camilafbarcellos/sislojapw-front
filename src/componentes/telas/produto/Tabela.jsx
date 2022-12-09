import { useContext } from 'react'
import ProdutoContext from './ProdutoContext';
import Alerta from '../../Alerta';

function Tabela() {
    const { setObjeto, alerta, setAlerta, listaObjetos, remover,
        setEditar, recuperar } = useContext(ProdutoContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Produtos</h1>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => {
                    setObjeto({ codigo: 0, estoque: "", nome: "", valor: "", fornecedor: "" })
                    setEditar(false);
                    setAlerta({ status: "", message: "" });
                }}>
                Novo <i className="bi bi-pencil-square" />
            </button>
            <Alerta alerta={alerta} />
            {listaObjetos.length === 0 && <h1>Nenhum produto encontrado</h1>}
            {listaObjetos.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                            <th scope="col">Código</th>
                            <th scope="col">Estoque</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Fornecedor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.codigo}>
                                <td align="center">
                                    <button className="btn btn-info"
                                        data-bs-toggle="modal" data-bs-target="#modalEdicao"
                                        onClick={() => {
                                            recuperar(objeto.codigo);
                                            setEditar(true);
                                            setAlerta({ status: "", message: "" });
                                        }}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button className="btn btn-danger" title="Remover"
                                        onClick={() => { remover(objeto); }}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.estoque}</td>
                                <td>{objeto.nome}</td>
                                <td>R$ {objeto.valor}</td>
                                <td>{objeto.nomefornecedor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )

}

export default Tabela;