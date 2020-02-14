import React, { Component } from 'react';

class FormularioSeries extends Component {

    constructor() {
        super()
    }

    inputHandler = (e) => {
    
        const { name, value } = e.target;
        this.props.inputHandler(name, value)

        // this.setState({[name]: value})

    }

    enviaDados = (e) => {
        e.preventDefault()
        this.props.enviaDados(this.state)
        this.setState(this.stateInicial)
    }
    
    render() {
        const { serie } = this.props;
        return (
            <div className="card">
                <div className="card-header">
                    Cadastro de Séries
                </div>
                <div className="card-body"> 
                    <form method="post" onSubmit={this.enviaDados}>
                        <div className="form-group">

                            <label htmlFor="name">Nome</label>
                            <input 
                                className="form-control mb-2"
                                type="text"
                                id="nome"
                                name="nome"
                                value={serie.nome}
                                onChange={this.inputHandler}
                            />

                            <label htmlFor="ano_lancamento">ano_lancamento</label>
                            <input 
                                className="form-control mb-2"
                                type="number"
                                id="ano_lancamento"
                                name="ano_lancamento"
                                value={serie.ano_lancamento}
                                onChange={this.inputHandler}
                            />

                            <label htmlFor="temporadas">temporada</label>
                            <input 
                                className="form-control  mb-2"
                                type="text"
                                id="temporadas"
                                name="temporadas"
                                value={serie.temporadas}
                                onChange={this.inputHandler}
                            />

                            <label htmlFor="sinopse">sinopse</label>
                            <textarea
                                className="form-control"
                                type="text"
                                id="sinopse"
                                name="sinopse"
                                value={serie.sinopse}
                                onChange={this.inputHandler}
                            ></textarea>

                            <button
                                className="btn btn-success form-control mt-2"
                                type="submit">
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default FormularioSeries
