import React, {Component} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;
class DocImage extends Component {

    render() {
        return (
            <Image
                style={{height: '35%', width: windowWidth, justifyContent: 'center', top:0, opacity:0.85}}
                source={{uri: this.props.uri}}
            />
        )
    }
}

export default DocImage;
