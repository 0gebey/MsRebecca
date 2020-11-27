import React from 'react';
import {View, Dimensions, TouchableOpacity, StyleSheet, Text} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from 'react-native-vector-icons/Ionicons';

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

const Header = props => {
    return (
        <View style={styles.container}>
            {
                props.headerLeftButtonExist
                    ?
                    <TouchableOpacity style={{width:30}} onPress={props.headerLeftButtonClick}>
                        <View>
                            <Icon name={props.headerLeftIconName} size={props.headerLeftIconSize} color={'white'}/>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{width:30,justifyContent: 'center',alignItems: 'center',}} onPress={props.headerRightButtonClick}>
                        <View>
                            <Text></Text>
                        </View>
                    </TouchableOpacity>
            }
            <View style={{width:120}}>
                <Text style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 18,
                }}> {props.headerBaslik} </Text>
            </View>
            {
                props.headerRightButtonExist
                    ?
                    <TouchableOpacity style={{width:30,justifyContent: 'center',alignItems: 'center'}} onPress={props.headerRightButtonClick}>
                        <View>
                            <Ionicons name={props.headerRightIconName} size={props.headerRightIconSize} color={'white'}/>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{width:30,justifyContent: 'center',alignItems: 'center',}} onPress={props.headerRightButtonClick}>
                        <View>
                            <Text></Text>
                        </View>
                    </TouchableOpacity>
            }

        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: windowWidth,
        height: 56.5,
        backgroundColor: '#4e3352',
        borderColor:'#803262',
        borderBottomWidth:0.40,
    }
});
