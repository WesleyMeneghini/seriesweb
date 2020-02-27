import React, { Component } from 'react'

import FormularioSeries from './FormularioSeries'
import TabelaSeries from './TabelaSeries'
import { inserir, listar, atualizar, remover } from '../../services/series-service' 
import { getToken } from '../../services/auth-service'

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
            this.setState({ series: series })
        } catch (error) {
            console.log(error)
        }
        
    }

    enviaDados = async (serie) => {
        // delete serie.file
        console.log(serie)
        // return

        try {
            let serieRetornoApi = '';
            let retorno = '';

            const data = new FormData();

            data.append("nome", serie.nome)
            data.append("avatar", serie.files)

            console.log(data)

        

            const params = {
                method: 'POST',
                headers: {
                    // Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'type': 'formData',
                    Authorization: 'Bearer ' + getToken(),
                },
                body: JSON.stringify( serie )
            }

            retorno = await fetch('http://localhost:3000/series', params)
            serieRetornoApi = await retorno.json()
            console.log(retorno)
            return









            // let serieRetornoApi = '';
            // let retorno = '';
            // if (serie.id) {
            //     retorno = await atualizar(serie)
            //     serieRetornoApi = await retorno.json()
                
            // }else{
            //     retorno = await inserir(serie)
            //     serieRetornoApi = await retorno.json()
            // }


            // if(retorno.status === 201) {
            //     // console.log("Serie criada com sucesso!")
            //     // console.log(serieRetornoApi)
            //     return this.setState({
            //         series: [ ...this.state.series, serieRetornoApi ],
            //         serie: this.novaSerie,
            //     })
            // }
            // if( retorno.status === 200 ) {
            //     // console.log("Serie editada com sucesso!")
            //     // console.log(serieRetornoApi)
            //     return this.setState({
            //         series: this.state.series.map(s => s.id === serie.id ? serie : s),
            //         serie: this.novaSerie,
            //     })

            // }

        } catch (error) {
            console.log(error)
        }
    }

    deleta = async (id) =>{
        let  { series } = this.state;

        const retorno = await remover(id)

        if(retorno.status === 204) {
            this.setState({
                series: series.filter((serie) => {
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