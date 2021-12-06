import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
} from 'react-native';

import api from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'roberto.possarle@spmedicalgroup.com.br',
            senha: 'roJKL123'
        }
    }


    Logar = async () => {
        const requisicao = await api.post('/login', {
            email: this.state.email,
            senha: this.state.senha
        })

        const token = requisicao.data.token

        AsyncStorage.setItem('senai-SpMedicalGroup-chave-autenticacao', token)


        if (requisicao.status == 200) {
            this.props.navigation.navigate('Main')
            
        }


    }

    render() {
        return (
            <View style={styles.bodyLogin}>
                <View style={styles.viewTxt}>
                    <Text style={styles.txtLogin}>{'entre!'.toUpperCase()}</Text>
                </View>
                <Image
                    source={require('../../assets/img/imgLogin.png')}
                    style={styles.imgLogin}
                />
                <View style={styles.vwInputs}>
                    <TextInput style={styles.inputs}
                        placeholder="E-mail"
                        placeholderTextColor="#AAAAAA"
                        onChangeText={email => this.setState({ email })}
                    />
                    <TextInput
                        placeholder="Senha"
                        style={styles.inputs}
                        placeholderTextColor="#AAAAAA"
                        onChangeText={senha => this.setState({ senha })}
                    />
                    <TouchableOpacity onPress={this.Logar} style={styles.btnEntrar}>
                        <Text style={styles.btnTxt}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    bodyLogin: {
        flex: 1,
        alignItems: 'center'
    },

    viewTxt: {
        width: '90%',
    },

    txtLogin: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 30,
        color: '#25AEFB'
    },

    imgLogin: {
        width: 380,
        height: 371
    },

    vwInputs: {
        marginTop: 20,
        width: '90%',
        justifyContent: 'space-between',
        height: 210
    },

    inputs: {
        width: '100%',
        backgroundColor: '#E7E7E7',
        height: 60,
        borderRadius: 10,
        paddingLeft: 10
    },

    btnEntrar: {
        width: '100%',
        height: 60,
        borderRadius: 10,
        backgroundColor: '#25AEFB',
        alignItems: 'center',
        justifyContent: 'center'
    },

    btnTxt: {
        color: '#FFF',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20
    }
})

