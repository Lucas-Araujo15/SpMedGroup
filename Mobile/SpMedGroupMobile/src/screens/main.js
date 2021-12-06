import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Lista from './lista'
import Perfil from './perfil'

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
} from 'react-native';

const Drawer = createDrawerNavigator();

export default class Main extends Component {

    render() {
        return (
            <Drawer.Navigator initialRouteName="Lista">
                <Drawer.Screen name="Lista" component={Lista} />
                <Drawer.Screen name="Perfil" component={Perfil} />
            </Drawer.Navigator>
        )
    }
}

