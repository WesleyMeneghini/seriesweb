import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import './PreviewImage.css';

const SelectGeneros = (props) => {
    return(
            props.generos.map( (genero) => {
                return(
                    <option key={genero.codigo} value={genero.codigo}>
                        {genero.nome}
                    </option>
                )
            } )
        )

}

class FormularioSeries extends Component {

    constructor() {
        super()
        this.stateInicial = {
            nome: '',
            ano_lancamento: '',
            temporadas: '',
            sinopse: '',
            image: '',
            id_genero: 0,
            file: '',
        }

        this.state = this.stateInicial

        PubSub.subscribe('editing', (msg, serie) =>  {
            this.setState(serie)
        })
    }

    inputHandler = (e) => {
    
        const { name, value } = e.target;
        this.setState({[name]: value})

    }

    _handleImageChange = (e) =>{
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = async () => {
          await this.setState({
            file: file,
            image: reader.result
          });
        }
    
        reader.readAsDataURL(file)
    }

    enviaDados = async (e) => {
        e.preventDefault()
        await this.props.enviaDados(this.state)
        this.setState(this.stateInicial)
        delete this.state.id
    }
    
    render() {
        // console.log(this.state)

        let { image } = this.state;
        // console.log("------------------------")
        // console.log(image)
        let $imagePreview = null;
        if (image !== '' ) {
            $imagePreview = ( 
                <div className="form-control imgPreview">
                    <img src={image} alt={"Pre-visualizacao"} />
                </div>);
        } else {
            // $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        const { generos } = this.props

        return (
            <div className="card">
                <div className="card-header">
                    Cadastro de Séries
                </div>
                <div className="card-body"> 
                    <form method="post" onSubmit={this.enviaDados}>
                        <div className="form-group">

                            <div className="form-group">
                                <label htmlFor="name">Nome</label>
                                <input 
                                    className="form-control mb-1"
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    value={this.state.nome}
                                    onChange={this.inputHandler}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="ano_lancamento">ano_lancamento</label>
                                <input 
                                    className="form-control "
                                    type="number"
                                    id="ano_lancamento"
                                    name="ano_lancamento"
                                    value={this.state.ano_lancamento}
                                    onChange={this.inputHandler}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="genero">Genero</label>
                                <select name="id_genero" className="form-control mb-1" onClick={this.inputHandler}>
                                    <option value="">Genero</option>
                                    <SelectGeneros generos={generos}/>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="temporadas">temporada</label>
                                <input 
                                    className="form-control  mb-1"
                                    type="text"
                                    id="temporadas"
                                    name="temporadas"
                                    value={this.state.temporadas}
                                    onChange={this.inputHandler}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="sinopse">sinopse</label>
                                <textarea
                                    className="form-control mb-1"
                                    type="text"
                                    id="sinopse"
                                    name="sinopse"
                                    value={this.state.sinopse}
                                    onChange={this.inputHandler}
                                ></textarea>
                            </div>

                            <input 
                                className="form-control mb-2" 
                                type="file" 
                                placeholder="Escolher foto"
                                accept="image/png, image/jpeg"
                                onChange={(e)=>this._handleImageChange(e)} />

                            {/* <div className="form-control imgPreview"> */}
                                {$imagePreview}
                            {/* </div> */}

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
