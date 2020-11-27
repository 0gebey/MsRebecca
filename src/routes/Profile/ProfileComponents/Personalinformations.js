import React from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

const Personalinformations = props => {
    return (
        <View style={styles._containerView}>
            <Text style={styles.bilgiTextStyle}>{props.varbaslik}</Text>
            {   props.iconControlState
                ?
                <View style={styles._icerdekiContainverView}>
                    <Text style={styles._icerdekiTextStyle}>{props.vartitle}</Text>
                </View>
                :
                <View style={styles._icerdekiContainverView}>
                    <Ionicons name={props.myPInfoIcon} size={20} color={'grey'} style={{marginHorizontal:7.5}}/>
                    <Text style={styles._icerdekiTextStyle}>{props.vartitle}</Text>
                </View>
            }

        </View>
    );
};
const styles = StyleSheet.create({
    _containerView: {
        flex:1,
        margin:10,
    },
    _icerdekiContainverView: {
        alignItems:'center',
        backgroundColor:'#FCFCFC',
        borderColor:'#DAD7D7',
        borderWidth:0.5,
        borderRadius:3.5,
        flexDirection:'row',
        paddingHorizontal:6,
        marginTop: 7.5,
        height:45
    },
    _icerdekiTextStyle: {
        marginLeft:5
    },
    bilgiTextStyle: {
    }
});

export default Personalinformations;