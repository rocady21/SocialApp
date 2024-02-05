import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image, ScrollView, Pressable, StyleSheet } from "react-native"
import temasA from '../Thems/temas'
import Black_button from './Componentes/black_button';
import CheckBox from 'react-native-check-box';
import { useNavigation } from '@react-navigation/native';
import Inputs from './Componentes/Input';
import InputPassword from './Componentes/InputPassword';
import { validateEmail, loadImageFromGallery } from '../Utils/helpers'
import { size } from 'lodash'
import { Avatar } from 'react-native-elements';
import { uploadImage } from '../Utils/actions';
import { Alert } from 'react-native';

const styles = StyleSheet.create({
  avatar : {
    width: 100,
    height: 100,
    margin: 10,
    flex: 1,

  },

  container : {
    alignItems: 'center'

  }
})

const Register = () => {

  const [formData, setFormData] = useState(defaultFormValues())

  const [isChecked, setIsChecked] = useState(false)
  const navigation = useNavigation();
  const [errorName, setErrorName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorAge, setErrorAge] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  // const [blob1, setBlob] = useState(null);
  // const [blobUrl, setBlobUrl] = useState("");
  const [photoUrl, setPhotoUrl] = useState(null)



  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text })
  }


  const registerUser = () => {
    if (!validateData()) {
      console.log("prueba formdata => ", formData)

      return;

    } else {

      console.log("Validado")
      // console.log("prueba fomdata => ", formData)
    }




  }

  const validateData = () => {

    setErrorName("")
    setErrorLastName("")
    setErrorAge("")
    setErrorEmail("")
    setErrorPassword("")
    let isValid = true

    if (!validateEmail(formData.email)) {
      setErrorEmail("debes colocar un email.")
      isValid = false
    }

    if (formData.name == "") {
      setErrorName("ingrese un nombre valido")
      isValid = false
    }
    if (formData.lastname == "") {
      setErrorLastName("ingrese un apellido valido")
      isValid = false
    }

    if (formData.age == "") {
      setErrorAge("ingrese una edad valida")

      isValid = false
    }


    if (size(formData.password) < 6) {
      setErrorPassword("la contrasela debe de tener un minimo de 6 caracteres.")
      console.log(formData.password)
      isValid = false
    }
    return isValid
  }

  const changePhoto = async () => {
    const result = await loadImageFromGallery([1, 1])
    console.log("este es el result => ", result.image)
    let imag_eend = result.image.uri
    let valor2 = imag_eend.split('/');
    let nombre_image = valor2[valor2.length - 1]

    // console.log("pruebita uwu => ", nombre_image)

    const resultUploadImage = await uploadImage(result.image.uri, "image_prueba", nombre_image)
    console.log("resultUploadImage =>  ", resultUploadImage)
    if (!resultUploadImage.statusResponse) {
      Alert.alert("Ha ocurrido un error al almacenar la foto de perfil.")

      return
    }


    setPhotoUrl(resultUploadImage.url)
    console.log("resultUploadImage.url => ", resultUploadImage.url)
    return
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

            {/* <Text style={{
              fontSize: 16,
              color: temasA.black

            }}>
              Connect with your friend today!
            </Text> */}
          </View>

          <View style={styles.container}>
              <Avatar
              style = {styles.avatar}
                rounded
                size="large" 
                onPress={changePhoto}
                overlayContainerStyle={{ backgroundColor: 'blue' }}
                activeOpacity={0.3}
                source={
                  photoUrl
                    ? { uri: photoUrl }
                    : require("../../assets/default.png")
                }
              />
            </View>

          <View>
            {/*Inicio - input Name */}
            <Inputs title={'Name'} mensajeError={errorName} onChange={onChange} typetext={"name"} fromdata={formData.name} />

            {/*Inicio - input Apellido */}
            <Inputs title={'Last_name'} mensajeError={errorLastName} onChange={onChange} typetext={"lastname"} fromdata={formData.lastname} />

            {/*Inicio - input Edad */}
            <Inputs title={'Age'} mensajeError={errorAge} onChange={onChange} typetext={"age"} fromdata={formData.age} />

            {/*Inicio - input correo */}
            <Inputs title={'Email_address'} mensajeError={errorEmail} onChange={onChange} typetext={"email"} fromdata={formData.email} />

            {/*Inicio - input contraseña */}

            <InputPassword title={"Password"} mensajeError={errorPassword} onChange={onChange} typetext={"password"} fromdata={formData.password} />


            <View style={{
              flexDirection: 'row',
              marginVertical: 6
            }}>


              <CheckBox
                isChecked={isChecked}
                onClick={() => setIsChecked(!isChecked)}
                checkedCheckBoxColor='green'
                uncheckedCheckBoxColor='black'
              />

              <Text style={{ color: isChecked ? 'green' : 'black' }}> I aggree to the terms and conditions</Text>

            </View>


            <Black_button title={"Register"} onPress={registerUser} />
          </View>

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

const defaultFormValues = () => {
  return { name: "", lastname: "", email: "", password: "", age: "" }

}


export default Register

