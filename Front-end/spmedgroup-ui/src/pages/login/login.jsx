import api from '../../services/api'
import { parseJwt } from '../../services/auth'
import { Component } from 'react'
import logo from '../../assets/img/logo_spmedgroup_v1 1.png'
import '../../assets/styles/login.css'
import { Link } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'saulo@email.com',
            senha: 'soABC123',
            //email: 'ricardo.lemos@spmedicalgroup.com.br',
            //senha: 'roGHI123',
            isLoading: false,
            erroMensagem: ''
        }
    }

    limparCampos = () => {
        this.setState({
            email: '',
            senha: ''
        })
    }

    atualizarCampo = (campo) => {
        this.setState({
            [campo.target.name]: campo.target.value
        })
    }

    logar = (event) => {
        event.preventDefault()

        this.setState({
            erroMensagem: '',
            isLoading: true
        })

        api.post('/login', {
            email: this.state.email,
            senha: this.state.senha
        })

            .then(resposta => {
                if (resposta.status === 200) {
                    console.log(resposta)
                    localStorage.setItem('login-usuario-spmedgp', resposta.data.token)
                    this.setState({
                        isLoading: false
                    })

                    if (parseJwt().role === '1') {
                        this.props.history.push('/paineldecontrole')

                    } else if (parseJwt().role === '2') {
                        this.props.history.push('/minhasconsultas')
                    } else if (parseJwt().role === '3') {
                        this.props.history.push('/agendamentos')
                    }
                }

            })

            .catch(
                erro => console.log(erro)
            )

        this.setState({
            isLoading: false
        })

        this.limparCampos()

    }

    render() {
        return (
            <div>
                <div className="login">
                    <div className="img-maior"></div>
                    <div className="formulario">
                        <Link to="/"> <img src={logo} alt="" /></Link>
                        <h1 className="h1-login">Entre na sua conta</h1>
                        <form onSubmit={this.logar} class="form">
                            <div className="inputs">
                                <div>
                                    <label for="">E-mail</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.atualizarCampo}
                                    />
                                </div>
                                <div>
                                    <label for="">Senha</label>
                                    <input
                                        type="password"
                                        name="senha"
                                        value={this.state.senha}
                                        onChange={this.atualizarCampo}
                                    />
                                </div>
                                <div className="opcoes">
                                    <div>
                                        <p>Lembre de mim</p>
                                    </div>
                                    <a href="">Esqueceu sua senha?</a>
                                </div>
                            </div>
                            <div className="buttons">
                                {
                                    this.state.isLoading === true ?
                                        <button type="submit" disabled>Entrando...</button>
                                        :
                                        <button type="submit">Entrar</button>
                                }
                                <button>Continuar com Google</button>
                            </div>
                        </form>
                    </div>
                    <div className="img-menor"></div>
                </div>
            </div>
        )
    }

}

