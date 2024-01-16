import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import temasA from '../../Thems/temas';
import { Ionicons } from '@expo/vector-icons';
import { Input } from 'react-native-elements'



const InputPassword = ({ title, placeholders, mensajeError, onChange, typetext, fromdata }) => {
    const [ispasswordShown, setIspasswordShown] = useState(true);
    return (
        <View style={{ marginBottom: 25 }}>
            <View style={{ marginBottom: 2 }}>
                <Text style={{
                    fontSize: 15,
                    fontWeight: temasA.fontWheights.normal,
                    marginBottom: 5,
                    marginLeft: 10
                }}>{title}</Text>
            </View>
            <View style={{
                width: '100%',
                height: 60,
                borderColor: temasA.colors.black,
                // borderBottomWidth: 2,
                borderColor: temasA.colors.textoOpacity,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 6

            }}>

                <Input
                    placeholder={placeholders}
                    placeholderTextColor={temasA.colors.black}
                    secureTextEntry={ispasswordShown}
                    keyboardType={title}  // Aquí puedes usar el tipo de teclado deseado, como "default" o "email-address"
                    errorMessage={mensajeError}
                    onChange={(e) => onChange(e, typetext)}
                    defaultValue={fromdata}
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
    );
};

export default InputPassword;
