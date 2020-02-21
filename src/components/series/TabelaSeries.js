import React, { Component } from 'react'
import PubSub from 'pubsub-js';

import './TabelaSeries.css'


const ListaSeries = (props) => {
    console.log(props.series.error)
    // return <h1>Teste</h1>
    if(props.series.error){
        return <h3> {props.series.error}</h3>
    }

    return(
        <div className="card-body card-body-flex">
            {props.series.map(serie => {
                return(
                    <div className="card card-serie" key={serie.id}>
                        <div className="card-header">
                            <h5 className="card-title">{serie.nome}</h5>
                            <h6 className="card-title text-muted mb-0">{serie.ano_lancamento}</h6>
                        </div> 
                        <div className="card-body">
                            <img src="/logo192.png" className="card-img" alt='react'/>
                        </div>
                        <div className="card-footer">
                            {serie.temporadas}
                            {serie.temporadas > 1 ? ' temporadas' : ' temporada'}
                            <br/>
                            <a 
                                href="#" 
                                data-toggle="modal" 
                                data-target="#exampleModalCenter"
                                onClick={
                                    () => {
                                        PubSub.publish('detail', serie)
                                    }
                                } >
                                Sinopse 
                            </a>
                            <br/>
                            <div className="text-center mt-2">
                                <button 
                                    className="btn btn-sm  btn-outline-danger mr-1"
                                    onClick=
                                    {() => {
                                        if(window.confirm('Confirma a Exclusão?'))
                                        props.deleta(serie.id)
                                    }}>
                                    Delete
                                </button>
                                <button 
                                    className="btn btn-sm  btn-outline-warning "
                                    onClick={() => {
                                        PubSub.publish('editing', serie)
                                    }}
                                >
                                    Editar
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        
    )
}

class TabelaSeries extends Component {

    constructor( ) {
        super() 
        this.state = {
            serieDetalhe: '',
        }
        PubSub.subscribe('detail', (msg, serie) => {
            this.setState({serieDetalhe: serie})
        })
    }

    render() {
        const { series, deleta } = this.props
        console.log(series)

        const { serieDetalhe } = this.state

        return(
            <div className="card">
                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">{serieDetalhe.nome}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <img src={'/logo192.png'} className="card-img"></img>
                            {serieDetalhe.temporadas}<br></br>
                            {serieDetalhe.ano_lancamento}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="card-header">
                    <h5>Lista de Séries</h5>
                </div>
                
                <ListaSeries series={series} deleta={deleta}/>

            </div>
        )
    }
}

export default TabelaSeries