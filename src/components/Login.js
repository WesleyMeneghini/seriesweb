import React , { Component } from 'react';

import './Login.css';

class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            senha: '',
        }
    }

    inputHandler = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    singIn = async (e) => {
        e.preventDefault()
        console.log("tsete")
        const { email, senha } = this.state
        const params = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, 
                senha,
            })
        }

        try {
            const retorno = await fetch('http://localhost:3000/auth/autenticar', params)

            console.log(retorno)

            const usuario = await retorno.json()

            console.log(usuario)
        } catch (error) {
            console.log(error)
        }
    }

    render(){
        return(
            <div className="container">
                <div classNome="wrapper fadeInDown">
                    <div className="formContent">

                        <div classNome="fadeIn first">
                        <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
                        </div>

                        <form  method="get" onSubmit={this.singIn}>
                            <input 
                                type="text" 
                                id="login" 
                                classNome="fadeIn second" 
                                name="email" 
                                placeholder="email"
                                required autoFocus 
                                onChange={this.inputHandler} />

                            <input 
                                type="text" 
                                id="password" 
                                classNome="fadeIn third" 
                                name="senha" 
                                placeholder="senha" 
                                required autoFocus 
                                onChange={this.inputHandler} />

                            <button type="submit" classNome="fadeIn fourth" value="Log In">Login</button>
                        </form>

                        <div id="formFooter">
                            <a classNome="underlineHover" href="#">Forgot Password?</a>
                        </div>

                    </div>
                </div>
            </div>
            
        )
    }
}

export default Login;