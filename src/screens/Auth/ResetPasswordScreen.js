import {
  View, Text, SafeAreaView, TextInput,
  Button, TouchableOpacity,
  ScrollView
} from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as Animatable from 'react-native-animatable';

const ResetPasswordScreen = ({ navigation }) => {


  const { resetPassword } = useContext(AuthContext);
  const loginValidationSchema = yup.object().shape({
    email: yup.string().required('Boş Geçilmez').email('Geçerli bir email giriniz'),
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'row',


        alignItems: 'center',

        backgroundColor: '#C673E6',
      }}
    >
      <ScrollView style={{ width: '100%' }}>
        <Animatable.View
           animation="slideInLeft"
            style={{
            width: '80%',

            alignItems: 'center',
            marginLeft: 40,
            padding: 30,
            backgroundColor: 'white',
            borderRadius: 30,
          }}>

          <Text
            style={{ fontSize: 30, color: '#C673E6', fontWeight: '600' }}>
            Şifre Sıfırlama</Text>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: '' }}
            onSubmit={(values) => resetPassword(values.email,navigation)}
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
                    borderColor: '#C673E6',
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

                <View style={{ width: '90%' }}>

                  <Button
                    onPress={handleSubmit}
                    disabled={!isValid}
                    title="Gönder">

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

        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ResetPasswordScreen