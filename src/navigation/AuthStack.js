import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'
import LoginScreen from '../screens/Auth/LoginScreen';
import ResetPasswordScreen from '../screens/Auth/ResetPasswordScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabStack = () => {
  return (
    <Tab.Navigator 
    initialRouteName="LoginScreen" 
    
    screenOptions={{
      tabBarActiveTintColor:'white',
      tabBarInactiveTintColor:'white',
      tabBarActiveBackgroundColor: '#C673E6',
      tabBarInactiveBackgroundColor: '#C673E6',
           
      style:{
        height:60,
        backgroundColor:'#C673E6',
        padding:20,
      },
      tabBarLabelStyle:{
        textAlign:'center',
        fontSize:18,
      },
      
    }}>
      <Tab.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Giriş',
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="user-shield"
              color={color}
              size={size}
            />

          )
        }}
      />
     
      <Tab.Screen
        name="SignupScreen"
        component={SignUpScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Yeni Üyelik',
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="user-plus"
              color={color}
              size={size}
            />

          )
        }}
      />
      
      <Tab.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Şifreyi Sıfırla',
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="key"
              color={color}
              size={size}
            />

          )
        }}
        
      />
      
      

    </Tab.Navigator>
  )
};


const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabStack">
      <Stack.Screen
        name="BottomTabStack"
        component={BottomTabStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default AuthStack