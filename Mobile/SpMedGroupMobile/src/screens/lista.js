import React, { Component } from 'react';
import jwt_decode from "jwt-decode";

import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    ScrollView,
    Image,
    Modal
} from 'react-native';



export default class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaConsultas: [],
            usuarioAtual: 0,
            modalVisible: false,
            consultaSelecionada: []
        }
    }

    ListarConsultas = async () => {
        const token = await AsyncStorage.getItem('senai-SpMedicalGroup-chave-autenticacao')
        console.warn(token)



        const requisicao = await api.get('/consultas/minhas', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })

        const user = jwt_decode(token)
        // console.warn(user)

        const dados = requisicao.data

        this.setState({
            listaConsultas: dados,
            usuarioAtual: user.role
        })
    }

    MostrarModal = async (idConsulta) => {

        this.setState({
            consultaSelecionada: []
        })
        //console.warn(teste)

        let consulta = this.state.listaConsultas.filter(modalConsulta => {
            return modalConsulta.idConsulta == idConsulta
        })


        await this.setState({
            modalVisible: true,
            consultaSelecionada: consulta[0]
        })
        //[].idPacienteNavigation -> X

        //[0] -> {}

        //{}.idPacienteNavigation -> V

        //console.warn(this.state.consultaSelecionada)
    }

    componentDidMount() {
        this.ListarConsultas()
    }

    render() {
        return (
            <ScrollView >
                <Modal
                    animationType={'slide'}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({ modalVisible: false })
                    }}
                    transparent={true}
                    statusBarTranslucent={true}
                >
                    <View style={styles.bodyModal}>
                        <View style={styles.boxModal}>
                            {
                                this.state.modalVisible === true ?
                                    <View>
                                        <View style={styles.modalSair}>
                                            <TouchableOpacity onPress={() => this.setState({ modalVisible: false })}>
                                                <Icon name="close" size={25} color='#000' name='close' />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.containerInfoModal}>
                                            <View style={styles.infoModal}>
                                                <Text style={styles.thModal}>Paciente: </Text>
                                                <Text style={styles.tdModal}>{this.state.consultaSelecionada.idPacienteNavigation.nomePaciente}</Text>
                                            </View>
                                            <View style={styles.infoModal}>
                                                <Text style={styles.thModal}>RG do paciente: </Text>
                                                <Text style={styles.tdModal}>{this.state.consultaSelecionada.idPacienteNavigation.rgPaciente}</Text>
                                            </View>
                                            <View style={styles.infoModal}>
                                                <Text style={styles.thModal}>Data: </Text>
                                                <Text style={styles.tdModal}>
                                                    {Intl.DateTimeFormat("pt-BR", {
                                                        year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',
                                                        hour12: false
                                                    }).format(new Date(this.state.consultaSelecionada.dataConsulta))}
                                                </Text>
                                            </View>
                                            <View >
                                                <Text style={styles.thModal}>Endereço do paciente: </Text>
                                                <Text style={styles.tdModal}>{this.state.consultaSelecionada.idPacienteNavigation.endPaciente}</Text>
                                            </View>
                                            <View style={styles.infoModal}>
                                                <Text style={styles.thModal}>Telefone do paciente: </Text>
                                                <Text style={styles.tdModal}>{this.state.consultaSelecionada.idPacienteNavigation.telPaciente}</Text>
                                            </View>
                                            <View style={styles.infoModal}>
                                                <Text style={styles.thModal}>Clínica: </Text>
                                                <Text style={styles.tdModal}>{this.state.consultaSelecionada.idMedicoNavigation.idClinicaNavigation.nomeFantasia}</Text>
                                            </View>
                                            <View style={styles.modalDesc}>
                                                <Text style={styles.thModal}>Descrição da consulta: </Text>
                                                <Text style={styles.tdModalDesc}>{this.state.consultaSelecionada.consultaDesc}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    : null
                            }
                        </View>
                    </View>
                </Modal>
                <View style={styles.body}>
                    <View style={styles.header}>
                        <View style={styles.containerHeader}>
                            <View style={styles.viewHeader}>
                                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                                    <Icon name="home" size={30} color='#fff' name='bars' />
                                </TouchableOpacity>
                                <Image
                                    source={require('../../assets/img/john-doe.jpg')}
                                    style={styles.imgDrawer}
                                />
                            </View>
                            <View style={styles.viewHeader}>
                                <Text style={styles.txtHeader}>Bem vindo!</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.main}>
                        <View style={styles.tituloAbas}>
                            <Text style={styles.tituloPagina}>Consultas</Text>
                            <View style={styles.abas}>
                                <TouchableOpacity style={styles.btnSelecionado}><Text style={styles.txtAbas}>Em andamento</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.btnNaoSelecionado}><Text>Realizadas</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.btnNaoSelecionado}><Text>Canceladas</Text></TouchableOpacity>
                            </View>
                        </View>

                        <FlatList
                            contentContainerStyle={styles.listaConteudo}
                            data={this.state.listaConsultas}
                            keyExtractor={item => item.idConsulta}
                            renderItem={this.renderItem}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }



    renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.MostrarModal(item.idConsulta)}
        >
            <View style={styles.boxItem}>
                <View style={styles.boxHeader}>
                    <View style={styles.td}>{
                        this.state.usuarioAtual == 2 ? <Text adjustsFontSizeToFit={true} style={styles.tdTxt}>Médico</Text> : <Text style={styles.tdTxt}>Paciente</Text>
                    }
                        {
                            this.state.usuarioAtual == 2 ? <Text adjustsFontSizeToFit={true} style={styles.valorConsulta}>{item.idMedicoNavigation.nomeMedico}</Text> : <Text style={styles.valorConsulta}>{item.idPacienteNavigation.nomePaciente}</Text>
                        }
                    </View>
                    <View style={styles.td}>
                        {
                            this.state.usuarioAtual == 2 ? <Text adjustsFontSizeToFit={true} style={styles.tdTxt}>Especialidade</Text> : <Text style={styles.tdTxt}>RG do paciente</Text>
                        }
                        {
                            this.state.usuarioAtual == 2 ? <Text adjustsFontSizeToFit={true} style={styles.valorConsulta}>{item.idMedicoNavigation.idEspecialidadeNavigation.nomeEspecialidade}</Text> : <Text style={styles.valorConsulta}>{item.idPacienteNavigation.rgPaciente}</Text>
                        }

                    </View>
                    <View style={styles.td}>
                        <Text style={styles.tdTxt}>Data</Text>
                        <Text style={styles.valorConsulta}>{Intl.DateTimeFormat("pt-BR", {
                            year: 'numeric', month: 'numeric', day: 'numeric'
                        }).format(new Date(item.dataConsulta))}
                        </Text>
                    </View>
                </View>
                <View style={styles.containerDesc}>
                    <View style={styles.boxDesc}>
                        <Text style={styles.tdTxt}>Descrição:</Text>
                        <Text style={styles.descTxt}>{item.consultaDesc} </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    body: {
        justifyContent: 'center'
    },

    header: {
        backgroundColor: '#25AEFB',
        width: '100%',
        height: 135,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },

    txtHeader: {
        fontFamily: 'Poppins-Regular',
        fontSize: 26,
        color: '#FFFFFF'
    },

    tituloPagina: {
        fontFamily: 'Poppins-Bold',
        color: '#000',
        fontSize: 26,
        marginBottom: 10
    },

    main: {
        width: '100%',
        alignItems: 'center'
    },

    abas: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },

    tituloAbas: {
        height: 130,
        justifyContent: 'center',
        width: '90%'
    },

    btnSelecionado: {
        width: 130,
        height: 39,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        backgroundColor: '#fff',
        elevation: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 5
    },

    txtAbas: {
        fontFamily: 'Poppins-Bold',
        color: '#000',
        fontSize: 14
    },

    btnNaoSelecionado: {
        width: 75,
        height: 39,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },

    boxItem: {
        alignItems: 'center',
        height: 205,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 4,
        shadowRadius: 4,
        backgroundColor: '#fff',
        elevation: 8,
        marginBottom: 20,
        marginTop: 20,
        borderRadius: 20,
        alignItems: 'center',

    },

    boxHeader: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: '35%',
        width: '100%',
    },

    td: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    tdTxt: {
        fontFamily: 'Poppins-Regular',
        color: '#838383',
        fontSize: 14
    },

    valorConsulta: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        color: '#000'
    },

    containerDesc: {
        width: '90%',
        height: '55%',
        borderTopWidth: 2,
        borderColor: '#E3E3E3',
        justifyContent: 'flex-end'

    },

    boxDesc: {
        height: '90%',
    },

    descTxt: {
        fontFamily: 'Poppins-Regular',
        color: '#000',
        fontSize: 14
    },

    listaConteudo: {
        width: '100%',
        paddingHorizontal: '5%'
    },

    viewHeader: {
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
    },

    containerHeader: {
        alignItems: 'center',
    },

    imgDrawer: {
        width: 40,
        height: 40,
        borderRadius: 5
    },

    bodyModal: {
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.21);'
    },

    boxModal: {
        padding: '3%',
        height: '85%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },

    modalSair: {
        width: '100%',
        alignItems: 'flex-end'
    },

    infoModal: {
        flexDirection: 'row',

    },

    containerInfoModal: {
        justifyContent: 'space-between',
        height: '95%',
        width: '100%'
    },

    thModal: {
        fontFamily: 'Poppins-Bold',
        fontSize: 17,
        color: '#000'
    },

    tdModal: {
        fontFamily: 'Poppins-Regular',
        fontSize: 17,
        color: '#000'
    },

    modalDesc: {
        borderTopWidth: 2,
        borderColor: '#E3E3E3',
        height: '40%',
        justifyContent: 'flex-end'
    },

    tdModalDesc: {
        height: '75%'
    }
})