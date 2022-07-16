import { View, Text, SafeAreaView, 
  TextInput, Button, 
  TouchableOpacity, StyleSheet,Dimensions,
ScrollView,RefreshControl } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as Animatable from 'react-native-animatable';


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const LoginScreen = ({ navigation }) => {

  const [issecurePass, setIsSecurePass] = useState(true);
  const { login } = useContext(AuthContext);



  


  const loginValidationSchema = yup.object().shape({
    email: yup.string().required('Boş Geçilmez').email('Geçerli bir email giriniz'),

    password: yup.string().required('Boş Geçilmez').min(6, ({ min }) => 'Şifre en az' + min + 'karakter olmalıdır'),


  });

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: 'white',
      }}
    >
      <ScrollView 
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      style={{width:'100%'}}>
     <Animatable.View
      animation="slideInLeft" 
      style={styles.header}>
      <Text style={styles.text_header}>P-Lot Park Sistemine</Text>
        <Text style={styles.text_header}>Hoşgeldiniz!</Text>
       
      </Animatable.View>
      
      <Animatable.View
      animation="slideInUp" 
      style={styles.footer}>
        <Animatable.Image
        style={styles.logo}
        animation="bounceIn"
        source={require('./../../asset/image7.png')}
        resizeMode='stretch'/>
        
        {/*
        <Text
          style={{ fontSize: 30, 
          color: 'white', fontWeight: '600',
          marginBottom:10 }}>
          Üye Girişi</Text>
          */}
        
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => login(values.email, values.password,navigation)}
        >

          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
            <>
            
            
              <TextInput
                name="email"
                placeholder='Email Adresiniz'
                placeholderTextColor="#000"
                style={{
                  backgroundColor: '#fff',
                  height: 60,
                  width: '90%',
                  margin: 10,
                  padding: 10,
                  borderColor: '#fff',
                  borderWidth: 1,
                  borderRadius: 10,
                  fontSize: 16,
                }}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"

              />
              {errors.email && (
                <Text style={{ color: '#fff', fontSize: 17 }}> {errors.email} </Text>
              )}
              <View style={{
                borderColor: '#fff',
                borderWidth: 1,
                borderRadius: 10,
                width: '90%',
                margin: 10,
                backgroundColor: '#fff',
                //padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <TextInput
                  name="password"
                  placeholder='Şifreniz'
                  placeholderTextColor="#000"
                  style={{
                    //backgroundColor:'#fff',
                    height: 50,
                    borderWidth: 0,
                    fontSize: 16,
                  }}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={issecurePass}

                />
                <TouchableOpacity
                  onPress={() => setIsSecurePass(!issecurePass)}>
                  <Icon
                    style={{ marginRight: 10, }}
                    size={24}
                    name={issecurePass ? "eye-slash" : "eye"}
                    color="#aaa" ></Icon>
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={{ color: '#fff', fontSize: 17 }}> {errors.password} </Text>
              )}
              <View style={{ width: '90%', }}>

                <Button
                  onPress={handleSubmit}
                  disabled={!isValid}
                  title="Giriş">

                </Button>
                
                {/*
                <TouchableOpacity
                  style={{backgroundColor:'#fff',
                  borderRadius:5,
                                   
                }}
                  onPress={handleSubmit}
                  
                >
                  <Text 
                  style={{ 
                    fontSize: 25, 
                    color: 'black', 
                    textAlign: 'center',}}
                    >Giriş</Text>
                </TouchableOpacity>
                */}
              </View>
            </>
          )}

        </Formik>
        
        <View>
        <TouchableOpacity
            onPress={() => navigation.navigate('ResetPasswordScreen')}>
            <Text
              style={{
                color: 'white'
                , marginTop: 15, fontSize: 18,
                fontWeight:'bold'
              }}>Şifrenizi mi unuttunuz?</Text>
          </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity
             onPress={() => navigation.navigate('SignupScreen')} >
            <Text
              style={{
                color: 'white'
                , marginTop: 15, fontSize: 18,
                fontWeight:'bold'
              }}>Kayıtlı değilseniz hemen kayıt olun!</Text>
          </TouchableOpacity>
        </View>
        
        
      </Animatable.View>
      </ScrollView>
      
    </SafeAreaView>
  )
}

export default LoginScreen

const{height}=Dimensions.get('screen');
const height_logo = height * 0.7 * 0.3;


var styles = StyleSheet.create({

  footer: {
    flex:5,
    backgroundColor: '#C673E6',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop:10,
    width: '100%',
  },

  header: {
    flex: 1,

    //justifyContent: 'flex-end',
    //alignItems:'center',
    //paddingBottom: 50,
    //paddingHorizontal: 20,
    marginTop:10,
    marginLeft:15
  },
  text_header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#C673E6'
  },
  logo:{
    width:height_logo,
    height:height_logo,
    
    

  },
})