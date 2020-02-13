import React, { Component } from 'react'

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

        const params = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(serie)
        }

        try {
            const retorno = await fetch('http://localhost:3000/series', params)
            console.log(retorno)
            if(retorno.status === 201) {
                console.log('Enviado com sucesso')
                serie = await retorno.json()
                console.log(serie)
                this.setState({series: [serie, ...this.state.series ]})
            }else{
                console.log('nao retornou status 201')
                
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