import 'react-native-gesture-handler';
import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MobileStepper } from '@mui/material/MobileStepper';

import { StatusBar, StyleSheet, Text } from 'react-native';

import Introducao from './src/screens/introducao';
import Login from './src/screens/login';
import Main from './src/screens/main'


const AuthStack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <StatusBar
          hidden={false}
          backgroundColor="#25AEFB"
        />
        <AuthStack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <AuthStack.Screen name="Introducao" component={Introducao} />
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="Main" component={Main} />

        </AuthStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
