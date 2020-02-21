import React, { Component } from 'react'
import PubSub from 'pubsub-js';

import FormularioSeries from './FormularioSeries'
import TabelaSeries from './TabelaSeries'
import { getToken } from '../../services/auth-service'
import { inserir, listar, atualizar, remover } from '../../services/series-service' 

class BoxSeries extends Component {

    constructor(){
        super()
        this.state = {
            series: [],
        }
    }
    
    async componentDidMount(){

        try {
            const retorno = await listar()
            const series = await retorno.json()
            console.log(series)
            this.setState({ series: series })
        } catch (error) {
            console.log(error)
        }
        
    }

    enviaDados = async (serie) => {
        try {
            let retorno = '';
            if (serie.id) {
                retorno = await atualizar(serie)
            }else{
                retorno = await inserir(serie)
            }


            if(retorno.status === 201) {
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
        const { seriesAtual }= this.state
        const retorno = await remover(id)
        console.log(retorno)
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