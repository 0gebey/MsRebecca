import React from 'react';
import {View, Image, Dimensions, Text, StyleSheet} from 'react-native';

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

const ProfileImage = props => {
    return (
        <View style={styles._containerView}>
            <Image source={{ uri: props.profileImageUri }} style={{ width: 100, height: 100, borderRadius: 50 }} />
        </View>
    );
};

const styles = StyleSheet.create({
    _containerView: {
        flex:1,
        margin:10,
        justifyContent:'center',
        alignItems:'center'
    },
    degistirYaziStyle:{
        color:'blue',
        margin:3
    }
});

export default ProfileImage;