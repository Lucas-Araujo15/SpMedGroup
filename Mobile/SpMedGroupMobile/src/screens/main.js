import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Lista from './lista'
import Perfil from './perfil'
import { DrawerContent } from './DrawerContent';

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
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} initialRouteName="Lista"

                screenOptions={{
                    drawerStyle: {
                        backgroundColor: '#25AEFB'
                    },
                }}
            >
                <Drawer.Screen name="Lista" component={Lista} />
                <Drawer.Screen name="Perfil" component={Perfil} />
            </Drawer.Navigator>
        )
    }
}

