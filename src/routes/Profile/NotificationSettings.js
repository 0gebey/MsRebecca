import React, {Component} from 'react';
import {Text, View, TextInput, Button, TouchableOpacity, StyleSheet, ImageBackground, Dimensions, ScrollView, Switch, Alert} from 'react-native';
import Header from "../../common-components/Header";
import {Actions} from "react-native-router-flux";
import AsyncStorage from '@react-native-community/async-storage';


let windowWidth = Dimensions.get('window').width;

export default class NotificationSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            showNotification: null,
            priority: null,
            iconBadge: null,
            lockScreen: null,
            soundOn: null,
            vibrationOn: null,
            notificationLight: null,
            floatingNotification: null,
        

        };
    };
         
    storeData = async () => {
            let settings = {
                showNotification: this.state.showNotification,
                priority: this.state.priority,
                iconBadge: this.state.iconBadge,
                lockScreen: this.state.lockScreen,
                soundOn: this.state.soundOn,
                vibrationOn: this.state.vibrationOn,
                notificationLight: this.state.notificationLight,
                floatingNotification: this.state.floatingNotification
            }
        try {
          const jsonValue = JSON.stringify(settings)
          await AsyncStorage.setItem('NotificationSettings', jsonValue)
        } catch (e) {
          console.log(e)
        }
      }
    

        

    getData = async () => {
    const jsonValue = await AsyncStorage.getItem('NotificationSettings')
    let settings = JSON.parse(jsonValue);
    this.setState({
        showNotification: settings.showNotification,
        priority: settings.priority,
        iconBadge: settings.iconBadge,
        lockScreen: settings.lockScreen,
        soundOn: settings.soundOn,
        vibrationOn: settings.vibrationOn,
        notificationLight: settings.notificationLight,
        floatingNotification: settings.floatingNotification
    })
  }

  componentWillMount() {
      this.getData();
  }

    renderHeader = () => {
        return <Header headerBaslik={"Notification Settings"}
                       headerLeftButtonClick={this.headerLeftButtonOnPress}
                       headerRightButtonExist={false}
                       headerLeftIconName={"arrow-left"}
                       headerLeftIconSize={20}
                       headerLeftButtonExist={true}/>;
    };

    headerLeftButtonOnPress = () => {
        this.storeData();
        Actions.Profile();
    };


    toggleShowNotification = () => {
        this.setState(
            { showNotification: !this.state.showNotification  }
        )
        if(this.state.showNotification === false) {
            this.setState({
                priority: false,
                iconBadge: false,
                lockScreen: false,
                vibrationOn: false,
                notificationLight: false,
                floatingNotification: false,
                soundOn: false,
            }              
            )
        }
    }
    togglePriority = () => {
        this.setState(
            { priority: !this.state.priority }
        )
    }
    toggleIconBadge = () => {
        this.setState(
            { iconBadge: !this.state.iconBadge }
        )
    }
    toggleLockScreen = () => {
        this.setState(
            { lockScreen: !this.state.lockScreen }
        )
        }
    toggleVibration = () => {
        this.setState(
            { vibrationOn: !this.state.vibrationOn }
        )
    } 
    toggleNotificationLight = () => {
        this.setState(
            { notificationLight: !this.state.notificationLight }
        )
    }
    toggleFloatingNotification = () => {
        this.setState(
            { floatingNotification: !this.state.floatingNotification }
        )
    }
    toggleSound = () => {
        this.setState(
            { soundOn: !this.state.soundOn }
        )
    }

    render() {
        let backgroundImage = require("../../common-components/background.jpg");
        const  {showNotification,priority,lockScreen,vibrationOn,notificationLight,floatingNotification,soundOn,iconBadge}  = this.state;
        return(
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            {this.renderHeader()}
            <ScrollView contentContainerStyle={styles._mainScrollview}
                        scrollEventThrottle={200}
                        directionalLockEnabled={true}>
            <View style= {{borderBottomWidth: 1,flex: 1,justifyContent:'center',alignItems: 'center',marginBottom: 20}}>
                 <Text style= {{color: '#803262',fontSize: 24,justifyContent: 'center', alignItems: 'center'}}>
                    Control Notification Settings
                </Text>
            </View>   

            <View style= {styles.settingsView}>
                <Text style = {styles.settingsText}> Show Notifications </Text>
                <Switch
                    trackColor={{false: 'gray', true: 'teal'}}
                    thumbColor="white"
                    ios_backgroundColor="gray"
                    onValueChange={this.toggleShowNotification}
                    value={showNotification}
              
                />
            </View>
            <View style= {styles.settingsView}>
                <Text style = {styles.settingsText}> Sound On<Text style={styles.subtitleText}>{"\n"} Switch Sound ON/OFF </Text>  </Text>
                <Switch
                    trackColor={{false: 'gray', true: 'teal'}}
                    thumbColor="white"
                    ios_backgroundColor="gray"
                    onValueChange={this.toggleSound}
                    value={soundOn}
                    disabled={showNotification === false}
                
                />
            </View>
            <View style= {styles.settingsView}>
                <Text style = {styles.settingsText}> Priority <Text style={styles.subtitleText}>{"\n"} Show notifications at the top of the list </Text> </Text>
                <Switch
                    trackColor={{false: 'gray', true: 'teal'}}
                    thumbColor="white"
                    ios_backgroundColor="gray"
                    onValueChange={this.togglePriority}
                    value={priority}
                    disabled={showNotification === false}
              
                />
            </View>
            <View style= {styles.settingsView}>
                <Text style = {styles.settingsText}> Floating Notifications <Text style={styles.subtitleText}>{"\n"} Allow important notifications at the top of the screen </Text> </Text>
                <Switch
                    trackColor={{false: 'gray', true: 'teal'}}
                    thumbColor="white"
                    ios_backgroundColor="gray"
                    onValueChange={this.toggleFloatingNotification}
                    value={floatingNotification}
                    disabled={showNotification === false}
              
                />
            </View>
            <View style= {styles.settingsView}>
                <Text style = {styles.settingsText}> Notification Light <Text style={styles.subtitleText}>{"\n"} Switch the Light ON/OFF </Text> </Text>
                <Switch
                    trackColor={{false: 'gray', true: 'teal'}}
                    thumbColor="white"
                    ios_backgroundColor="gray"
                    onValueChange={this.toggleNotificationLight}
                    value={notificationLight}
                    disabled={showNotification === false}
              
                />
            </View>
            <View style= {styles.settingsView}>
                <Text style = {styles.settingsText}> Lock Screen Notifications <Text style={styles.subtitleText}>{"\n"} Allow important notifications on the Lock Screen </Text> </Text>
                <Switch
                    trackColor={{false: 'gray', true: 'teal'}}
                    thumbColor="white"
                    ios_backgroundColor="gray"
                    onValueChange={this.toggleLockScreen}
                    value={lockScreen}
                    disabled={showNotification === false}
              
                />
            </View>
            <View style= {styles.settingsView}>
                <Text style = {styles.settingsText}> Vibration On <Text style={styles.subtitleText}>{"\n"} Switch Vibration ON/OFF </Text> </Text>
                <Switch
                    trackColor={{false: 'gray', true: 'teal'}}
                    thumbColor="white"
                    ios_backgroundColor="gray"
                    onValueChange={this.toggleVibration}
                    value={vibrationOn}
                    disabled={showNotification === false}
              
                />
            </View>
            <View style= {styles.settingsView}>
                <Text style = {styles.settingsText}> Appp Icon Badge <Text style={styles.subtitleText}>{"\n"} Icon Badge ON/OFF </Text> </Text>
                <Switch
                    trackColor={{false: 'gray', true: 'teal'}}
                    thumbColor="white"
                    ios_backgroundColor="gray"
                    onValueChange={this.toggleIconBadge}
                    value={iconBadge}
                    disabled={showNotification === false}
              
                />
            </View>
            </ScrollView>
        </ImageBackground>
        )
    }

}


const styles = StyleSheet.create({
    _mainScrollview: {
        alignItems: 'center',
        width: windowWidth,
    },
    backgroundImage: {
        flex: 1,
        // remove width and height to override fixed static size
        width: null,
        height: null,
        position: 'relative'
    },
    settingsView: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        flexDirection: 'row',
        flex: 1,
        margin: 5
    },
    settingsText: {
        color: '#803262',
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    subtitleText: {
        fontWeight: 'normal',
        fontSize: 14,
    }
})

