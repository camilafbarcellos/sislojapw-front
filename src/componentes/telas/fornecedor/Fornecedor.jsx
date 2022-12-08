import { useState, useEffect } from "react";
import FornecedorContext from "./FornecedorContext";
import Tabela from "./Tabela";
import Form from "./Form";

function Fornecedor() {
    // alerta inicializado em branco
    const [alerta, setAlerta] = useState({ status: "", message: "" })
    // lista de objetos a exibir na tela inicializada vazia
    const [listaObjetos, setListaObjetos] = useState([]);
    // controle sobre edição ou adição
    const [editar, setEditar] = useState(false);
    // objeto do fornecedor
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "",
        cnpj: "", setor: ""
    });

    // recuperar registro
    const recuperar = async codigo => {
        // endereço da API
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/fornecedores/${codigo}`)
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
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/fornecedores`,
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
        recuperaFornecedores();
    }

    // tratamento de mudanças
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value});
    }

    // consultar registros
    const recuperaFornecedores = async () => {
        // endereço da API
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/fornecedores`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => console.log('Erro: ' + err))
    }

    // remover registro
    const remover = async objeto => {
        // janela de confirmação
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await fetch(`${process.env.REACT_APP_ENDERECO_API}/fornecedores/${objeto.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({ status: json.status, message: json.message }))
                recuperaFornecedores();
            } catch (err) {
                console.log('Erro: ' + err);
            }
        }
    }

    // recupera registros a cada mudança
    useEffect(() => {
        recuperaFornecedores();
    }, []);

    return (
        <FornecedorContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                recuperaFornecedores,
                remover,
                objeto, setObjeto,
                editar, setEditar,
                recuperar,
                acaoCadastrar, handleChange
            }
        }>
            <Tabela />
            <Form />
        </FornecedorContext.Provider>
    );
}

export default Fornecedor;