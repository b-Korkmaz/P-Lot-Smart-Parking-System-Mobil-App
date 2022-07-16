import {
  View, Text, Button,
  TouchableOpacity, SafeAreaView, ScrollView,
  StyleSheet,
  ImageBackground,
  Alert,
  RefreshControl
} from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../navigation/AuthProvider';
//import { SafeAreaView } from 'react-native-safe-area-context';
import { deviceHeight, deviceWidth } from '../../utils/dimensions'
import firestore from '@react-native-firebase/firestore'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome5';

import database from '@react-native-firebase/database'


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}



const HomeScreen = ({ navigation }) => {


  const [refreshing, setRefreshing] = React.useState(false);

  const { submitUsers, user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const usersColl = firestore().collection('users');
  const [list1, setList1] = useState("");
  const [list2, setList2] = useState("");
  const [list3, setList3] = useState("");
  const [list4, setList4] = useState("");

  function useAsync(asyncFn, onSuccess) {
    useEffect(() => {
      let isActive = true;
      asyncFn().then(data => {
        if (isActive) onSuccess(data);
      });
      return () => { isActive = false };
    }, [asyncFn, onSuccess]);
  }

  useEffect(() => {
    usersColl.doc(user.uid).get().then(data => {
      setCurrentUser(data.data())
    });

    database()
      .ref('users2/a1')
      .once('value')
      .then(snapshot => {
        setList1((snapshot.val()))
      });

    database()
      .ref('users2/b1')
      .once('value')
      .then(snapshot => {
        setList2((snapshot.val()))
      });

    database()
      .ref('users2/c1')
      .once('value')
      .then(snapshot => {
        setList3((snapshot.val()))
      });

      database()
      .ref('users2/d1')
      .once('value')
      .then(snapshot => {
        setList4((snapshot.val()))
      });


  }, []);


  console.log(list1)
  console.log(list2)
  console.log(list3)
  console.log(list4)
  const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayis", "Haz",
    "Tem", "August", "September", "October", "November", "December"
  ];

  const d = new Date();

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var hours = new Date().getHours(); //To get the Current Hours
  var min = new Date().getMinutes();



  var sonuc = Number(Number(currentUser.TRY) - 10);


  const updateCurrentUser = async () => {
    await usersColl.doc(user.uid).update({
      TRY: sonuc,
    });
    await user.updateProfile({

      bakiye: sonuc,
    })

    {
      Alert.alert(
        "Giriş",
        "Giriş Yapılıyor. Hoşgeldiniz...",
        [

          { text: "Tamam" }
        ]
      )
    }


  }
  /*
  const kontrol = () => {
    if (sonuc > 10) {
      () => submitUsers()
    } else {
      Alert.alert(
        "Hata",
        "Yetersiz Bakiye",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
  }*/
  const kontrol = () => {
    {
      Alert.alert(
        "Yetersiz Bakiye",
        "Giriş Ücreti Minimum 10 TL'dir. Lütfen Bakiyenizi Güncelleyiniz.",
        [

          { text: "Tamam", onPress: () => console.log("OK Pressed") }
        ]
      )
    }
  }

  const giris = () => {

    //submitUsers()

    let dataToSave = {


      Position: "open",
    };
    let dataToSave2 = {


      kullanici: currentUser.Name,
    };
    let dataToSave3 = {


      plaka: currentUser.LicensePlate,
    };


    database().ref('users2/')
      .update(dataToSave)
    database().ref('users2/')
      .update(dataToSave2)
    database().ref('users2/')
      .update(dataToSave3)



    updateCurrentUser()








  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);



  return (
    <SafeAreaView style={{
      flex: 1, alignItems: 'center',
      backgroundColor: 'white',
      width: '100%'

    }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        style={{ width: '100%' }}

      >

        <Animatable.View
          animation="slideInDown"
          style={styles.footer}>

          {/*<Text style={{fontSize:20}}>Welcome {user.displayName}</Text>*/}
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold'
          }}>Merhaba</Text>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 30,
            color: 'white',
            textAlign: 'center'
          }}>{user.displayName}</Text>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center'
          }}>Bakiye  </Text>
          <View style={{ flexDirection: 'row' }}>

            <Text style={{
              fontWeight: 'bold',
              fontSize: 24,
              textAlign: 'center',
              color: 'white',
            }} >{currentUser.TRY}</Text>
            <View style={{
              justifyContent: 'flex-end',
              marginBottom: 2,
              marginLeft: 10,
            }}>
              <Text style={{
                fontWeight: 'bold',
                fontSize: 17,
                color: 'white',

              }}>TL</Text>
            </View>


          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('OdemeScreen')}       >
            <Icon

              size={30}
              name='plus'
              color='white' ></Icon>
          </TouchableOpacity>


          <Text
            style={{
              fontSize: 25,
              //color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >Araç Plakası </Text>
          <Text
            style={{
              fontSize: 35,
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          > {currentUser.LicensePlate}</Text>
          <Icon

            size={90}
            name='car'
            color='white' ></Icon>




        </Animatable.View>


        <Animatable.View
          animation="slideInLeft"
          style={{
            width: '70%',
            margin: 15,
            //padding: 15,
            flexDirection: "row",
            justifyContent: 'center',
            //marginStart: 50,
            marginLeft: 62,
            //marginRight:100,


          }}>

          <TouchableOpacity

            style={{
              backgroundColor: 'green',
              borderRadius: 25,
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '60%',
              marginRight: 10



            }}
          >
            <Icon
              style={{ margin: 15 }}
              size={30}
              name='calendar-alt'
              color='white' ></Icon>

            <Text
              style={{
                fontSize: 30,
                color: 'white',
                //textAlign: '',
                padding: 10,
                marginRight: 10,
                fontWeight: 'bold'


              }}
            >{date} {monthNames[d.getMonth()]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'green',
              borderRadius: 25,
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '60%'



            }}

          >
            <Icon
              style={{ margin: 15 }}
              size={30}
              name='clock'
              color='white' ></Icon>
            <Text
              style={{
                fontSize: 30,
                color: 'white',
                textAlign: 'center',
                //margin:5,
                padding: 10,
                marginRight: 20,
                fontWeight: 'bold'

              }}
            >{hours}:{min}</Text>
          </TouchableOpacity>



        </Animatable.View>

        {/*
      <View style={{
        width: '80%',
        //margin: 50,
        //padding: 15
        
        
        
      }}>

        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            borderRadius: 25,
            flexDirection:'column',
            marginBottom:10,
            

          }}
          onPress={() => navigation.navigate('ProfilScreen')}  
          
        >
         
          <Text
            style={{
              fontSize: 30,
              fontWeight:'bold',
              color: 'white',
              textAlign: 'center',
            }}
          >Park Yerleri</Text>
        </TouchableOpacity>

      </View>
          */}

        <Animatable.View
          animation="slideInLeft"
          style={{
            width: '90%',
            margin: 10,
            //padding: 15
            marginLeft: 20,




          }}>

          {/*
          <Text style={{
            fontWeight: 'bold',
            fontSize: 30,
            textAlign: 'center',

          }}><Icon
              
              size={50}
              name='parking'
        color='blue' />Park Yerleri</Text>*/}

          <TouchableOpacity
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 10,
              //width:'100%'

            }
            }>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 40,
              textAlign: 'center',


            }}><Icon

                size={40}
                name='parking'
                color='blue'
              /> Park Yerleri</Text>
            {/*
            <Icon
              style={{ justifyContent: 'center' }}
              size={50}
              name='parking'
        color='blue' />*/}

          </TouchableOpacity>

          
          <TouchableOpacity
            style={{
              backgroundColor: (Number(list4) == 1) ? 'green' : 'red',
              borderRadius: 25,
              flexDirection: 'column',
              marginBottom: 10,
              //width:'100%'

            }

            }>

            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',

              }}
            ><Icon

            size={40}
            name='wheelchair'
            color='white'
          /></Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: (Number(list1) == 1) ? 'green' : 'red',
              borderRadius: 25,
              flexDirection: 'column',
              marginBottom: 10,
              //width:'100%'

            }

            }>

            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',

              }}
            >A1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: (Number(list2) == 1) ? 'green' : 'red',
              borderRadius: 25,
              flexDirection: 'column',
              marginBottom: 10,


            }}


          >

            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
              }}
            >B1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: (Number(list3) == 1) ? 'green' : 'red',
              borderRadius: 25,
              flexDirection: 'column',
              marginBottom: 10,


            }}


          >

            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
              }}
            >C1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#C673E6',
              borderRadius: 25,
              flexDirection: 'column',
              marginBottom: 10,


            }}
            //onPress = {kontrol} 
            onPress={(sonuc >= 0) ? () => giris() : kontrol}


          >

            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
              }}
            >Giriş Yap</Text>
          </TouchableOpacity>

        </Animatable.View>





      </ScrollView>


    </SafeAreaView>
  )
}

export default HomeScreen

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 2,
    backgroundColor: '#C673E6',

    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    paddingVertical: 20,
    //paddingHorizontal: 50,
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

