import { View, Text, Alert } from 'react-native'
import React, { useState, useEffect, createContext, DevSettings } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import database from '@react-native-firebase/database';


export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const usersColl = firestore().collection('users');
    const [user, setUser] = useState(null);
    const [currentUser, setCurrentUser] = useState({});

    const [list, setList] = useState(null);






    var sonuc = Number(Number(currentUser.TRY) - 10);
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password,navigation) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password)
                            .then(async result => {
                                if (!result.user.emailVerified) {
                                    result.user.sendEmailVerification();
                                    {
                                        Alert.alert(
                                            "Hata",
                                            "Lütfen email adresinize gelen maili onaylayınız...",
                                            [
        
                                                { text: "Tamam" }
                                            ]
                                        )
                                    }
                                    //alert("Lütfen email adresinize gelen maili onaylayınız...");
                                }
                            });;
                    } catch (error) {
                        if (error.code == 'auth/wrong-password') {
                            {
                                Alert.alert(
                                    "Hata",
                                    "Şifrenizi yanlış girdiniz.",
                                    [

                                        { text: "Tamam", onPress: () => console.log("OK Pressed") }
                                    ]
                                )
                            }

                        }
                        else if (error.code == 'auth/user-not-found') {
                            {
                                Alert.alert(
                                    "Hata",
                                    "Böyle bir kullanıcı bulunamadı. Kayıtlı değilseniz hmen kayıt olun.",
                                    [

                                        { text: "Tamam" }
                                    ]
                                )
                            }

                        }
                        else if (error.code == 'auth/too-many-requests') {
                            {
                                Alert.alert(
                                    "Hata",
                                    "Birden fazla deneme yaptınız, hesap bloklandı. Lütfen şifrenizi sıfırlayın.",
                                    [

                                        { text: "Tamam" ,onPress: () => navigation.navigate("ResetPasswordScreen")}
                                    ]
                                )
                            }

                        }
                        /*
                        switch(error.code) {
                            case 'auth/wrong-password':
                                {
                                    Alert.alert(
                                      "Hata",
                                      "Şifrenizi yanlış girdiniz.",
                                      [
                                        
                                        { text: "Tamam", onPress: () => console.log("OK Pressed")  }
                                      ]
                                    )
                                  }
                                  break;
                         }*/

                        console.log(error);
                    }
                },
                signup: async (email, password, name, phone, licenseplate, navigation) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password)
                            .then(async result => {
                                var uid = result.user.uid;
                                result.user.sendEmailVerification();
                                result.user.updateProfile({
                                    displayName: name,
                                    bakiye: licenseplate,
                                    plaka: licenseplate,
                                })
                                await usersColl.doc(uid).set({
                                    TRY: 10,
                                    CreatedDate: new Date(),
                                    Email: email,
                                    Password: password,
                                    Name: name,
                                    LicensePlate: licenseplate,
                                    Phone: phone,

                                });

                                {
                                    Alert.alert(
                                        "Üyelik Oluşturma",
                                        "Üyelik Oluşturuldu. Lütfen email adresinize gelen maili onaylayınız...",
                                        [
        
                                            { text: "Tamam",onPress: () => navigation.navigate("LoginScreen") }
                                        ]
                                    )
                                    
                                }

                                //alert("Üyelik Oluşturuldu. Lütfen email adresinize gelen maili onaylayınız...");
                                //navigation.navigate("LoginScreen");
                            });

                    } catch (error) {
                        console.log(error);
                    }
                },
                resetPassword: async (email, navigation) => {
                    try {
                        await auth().sendPasswordResetEmail(email);
                        
                        {
                            Alert.alert(
                                "Şifre Sıfırlama",
                                "Şifre Sıfırlama Linki Mail Adresinize Gönderildi.",
                                [

                                    { text: "Tamam",onPress: () => navigation.navigate("LoginScreen") }
                                ]
                            )
                            
                        }
                        
                        //alert('Şifre Sıfırlama Linki Mail Adresinize Gönderildi');
                        
                    } catch (error) {
                        console.log(error);
                    }
                },
                signout: async () => {
                    try {
                        await auth().signOut();
                    } catch (error) {
                        console.log(error);
                    }
                },
                submitUsers: async () => {
                    try {
                        let dataToSave = {
                           

                            Position: "open",
                        };
                        let dataToSave2 = {
                           

                            kullanici: "Burhan",
                        };
                       
                        
                        await database().ref('users2/')
                            .update(dataToSave)
                            await database().ref('users2/')
                            .update(dataToSave2) 


                    } catch (error) {
                        console.log(error);
                    }
                },
                /*
                readData: async () => {
                    try {
                       
                        await database().ref('a1').once('value').then(snapshot =>{
                            setList(Object.values(snapshot.val()))
                          });

                          
                    } catch (error) {
                        console.log(error);
                    }                      
                },
                */



            }}











        >{children}</AuthContext.Provider>

    )
}

