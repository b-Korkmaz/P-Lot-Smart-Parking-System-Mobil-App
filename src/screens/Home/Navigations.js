import { View, Text } from 'react-native'
import React from 'react'
import OdemeScreen from './OdemeScreen'
import SignUpScreen from './../Auth/SignUpScreen'

import {createAppContainer} from 'react-navigation'
import { createStackNavigator } from "react-navigation-stack"

const StackNavigator = createStackNavigator({
    OdemeScreen: {
        screen: OdemeScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    SignUpScreen: {
        screen: SignUpScreen,
        navigationOptions: {
            headerShown: false
        }
    },

    
   

});

export default createAppContainer(StackNavigator);