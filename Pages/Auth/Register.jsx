import React, { useState } from 'react';
import { Button, ScrollView, TextInput, Touchable } from 'react-native'
import { View, Text, TouchableNativeFeedbackBase, TouchableWithoutFeedback, Alert, TouchableOpacity, SafeAreaView } from "react-native"
import temasA from '../Thems/temas'
import { Ionicons } from '@expo/vector-icons';
import Black_button from '../Thems/button.js/black_button';
// import CheckBox from '@react-native-community/checkbox';
import CheckBox from 'react-native-check-box'



const Register = () => {
  const [ispasswordShown, setIspasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false)
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
          <View style={{ marginBottom: 15 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{
                fontSize: 16,
                fontWeight: temasA.fontWheights.normal,
                marginBottom: 8
              }}>Name</Text>

            </View>

            <View style={{
              width: '100%',
              height: 48,
              borderColor: temasA.colors.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22

            }}>
              <TextInput
                placeholder='Enter your name'
                placeholderTextColor={temasA.colors.black}
                keyboardType='name'
                style={{
                  width: '100%'
                }}
              >

              </TextInput>
            </View>

          </View>

          {/*Inicio - input Apellido */}

          <View style={{ marginBottom: 15 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{
                fontSize: 16,
                fontWeight: temasA.fontWheights.normal,
                marginBottom: 8
              }}>Last name</Text>
            </View>

            <View style={{
              width: '100%',
              height: 48,
              borderColor: temasA.colors.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22

            }}>
              <TextInput
                placeholder='Enter your last name'
                placeholderTextColor={temasA.colors.black}
                keyboardType='lastname'
                style={{
                  width: '100%'
                }}
              >

              </TextInput>
            </View>
          </View>


          {/*Inicio - input Edad */}

          <View style={{ marginBottom: 15 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{
                fontSize: 16,
                fontWeight: temasA.fontWheights.normal,
                marginBottom: 8
              }}>Age</Text>
            </View>

            <View style={{
              width: '100%',
              height: 48,
              borderColor: temasA.colors.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22

            }}>
              <TextInput
                placeholder='Enter your age '
                placeholderTextColor={temasA.colors.black}
                keyboardType='age'
                style={{
                  width: '100%'
                }}
              >

              </TextInput>
            </View>
          </View>

          {/*Inicio - input correo */}

          <View style={{ marginBottom: 15 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{
                fontSize: 16,
                fontWeight: temasA.fontWheights.normal,
                marginBottom: 8
              }}>Email address</Text>
            </View>

            <View style={{
              width: '100%',
              height: 48,
              borderColor: temasA.colors.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22

            }}>
              <TextInput
                placeholder='Enter your email address '
                placeholderTextColor={temasA.colors.black}
                keyboardType='email-address'
                style={{
                  width: '100%'
                }}
              >

              </TextInput>
            </View>
          </View>
          {/*Inicio - input contraseña */}

          <View style={{ marginBottom: 15 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{
                fontSize: 16,
                fontWeight: temasA.fontWheights.normal,
                marginBottom: 8
              }}>Password</Text>
            </View>

            <View style={{
              width: '100%',
              height: 48,
              borderColor: temasA.colors.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22

            }}>
              <TextInput
                placeholder='Enter your password '
                placeholderTextColor={temasA.colors.black}
                secureTextEntry={ispasswordShown}
                style={{
                  width: '100%'
                }}
              />

              <TouchableOpacity
                onPress={() => setIspasswordShown(!ispasswordShown)}

                style={{
                  position: 'absolute',
                  right: 12
                }}
              >

                {
                  ispasswordShown == true ? (
                    <Ionicons name="eye-off" size={24} color={temasA.colors.black} />

                  ) : (
                    <Ionicons name="eye" size={24} color={temasA.colors.black} />

                  )

                }
              </TouchableOpacity>
            </View>
          </View>


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

            <Text style={{color: isChecked? 'green' : 'black' }}> I aggree to the terms and conditions</Text>

          </View>




          <Black_button title={"Register"} />

        </View>
      </ScrollView>

    </SafeAreaView>


  )
}

export default Register

