import React from 'react';
import {View, Dimensions, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyButton from "../../../common-components/MyButton";
import MyText from "../../../common-components/MyText";

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

const HeaderCreate = props => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{}} onPress={props.headerLeftButtonClick}>
                <View>
                    <Ionicons name={props.headerLeftIconName} size={props.headerLeftIconSize} color={'#803262'}/>
                </View>
            </TouchableOpacity>
            <MyText myTextColor={'#803262'}
                    myText={props.headerCreateText}
                    myTextMarginLeft={55}
            />
            <MyButton myButtonText={"Send"}
                      buttonBackgroundColor={'transparent'}
                      buttonTextColor={'#803262'}
                      myButtonWidth={76}
                      myButtonHeight={30}
                      myButtonBorderColor={'#803262'}
                      myButtonBorderWidth={1}
                      myButtonBorderRadius={20}
                      myButtonAlignItems={"center"}
                      onClickMyButton={props.onClickGonderButton}
                      willThereIcon={false}
                      isMyButtonDisabled={props.isGonderButtonDisabled}
                      myButtonOpacity={props.gonderButtonOpacity}
            />
        </View>
    );
};

export default HeaderCreate;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        paddingTop: 25,
        marginVertical:5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: windowWidth,
        height: 48,
        backgroundColor: 'white',
    }
});
