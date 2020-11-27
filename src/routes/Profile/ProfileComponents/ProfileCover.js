import React from 'react';
import {View, Image, Dimensions, Text, StyleSheet} from 'react-native';

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

const ProfileCover = props => {
    return (
        <View style={styles._containerView}>
            <View style={{flex:0.75}}>
                <Image source={{ uri: props.profileImageUri }}
                       style={{ width: 100, height: 100, borderRadius: 50}} />
            </View>
            <View style={{flex:2,flexDirection: 'column',padding: 15,marginLeft:15}}>
                <Text style={styles._profileCoverNameStyle}>{props.profileCoverName}, {props.profileCoverSurname}</Text>
                <Text style={styles._profileCoverOthersStyle}>{props.profileCoverYas}, {props.profileCoverCinsiyet}</Text>
                <Text style={styles._profileCoverOthersStyle}>{props.profileCoverDepartman}</Text>
                <Text style={styles._profileCoverOthersStyle}>{props.profileCoverPozisyon}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    _containerView: {
        flex:1,
        margin: 7.5,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    _profileCoverNameStyle: {
        fontWeight:'bold',
        color:'black',
        marginVertical:2.5,
    },
    _profileCoverOthersStyle: {
        color:'black',
    },
    _editProfile: {
        color:'#381131',
        fontSize:13
    }
});

export default ProfileCover;
