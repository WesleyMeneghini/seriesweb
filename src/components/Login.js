import React , { Component } from 'react';

import { signIn } from '../services/auth-service';
// import './Login.css';

const MsgError = (props) => (
    props.msg ? (
        <div className="alert alert-danger">
            {props.msg}
        </div>
    ) : ('')
)

class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            senha: '',
            msgError: 'Erro fatal',
        }
    }

    inputHandler = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    singIn = async (e) => {
        console.log(this.state)
        try {
        
            e.preventDefault()
            const usuario = this.state
     
            delete usuario.msgError
    
            const  retorno = await signIn(usuario)
    
            if (retorno.status === 400) {
                const erro = await retorno.json()
                this.setState({msgError: erro.erro})
            }
    
            if (retorno.ok) {
                this.props.history.push('/');
            }

        } catch (error) {
            console.log(error)
        }
        
        
    }

    render(){
        return(
            <div className="body">

                <div className="container">
                    <div classNome="wrapper fadeInDown">
                        <div className="formContent">

                            <div classNome="fadeIn first">
                            <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
                            </div>
                            <MsgError msg={this.state.msgError} />

                            <form  method="get" onSubmit={this.singIn}>
                                <input 
                                    type="text" 
                                    id="email" 
                                    classNome="fadeIn second" 
                                    name="email" 
                                    placeholder="email"
                                    required autoFocus 
                                    onChange={this.inputHandler} />

                                <input 
                                    type="text" 
                                    id="senha" 
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
            </div>
            
        )
    }
}

export default Login;