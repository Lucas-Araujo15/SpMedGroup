import React, { Component } from 'react';


import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    ScrollView,
    Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
    DrawerContentScrollView, DrawerItem
} from '@react-navigation/drawer'
import { height, width } from '@mui/system';


export function DrawerContent(props) {
    return (
        <View style={styles.bodyContent}>
            <View style={styles.boxUser} >
                <Image
                    source={require('../../assets/img/john-doe.jpg')}
                    style={styles.imgDrawer}
                />
                <View>
                    <Text style={styles.txtNome}>John Doe</Text>
                    <Text style={styles.txtEmail}>johndoe@email.com</Text>
                </View>
            </View>
            <View style={styles.boxDrawerItems}>
                <View>
                    <DrawerItem
                        style={styles.drawerItem}

                        labelStyle={{
                            color: '#fff'
                        }}
                    
                        icon={({ }) => (
                            <Icon name="Consultas" color='#fff' size={18} name='list' />
                        )}
                        label='Consultas'
                        onPress={() => { props.navigation.navigate('Lista') }}

                    />
                    <DrawerItem
                        style={styles.drawerItem}
                        labelStyle={{
                            color: '#fff'
                        }}
                        drawerActiveBackgroundColo='#7ED1FF'
                        drawerInactiveBackgroundColo='#7ED1FF'
                        icon={({ }) => (
                            <Icon name="home" size={18} color='#fff' name='user-o' />
                        )}
                        label='Perfil'
                        onPress={() => { props.navigation.navigate('Perfil') }}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imgDrawer: {
        width: 56,
        height: 56,
        borderRadius: 5,
        marginRight: 15
    },

    bodyContent: {
        paddingVertical: 30,
        paddingHorizontal: 15
    },

    txtNome: {
        fontFamily: 'Poppins-Bold',
        color: '#FFF',
        fontSize: 18
    },

    txtEmail: {
        fontFamily: 'Poppins-Regular',
        color: '#EEE',
        fontSize: 13
    },

    boxUser: {
        width: '100%',
        flexDirection: 'row',
    },

    drawerItem: {
        width: '90%',

    },

    boxDrawerItems: {
        marginTop: 20,
        width: '100%',
        height: '100%'
    }

})