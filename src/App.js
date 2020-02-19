import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import './App.css'
import BoxSeries from './components/series/BoxSeries'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Autores from './components/Autores'

const NotFound = () => {
  return(
    <div>
      <h1>Página não encontrada</h1>
    </div>
  )
}

class App extends Component{

  render(){
    return (
      <Router>
        <div className="App">
          <Navbar />

          <Switch>
            <Route path='/series' component={BoxSeries} />
            <Route path='/autores' component={Autores} />
            <Route exact path='/' component={Home} />
            <Route component={NotFound} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
