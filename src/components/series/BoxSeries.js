import React, { Component } from 'react'

import FormularioSeries from './FormularioSeries'
import TabelaSeries from './TabelaSeries'

class BoxSeries extends Component {

    constructor(){
        super()
        this.novaSerie = {
            nome: '',
            lancamento: '',
            temporadas: '',
            sinopse: '',
        }
        this.state = {
            series: [],
            serie: this.novaSerie,
        }
    }
    
    async componentDidMount(){
        console.log("carregando as series")
        const resposta = await fetch('http://localhost:3000/series')
        const series = await resposta.json()
        this.setState({series: series})
        console.log(series + "treste")
    }

    enviaDados = async () => {

        let { serie } = this.state;
        const method = serie.id ? 'PUT' : 'POST';

        const params = {
            method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(serie)
        }
        const urlParams = serie.id || '';
        try {
            const retorno = await fetch(`http://localhost:3000/series/${urlParams}`, params);
            console.log(retorno)
            console.log('Enviado com sucesso')
            serie = await retorno.json()
            if(retorno.status === 201) {
                console.log(serie)
                return this.setState({
                    series: [serie, ...this.state.series ],
                    serie: this.novaSerie,
                })
            }
            if( retorno.status === 200 ) {
                return this.setState({
                    series: this.state.series.map(s => s.id == serie.id ? serie : s),
                    serie: this.novaSerie,
                })

            }
        } catch (error) {
            console.log(error)
        }
    }

    deleta = async (id) =>{
        const seriesAtual = this.state.series
        const params = {
            method : 'DELETE',

        }
        const retorno = await fetch(`http://localhost:3000/series/${id}`, params)

        if(retorno.status === 204) {
            this.setState({
                series: seriesAtual.filter((serie) => {
                    return serie.id !== id
                })
            })
        }
    }

    inputHandler = (name, value) => {
        this.setState({ serie: { ...this.state.serie, [name]: value } })
    }

    consulta = (serie) => {
        this.setState({serie: serie})
    }
 
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <FormularioSeries 
                            enviaDados={this.enviaDados} 
                            serie={this.state.serie} 
                            inputHandler={this.inputHandler}/>
                    </div>
                    <div className="col-md-8">
                        <TabelaSeries 
                            series={this.state.series} 
                            deleta={this.deleta} 
                            consulta={this.consulta} />
                    </div>
                </div>
            </div>

        )
    }
} 

export default BoxSeries