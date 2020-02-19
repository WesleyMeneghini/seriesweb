import React, { Component } from 'react'
import PubSub from 'pubsub-js';

import FormularioSeries from './FormularioSeries'
import TabelaSeries from './TabelaSeries'

class BoxSeries extends Component {

    constructor(){
        super()
        this.state = {
            series: [],
        }
    }
    
    async componentDidMount(){
        const resposta = await fetch('http://localhost:3000/series')
        const series = await resposta.json()
        this.setState({series: series})
    }

    enviaDados = async (serie) => {

        // let { serie } = this.state;
        const method = serie.id ? 'PUT' : 'POST';
        // console.log(serie)

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
            // console.log(retorno)
            console.log('Enviado com sucesso')
            serie = await retorno.json()
            if(retorno.status === 201) {
                // console.log(serie)
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
 
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <FormularioSeries enviaDados={this.enviaDados}/>
                    </div>
                    <div className="col-md-8">
                        <TabelaSeries series={this.state.series} deleta={this.deleta} />
                    </div>
                </div>
            </div>

        )
    }
} 

export default BoxSeries