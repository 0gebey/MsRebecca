import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from "../../common-components/Header";
import {TabView, SceneMap, TabBar} from 'react-native-tab-view'
import Guide from "./Tabs/Guide";
import ErrorsMistakes from "./Tabs/ErrorsMistakes";
import TipsShortcuts from "./Tabs/TipsShortcuts";

export default class DocMain extends Component {
    state = {
        baslik: "Documents",
        index: 0,
        routes: [
            {key: '1', title: 'Tutorials'},
            {key: '2', title: "Dont's"},
            {key: '3', title: 'Tips'}
        ],
    };

    _renderScene = SceneMap({
        '1': Guide,
        '2': ErrorsMistakes,
        '3': TipsShortcuts
    });

    renderHeader = () => {
        return <Header headerBaslik={this.state.baslik}
                       headerRightButtonClick={this.onPressLogout}
                       headerRightButtonExist={false}
                       headerLeftButtonExist={true}
        />;
    };
    render() {
        return (
            <View style={styles._mainContainer}>
                {this.renderHeader()}
                <TabView
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderTabBar={props => (
                        <TabBar
                            {...props}
                            indicatorStyle={styles.indicator}
                            tabStyle={styles.tabStyle}
                        />
                    )}
                    onIndexChange={index => this.setState({ index })}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    _mainContainer: {
        flex: 1,
    },
    tabStyle: {
        color:'black',
        backgroundColor:'#4e3352',
    },
    indicator: {
        backgroundColor: '#ffffff',
    },
    content: {
        backgroundColor: 'grey'
    },
    contentText: {
        color: 'black',
    },

});




