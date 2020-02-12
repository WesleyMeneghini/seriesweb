import React, { Component } from 'react'
import './App.css'

import BoxSeries from './components/series/BoxSeries'

class App extends Component{

  render(){
    return (
      <div className="App">
        Cadastro de Séries
        <BoxSeries />
      </div>
    );
  }
}

export default App;
