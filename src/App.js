import { View, Text, LogBox } from 'react-native'
import React from 'react'
import {AuthProvider} from './navigation/AuthProvider'
import Routes from './navigation/Routes'

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
const App = () => {
  return (
    <AuthProvider>
        <Routes/>
    </AuthProvider>
  )
}

export default App