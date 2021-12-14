import { useState, useEffect } from "react";
import axios from 'axios';
import '../../assets/styles/paciente.css'
import logo from '../../assets/img/logo_spmedgroup_v1 1.png'
import johnDoe from '../../assets/img/john-doe.jpg'
import { Link, useHistory } from 'react-router-dom';

export default function MinhasConsultas() {
    const [listaMinhas, setListaMinhas] = useState([])
    const history = useHistory()

    function ListarMinhasConsultas() {
        axios('http://192.168.3.159:5000/api/consultas/minhas', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('login-usuario-spmedgp'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    setListaMinhas(resposta.data)
                }
            })

            .catch((erro) => console.log(erro))
    }

    function Maximizar(minhaConsulta) {
        let divMinhaConsulta = document.getElementById(minhaConsulta.idConsulta)
        let btnMin = document.getElementById('min' + minhaConsulta.idConsulta)
        let btnMax = document.getElementById('max' + minhaConsulta.idConsulta)
        btnMax.style.setProperty('display', 'none')
        btnMin.style.setProperty('display', 'block')

        divMinhaConsulta.classList.add('box-lista-pac')
        divMinhaConsulta.classList.remove('box-lista2-pac')

        for (let i = 5; i <= 6; i++) {
            let infoTabela = document.getElementById('tr' + i + minhaConsulta.idConsulta)
            infoTabela.style.setProperty('display', 'flex')
        }
    }

    function Logout() {
        localStorage.removeItem('login-usuario-spmedgp')
        history.push('/login')
    }

    function Minimizar(minhaConsulta) {
        let divMinhaConsulta = document.getElementById(minhaConsulta.idConsulta)
        let btnMin = document.getElementById('min' + minhaConsulta.idConsulta)
        let btnMax = document.getElementById('max' + minhaConsulta.idConsulta)
        btnMax.style.setProperty('display', 'block')
        btnMin.style.setProperty('display', 'none')

        divMinhaConsulta.classList.add('box-lista2-pac')
        divMinhaConsulta.classList.remove('box-lista-pac')

        for (let i = 5; i <= 6; i++) {
            let infoTabela = document.getElementById('tr' + i + minhaConsulta.idConsulta)
            infoTabela.style.setProperty('display', 'none')
        }
    }


    useEffect(ListarMinhasConsultas, [])

    return (
        <div>
            <header>
                <div class="grid container-header">
                    <Link to="/"> <img src={logo} alt="" /></Link>
                    <div class="box-pesquisa-pac">
                        <button onClick={Logout}>Logout</button>
                        <div>
                            <input placeholder="Busque aqui" type="text" />
                        </div>
                    </div>
                    <img class="user" src={johnDoe} alt="" />
                </div>
            </header>
            <main>
                <section class="banner-pac">
                    <div class="banner-container-pac grid">
                        <div>
                            <h1>minhas consultas</h1>
                            <div class="abas-pac grid">
                                <nav>
                                    <a href="">Em andamento</a>
                                    <a href="">Realizadas</a>
                                    <a href="">Canceladas</a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="buscas-pac">
                    <div class="container-buscas-pac grid">
                        <div class="box-buscas-pac">
                            <input placeholder="Procure por aqui" type="text" />
                            <div>

                            </div>
                        </div>
                        <button>Ordenar</button>
                        <button>Filtrar</button>
                    </div>
                </section>
                <section class="lista-pac">
                    {
                        listaMinhas.map((minhaConsulta) => {
                            return (
                                <div id={minhaConsulta.idConsulta} class="box-lista2-pac grid">
                                    <div class="status-pac">
                                        <div>
                                            <p>{minhaConsulta.idSituacaoNavigation.situacaoDesc}</p>
                                        </div>
                                        <div>
                                            <p>{minhaConsulta.idConsulta}</p>
                                        </div>
                                    </div>
                                    <table class="tabela-pac">
                                        <tbody>
                                            <tr id={'tr1' + minhaConsulta.idConsulta}>
                                                <th>Médico:</th>
                                                <td>{minhaConsulta.idMedicoNavigation.nomeMedico}</td>
                                            </tr>
                                            <tr id={'tr2' + minhaConsulta.idConsulta}>
                                                <th>CRM:</th>
                                                <td>{minhaConsulta.idMedicoNavigation.crm}</td>
                                            </tr>
                                            <tr id={'tr3' + minhaConsulta.idConsulta}>
                                                <th>Especialidade do médico:</th>
                                                <td>{minhaConsulta.idMedicoNavigation.idEspecialidadeNavigation.nomeEspecialidade}</td>
                                            </tr>
                                            <tr id={'tr4' + minhaConsulta.idConsulta}>
                                                <th>Data:</th>
                                                <td>{Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                                    hour: 'numeric', minute: 'numeric'
                                                }).format(new Date(minhaConsulta.dataConsulta))}</td>
                                            </tr>
                                            <tr id={'tr5' + minhaConsulta.idConsulta} style={{ display: 'none' }}>
                                                <th>Clínica:</th>
                                                <td>{minhaConsulta.idMedicoNavigation.idClinicaNavigation.nomeFantasia}</td>
                                            </tr>
                                            <tr id={'tr6' + minhaConsulta.idConsulta} style={{ display: 'none' }}>
                                                <th>Descrição da consulta:</th>
                                                <td><textarea disabled name="" id="" value={minhaConsulta.consultaDesc} cols="30" rows="10">
                                                </textarea></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="acoes-pac">
                                        <div>
                                            <button onClick={() => Minimizar(minhaConsulta)} id={'min' + minhaConsulta.idConsulta} style={{ display: 'none' }}>Minimizar</button>
                                            <button onClick={() => Maximizar(minhaConsulta)} id={'max' + minhaConsulta.idConsulta}>Maximizar</button>
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