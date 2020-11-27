import React, { Component } from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import MyButton from "../../../common-components/MyButton";
import {Actions} from 'react-native-router-flux';
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;
import { Badge} from 'react-native-elements'
import Ionicons from "react-native-vector-icons/Ionicons";

export default class HeaderBottomContainer extends Component {
    state = {
        isOpened:true
    };

    render() {
        return (
            <View style={{alignItems: "center",justifyContent:'center',flexDirection:'row' }}>
                <View>
                    <TouchableOpacity onPress={this.props.goToChatRoom}
                                      style={{
                                          justifyContent: 'center',
                                          backgroundColor: 'transparent',
                                          height: 35,
                                          borderColor: 'grey',
                                          borderWidth: 1,
                                          borderRadius: 5,
                                          margin: 10,
                                          paddingHorizontal: 30,
                                          flexDirection:'row',
                                          alignItems:'center'
                                      }}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{width: 17.51}}>
                                    <Ionicons name={'ios-chatboxes'} size={20} color={'#803262'}/>
                                </View>
                                <Text style={{color: 'black', marginLeft: 5}}> Chat Room </Text>
                            </View>
                        {this.state.isOpened ? <Badge
                            value="+1"
                            containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                            status="primary"/> : <Text> </Text>}
                    </TouchableOpacity>
                </View>
                <MyButton onClickMyButton={this.props.goToQrScanner}
                          myButtonText={"Scan QR"}
                          myButtonBorderWidth={1}
                          myButtonBorderColor={'grey'}
                          myButtonBorderRadius={5}
                          buttonBackgroundColor={'transparent'}
                          buttonTextColor={'black'}
                          myButtonMargin={10}
                          myButtonHeight={35}
                          myButtonPadHorizontal={30}
                          willThereIcon={true}
                          myButtonIconName={"ios-qr-scanner"}
                          myButtonIconColor={'#803262'}/>
            </View>
        );
    }
}
