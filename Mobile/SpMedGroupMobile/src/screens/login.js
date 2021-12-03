import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
} from 'react-native';

export default class Login extends Component {
    constructor(props) {
        super(props);
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
                    />
                    <TextInput
                        placeholder="Senha"
                        style={styles.inputs}
                        placeholderTextColor="#AAAAAA"
                    />
                    <TouchableOpacity style={styles.btnEntrar}>
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

    btnEntrar:{
        width: '100%',
        height: 60,
        borderRadius: 10,
        backgroundColor: '#25AEFB',
        alignItems: 'center',
        justifyContent: 'center'
    },

    btnTxt:{
        color: '#FFF',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20
    }
})

