import {Image, View, StyleSheet, Dimensions} from "react-native"
import React from "react"
let windowWidth = Dimensions.get('window').width;

const MyBrand = props => {
    return (
        <Image source={require('./rebecca.jpg')}
               style={{width: 75, height: 75, marginTop:15,borderRadius:75/2 ,opacity:0.92}}>
        </Image>
    )
};


export default MyBrand;
