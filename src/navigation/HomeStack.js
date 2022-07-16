import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'
import HomeScreen from '../screens/Home/HomeScreen'
import ProfilScreen from '../screens/Home/ProfilScreen'
import OdemeScreen from '../screens/Home/OdemeScreen'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



const BottomTabStack = () => {
  return (

    <Tab.Navigator 
    initialRouteName="HomeScreen" 
    screenOptions={{
      tabBarActiveTintColor:'#C673E6',
      tabBarInactiveTintColor:'#aaa',
      style:{
        height:60,
        backgroundColor:'#aaa',
        padding:20,
      },
      tabBarLabelStyle:{
        textAlign:'center',
        fontSize:18,
      },
    }}>
      
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        
        options={{
          headerShown: false,
          tabBarLabel: 'Ana Sayfa',
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="home"
              color={color}
              size={size}
            />

          )
        }}
      />
      <Tab.Screen
        name="OdemeScreen"
        component={OdemeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Yükleme Yap',
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="credit-card"
              color={color}
              size={size}
            />

          )
        }}
      />       
      <Tab.Screen
        name="ProfilScreen"
        component={ProfilScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Profil',
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="user"
              color={color}
              size={size}
            />

          )
        }}
      />       

    </Tab.Navigator>
  )
};


const HomeStack = () => {
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

export default HomeStack