import { useContext } from 'react'
import Alerta from '../../Alerta';
import FornecedorContext from './FornecedorContext';

function Form() {
    // extrai do contexto do FornecedorContext
    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(FornecedorContext);

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
                        <h5 className="modal-title" id="exampleModalLabel">Fornecedor</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={acaoCadastrar}
                        className="needs-validation" noValidate>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="form-group">
                                <label htmlFor="txtCodido" className="form-label">
                                    Código
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control"
                                    id="txtCodido"
                                    name="codigo"
                                    value={objeto.codigo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtNome" className="form-label">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtNome"
                                    maxLength="40"
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
                                <label htmlFor="txtDescricao" className="form-label">
                                    CNPJ
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtCnpj"
                                    maxLength="14"
                                    name="cnpj"
                                    value={objeto.cnpj}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    CNPJ OK!
                                </div>
                                <div className="invalid-feedback">
                                    CNPJ deve ser informado!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtSetor" className="form-label">
                                    Setor
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtSetor"
                                    maxLength="35"
                                    name="setor"
                                    value={objeto.setor}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Setor OK!
                                </div>
                                <div className="invalid-feedback">
                                    Setor deve ser informado!
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