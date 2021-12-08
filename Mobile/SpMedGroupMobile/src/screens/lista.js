import React, { Component } from 'react';
import jwt_decode from "jwt-decode";

import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    ScrollView
} from 'react-native';



export default class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaConsultas: [],
            usuarioAtual: 0
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

    componentDidMount() {
        this.ListarConsultas()
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.body}>
                    <View style={styles.header}>
                        <Text style={styles.txtHeader}>Bem vindo!</Text>
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
    )
}

const styles = StyleSheet.create({


    header: {
        backgroundColor: '#25AEFB',
        width: '100%',
        height: 80,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'center',
        paddingLeft: 20,
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
        alignItems: 'center'

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

    listaConteudo:{
        width: '90%',
    }
})