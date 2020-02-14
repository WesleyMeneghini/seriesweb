import React, { Component } from 'react'

import './TabelaSeries.css'


const ListaSeries = (props) => {
        
    

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
                            <a href="#">
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
                                        props.consulta(serie)
                                    }}>
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

    render() {
        const { series, deleta, consulta } = this.props;
        return(
            <div className="card">
                <div className="card-header">
                    <h5>Lista de Séries</h5>
                </div>
                
                <ListaSeries 
                    series={series} 
                    deleta={deleta}
                    consulta={consulta} />

            </div>
        )
    }
}

export default TabelaSeries