import React, { useState, useEffect } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import api from "../../services/api";
import '../../assets/styles/adm.css'
import logo from '../../assets/img/logo_spmedgroup_v1 1.png'
import johnDoe from '../../assets/img/john-doe.jpg'
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";

//import Select from 'react-select'

function PainelControle(props) {
    const [listaConsultas, setListaConsultas] = useState([]);
    const [listaSituacoes, setListaSituacoes] = useState([]);
    const [idPaciente, setPaciente] = useState(0);
    const [idMedico, setMedico] = useState(0);
    const [idSituacao, setSituacao] = useState(0);
    const [data, setData] = useState(new Date());
    const [listaPacientes, setListaPacientes] = useState([]);
    const [listaMedicos, setListaMedicos] = useState([]);
    const [listaLocalizacoes, setListaLocalizacoes] = useState([])

    const history = useHistory()


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

    function Logout() {
        localStorage.removeItem('login-usuario-spmedgp')
        history.push('/login')
    }

    function atualizar(consulta) {
        let dadosAtualizados = {
            idMedico: idMedico,
            idPaciente: idPaciente,
            idSituacao: idSituacao,
            dataConsulta: data
        }

        api.put('/consultas/' + consulta.idConsulta, dadosAtualizados, {
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

    function listarLocalizacoes() {
        api.get("/localizacoes", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('login-usuario-spmedgp'),
            }
        })

            .then((resposta) => {
                if (resposta.status == 200) {
                    setListaLocalizacoes(resposta.data)
                }
            })

            .catch((erro) => console.log(erro))


        console.log(listaLocalizacoes)
    }

    function CadastrarLocalizacoes() {
        let ultimoCadastro = listaConsultas[listaConsultas.length - 1]
        console.log(ultimoCadastro)
        let endereco = ultimoCadastro.idPacienteNavigation.endPaciente
        let enderecoRequest = endereco.split(" ").join("+")

        var latitude
        var longitude

        axios("https://maps.googleapis.com/maps/api/geocode/json?address=" + enderecoRequest + "&key=AIzaSyAxKlkKTaI4vfTRlaXLneNrXTF9ofKuZrI")
            .then((resposta) => {
                if (resposta.status === 200) {
                    latitude = resposta.data.results[0].geometry.location.lat
                    longitude = resposta.data.results[0].geometry.location.lng
                }

                console.log(latitude)

                let localizacao = {
                    Latitude: latitude,
                    Longitude: longitude,
                    Descricao: ultimoCadastro.descricaoConsulta,
                    IdConsulta: ultimoCadastro.idConsulta.toString(),
                    EspecialidadeMedico: ultimoCadastro.idMedicoNavigation.idEspecialidadeNavigation.nomeEspecialidade
                }

                api.post("/localizacoes", localizacao, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('login-usuario-spmedgp'),
                    }
                })

                    .then(listarLocalizacoes())
            })




        /* api.get('/pacientes/' + idPaciente, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('login-usuario-spmedgp'),
            }
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    setLocalPaciente(resposta.data)
                }
            })

            .catch((erro) => console.log(erro))

        api.get('/medicos/' + idMedico, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('login-usuario-spmedgp'),
            }
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    setLocalMedico(resposta.data)
                }
            })

            .catch((erro) => console.log(erro))

        console.log("foi")
        console.log(localPaciente)
        let endereco = localPaciente.endPaciente

        let enderecoRequest = endereco.split(" ").join("+")

        let latitude
        let longitude

        axios("https://maps.googleapis.com/maps/api/geocode/json?address=" + enderecoRequest + "&key=AIzaSyAxKlkKTaI4vfTRlaXLneNrXTF9ofKuZrI")
            .then((resposta) => {
                if (resposta.status === 200) {
                    latitude = resposta.data.results.geometry.location.lat.toString()
                    longitude = resposta.data.results.geometry.location.lng.toString()
                }
            })

        let localizacao = {
            Latitude: latitude,
            Longitude: longitude,
            Descricao: consultaRecente.descricaoConsulta,
            IdConsulta: consultaRecente.idConsulta.toString(),
            EspecialidadeMedico: localMedico.IdEspecialidadeNavigation.NomeEspecialidade[0]
        }

        api.post("/localizacoes", localizacao, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('login-usuario-spmedgp'),
            }
        })

        listaLocalizacoes() */
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

        let modal = document.getElementById('myModal')
        let btnConfModal = document.getElementById('confirmaDel')
        let btnCanModal = document.getElementById('cancelaDel')

        modal.style.setProperty('display', 'block')

        btnConfModal.onclick = function () {
            api.delete('/consultas/' + id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('login-usuario-spmedgp'),
                },
            })
                .catch((erro) => {
                    console.log(erro)
                })

                .then(listarConsultas)

            modal.style.setProperty('display', 'none')
        }

        btnCanModal.onclick = function () {
            modal.style.setProperty('display', 'none')
        }
    }

    function cadastrar(event) {

        event.preventDefault();

        let consulta = {
            idMedico: idMedico,
            idPaciente: idPaciente,
            idSituacao: idSituacao,
            dataConsulta: data
        }

        api.post('/consultas', consulta, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('login-usuario-spmedgp'),
            },
        })
            .catch((erro) => {
                console.log(erro)
            })

            .then(listarConsultas)

            .then(CadastrarLocalizacoes)

            .then(limparStates)


    }


    function listarConsultas() {
        api.get('/consultas', {
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

        console.log(listaConsultas)
    }

    function listarPacientes() {
        api.get('/pacientes', {
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
        api.get('/medicos', {
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
        api.get('/situacoes', {
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

    useEffect(listarLocalizacoes, [])
    useEffect(listarConsultas, [])
    useEffect(listarPacientes, [])
    useEffect(listarMedicos, [])
    useEffect(listarSituacoes, [])

    return (
        <div>
            <header>
                <div className="grid container-header">
                    <Link to="/"> <img src={logo} alt="" /></Link>
                    <div className="box-pesquisa">
                        <button onClick={Logout}>Logout</button>
                        <div>
                            <input placeholder="Busque aqui" type="text" />
                        </div>
                    </div>
                    <img className="user" src={johnDoe} alt=""></img>
                </div>
            </header>
            <main>
                <div style={{ display: 'none' }} id="myModal" class="modal">
                    <div class="modal-content">
                        <div>Tem certeza de que deseja deletar essa consulta?</div>
                        <p>A opera????o ser?? permanente e n??o ser?? poss??vel recuperar os dados.</p>
                        <div>
                            <div>
                                <button id='cancelaDel' >Cancelar</button>
                                <button id='confirmaDel'>Prosseguir</button>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="banner-adm">
                    <div className="banner-container grid">
                        <div>
                            <h1>painel de controle</h1>
                            <div className="abas grid">
                                <nav>
                                    <a href="">Pacientes</a>
                                    <a href="">M??dicos</a>
                                    <a href="">Cl??nicas</a>
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
                                        <label for="">M??dico:</label>
                                        <select onChange={m => medicoEscolhido(m)} value={idMedico} name="" id="">
                                            <option value="0" selected disabled>Selecione um m??dico</option>
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
                                        <label for="">Situa????o:</label>
                                        <select onChange={s => situacaoEscolhida(s)} name="" id="">
                                            <option value="0" selected disabled>Selecione uma situa????o</option>
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
                                        <input type="datetime-local" onChange={d => dataEscolhida(d)} />
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
                <section className="data">
                    <h2>consultas</h2>
                    <div className="mapa">
                        <Map
                            google={props.google}
                            zoom={12}
                            initialCenter={{ lat: -23.53642760296254, lng: -46.64621432441258 }}
                        >
                            {
                                listaLocalizacoes.map((local) => {
                                    return (
                                        <Marker
                                            position={{ lat: local.latitude, lng: local.longitude }} />
                                    )
                                })
                            }

                        </Map>
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
                                                <th>M??dico:</th>
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
                                                <th>Endere??o do paciente:</th>
                                                <td>{consulta.idPacienteNavigation.endPaciente}</td>
                                            </tr>
                                            <tr style={{ display: 'none' }} id={"input6" + consulta.idConsulta}>
                                                <th>Data:</th>
                                                <td><p>{Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                                    hour: 'numeric', minute: 'numeric'
                                                }).format(new Date(consulta.dataConsulta))}</p>
                                                    <input id={'data' + consulta.idConsulta} style={{ display: 'none' }} type="date" onChange={d => dataEscolhida(d)} name="data" /></td>
                                            </tr>
                                            <tr style={{ display: 'none' }} id={"input7" + consulta.idConsulta}>
                                                <th>Especialidade do m??dico:</th>
                                                <td>{consulta.idMedicoNavigation.idEspecialidadeNavigation.nomeEspecialidade}</td>
                                            </tr>
                                            <tr style={{ display: 'none' }} id={"input8" + consulta.idConsulta}>
                                                <th>CRM:</th>
                                                <td>{consulta.idMedicoNavigation.crm}</td>
                                            </tr>
                                            <tr style={{ display: 'none' }} id={"input9" + consulta.idConsulta}>
                                                <th>Cl??nica:</th>
                                                <td>{consulta.idMedicoNavigation.idClinicaNavigation.nomeFantasia}</td>
                                            </tr>
                                            <tr style={{ display: 'none' }} id={"input10" + consulta.idConsulta}>
                                                <th>Descri????o da consulta:</th>
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

export default GoogleApiWrapper({
    apiKey: ("AIzaSyAxKlkKTaI4vfTRlaXLneNrXTF9ofKuZrI")
})(PainelControle)