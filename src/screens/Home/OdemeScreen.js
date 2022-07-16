import {
  View, Text, StyleSheet,
  SafeAreaView, TextInput, TouchableOpacity,
  ScrollView,Alert
} from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { CreditCardInput } from 'react-native-credit-card-input'
import { AuthContext } from '../../navigation/AuthProvider';
//import { SafeAreaView } from 'react-native-safe-area-context';
import { deviceHeight, deviceWidth } from '../../utils/dimensions'
import firestore from '@react-native-firebase/firestore'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Value } from 'react-native-reanimated';



const OdemeScreen = ({ navigation }) => {
  const { submitUsers, user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserTRY, setCurrentUserTRY] = useState('');
  const usersColl = firestore().collection('users');

  var sonuc = Number(Number(currentUserTRY) + Number(currentUser.TRY));


  const updateCurrentUser = async () => {
    await usersColl.doc(user.uid).update({
      TRY: sonuc,
    });
    await user.updateProfile({

      bakiye: sonuc,
    })
    {
      Alert.alert(
        "Yükleme",
        "Paranız Başarıyla Yüklenmiştir.",
        [
          
          { text: "Tamam", onPress: () => navigation.navigate('HomeScreen') }
        ]
      )
    }
    //navigation.navigate('HomeScreen')

  }

  useEffect(() => {
    usersColl.doc(user.uid).get().then(data => {
      setCurrentUser(data.data())
    });


  }, []);

  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/*
        <View style={styles.card}>
          <CreditCardInput
            autoFocus={true}
            placeholders={{
              number: 'KART NUMARASI',
              expiry: 'MM/YY',
              cvc: 'CVC'
            }}
            labels={{
              number: 'Kart Numarası',
              expiry: 'MM/YY',
              cvc: 'CVC'

            }}


            requireName={true}
            requireCVC
            requirePostalCode
            validColor='black'
            invalidColor='red'
            placeholderColor='red'
            labelStyle={{ color: 'black' }}
          >


          </CreditCardInput>

        </View>
          */}
          
        {/*
      <View>

      <Text style={{marginBottom:100,fontSize:23,fontWeight:'400'}}>Yüklemek İstediğiniz Tutarı Giriniz</Text>
      </View>
      
    */}
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 35, margin: 15 }}>GÜNCEL BAKİYENİZ: {currentUser.TRY}TL</Text>
        </View>

        <CreditCardInput
            autoFocus          


            requireName
            requireCVC
            requirePostalCode
            validColor='black'
            invalidColor='red'
            placeholderColor='red'
            labelStyle={{ color: 'black' }}
            
          >


          </CreditCardInput>

        <TextInput
          
          placeholder='Kart Sahibi Ad, Soyad'
          placeholderTextColor="white"
          style={{
            backgroundColor: 'darkgrey',
            height: 60,
            width: '95%',
            margin: 10,
            padding: 10,
            borderColor: '#fff',
            borderWidth: 1,
            borderRadius: 10,
            fontSize: 20,
            color: 'white'
          }}
          
          
        />

        <TextInput
          
          placeholder='Yüklenecek Tutar'
          placeholderTextColor="white"
          style={{
            backgroundColor: 'darkgrey',
            height: 60,
            width: '95%',
            margin: 10,
            padding: 10,
            borderColor: '#fff',
            borderWidth: 1,
            borderRadius: 10,
            fontSize: 20,
            color: 'white'
          }}
          keyboardType='number-pad'
          onChangeText={value => (setCurrentUserTRY(value))}
          value={(currentUserTRY)}
        />

        <View style={{
          width: '95%',
          //margin: 50,
          //padding: 15



        }}>


          <TouchableOpacity
            style={{
              backgroundColor: 'green',
              borderRadius: 25,
              flexDirection: 'column',
              marginBottom: 10,
              marginLeft: 15,


            }}
            onPress={() => updateCurrentUser()}
          >

            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
              }}
            >YÜKLE</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default OdemeScreen

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },

  card: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',

    marginTop: 80

  },

})