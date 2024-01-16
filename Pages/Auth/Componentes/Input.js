import React from 'react';
import {Text, View } from 'react-native';
import temasA from '../../Thems/temas';
import {Input} from 'react-native-elements'


const Inputs = ({ title, placeholders, mensajeError, onChange, typetext, fromdata }) => {
    return (
        <View style={{ marginBottom: 25 }}>
            <View style={{ marginBottom: 2 }}>
                <Text style={{
                    fontSize: 15,
                    fontWeight: temasA.fontWheights.normal,
                    marginBottom: 5,
                    marginLeft:10
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
                    keyboardType={title}
                    errorMessage={mensajeError}
                    password={true}
                    onChange={(e) =>onChange(e, typetext)}
                    defaultValue={fromdata}
                    style={{
                        width: '100%'
                    }}
                >

                </Input>
            </View>

        </View>
    );
};

export default Inputs;
