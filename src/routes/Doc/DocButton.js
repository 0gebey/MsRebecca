import {TouchableOpacity, Text, StyleSheet, Dimensions, View} from "react-native"
import React from "react"
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Badge} from "react-native-elements";

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;
const DocButton = props => {
    return (
        <TouchableOpacity
            onPress={props.onPressDocButton}
            style={{width: windowWidth, flexDirection: 'row', alignItems: 'center',borderBottomWidth:0.5}}>
            <View style={{left:0,margin:5}}>
                <View>
                    <Ionicons name={'ios-document'} size={30} color={'black'}/>
                </View>
            </View>
            <View style={{flex: 1,justifyContent:'center',margin:5}}>
                <Text style={{fontSize: 17}}> {props.DocButtonText} </Text>
            </View>
            <TouchableOpacity style={{right:0,margin:5}}>
                <View>
                    <Icon name={'angle-right'} size={30} color={'black'}/>
                </View>
            </TouchableOpacity>
        </TouchableOpacity>
    )
};

export default DocButton;
