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

    function Maximizar(consulta) {
        let divConsulta = document.getElementById(consulta.idConsulta)
        divConsulta.classList.remove('box-lista2')
        divConsulta.classList.add('box-lista')

        for (let i = 5; i <= 10; i++) {
            let infoTabela = document.getElementById('input' + i + consulta.idConsulta)
            infoTabela.style.setProperty('display', 'flex')
        }

        let btnMin = document.getElementById('min' + consulta.idConsulta)
        let btnMax = document.getElementById('max' + consulta.idConsulta)
        btnMax.style.setProperty('display', 'none')
        btnMin.style.setProperty('display', 'block')
    }

    function Minimizar(consulta) {
        let divConsulta = document.getElementById(consulta.idConsulta)
        divConsulta.classList.remove('box-lista')
        divConsulta.classList.add('box-lista2')

        for (let i = 5; i <= 10; i++) {
            let infoTabela = document.getElementById('input' + i + consulta.idConsulta)
            infoTabela.style.setProperty('display', 'none')
        }

        let btnMin = document.getElementById('min' + consulta.idConsulta)
        let btnMax = document.getElementById('max' + consulta.idConsulta)
        btnMin.style.setProperty('display', 'none')
        btnMax.style.setProperty('display', 'block')

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
                    {
                        listaConsultas.map((consulta) => {
                            return (
                                <div id={consulta.idConsulta} className="box-lista2 grid">
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
                                            <tr id={"input1" + consulta.idConsulta}>
                                                <th>Paciente:</th>
                                                <td><input readOnly type="text" className="inputUpdate" name="paciente" value={consulta.idPacienteNavigation.nomePaciente} /></td>
                                            </tr>
                                            <tr id={"input2" + consulta.idConsulta}>
                                                <th>Médico:</th>
                                                <td><input readOnly type="text" className="inputUpdate" name="medico" value={consulta.idMedicoNavigation.nomeMedico} /></td>
                                            </tr>
                                            <tr id={"input3" + consulta.idConsulta}>
                                                <th>RG do paciente:</th>
                                                <td><input readOnly type="text" className="inputUpdate" name="rgPaciente" value={consulta.idPacienteNavigation.rgPaciente} /></td>
                                            </tr>
                                            <tr id={"input4" + consulta.idConsulta}>
                                                <th>Telefone do paciente:</th>
                                                <td><input readOnly type="text" className="inputUpdate" name="telPaciente" value={consulta.idPacienteNavigation.telPaciente} /></td>
                                            </tr>
                                            <tr style={{ display: 'none' }} id={"input5" + consulta.idConsulta}>
                                                <th>Endereço do paciente:</th>
                                                <td><input readOnly type="text" className="inputUpdate" name="endPaciente" value={consulta.idPacienteNavigation.endPaciente} /></td>
                                            </tr>
                                            <tr style={{ display: 'none' }} id={"input6" + consulta.idConsulta}>
                                                <th>Data:</th>
                                                <td><input readOnly type="date" className="inputUpdate" name="data" value={consulta.dataConsulta} /></td>
                                            </tr>
                                            <tr style={{ display: 'none' }} id={"input7" + consulta.idConsulta}>
                                                <th>Especialidade do médico:</th>
                                                <td><input readOnly type="text" className="inputUpdate" name="especialidade" value={consulta.idMedicoNavigation.idEspecialidadeNavigation.nomeEspecialidade} /></td>
                                            </tr>
                                            <tr style={{ display: 'none' }} id={"input8" + consulta.idConsulta}>
                                                <th>CRM:</th>
                                                <td><input readOnly type="text" className="inputUpdate" name="crm" value={consulta.idMedicoNavigation.crm} /></td>
                                            </tr>
                                            <tr style={{ display: 'none' }} id={"input9" + consulta.idConsulta}>
                                                <th>Clínica:</th>
                                                <td><input readOnly type="text" className="inputUpdate" name="clinica" value={consulta.idMedicoNavigation.idClinicaNavigation.nomeFantasia} /></td>
                                            </tr>
                                            <tr style={{ display: 'none' }} id={"input10" + consulta.idConsulta}>
                                                <th>Descrição da consulta:</th>
                                                <td><textarea disabled name="" className="" cols="30" rows="10" value={consulta.consultaDesc}></textarea></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="action">
                                        <div>
                                            <button>Atualizar</button>
                                            <button>Deletar</button>
                                            <button onClick={() => Maximizar(consulta)} id={'max' + consulta.idConsulta}>Maximizar</button>
                                            <button onClick={() => Minimizar(consulta)} style={{ display: 'none' }} id={'min' + consulta.idConsulta}>Minimizar</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
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