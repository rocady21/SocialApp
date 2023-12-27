import React, { useState } from 'react';

import { View, Text, TouchableOpacity, SafeAreaView, Image, Button, ScrollView, TextInput, Pressable } from "react-native"
import temasA from '../Thems/temas'
import { Ionicons } from '@expo/vector-icons';
import Black_button from './Componentes/black_button';
import CheckBox from 'react-native-check-box'
import { useNavigation } from '@react-navigation/native';
import Inputs from './Componentes/Input';
import InputPassword from './Componentes/InputPassword';




const Register = () => {


  const [isChecked, setIsChecked] = useState(false)

  const navigation = useNavigation();

  const [errorName, setErrorName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");

  const RegisterUser = () => {
    if (!validateData) {
      return;

    }

    console.log("Validado")

  }

  const validateData = () => {

    setErrorName("")
    setErrorLastName("")
    setErrorEmail("")
    setErrorPassword("")
    setErrorConfirm("")
    let isValid = true
  }



  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: temasA.fonts.grey50 }}>
      <ScrollView>
        <View style={{ flex: 1, marginHorizontal: 22 }}>
          <View style={{ marginVertical: 22 }}>
            <Text style={{
              fontSize: 22,
              fontWeight: temasA.fontWheights.bold,
              marginVertical: 12,
              color: temasA.colors.black

            }}>
              Create Account

            </Text>

            <Text style={{
              fontSize: 16,
              color: temasA.black

            }}>
              Connect with your friend today!
            </Text>
          </View>

          {/*Inicio - input Name */}
          <Inputs title={'Name'} />

          {/*Inicio - input Apellido */}
          <Inputs title={'Last name'} />

          {/*Inicio - input Edad */}
          <Inputs title={'Age'} />

          {/*Inicio - input correo */}
          <Inputs title={'Email address'} />

          {/*Inicio - input contraseña */}

          <InputPassword title={"Password"} />


          <View style={{
            flexDirection: 'row',
            marginVertical: 6
          }}>


            <CheckBox
              isChecked={isChecked}
              onClick={() => setIsChecked(!isChecked)}
              // rightText='pepe'
              // rightTextStyle={{
              //   color: temasA.colors.black, 
              //   fontSize: 16,
              //   fontWeight: 'bold'
              // }}
              checkedCheckBoxColor='green'
              uncheckedCheckBoxColor='black'
            />

            <Text style={{ color: isChecked ? 'green' : 'black' }}> I aggree to the terms and conditions</Text>

          </View>


          <Black_button title={"Register"} onPress={RegisterUser()} />


          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20
            }}>
            <View style={{
              flex: 1,
              height: 1,
              backgroundColor: '#b5b5b5',
              marginHorizontal: 10
            }}
            />
            <Text style={{ fontSize: 14 }}>Or Singup with</Text>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: '#b5b5b5',
                marginHorizontal: 10
              }}
            />

          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center'
          }}>




            <TouchableOpacity
              onPress={() => console.log("Pressed")}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                height: 52,
                borderWidth: 1,
                borderColor: '#b5b5b5',
                marginRight: 4,
                borderRadius: 10
              }}
            >

              <Image
                source={require("../../assets/facebook.png")}
                style={{
                  height: 36,
                  width: 36,
                  marginRight: 8,
                  resizeMode: 'contain'

                }}
              // resizeMode='contain'
              />

              <Text>Facebook</Text>

            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => console.log("Pressed")}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                height: 52,
                borderWidth: 1,
                borderColor: '#b5b5b5',
                marginRight: 4,
                borderRadius: 10
              }}
            >

              <Image
                source={require("../../assets/google.png")}
                style={{
                  height: 36,
                  width: 36,
                  marginRight: 8,
                  resizeMode: 'contain'

                }}
              // resizeMode='contain'
              />

              <Text>Google</Text>

            </TouchableOpacity>

          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 22
          }}>

            <Text style={{ fontSize: 16, color: temasA.colors.black }}> Already have an account</Text>
            <Pressable
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={{
                fontSize: 16,
                color: temasA.colors.textPrimary,
                fontWeight: temasA.fontWheights.bold,
                marginLeft: 6

              }}
              >
                Login</Text>

            </Pressable>

          </View>

        </View>
      </ScrollView>

    </SafeAreaView >


  )
}

export default Register

