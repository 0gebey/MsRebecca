import React, {Component} from 'react';
import {Text, View} from 'react-native';
import DocButton from '../DocButton';
import DocImage from '../../../common-components/DocImage';
import {Actions} from "react-native-router-flux";

export default class ErrorsMistakes extends Component {
    state = {
        uri: 'https://i2.wp.com/www.justwebworld.com/wp-content/uploads/2018/10/Company-Formation-Mistakes.jpg?resize=601%2C437&ssl=1',
    };

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <DocImage uri={this.state.uri}/>
                <DocButton
                    onPressDocButton={() =>  Actions.OpenVideo({
                        videoUrl: 'https://www.youtube.com/embed/rN0FrDpQNUk',
                    })}
                    DocButtonText={'Illegal and unethical purposes'}/>
                <DocButton
                    onPressDocButton={() =>  Actions.OpenVideo({
                        videoUrl: 'https://www.youtube.com/embed/rN0FrDpQNUk',
                    })}
                    DocButtonText={'Wrong Estimations'}/>
                <DocButton
                    onPressDocButton={() =>  Actions.OpenVideo({
                        videoUrl: 'https://www.youtube.com/embed/rN0FrDpQNUk',
                    })}
                    DocButtonText={'Waiting for help'}/>
                <DocButton
                    onPressDocButton={() =>  Actions.OpenVideo({
                        videoUrl: 'https://www.youtube.com/embed/rN0FrDpQNUk',
                    })}
                    DocButtonText={'Thinking too highly of yourself'}/>
            </View>
        );
    }
}
