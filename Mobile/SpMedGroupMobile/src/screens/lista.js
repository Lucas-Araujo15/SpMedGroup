import React, { Component } from 'react';

import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Image,
    TextInput,
    ScrollView
} from 'react-native';



export default class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaConsultas: []
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

        const dados = requisicao.data

        this.setState({
            listaConsultas: dados
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
                        <Text style={styles.txtHeader}>Bom dia, John Doe!</Text>
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
                        <View style={styles.Lista}>
                            <FlatList
                                data={this.state.listaConsultas}
                                keyExtractor={item => item.idConsulta}
                                renderItem={this.renderItem}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }

    renderItem = ({ item }) => (
        <View style={styles.boxItem}>
            <View style={styles.boxHeader}>
                <View style={styles.td}>
                    <Text>Médico</Text>
                    <Text>John Doe</Text>
                </View>
                <View>
                    <Text>Especialidade</Text>
                    <Text>Ortopedia</Text>
                </View>
                <View>
                    <Text>Data</Text>
                    <Text>09/11/2021</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    body: {
        alignItems: 'center'
    },

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
        width: '90%'
    },

    abas: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },

    tituloAbas: {
        height: 130,
        justifyContent: 'center'
    },

    btnSelecionado: {
        width: 130,
        height: 39,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        elevation: 8, // Android
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
        width: 361,
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
        
    },

    boxHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '25%'
    },

    td:{
        alignItems: 'center',
        justifyContent:'space-between'
    }

})