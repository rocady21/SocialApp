import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import temasA from '../../Thems/temas';
import { Ionicons } from '@expo/vector-icons';

const InputPassword = ({ title, placeholders }) => {
    const [ispasswordShown, setIspasswordShown] = useState(true);
    return (
        <View style={{  marginBottom: 25 }}>
            <View style={{ marginBottom: 2 }}>
                <Text style={{
                    fontSize: 15,
                    fontWeight: temasA.fontWheights.normal,
                    marginBottom: 10
                }}>{title}</Text>
            </View>

            <View style={{
                width: '100%',
                height: 40,
                borderBottomWidth: 2,
                borderColor: temasA.colors.textoOpacity,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22

            }}>
                <TextInput
                    placeholder={placeholders}
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
    );
};

export default InputPassword;
