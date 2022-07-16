import { View, Text, SafeAreaView, 
  TextInput, Button, TouchableOpacity,StyleSheet,
 ScrollView} from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as Animatable from 'react-native-animatable';

const SignUpScreen = ({ navigation }) => {

  const [issecurePass, setIsSecurePass] = useState(true);
  const [issecurePassConfirm, setIsSecurePassConfirm] = useState(true);
  const { signup } = useContext(AuthContext);
  const singupValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Boş Geçilmez'),
    phone: yup
      .string()
      .required('Boş Geçilmez')
      .min(10, ({ min }) => 'Telefon en az' + min + 'karakter olmalıdır'),

    licenseplate: yup
      .string()
      .required('Boş Geçilmez')
      .max(8, ({ min }) => 'Plaka en az' + min + 'karakter olmalıdır'),
    email: yup
      .string()
      .required('Boş Geçilmez')
      .email('Geçerli bir email giriniz'),

    password: yup
      .string()
      .required('Boş Geçilmez')
      .min(6, ({ min }) => 'Şifre en az' + min + 'karakter olmalıdır')
      .matches(/\w*[a-z]\w*/, 'En az 1 adet küçük harf kullanmalısınız!')
      .matches(/\w*[A-Z]\w*/, 'En az 1 adet büyük harf kullanmalısınız!')
      .matches(/\d/, 'En az bir adet rakam kullanmalısınız!'),


    passwordConfirm: yup.string().required('Boş geçilemez').oneOf([yup.ref('password')], 'Şifreler Uyumsuz!')

  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    ><ScrollView style={{width:'100%'}}>
       <Animatable.View
      animation="slideInLeft"
       style={styles.header}>
      
        <Text style={styles.text_header}>Kayıt Olun!</Text>
      </Animatable.View>
      <Animatable.View
      animation="slideInUp"  
      style={styles.footer}>
        
        <Formik
          validationSchema={singupValidationSchema}
          initialValues={{
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            phone: '',
            licenseplate: '',
          }}
          onSubmit={(values) => signup(
            values.email,
            values.password,
            values.name,
            values.phone,
            values.licenseplate,
            navigation)}
        >

          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
            <>
            
              <TextInput
                name="name"
                placeholder='Adınız'
                placeholderTextColor="#000"
                style={{
                  backgroundColor: '#fff',
                  height: 50,
                  width: '90%',
                  margin: 5,
                  padding: 10,
                  borderColor: '#fff',
                  borderWidth: 1,
                  borderRadius: 10,
                  fontSize: 16,
                }}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                keyboardType="email-address"

              />
              {errors.name && (
                <Text style={{ color: '#fff', fontSize: 17 }}> {errors.name} </Text>
              )}
              <TextInput
                name="phone"
                placeholder='Telefon Numaranız (5*******)'
                placeholderTextColor="#000"

                style={{
                  backgroundColor: '#fff',
                  height: 50,
                  width: '90%',
                  margin: 5,
                  //padding: 10,
                  borderColor: '#fff',
                  borderWidth: 1,
                  borderRadius: 10,
                  fontSize: 16,

                }}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                keyboardType="phone-pad"

              />
              {errors.phone && (
                <Text style={{ color: '#fff', fontSize: 17 }}> {errors.phone} </Text>
              )}
              <TextInput
                name="licenseplate"
                placeholder='Araç Plakanız'
                placeholderTextColor="#000"

                style={{
                  backgroundColor: '#fff',
                  height: 50,
                  width: '90%',
                  margin: 5,
                  //padding: 10,
                  borderColor: '#fff',
                  borderWidth: 1,
                  borderRadius: 10,
                  fontSize: 16,

                }}
                onChangeText={handleChange('licenseplate')}
                onBlur={handleBlur('licenseplate')}
                value={values.licenseplate}
                keyboardType="email-address"

              />
              {errors.licenseplate && (
                <Text style={{ color: '#fff', fontSize: 17 }}> {errors.licenseplate} </Text>
              )}


              <TextInput
                name="email"
                placeholder='Email Adresiniz'
                placeholderTextColor="#000"
                style={{
                  backgroundColor: '#fff',
                  height: 50,
                  width: '90%',
                  margin: 5,
                  //padding: 10,
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
                margin: 5,
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
              <View style={{
                borderColor: '#fff',
                borderWidth: 1,
                borderRadius: 10,
                width: '90%',
                margin: 5,
                backgroundColor: '#fff',
                //padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <TextInput
                  name="passwordConfirm"
                  placeholder='Şifreniz (Tekrar)'
                  placeholderTextColor="#000"
                  style={{
                    //backgroundColor:'#fff',
                    height: 50,
                    borderWidth: 0,
                    fontSize: 16,

                  }}
                  onChangeText={handleChange('passwordConfirm')}
                  onBlur={handleBlur('passwordConfirm')}
                  value={values.passwordConfirm}
                  secureTextEntry={issecurePassConfirm}

                />
                <TouchableOpacity
                  onPress={() => setIsSecurePassConfirm(!issecurePassConfirm)}>
                  <Icon
                    style={{ marginRight: 10, }}
                    size={24}
                    name={issecurePassConfirm ? "eye-slash" : "eye"}
                    color="#aaa" ></Icon>
                </TouchableOpacity>
              </View>
              {errors.passwordConfirm && (
                <Text style={{ color: '#fff', fontSize: 17 }}> {errors.passwordConfirm} </Text>
              )}
              <View style={{ width: '90%', margin: 10 }}>

                <Button

                  onPress={handleSubmit}
                  disabled={!isValid}
                  title="Kayıt Ol">
                  

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

export default SignUpScreen

var styles = StyleSheet.create({

  footer: {
    flex: 8,
    backgroundColor: '#C673E6',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingVertical: 50,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop:30,

    width: '100%',
  },

  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    //alignItems:'center',
    //paddingBottom: 50,
    //paddingHorizontal: 20,
    marginTop:20
  },
  text_header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#C673E6',
    
  },
})