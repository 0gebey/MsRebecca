import React, {Component} from 'react';
import {Text, View, TextInput, Button, TouchableOpacity, StyleSheet, ImageBackground, Dimensions} from 'react-native';
import {AirbnbRating, Rating} from "react-native-ratings";
import AwesomeAlert from 'react-native-awesome-alerts';
import Header from "../../common-components/Header";
import {Actions} from "react-native-router-flux";
import MyButton from "../../common-components/MyButton";
import MyTextInput from "../../common-components/MyTextInput";
import Ionicons from "react-native-vector-icons/Ionicons";

let windowWidth = Dimensions.get('window').width;

export default class Myfeedbacks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlert: false,
            showAlert2: false,
            ratingRate: 5,
            feedBackText: ''
        };
    };


    onChangeFeedback = text => {
        this.setState({
            feedBackText: text
        });
    };

    ratingCompleted(rating) {
        this.setState({ratingRate: rating})
    }

    showAlert = () => {
        this.setState({
            showAlert: true,
        });
    };
    showAlert2 = () => {
        this.setState({
            showAlert2: true,
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false,   showAlert2: false,
        });
    };
    renderHeader = () => {
        return <Header headerBaslik={"Feedbacks"}
                       headerLeftButtonClick={this.headerLeftButtonOnPress}
                       headerRightButtonExist={false}
                       headerLeftIconName={"arrow-left"}
                       headerLeftIconSize={20}
                       headerLeftButtonExist={true}/>
            ;
    };
    headerLeftButtonOnPress = () => {
        Actions.Profile();
    };

    renderPointEmoji() {
        let emoji;
        if (this.state.ratingRate === 1) {
            emoji = 'You should contact with us.'
        } else if (this.state.ratingRate === 2) {
            emoji = ':/'
        } else if (this.state.ratingRate === 3) {
            emoji = ''
        } else if (this.state.ratingRate === 4) {
            emoji = ':)'
        } else {
            emoji = 'We are glad to hear that! :)'
        }
        return emoji
    }

    render() {
        let backgroundImage = require("../../common-components/background.jpg");
        const {showAlert} = this.state;
        const {showAlert2} = this.state;
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                {this.renderHeader()}
                <View style={{flex: 1, padding: 20}}>

                    <View style={{
                        borderWidth: 0.75,
                        borderColor: '#803262',
                        padding: 15,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{color: '#803262', fontSize: 13, fontWeight: 'bold', padding: 2}}>Please rate the
                            otel room you have stayed in your business travel</Text>
                        <Text style={{color: '#803262', fontSize: 13, padding: 2}}>1 for horrible 5 for awesome</Text>

                        <AirbnbRating
                            selectedColor={'#803262'}
                            reviewColor={'#803262'}
                            showRating={false}
                            size={30}
                            onFinishRating={(rating) => this.setState({ratingRate: rating})}
                        />
                        <MyButton myButtonText={"Send Feedback"}
                                  buttonBackgroundColor={'transparent'}
                                  buttonTextColor={'#803262'}
                                  myButtonWidth={windowWidth / 1.5}
                                  myButtonHeight={35}
                                  myButtonMargin={2.5}
                                  myButtonBorderColor={'#803262'}
                                  myButtonBorderWidth={1}
                                  myButtonBorderRadius={5}
                                  myButtonAlignItems={"center"}
                                  onClickMyButton={() => this.showAlert()}
                                  willThereIcon={false}/>
                    </View>
                    <View style={{
                        borderWidth: 0.75,
                        borderColor: '#803262',
                        padding: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10
                    }}>
                        <Text style={{color: '#803262', fontSize: 13, fontWeight: 'bold', padding: 2}}> Give us your
                            anonymous feedback and questions. What can we improve ? What are you concerned about
                            ? </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <TextInput style={{
                                backgroundColor: 'transparent',
                                color: 'black',
                                margin: 5,
                                padding: 10,
                                width: 300,
                            }}
                                //onChangeText={(text) => this.setState({text})}
                                       value={this.state.feedBackText}
                                       placeholder={'Enter here'}
                                       onChangeText={this.onChangeFeedback.bind(this)}
                                       autoCorrect={false}>
                            </TextInput>
                        </View>
                        <MyButton myButtonText={"Send Feedback"}
                                  buttonBackgroundColor={'transparent'}
                                  buttonTextColor={'#803262'}
                                  myButtonWidth={windowWidth / 1.5}
                                  myButtonHeight={35}
                                  myButtonMargin={2.5}
                                  myButtonBorderColor={'#803262'}
                                  myButtonBorderWidth={1}
                                  myButtonBorderRadius={5}
                                  myButtonAlignItems={"center"}
                                  onClickMyButton={() => this.showAlert2()}
                                  willThereIcon={false}/>
                    </View>
                </View>
                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Feedback has sent!"
                    message={'You gave ' + this.state.ratingRate + ' points. ' + this.renderPointEmoji()}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="Cancel"
                    confirmText="Ok, thanks"
                    confirmButtonColor="#FFD698"
                    onCancelPressed={() => {
                        this.hideAlert();
                    }}
                    onConfirmPressed={() => {
                        this.hideAlert();
                    }}
                    cancelButtonTextStyle={{color: '#803262'}}
                    confirmButtonTextStyle={{color: '#803262'}}
                    titleStyle={{color: 'white', fontWeight: 'bold'}}
                    messageStyle={{color: 'white'}}
                    contentContainerStyle={{backgroundColor: 'transparent', borderWidth: 0.75, borderColor: '#803262'}}
                />
                <AwesomeAlert
                    show={showAlert2}
                    showProgress={false}
                    title="Feedback has sent!"
                    message={'We will review your feedback and call you back!'}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="Cancel"
                    confirmText="Ok, thanks"
                    confirmButtonColor="#FFD698"
                    onCancelPressed={() => {
                        this.hideAlert();
                    }}
                    onConfirmPressed={() => {
                        this.hideAlert();
                    }}
                    cancelButtonTextStyle={{color: '#803262'}}
                    confirmButtonTextStyle={{color: '#803262'}}
                    titleStyle={{color: 'white', fontWeight: 'bold'}}
                    messageStyle={{color: 'white'}}
                    contentContainerStyle={{backgroundColor: 'transparent', borderWidth: 0.75, borderColor: '#803262'}}
                />
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        // remove width and height to override fixed static size
        width: null,
        height: null,
        position: 'relative'
    },
});

