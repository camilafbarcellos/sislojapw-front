import { useContext } from 'react'
import Alerta from '../../Alerta';
import ProdutoContext from './ProdutoContext';

function Form() {
    // extrai do contexto do FornecedorContext
    const { objeto, handleChange, acaoCadastrar, alerta, listaFornecedores } = useContext(ProdutoContext);

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    })()

    return (
        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Produto</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={acaoCadastrar}
                        className="needs-validation" noValidate>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="form-group">
                                <label htmlFor="txtCodigo" className="form-label">
                                    Código
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control"
                                    id="txtCodigo"
                                    name="codigo"
                                    value={objeto.codigo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtEstoque" className="form-label">
                                    Estoque
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="txtEstoque"
                                    name="estoque"
                                    value={objeto.estoque}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Estoque OK!
                                </div>
                                <div className="invalid-feedback">
                                    Estoque deve ser informado!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtNome" className="form-label">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtNome"
                                    maxLength="100"
                                    name="nome"
                                    value={objeto.nome}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Nome OK!
                                </div>
                                <div className="invalid-feedback">
                                    Nome deve ser informado!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtValor" className="form-label">
                                    Valor
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="txtValor"
                                    name="valor"
                                    value={objeto.valor}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Valor OK!
                                </div>
                                <div className="invalid-feedback">
                                    Valor deve ser informado!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="selectFornecedor" className="form-label">
                                    Fornecedor
                                </label>
                                <select
                                    required
                                    className="form-control"
                                    id="selectFornecedor"
                                    value={objeto.fornecedor}
                                    name="fornecedor"
                                    onChange={handleChange}>
                                    <option disable="true" value="">(Selecione o fornecedor)</option>
                                    {listaFornecedores.map((fornecedor) => (
                                        <option key={fornecedor.codigo} value={fornecedor.codigo}>
                                            {fornecedor.nome}
                                        </option>
                                    ))}
                                </select>
                                <div className="valid-feedback">
                                    Fornecedor OK!
                                </div>
                                <div class="invalid-feedback">
                                    Selecione um fornecedor...
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-success" >
                                Salvar  <i className="bi bi-save"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form;