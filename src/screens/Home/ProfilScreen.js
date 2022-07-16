import {
  View, Text, Button,
  StyleSheet, ImageBackground, SafeAreaView,
  TouchableOpacity, ScrollView, Alert
} from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import database from '@react-native-firebase/database'
import { TextInput } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore'


const ProfilScreen = ({ navigation }) => {
  const { signout, user } = useContext(AuthContext);
  //const { readData, list } = useContext(AuthContext);  

  const [currentUser, setCurrentUser] = useState({});
  const usersColl = firestore().collection('users');

  const [currentUserLicenseplate, setCurrentUserLicenseplate] = useState('');

  const updateCurrentUser = async () => {
    await usersColl.doc(user.uid).update({
      LicensePlate: currentUserLicenseplate,
    });
    await user.updateProfile({

      plaka: currentUserLicenseplate
      ,
    })
    {
      Alert.alert(
        "Güncelleme",
        "Plakanız Başarıyla Güncellenmiştir.",
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

  const [list, setList] = useState("");
  const [list2, setList2] = useState("");
  const [list3, setList3] = useState("");



  const readData = async () => {
    /*
    await database().ref('users2/a1').once('value').then(snapshot =>{
      setList((snapshot.val()))
    });

    await database().ref('users2/b1').once('value').then(snapshot =>{
      setList2((snapshot.val()))
    });
    */
    await database()
      .ref('users2')
      .once('value')
      .then(snapshot => {
        setList((snapshot.val()))
      });


  }
  console.log(list)

  const kontrol = () => {
    {
      Alert.alert(
        "Çıkış",
        "Çıkış yapmak istediğinizden emin misiniz ?",
        [


          { text: "Evet", onPress: () => signout() },
          { text: "Hayır", onPress: () => console.log("OK Pressed") }
        ]
      )
    }
  }




  return (
    <SafeAreaView
      style={{
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',

        backgroundColor: 'white',

      }}
    >
      <ScrollView style={{ width: '100%' }}>

        <Animatable.View
          animation="slideInDown"
          style={styles.footer}>
          <View style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            alignContent: 'center',
            flexDirection: 'row'
          }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('HomeScreen')}>
              <Icon2
                style={{ marginRight: 260 }}

                size={35}
                name='home'
                color='white' ></Icon2>
            </TouchableOpacity>


            <TouchableOpacity
              onPress={() => kontrol()}>
              <Icon2 //style={{ marginLeft: 260 }}
                size={35}
                name='logout'
                color='white' ></Icon2>
            </TouchableOpacity>
          </View>


          <View style={{
            paddingTop: 10,
            flexDirection: 'column',
            justifyContent: 'center',
          }} >

            <View style={{
              flexDirection: 'row',
              justifyContent: 'center'
            }}>
              <Icon

                size={80}
                name='user-alt'
                color='white' ></Icon>
            </View>
            <Text style={{ fontSize: 22, color: "#DBDADB", fontWeight: '500' }}>Adınız</Text>
            <Text style={{ fontSize: 22, color: 'white', fontWeight: '500' }}>{user.displayName} </Text>
            <Text style={{ fontSize: 22, color: "#DBDADB", fontWeight: '500' }}>Telefon Numarası</Text>
            <Text style={{ fontSize: 22, color: 'white', fontWeight: '500' }}>{currentUser.Phone} </Text>
            <Text style={{ fontSize: 22, color: "#DBDADB", fontWeight: '500' }}>E-mail Adresi</Text>
            <Text style={{ fontSize: 22, color: 'white', fontWeight: '500' }}>{currentUser.Email}</Text>

            <Text style={{ fontSize: 22, color: "#DBDADB", fontWeight: '500' }}>Araç Plakası</Text>
            <Text style={{ fontSize: 22, color: 'white', fontWeight: '500' }}>{currentUser.LicensePlate}</Text>
            <View style={{
              marginTop: 10,
              marginBottom: 15,

            }}>
              <TextInput
                placeholder='Plaka Değeri'
                placeholderTextColor="black"
                style={{
                  backgroundColor: 'white',
                  height: 60,
                  width: '100%',

                  borderColor: '#fff',
                  borderWidth: 1,
                  borderRadius: 10,
                  fontSize: 20,
                  color: 'black'
                }}
                onChangeText={value => (setCurrentUserLicenseplate(value))}
                value={(currentUserLicenseplate)}
              >

              </TextInput>
            </View>
            <Button
              onPress={() => updateCurrentUser()}
              title="Güncelle">

            </Button>
          </View>

        </Animatable.View>


      </ScrollView>
    </SafeAreaView>

  )
}

export default ProfilScreen

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //justifyContent: 'center'
  },
  header: {
    flex: 1,
    width: '100%',
    //margin: 20,


  },
  footer: {
    flex: 1,
    backgroundColor: '#C673E6',

    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingVertical: 50,
    paddingHorizontal: 50,
    alignItems: 'center',
    width: '100%',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: '100%'
  },

})