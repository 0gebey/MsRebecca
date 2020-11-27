import React, { Component } from 'react';
import {View} from 'react-native';
import DocImage from "../../../common-components/DocImage";
import DocButton from "../DocButton";
import {Actions} from "react-native-router-flux";

export default class Guide extends Component {
    state= {
        uri:'https://previews.123rf.com/images/dragonimages/dragonimages1903/dragonimages190300062/117866418-process-of-work-on-a-big-company.jpg'
    };
    render() {
        return (
            <View style={{ flex: 1,alignItems: "center" }}>
               <DocImage uri={this.state.uri}/>
                <DocButton
                    onPressDocButton={() =>  Actions.OpenVideo({
                        videoUrl: 'https://www.youtube.com/embed/rN0FrDpQNUk',
                    })}
                    DocButtonText={"Getting Started in X company"}/>
                <DocButton
                    onPressDocButton={() =>  Actions.OpenVideo({
                        videoUrl: 'https://www.youtube.com/embed/rN0FrDpQNUk',
                    })}
                    DocButtonText={"Working in the field"}/>
                <DocButton
                    onPressDocButton={() =>  Actions.OpenVideo({
                        videoUrl: 'https://www.youtube.com/embed/rN0FrDpQNUk',
                    })}
                    DocButtonText={"Company Culture"}/>
                <DocButton
                    onPressDocButton={() =>  Actions.OpenVideo({
                        videoUrl: 'https://www.youtube.com/embed/rN0FrDpQNUk',
                    })}
                    DocButtonText={"Safety Guideline"}/>
            </View>
        );
    }
}
