import { useState, useEffect } from "react";
import ProdutoContext from "./ProdutoContext";
import Tabela from "./Tabela";
import Form from "./Form";

function Produto() {
    // alerta inicializado em branco
    const [alerta, setAlerta] = useState({ status: "", message: "" })
    // lista de objetos a exibir na tela inicializada vazia
    const [listaObjetos, setListaObjetos] = useState([]);
    // controle sobre edição ou adição
    const [editar, setEditar] = useState(false);
    // objeto do produto
    const [objeto, setObjeto] = useState({
        codigo: "", estoque: "",
        nome: "", valor: "", fornecedor: ""
    });
    // lista de prédios para seleção
    const [listaFornecedores, setListaFornecedores] = useState([]);

    // recuperar registro
    const recuperar = async codigo => {
        // endereço da API
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/produtos/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => console.log('Erro: ' + err))
    }

    // recuperar registro
    const acaoCadastrar = async e => {
        // ignora ação padrão do botão
        e.preventDefault();
        // determinar método pelo estado de 'editar'
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/produtos`,
            {
                method : metodo,
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(objeto)
            })
            .then(response => response.json())
            .then(json => {
                setAlerta({status : json.status, message : json.message});
                setObjeto(json.objeto);
                // caso não esteja em edição
                if(!editar) {
                    setEditar(true);
                }
            })
        } catch(err) {
            console.log(err.message);
        }
        recuperaProdutos();
    }

    // tratamento de mudanças
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value});
    }

    // consultar registros
    const recuperaProdutos = async () => {
        // endereço da API
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/produtos`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => console.log('Erro: ' + err))
    }

    // consultar registros de fornecedores
    const recuperaFornecedores = async () => {
        // endereço da API
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/fornecedores`)
            .then(response => response.json())
            .then(data => setListaFornecedores(data))
            .catch(err => console.log('Erro: ' + err))
    }

    // remover registro
    const remover = async objeto => {
        // janela de confirmação
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await fetch(`${process.env.REACT_APP_ENDERECO_API}/produtos/${objeto.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({ status: json.status, message: json.message }))
                recuperaProdutos();
            } catch (err) {
                console.log('Erro: ' + err);
            }
        }
    }

    // recupera registros a cada mudança
    useEffect(() => {
        recuperaProdutos();
        recuperaFornecedores();
    }, []);

    return (
        <ProdutoContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                recuperaProdutos, recuperaFornecedores,
                remover,
                objeto, setObjeto,
                editar, setEditar,
                recuperar,
                acaoCadastrar, handleChange,
                listaFornecedores
            }
        }>
            <Tabela />
            <Form />
        </ProdutoContext.Provider>
    );
}

export default Produto;