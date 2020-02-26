import React , { Component } from 'react';

import { signIn } from '../services/auth-service';

const MsgError = (props) => {
    if(props.msgError === ''){
        return ""
    }
    return(
        <div className="alert alert-danger">
            {props.msgError}
        </div>
    )
}

class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            senha: '',
            msgError: '',
        }
    }

    inputHandler = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    singIn = async (e) => {
        // console.log(this.state)
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
            <div className="container mt-5 " >
                <div className="text-center row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <form className="form-signin" method="get" onSubmit={this.singIn}>
                            <img className="mb-4 " src="/logo192.png" alt="" />
                            <h1 className="h3 mb-3 font-weight-normal">
                                Please sign in
                            </h1>
                            <MsgError msgError={this.state.msgError} />

                            <label className="sr-only">
                                Email address
                            </label>
                            <input 
                                type="email" 
                                id="inputEmail" 
                                className="form-control mb-2" 
                                name="email" 
                                placeholder="Email address"
                                required autoFocus 
                                onChange={this.inputHandler} /> 

                            <label className="sr-only">
                                Password
                            </label>
                            <input 
                                type="password" 
                                id="inputPassword" 
                                className="form-control mb-2" 
                                name="senha" 
                                placeholder="Password" 
                                required autoFocus 
                                onChange={this.inputHandler} />
                            <div className="checkbox mb-3">
                                <label>
                                <input type="checkbox" value="remember-me"></input> Remember me
                                </label>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                            <p className="mt-5 mb-3 text-muted">WesleyMeneghini&copy;2020</p>
                        </form>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        )
    }
}

export default Login;