import React, {Component} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import Header from '../../common-components/Header';
import {Actions} from 'react-native-router-flux';
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

export default class OpenVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baslik: "Video Screen",
        }
    }
    headerLeftButtonOnPress = () => {
        Actions.Doc();
    };
    renderHeader = () => {
        return <Header headerBaslik={this.state.baslik}
                       headerLeftButtonClick={this.headerLeftButtonOnPress}
                       headerRightButtonExist={false}
                       headerLeftIconName={"arrow-left"}
                       headerLeftIconSize={20}
                       headerLeftButtonExist={true}/>
    };
    render() {
        return (
            <View style={styles._mainContainer}>
                {this.renderHeader()}
                <WebView
                    useWebKit={true}
                    javaScriptEnabled={true}
                    allowsFullscreenVideo={false}
                    style={{
                        backgroundColor: 'transparent',
                    }}
                    source={{uri: this.props.videoUrl}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    _mainContainer: {
        height: windowHeight/2.5,
        width: windowWidth,
    }
});
