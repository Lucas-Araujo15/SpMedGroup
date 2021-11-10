import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [erroMensagem, setErroMensagem] = useState('')

    function logar(event) {
        event.preventDefault()

        setErroMensagem('')
        setIsLoading(true)

        axios.post('http://localhost:5000/api/login', {
            email: email,
            senha: senha
        })

            .then(resposta => {
                if (resposta.status === 200) {
                    console.log(resposta)
                    localStorage.setItem('login-usuario', resposta.data.token)
                    setIsLoading(false)

                    if (parseJwt().role === '1') {
                        this.props.history.push('/tiposEventos')

                    } else {
                        this.props.history.push('/')
                    }
                }
            })

            .catch(() => {
                setErroMensagem('E-mail e/ou senha inválidos.')
                setIsLoading(false)
            })

        this.limparCampos()
    }
}

