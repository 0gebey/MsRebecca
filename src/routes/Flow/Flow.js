import React, { Component } from 'react';
import {ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {checkIfUserLoggedOnce} from "../../actions/AuthActions";
import {Actions } from 'react-native-router-flux';
import Header from "../../common-components/Header";
import {fetchPosts} from "../../actions/PostActions";
import {fetchPolls} from "../../actions/PollActions";
import PostModal from "./PostModal";

class Flow extends Component {
    state = {
        baslik: "Flow",
        posts: [],
        polls: [],
        isLoggedOnceState: false
    };

    componentWillMount() {
        this.props.fetchPosts();
        this.props.fetchPolls();
    }
    componentDidMount() {
        this.props.checkIfUserLoggedOnce();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({
                posts: nextProps.posts.posts,
                polls: nextProps.polls.polls,
            });
        }
    }
    onPressCreate = () => {
        Actions.Create()
    };
    goToChatRoom = () => {
        Actions.ChatRoom();
    };
    goToQrScanner = () => {
        Actions.QRScanner();
    };
    renderHeader = () => {
        return <Header headerBaslik={this.state.baslik}
                       headerRightButtonClick={this.onPressCreate}
                       headerRightButtonExist={true}
                       headerRightIconName={"ios-add"}
                       headerRightIconSize={35}
                       headerLeftButtonExist={false}
        />;
    };

    renderPosts() {
        if (this.state.posts === undefined || this.state.posts.length === 0) {
            return (
                <View>
                    <Text> </Text>
                </View>
            );
        } else {
            const arrayPosts = Object.values(this.state.posts);
            const keysPosts = Object.keys(this.state.posts);
            return arrayPosts.map((post, i) => {
                return <PostModal {...post} key={keysPosts[i]} postKey={keysPosts[i]}/>;
            }).reverse(); // son atılanın en başa gelmesini sağlıyor :)
        }
    }

    render() {
        let backgroundImage = require("../../common-components/background.jpg");
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <StatusBar hidden />
                {this.renderHeader()}
                {
                    <ScrollView contentContainerStyle={styles._mainScrollview}
                                scrollEventThrottle={200}
                                directionalLockEnabled={true}>
                        {this.renderPosts()}
                    </ScrollView>
                }
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.post,
    polls: state.poll
});


export default connect(
    mapStateToProps,
    {checkIfUserLoggedOnce,fetchPosts,fetchPolls}
)(Flow);

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        // remove width and height to override fixed static size
        width: null,
        height: null,
        position: 'relative'
    },
});
