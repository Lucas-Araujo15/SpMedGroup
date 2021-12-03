import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
} from 'react-native';

export default class Introducao extends Component {
    constructor(props) {
        super(props);
    }

    Avancar = () => {
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={styles.body}>
                <View>

                </View>
                <View style={styles.vwH1}>
                    <Text style={styles.h1}>
                        Saúde para todas as horas
                    </Text>

                </View>
                <Image
                    source={require('../../assets/img/imgIntro.png')}
                    style={styles.imgIntro}
                />
                <View>
                    <Text style={styles.contentIntro}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin metus.</Text>
                </View>
                <TouchableOpacity onPress={this.Avancar}>
                    <Image
                        source={require('../../assets/img/btnIntro.png')}
                    />
                </TouchableOpacity>

            </View>

        )
    }
}

const styles = StyleSheet.create({

    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },

    imgIntro: {
        width: 400,
        height: 371
    },

    h1: {
        fontFamily: 'Poppins-Bold',
        color: '#000',
        fontSize: 28,
        textAlign: 'center'
    },

    vwH1: {
        width: '90%'
    },

    contentIntro: {
        fontFamily: 'Poppins-Regular',
        fontSize: 17,
        textAlign: 'center',
        color: '#000'
    }
})