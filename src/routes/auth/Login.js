import React, {Component} from 'react';
import {
    Dimensions,
    ActivityIndicator,
    Text,
    ImageBackground,
    StyleSheet,
    View,
    KeyboardAvoidingView
} from 'react-native';
import MyText from "../../common-components/MyText";
import MyButton from "../../common-components/MyButton";
import MyBrand from "./AuthComponents/MyBrand";
import MyTextInput from "../../common-components/MyTextInput";
import {connect} from 'react-redux'
import {loginUser, isUserLogged} from "../../actions/AuthActions";
import firebase from "firebase";

let windowWidth = Dimensions.get('window').width;

class Login extends Component {
    state = {
        emailState: '',
        passwordState: '',
        yeniHesapState: true,
        yeniHesapVeGiris: false,
        sirketMailVeAccessCode: true,
        yeniHesapBgColorControl: '#C2C2C2',
        girisBgColorControl: '#C2C2C2'
    };
    onPressLogin = () => {
        this.props.loginUser('Katmer@gmail.com', '123123');    //,  this.state.emailState              this.state.passwordState
    };
    onChangeUser = text => {
        this.setState({
            emailState: text
        });
    };
    onChangePassword = text => {
        this.setState({
            passwordState: text
        });
    };

    renderGirisButtonIndicator() {
        if (this.props.auth.loading) {
            return <View>
                <ActivityIndicator/>
            </View>
        } else {
            return (
                <View>
                    <MyButton myButtonText={"Enter"}
                              buttonBackgroundColor={'#803262'}
                              buttonTextColor={'white'}
                              buttonTextFontSize={15.2}
                              myButtonWidth={windowWidth / 1.2}
                              myButtonHeight={35}
                              myButtonMargin={2.5}
                              myButtonBorderColor={'#803262'}
                              myButtonBorderWidth={1}
                              myButtonBorderRadius={5}
                              myButtonAlignItems={"center"}
                              onClickMyButton={this.onPressLogin.bind(this)}
                              willThereIcon={false}/>
                </View>

            );
        }
    }

    renderGiris() {
        return <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <View>
                <MyTextInput myInputHint={'email@address.com'}
                             myInputIcon={'ios-mail'}
                             myInputValue={this.state.emailState}
                             myInputBackgroundColor={'transparent'}
                             willThereIcon={true}
                             myOnChangeText={this.onChangeUser.bind(this)}
                             myInputsViewPadding={20}
                />
                <MyTextInput myInputHint={'Your password'}
                             myInputIcon={'md-key'}
                             myInputValue={this.state.passwordState}
                             mySecureTextEntry={true}
                             willThereIcon={true}
                             myOnChangeText={this.onChangePassword.bind(this)}
                             myInputsViewPadding={20}/>
            </View>
            <Text style={styles.loginFailed}>{this.props.auth.errorLoging}</Text>
            {this.renderGirisButtonIndicator()}
        </View>
    }

    renderBottomTexts() {
        return <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <MyText myText={"Terms of Service"}
                    myTextColor={'black'}
                    myTextFontSize={12}
                    myTextMarginLeft={60}/>
            <MyText myText={"Privacy Policy"}
                    myTextColor={'black'}
                    myTextFontSize={12}
                    myTextMarginRight={60}/>
        </View>
    }

    renderMyBrand() {
        return <View style={{marginBottom: 50}}>
            <MyBrand/>
        </View>
    }

    renderEntrance() {
        return <View style={{flexDirection: 'row',alignItems: 'center', padding: 5}}>
            <View>
                <MyBrand/>
            </View>
            <View style={{flexDirection: 'column',marginTop:20,marginLeft:20}}>
                <Text style={{fontSize: 17.5, fontWeight: 'bold'}}>Welcome to Msrebecca</Text>
                <Text style={{fontSize: 13, fontWeight: 'normal', marginTop: 15}}>Enter your email and password</Text>
            </View>
        </View>
    }

    render() {
        let backgroundImage = require("../../common-components/background.jpg");
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <KeyboardAvoidingView style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 80
                }} behavior="padding" enabled>
                    {
                        this.renderEntrance()
                    }
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 250,
                        backgroundColor: 'transparent'
                    }}>
                        {
                            this.renderGiris()
                        }
                        {
                            this.renderBottomTexts()
                        }
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {loginUser, isUserLogged})(Login);

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        // remove width and height to override fixed static size
        width: null,
        height: null,
        position: 'relative',
    },
    loginFailed: {
        color: 'grey',
        fontSize: 12,
        margin: 5
    }
});
