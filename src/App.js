import React, { Component } from 'react';
import './App.css';

class App extends Component{

  constructor(){
    super()
    this.state = {
      lista: [],
    }
  }

  componentWillMount(){
    this.setState({lista: [{nome: 'Rei Leão', lancamento: '2012'}]})
  }

  async componentDidMount(){
    const resposta = await fetch('http://localhost:3000/series')
    const series = await resposta.json()
    console.log(series)
    this.setState({lista: series})
  }

  render(){
    console.log(' Estou sendo renderizado ')

    return (
      <div className="App">
        Cadastro de Séries
        <form method="post">
          <div className="form">

            <label htmlFor="name">Nome</label>
            <input 
              type="text"
              id="nome"
              name="nome"
            />

            <label htmlFor="lancamento">lancamento</label>
            <input 
              type="text"
              id="lancamento"
              name="lancamento"
            />

            <label htmlFor="temporada">temporada</label>
            <input 
              type="text"
              id="temporada"
              name="temporada"
            />

            <label htmlFor="sinopse">sinopse</label>
            <textarea 
              type="text"
              id="sinopse"
              name="sinopse"
            ></textarea>

            <button type="submit">Salvar</button>
          </div>
        </form>
        <div className="list">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Lançamento</th>
                <th>Temporadas</th>
                <th>Sinopse</th>
              </tr>
            </thead>
            <tbody>
              {this.state.lista.map(serie => {
                return (
                  <tr key={serie.id}>
                    <td>{serie.nome}</td>
                    <td>{serie.lancamento}</td>
                    <td>{serie.temporadas}</td>
                    <td>{serie.sinopse}</td>
                  </tr>
                )
              })}
              
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
