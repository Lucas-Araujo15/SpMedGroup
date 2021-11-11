import { useState, useEffect } from "react";
import axios from 'axios';
import '../../assets/styles/adm.css'
import logo from '../../assets/img/logo_spmedgroup_v1 1.png'
import johnDoe from '../../assets/img/john-doe.jpg'



export default function PainelControle() {
    const [listaConsultas, setListaConsultas] = useState([]);
    const [idPaciente, setPaciente] = useState(0);
    const [idMedico, setMedico] = useState(0);
    const [idClinica, setClinica] = useState(0);
    const [data, setData] = useState(new Date());
    const [listaPacientes, setListaPacientes] = useState([]);
    const [listaMedicos, setListaMedicos] = useState([]);
    const [listaClinicas, setListaClinicas] = useState([]);

    function listarConsultas() {
        axios('http://localhost:5000/api/consultas', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('login-usuario-spmedgp'),
            }
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    setListaConsultas(resposta.data)
                }
            })
            .catch((erro) => console.log(erro));
    }

    function listarPacientes() {
        axios('http://localhost:5000/api/pacientes', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('login-usuario-spmedgp'),
            }
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    setListaPacientes(resposta.data)
                }
            })
            .catch((erro) => console.log(erro));
    }

    function listarMedicos() {
        axios('http://localhost:5000/api/medicos', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('login-usuario-spmedgp'),
            }
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    setListaMedicos(resposta.data)
                }
            })
            .catch((erro) => console.log(erro));
    }

    function listarClinicas() {
        axios('http://localhost:5000/api/clinicas', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('login-usuario-spmedgp'),
            }
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    setListaClinicas(resposta.data)
                }
            })
            .catch((erro) => console.log(erro));
    }

    useEffect(listarConsultas, [])
    useEffect(listarMedicos, [])
    useEffect(listarClinicas, [])
    useEffect(listarPacientes, [])

    return (
        <div>
            <header>
                <div className="grid container-header">
                    <img src={logo} alt="Logo do SP Medical Group" />
                    <div className="box-pesquisa">
                        <button>Home</button>
                        <div>
                            <input placeholder="Busque aqui" type="text" />
                        </div>
                    </div>
                    <img className="user" src={johnDoe} alt=""></img>
                </div>
            </header>
            <main>
                <section className="banner-adm">
                    <div className="banner-container grid">
                        <div>
                            <h1>painel de controle</h1>
                            <div className="abas grid">
                                <nav>
                                    <a href="">Pacientes</a>
                                    <a href="">Médicos</a>
                                    <a href="">Clínicas</a>
                                    <a href="">Consultas</a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="cadastro">
                    <div className="container-cadastro grid">
                        <div className="btn-cadastrar">
                            <button>
                                Cadastrar
                            </button>
                        </div>
                        <div className="box-form">
                            <form action="">
                                <div className="box-cadastro">
                                    <div>
                                        <label for="">Paciente:</label>
                                        <input type="text" />
                                    </div>
                                    <div>
                                        <label for="">Médico:</label>
                                        <input type="text" />
                                    </div>
                                    <div>
                                        <label for="">Clínica:</label>
                                        <input type="text" />
                                    </div>
                                    <div>
                                        <label for="">Data:</label>
                                        <input type="date" />
                                    </div>
                                </div>
                                <div className="buttons-cadastro">
                                    <div>
                                        <button>Cancelar</button>
                                        <button>Concluir</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
                <section className="buscas">
                    <div className="container-buscas grid">
                        <div className="box-buscas">
                            <input placeholder="Procure por aqui" type="text" />
                            <div>

                            </div>
                        </div>
                        <button>Ordenar</button>
                        <button>Filtrar</button>
                    </div>
                </section>
                <section className="lista">
                    <div className="box-lista grid">
                        <div className="status">
                            <div>
                                <p>Agendada</p>
                            </div>
                            <div>
                                <p>1</p>
                            </div>
                        </div>
                        <table className="tabela">
                            <tbody>
                                <tr>
                                    <th>Paciente:</th>
                                    <td>Jane Doe</td>
                                </tr>
                                <tr>
                                    <th>Médico:</th>
                                    <td>John Doe</td>
                                </tr>
                                <tr>
                                    <th>RG do paciente:</th>
                                    <td>1234567-x</td>
                                </tr>
                                <tr>
                                    <th>Telefone do paciente:</th>
                                    <td>1234-5678</td>
                                </tr>
                                <tr>
                                    <th>Endereço do paciente:</th>
                                    <td>Avenida Barão de limeira, N 123</td>
                                </tr>
                                <tr>
                                    <th>Data:</th>
                                    <td>01/01/0001</td>
                                </tr>
                                <tr>
                                    <th>Especialidade do médico:</th>
                                    <td>Ortopedia</td>
                                </tr>
                                <tr>
                                    <th>CRM:</th>
                                    <td>12345</td>
                                </tr>
                                <tr>
                                    <th>Clínica:</th>
                                    <td>Clínica Possarle</td>
                                </tr>
                                <tr>
                                    <th>Descrição da consulta:</th>
                                    <td><textarea disabled name="" id="" cols="30" rows="10">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    </textarea></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="action">
                            <div>
                                <button>Atualizar</button>
                                <button>Deletar</button>
                                <button>Minimizar</button>
                            </div>
                        </div>
                    </div>
                    {
                        listaConsultas.map((consulta) => {
                            console.log(listaConsultas)
                            return (

                                <div className="box-lista2 grid">
                                    <div className="status">
                                        <div>
                                            <p>{consulta.idSituacaoNavigation.situacaoDesc}</p>
                                        </div>
                                        <div>
                                            <p>{consulta.idConsulta}</p>
                                        </div>
                                    </div>
                                    <table className="tabela">
                                        <tbody>
                                            <tr>
                                                <th>Paciente:</th>
                                                <td>{consulta.idPacienteNavigation.nomePaciente}</td>
                                            </tr>
                                            <tr>
                                                <th>Médico:</th>
                                                <td>{consulta.idMedicoNavigation.nomeMedico}</td>
                                            </tr>
                                            <tr>
                                                <th>RG do paciente:</th>
                                                <td>{consulta.idPacienteNavigation.rgPaciente}</td>
                                            </tr>
                                            <tr>
                                                <th>Telefone do paciente:</th>
                                                <td>{consulta.idPacienteNavigation.telPaciente}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="action">
                                        <div>
                                            <button>Atualizar</button>
                                            <button>Deletar</button>
                                            <button>Maximizar</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className="box-lista2 grid">
                        <div className="status">
                            <div>
                                <p>Agendada</p>
                            </div>
                            <div>
                                <p>1</p>
                            </div>
                        </div>
                        <table className="tabela">
                            <tbody>
                                <tr>
                                    <th>Paciente:</th>
                                    <td>Jane Doe</td>
                                </tr>
                                <tr>
                                    <th>Médico:</th>
                                    <td>John Doe</td>
                                </tr>
                                <tr>
                                    <th>RG do paciente:</th>
                                    <td>1234567-x</td>
                                </tr>
                                <tr>
                                    <th>Telefone do paciente:</th>
                                    <td>1234-5678</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="action">
                            <div>
                                <button>Atualizar</button>
                                <button>Deletar</button>
                                <button>Maximizar</button>
                            </div>
                        </div>
                    </div>
                </section>
                <footer>
                    <div className="grid rodape">
                        <span>sp medical group - 2021</span>
                    </div>
                </footer>
            </main>
        </div>
    )
}