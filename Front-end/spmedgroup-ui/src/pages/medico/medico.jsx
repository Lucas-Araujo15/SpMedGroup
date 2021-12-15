import { useState, useEffect } from "react";
import api from "../../services/api";
import '../../assets/styles/medico.css'
import logo from '../../assets/img/logo_spmedgroup_v1 1.png'
import johnDoe from '../../assets/img/john-doe.jpg'
import { Link, useHistory } from 'react-router-dom';

export default function Agendamentos() {
    const [listaAgendamentos, setListaAgendamentos] = useState([])
    const [descConsulta, setDescConsulta] = useState('')
    const history = useHistory()
    const [addDescricao, setAddDescricao] = useState(false)

    const descricao = (agendamento) => {
        setDescConsulta(agendamento.target.value)
    }

    function Atualizar(agendamento) {
        let descAtualizada = {
            consultaDesc: descConsulta
        }

        api.patch('/consultas/descricao/' + agendamento.idConsulta, descAtualizada, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('login-usuario-spmedgp'),
            },
        })

            .catch((erro) => {
                console.log(erro)
            })

            .then(ListarAgendamentos)

        setDescConsulta('')

        Minimizar(agendamento)


    }

    function ListarAgendamentos() {
        api.get('/consultas/minhas', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('login-usuario-spmedgp'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    setListaAgendamentos(resposta.data)
                }
            })

            .catch((erro) => console.log(erro))
    }

    function Maximizar(agendamento) {
        let divAgendamento = document.getElementById(agendamento.idConsulta)
        divAgendamento.classList.remove('box-lista2-med')
        divAgendamento.classList.add('box-lista-med')

        for (let i = 4; i <= 6; i++) {
            let infoTabela = document.getElementById('tr' + i + agendamento.idConsulta)
            infoTabela.style.setProperty('display', 'flex')
        }

        let btnMin = document.getElementById('min' + agendamento.idConsulta)
        let btnMax = document.getElementById('max' + agendamento.idConsulta)
        btnMax.style.setProperty('display', 'none')
        btnMin.style.setProperty('display', 'block')
    }

    function Manipular(agendamento) {
        Maximizar(agendamento)
        document.getElementById('text' + agendamento.idConsulta).readOnly = false
        let btnMin = document.getElementById('min' + agendamento.idConsulta)
        let btnMax = document.getElementById('max' + agendamento.idConsulta)
        let btnManipular = document.getElementById('desc' + agendamento.idConsulta)
        let btnCancelar = document.getElementById('cancelar' + agendamento.idConsulta)
        let btnConcluir = document.getElementById('concluir' + agendamento.idConsulta)
        setDescConsulta(agendamento.consultaDesc)

        btnCancelar.style.setProperty('display', 'block')
        btnConcluir.style.setProperty('display', 'block')
        btnMax.style.setProperty('display', 'none')
        btnManipular.style.setProperty('display', 'none')
        btnMin.style.setProperty('display', 'none')
    }

    function Logout() {
        localStorage.removeItem('login-usuario-spmedgp')
        history.push('/login')
    }

    function Minimizar(agendamento) {

        setAddDescricao(false)
        let divAgendamento = document.getElementById(agendamento.idConsulta)
        let btnManipular = document.getElementById('desc' + agendamento.idConsulta)
        let btnCancelar = document.getElementById('cancelar' + agendamento.idConsulta)
        let btnConcluir = document.getElementById('concluir' + agendamento.idConsulta)

        btnCancelar.style.setProperty('display', 'none')
        btnConcluir.style.setProperty('display', 'none')
        btnManipular.style.setProperty('display', 'block')

        divAgendamento.classList.add('box-lista2-med')
        divAgendamento.classList.remove('box-lista-med')
        document.getElementById('text' + agendamento.idConsulta).readOnly = true


        for (let i = 4; i <= 6; i++) {
            let infoTabela = document.getElementById('tr' + i + agendamento.idConsulta)
            infoTabela.style.setProperty('display', 'none')
        }

        let btnMin = document.getElementById('min' + agendamento.idConsulta)
        let btnMax = document.getElementById('max' + agendamento.idConsulta)
        btnMax.style.setProperty('display', 'block')
        btnMin.style.setProperty('display', 'none')
    }

    useEffect(ListarAgendamentos, [])

    return (
        <div>
            <header>
                <div class="grid container-header">
                    <Link to="/"> <img src={logo} alt="" /></Link>
                    <div className="box-pesquisa-med">
                        <button onClick={Logout}>Logout</button>
                        <div>
                            <input placeholder="Busque aqui" type="text" />
                        </div>
                    </div>
                    <img className="user" src={johnDoe} alt="" />
                </div>
            </header>
            <main>
                <section class="banner-med">
                    <div class="banner-container-med grid">
                        <div>
                            <h1>agendamentos</h1>
                            <div class="abas-med grid">
                                <nav>
                                    <a href="">Em andamento</a>
                                    <a href="">Realizadas</a>
                                    <a href="">Canceladas</a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="buscas-med">
                    <div class="container-buscas-med grid">
                        <div class="box-buscas-med">
                            <input placeholder="Procure por aqui" type="text" />
                            <div>

                            </div>
                        </div>
                        <button>Ordenar</button>
                        <button>Filtrar</button>
                    </div>
                </section>
                <section class="lista-med">
                    {
                        listaAgendamentos.map((agendamento) => {
                            return (
                                <div id={agendamento.idConsulta} class="box-lista2-med grid">
                                    <div class="status-med">
                                        <div>
                                            <p>{agendamento.idSituacaoNavigation.situacaoDesc}</p>
                                        </div>
                                        <div>
                                            <p>{agendamento.idConsulta}</p>
                                        </div>
                                    </div>
                                    <table class="tabela-med">
                                        <tbody>
                                            <tr id={'tr1' + agendamento.idConsulta}>
                                                <th>Paciente:</th>
                                                <td>{agendamento.idPacienteNavigation.nomePaciente}</td>
                                            </tr>
                                            <tr id={'tr2' + agendamento.idConsulta}>
                                                <th>RG do paciente:</th>
                                                <td>{agendamento.idPacienteNavigation.rgPaciente}</td>
                                            </tr>
                                            <tr id={'tr3' + agendamento.idConsulta}>
                                                <th>Telefone do paciente:</th>
                                                <td>{agendamento.idPacienteNavigation.telPaciente}</td>
                                            </tr>
                                            <tr id={'tr4' + agendamento.idConsulta} style={{ display: 'none' }}>
                                                <th>Endereço do paciente:</th>
                                                <td>{agendamento.idPacienteNavigation.endPaciente}</td>
                                            </tr>
                                            <tr id={'tr5' + agendamento.idConsulta} style={{ display: 'none' }}>
                                                <th>Data:</th>
                                                <td>{Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                                    hour: 'numeric', minute: 'numeric'
                                                }).format(new Date(agendamento.dataConsulta))}</td>
                                            </tr>
                                            <tr id={'tr6' + agendamento.idConsulta} style={{ display: 'none' }}>
                                                <th>Descrição da consulta:</th>
                                                <td><textarea id={'text' + agendamento.idConsulta} readOnly={true} name="" cols="30" rows="10" onChange={t => descricao(t)}>{agendamento.consultaDesc}
                                                </textarea></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="acoes-med">
                                        <div>
                                            <button onClick={() => Minimizar(agendamento)} id={'cancelar' + agendamento.idConsulta} style={{ display: 'none' }}>Cancelar</button>
                                            <button onClick={() => Atualizar(agendamento)} id={'concluir' + agendamento.idConsulta} style={{ display: 'none' }}>Concluir</button>
                                            <button onClick={() => Manipular(agendamento)} id={'desc' + agendamento.idConsulta}>Adicionar descrição</button>
                                            <button onClick={() => Minimizar(agendamento)} id={'min' + agendamento.idConsulta} style={{ display: 'none' }}>Minimizar</button>
                                            <button onClick={() => Maximizar(agendamento)} id={'max' + agendamento.idConsulta}>Maximizar</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </section>
                <footer>
                    <div class="grid rodape">
                        <span>sp medical group - 2021</span>
                    </div>
                </footer>
            </main>
        </div>
    )
}