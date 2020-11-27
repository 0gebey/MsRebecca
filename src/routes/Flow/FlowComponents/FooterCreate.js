import React from 'react';
import {View, Dimensions, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyButton from "../../../common-components/MyButton";
let windowWidth = Dimensions.get('window').width;


const FooterCreate = props => {
    return (
        <View style={styles.container}>
            <View style={{backgroundColor: 'transparent',flexDirection: 'row'}}>
                <MyButton myButtonText={"Add Image"}
                          onClickMyButton={props.onClickMyButton}
                          buttonTextColor={'#803262'}
                          myButtonAlignItems={'center'}
                          myButtonWidth={windowWidth/2}
                          myButtonHeight={40}
                          willThereIcon={true}
                          buttonBackgroundColor={'#F5F5F5'}
                          myButtonIconName={"ios-image"}
                          myButtonIconColor={'#803262'}
                          myButtonMargin={1.5}/>
                <MyButton myButtonText={"Add Video"}
                          buttonTextColor={'#803262'}
                          myButtonWidth={windowWidth/2}
                          myButtonAlignItems={'center'}
                          buttonBackgroundColor={'#F5F5F5'}
                          myButtonHeight={40}
                          willThereIcon={true}
                          myButtonIconName={"ios-play"}
                          myButtonIconColor={'#803262'}
                          myButtonMargin={1.5}/>
            </View>
            <View style={{backgroundColor: 'transparent'}}>
                <MyButton myButtonText={"Record Video"}
                          onClickMyButton={props.onClickRecordVideo}
                          buttonTextColor={'#803262'}
                          myButtonWidth={windowWidth}
                          myButtonAlignItems={'center'}
                          buttonBackgroundColor={'#F5F5F5'}
                          myButtonHeight={40}
                          willThereIcon={true}
                          myButtonIconName={"md-recording"}
                          myButtonIconColor={'#803262'}
                          myButtonMargin={1.5}/>
            </View>


        </View>
    );
};

export default FooterCreate;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: windowWidth,
        backgroundColor: 'white',
    },
});
