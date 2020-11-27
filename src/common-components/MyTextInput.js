import {Text, View, TextInput, StyleSheet, TouchableOpacity, Dimensions} from "react-native"
import React from "react"
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from 'react-native-vector-icons/Ionicons';


const MyTextInput = props => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: props.myInputsViewPadding,
            borderColor: '#803262',
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 7.5,
        }}>
            {props.willThereIcon ?
                <View style={{marginRight: 15}}>
                    <Ionicons name={props.myInputIcon} size={20} color={'#803262'}/>
                </View>
                :
               null
            }
            <TextInput style={{
                backgroundColor: props.myInputBackgroundColor,
                color: 'black',
                margin: 2.5,
                padding: 10,
                width: 250,
            }}
                //onChangeText={(text) => this.setState({text})}
                       value={props.myInputValue}
                       placeholder={props.myInputHint}
                       onChangeText={props.myOnChangeText}
                       autoCorrect={false}
                       secureTextEntry={props.mySecureTextEntry}>
            </TextInput>
        </View>
    )
};
export default MyTextInput;
