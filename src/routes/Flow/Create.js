import React, { Component } from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import MyButton from "../../common-components/MyButton";
import Header from "../../common-components/Header";
import {Actions} from 'react-native-router-flux';
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

export default class Create extends Component {
    state = {
        baslik: "Create",
    };
    headerLeftButtonOnPress = () => {
        Actions.Flow();
    };
    goToAddImageVideoText = () => {
        Actions.AddImageVideoText();
    };
    goToAddPoll = () => {
        Actions.AddPoll();
    };

    renderHeader = () => {
        return <Header headerBaslik={this.state.baslik}
                       headerRightButtonClick={this.onPressLogout}
                       headerRightButtonExist={false}
                       headerLeftButtonExist={true}
                       headerLeftIconName={"angle-left"}
                       headerLeftIconSize={38}
                       headerLeftButtonClick={this.headerLeftButtonOnPress}
        />;
    };
    renderFeedComponentOptions () {
        return <View style={{marginTop: 10}}>
            <MyButton onClickMyButton={this.goToAddImageVideoText}
                      myButtonText={"Image / Video / Text"}
                      buttonBackgroundColor={'transparent'}
                      buttonTextColor={'black'}
                      myButtonWidth={windowWidth}
                      myButtonHeight={40}
                      myButtonPadHorizontal={10}
                      willThereIcon={true}
                      myButtonIconName={"md-image"}
                      myButtonIconColor={'#803262'}/>
            <MyButton onClickMyButton={this.goToAddPoll}
                      myButtonText={"Survey"}
                      buttonBackgroundColor={'transparent'}
                      buttonTextColor={'black'}
                      myButtonWidth={windowWidth}
                      myButtonHeight={40}
                      myButtonPadHorizontal={10}
                      willThereIcon={true}
                      myButtonIconName={"md-trending-up"}
                      myButtonIconColor={'#803262'}/>
            <MyButton onClickMyButton={this.createPost}
                      myButtonText={"Voice"}
                      buttonBackgroundColor={'transparent'}
                      buttonTextColor={'black'}
                      myButtonWidth={windowWidth}
                      myButtonHeight={40}
                      myButtonPadHorizontal={10}
                      willThereIcon={true}
                      myButtonIconName={"md-microphone"}
                      myButtonIconColor={'#803262'}/>
            <MyButton onClickMyButton={this.createPost}
                      myButtonText={"Document"}
                      buttonBackgroundColor={'transparent'}
                      buttonTextColor={'black'}
                      myButtonWidth={windowWidth}
                      myButtonHeight={40}
                      myButtonPadHorizontal={10}
                      willThereIcon={true}
                      myButtonIconName={"md-document"}
                      myButtonIconColor={'#803262'}/>
        </View>
    }

    render() {
        return (
            <View style={styles._mainContainer}>
                {this.renderHeader()}
                <Text style={{marginTop: 10, marginLeft:10}}>What do you want to add ?</Text>
                {this.renderFeedComponentOptions()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    _mainContainer: {
        flex: 1,
    },
    renderSeparator: {
        height: 0.6,
        width: windowWidth,
        backgroundColor: "grey",
    },
});
