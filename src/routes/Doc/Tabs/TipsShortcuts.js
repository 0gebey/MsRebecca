import React, { Component } from 'react';
import { View } from 'react-native';
import DocImage from "../../../common-components/DocImage";
import DocButton from "../DocButton";
import {Actions} from "react-native-router-flux";

export default class TipsShortcuts extends Component {
    state= {
        uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRCOSimeBSsgil4h1wkuMQgA_vemFL_2g1jQ_DP8f4mL3KlyhytQ&s'
    };
    render() {
        return (
            <View style={{ flex: 1,alignItems: "center" }}>
                <DocImage uri={this.state.uri}/>
                <DocButton
                    onPressDocButton={() =>  Actions.OpenVideo({
                        videoUrl: 'https://www.youtube.com/embed/rN0FrDpQNUk',
                    })}
                    DocButtonText={"Getting organized better"}/>
                <DocButton
                    onPressDocButton={() =>  Actions.OpenVideo({
                        videoUrl: 'https://www.youtube.com/embed/rN0FrDpQNUk',
                    })}
                    DocButtonText={"How to stay more focussed"}/>
                <DocButton
                    onPressDocButton={() =>  Actions.OpenVideo({
                        videoUrl: 'https://www.youtube.com/embed/rN0FrDpQNUk',
                    })}
                    DocButtonText={"Providing great service"}/>
                <DocButton
                    onPressDocButton={() =>  Actions.OpenVideo({
                        videoUrl: 'https://www.youtube.com/embed/rN0FrDpQNUk',
                    })}
                    DocButtonText={"When testing Application Using X"}/>
                <DocButton
                    onPressDocButton={() =>  Actions.OpenVideo({
                        videoUrl: 'https://www.youtube.com/embed/rN0FrDpQNUk',
                    })}
                    DocButtonText={"How to work more efficient in field X ?"}/>
            </View>
        );
    }
}
