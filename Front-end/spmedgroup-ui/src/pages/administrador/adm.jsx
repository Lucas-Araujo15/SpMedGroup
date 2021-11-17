import { useState, useEffect } from "react";
import axios from 'axios';
import '../../assets/styles/adm.css'
import logo from '../../assets/img/logo_spmedgroup_v1 1.png'
import johnDoe from '../../assets/img/john-doe.jpg'
//import Select from 'react-select'

export default function PainelControle() {
    const [listaConsultas, setListaConsultas] = useState([]);
    const [listaSituacoes, setListaSituacoes] = useState([]);
    const [idPaciente, setPaciente] = useState(0);
    const [idMedico, setMedico] = useState(0);
    const [idSituacao, setSituacao] = useState(0);
    const [data, setData] = useState(new Date());
    const [listaPacientes, setListaPacientes] = useState([]);
    const [listaMedicos, setListaMedicos] = useState([]);

    const medicoEscolhido = (medico) => {
        setMedico(medico.target.value)
    }

    const pacienteEscolhido = (paciente) => {
        setPaciente(paciente.target.value)
    }

    const situacaoEscolhida = (situacao) => {
        setSituacao(situacao.target.value)
    }

    const dataEscolhida = (data) => {
        setData(data.target.value)
    }

    const limparStates = () => {
        setMedico(0)
        setPaciente(0)
        setSituacao(0)
        setData(new Date())
    }

    function atualizar(consulta) {
        let dadosAtualizados = {
            idMedico: idMedico,
            idPaciente: idPaciente,
            idSituacao: idSituacao,
            dataConsulta: data
        }

        axios.put('http://localhost:5000/api/consultas/' + consulta.idConsulta, dadosAtualizados, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('login-usuario-spmedgp'),
            },
        })
            .catch((erro) => {
                console.log(erro)
            })

            .then(listarConsultas)

            .then(limparStates)

            .then(Minimizar(consulta))
    }

    function manipular(consulta) {
        Maximizar(consulta)
        var consultaUpdate = document.getElementById(consulta.idConsulta)
        let btnMin = document.getElementById('min' + consulta.idConsulta)
        let btnMax = document.getElementById('max' + consulta.idConsulta)
        let btnAtualizar = document.getElementById('atualizar' + consulta.idConsulta)
        let btnDeletar = document.getElementById('deletar' + consulta.idConsulta)
        let btnCancelar = document.getElementById('cancelar' + consulta.idConsulta)
        let btnConcluir = document.getElementById('concluir' + consulta.idConsulta)
        let inputData = document.getElementById('data' + consulta.idConsulta)

        inputData.style.setProperty('display', 'block')
        btnMin.style.setProperty('display', 'none')
        btnMax.style.setProperty('display', 'none')
        btnAtualizar.style.setProperty('display', 'none')
        btnDeletar.style.setProperty('display', 'none')

        setMedico(consulta.idMedico)
        setPaciente(consulta.idPaciente)
        setSituacao(consulta.idSituacao)
        setData(consulta.dataConsulta)

        btnCancelar.style.setProperty('display', 'block')
        btnConcluir.style.setProperty('display', 'block')

        consultaUpdate.classList.remove('fecharAtualizar')
        consultaUpdate.classList.add('atualizar')
    }

    function deletar(id) {
        axios.delete('http://localhost:5000/api/consultas/' + id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('login-usuario-spmedgp'),
            },
        })
            .catch((erro) => {
                console.log(erro)
            })

            .then(listarConsultas)

    }

    function cadastrar(event) {

        event.preventDefault();

        let consulta = {
            idMedico: idMedico,
            idPaciente: idPaciente,
            idSituacao: idSituacao,
            dataConsulta: data
        }

        axios.post('http://localhost:5000/api/consultas', consulta, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('login-usuario-spmedgp'),
            },
        })
            .catch((erro) => {
                console.log(erro)
            })

            .then(listarConsultas)

            .then(limparStates)
    }


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

            .catch((erro) => console.log(erro))
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

        console.log(listaConsultas)

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

    function listarSituacoes() {
        axios('http://localhost:5000/api/situacoes', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('login-usuario-spmedgp'),
            }
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    setListaSituacoes(resposta.data)
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
        divConsulta.classList.remove('atualizar')
        divConsulta.classList.add('fecharAtualizar')
        divConsulta.classList.add('box-lista2')
        limparStates()

        for (let i = 5; i <= 10; i++) {
            let infoTabela = document.getElementById('input' + i + consulta.idConsulta)
            infoTabela.style.setProperty('display', 'none')
        }

        let btnMin = document.getElementById('min' + consulta.idConsulta)
        let btnMax = document.getElementById('max' + consulta.idConsulta)
        let inputData = document.getElementById('data' + consulta.idConsulta)

        inputData.style.setProperty('display', 'none')
        btnMin.style.setProperty('display', 'none')
        btnMax.style.setProperty('display', 'block')

        let btnAtualizar = document.getElementById('atualizar' + consulta.idConsulta)
        let btnDeletar = document.getElementById('deletar' + consulta.idConsulta)
        let btnCancelar = document.getElementById('cancelar' + consulta.idConsulta)
        let btnConcluir = document.getElementById('concluir' + consulta.idConsulta)

        btnAtualizar.style.setProperty('display', 'block')
        btnDeletar.style.setProperty('display', 'block')
        btnCancelar.style.setProperty('display', 'none')
        btnConcluir.style.setProperty('display', 'none')

    }

    useEffect(listarConsultas, [])
    useEffect(listarPacientes, [])
    useEffect(listarMedicos, [])
    useEffect(listarSituacoes, [])

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
                            <form onSubmit={c => cadastrar(c)}>
                                <div className="box-cadastro">
                                    <div>
                                        <label for="">Paciente:</label>

                                        <select onChange={p => pacienteEscolhido(p)} name="" id="">
                                            <option value="0" selected disabled>Selecione um paciente</option>
                                            {
                                                listaPacientes.map((paciente) => {
                                                    return (
                                                        <option value={paciente.idPaciente}>{paciente.nomePaciente}</option>
                                                    )
                                                })
                                            }

                                        </select>
                                    </div>
                                    <div>
                                        <label for="">Médico:</label>
                                        <select onChange={m => medicoEscolhido(m)} value={idMedico} name="" id="">
                                            <option value="0" selected disabled>Selecione um médico</option>
                                            {
                                                listaMedicos.map((medico) => {
                                                    return (
                                                        <option value={medico.idMedico}>{medico.nomeMedico}</option>
                                                    )
                                                })
                                            }

                                        </select>
                                    </div>
                                    <div>
                                        <label for="">Situação:</label>
                                        <select onChange={s => situacaoEscolhida(s)} name="" id="">
                                            <option value="0" selected disabled>Selecione uma situação</option>
                                            {
                                                listaSituacoes.map((situacao) => {

                                                    return (
                                                        <option value={situacao.idSituacao}>{situacao.situacaoDesc}</option>
                                                    )
                                                })
                                            }
                                        </select>

                                    </div>
                                    <div>
                                        <label for="">Data:</label>
                                        <input type="date" onChange={d => dataEscolhida(d)} />
                                    </div>
                                </div>
                                <div className="buttons-cadastro">
                                    <div>
                                        <button>Cancelar</button>
                                        <button type='submit'>Concluir</button>
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
                                <div key={consulta.idConsulta} id={consulta.idConsulta} className="box-lista2 grid fecharAtualizar">
                                    <div className="status">
                                        <div>
                                            <p>{consulta.idSituacaoNavigation.situacaoDesc}</p>

                                            <select onChange={s => situacaoEscolhida(s)} name="" id="">
                                                <option value={consulta.idSituacao} selected disabled>{consulta.idSituacaoNavigation.situacaoDesc}</option>
                                                {
                                                    listaSituacoes.map((situacao) => {

                                                        return (
                                                            <option value={situacao.idSituacao}>{situacao.situacaoDesc}</option>
                                                        )
                                                    })
                                                }
                                            </select>

                                        </div>
                                        <div>
                                            <p>{consulta.idConsulta}</p>
                                        </div>
                                    </div>
                                    <table className="tabela">
                                        <tbody>
                                            <tr id={"input1" + consulta.idConsulta}>
                                                <th>Paciente:</th>
                                                <td><p>{consulta.idPacienteNavigation.nomePaciente}</p>

                                                    <select onChange={p => pacienteEscolhido(p)} name="" id="">
                                                        <option value={consulta.idPaciente} selected disabled>{consulta.idPacienteNavigation.nomePaciente}</option>
                                                        {
                                                            listaPacientes.map((paciente) => {
                                                                return (
                                                                    <option value={paciente.idPaciente}>{paciente.nomePaciente}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>

                                                </td>
                                            </tr>
                                            <tr id={"input2" + consulta.idConsulta}>
                                                <th>Médico:</th>
                                                <td><p>{consulta.idMedicoNavigation.nomeMedico}</p>

                                                    <select onChange={m => medicoEscolhido(m)} name="" id="">
                                                        <option value={consulta.idMedico} selected disabled>{consulta.idMedicoNavigation.nomeMedico}</option>
                                                        {
                                                            listaMedicos.map((medico) => {
                                                                return (
                                                                    <option value={medico.idMedico}>{medico.nomeMedico}</option>
                                                                )
                                                            })
                                                        }

                                                    </select>

                                                </td>
                                            </tr>
                                            <tr id={"input3" + consulta.idConsulta}>
                                                <th>RG do paciente:</th>
                                                <td>{consulta.idPacienteNavigation.rgPaciente}</td>
                                            </tr>
                                            <tr id={"input4" + consulta.idConsulta}>
                                                <th>Telefone do paciente:</th>
                                                <td>{consulta.idPacienteNavigation.telPaciente}</td>
                                            </tr>
                                            <tr style={{ display: 'none' }} id={"input5" + consulta.idConsulta}>
                                                <th>Endereço do paciente:</th>
                                                <td>{consulta.idPacienteNavigation.endPaciente}</td>
                                            </tr>
                                            <tr style={{ display: 'none' }} id={"input6" + consulta.idConsulta}>
                                                <th>Data:</th>
                                                <td><p>{Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                                    hour: 'numeric', minute: 'numeric'
                                                }).format(new Date(consulta.dataConsulta))}</p>
                                                    <input id={'data' + consulta.idConsulta}style={{ display: 'none' }} type="date" onChange={d => dataEscolhida(d)} name="data" /></td>
                                            </tr>
                                            <tr style={{ display: 'none' }} id={"input7" + consulta.idConsulta}>
                                                <th>Especialidade do médico:</th>
                                                <td>{consulta.idMedicoNavigation.idEspecialidadeNavigation.nomeEspecialidade}</td>
                                            </tr>
                                            <tr style={{ display: 'none' }} id={"input8" + consulta.idConsulta}>
                                                <th>CRM:</th>
                                                <td>{consulta.idMedicoNavigation.crm}</td>
                                            </tr>
                                            <tr style={{ display: 'none' }} id={"input9" + consulta.idConsulta}>
                                                <th>Clínica:</th>
                                                <td>{consulta.idMedicoNavigation.idClinicaNavigation.nomeFantasia}</td>
                                            </tr>
                                            <tr style={{ display: 'none' }} id={"input10" + consulta.idConsulta}>
                                                <th>Descrição da consulta:</th>
                                                <td><textarea disabled name="" className="" cols="30" rows="10" value={consulta.consultaDesc}></textarea></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="action">
                                        <div>
                                            <button onClick={() => manipular(consulta)} id={'atualizar' + consulta.idConsulta}>Atualizar</button>
                                            <button onClick={() => deletar(consulta.idConsulta)} id={'deletar' + consulta.idConsulta}>Deletar</button>
                                            <button onClick={() => Maximizar(consulta)} id={'max' + consulta.idConsulta}>Maximizar</button>
                                            <button onClick={() => Minimizar(consulta)} style={{ display: 'none' }} id={'min' + consulta.idConsulta}>Minimizar</button>
                                            <button onClick={() => Minimizar(consulta)} style={{ display: 'none' }} id={'cancelar' + consulta.idConsulta}>Cancelar</button>
                                            <button onClick={() => atualizar(consulta)} style={{ display: 'none' }} id={'concluir' + consulta.idConsulta}>Concluir</button>
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