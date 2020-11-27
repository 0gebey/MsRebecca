import React, { Component } from 'react';
import {ImageBackground, ScrollView,Button, Alert,StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {checkIfUserLoggedOnce} from "../../actions/AuthActions";
import {Actions } from 'react-native-router-flux';
import Header from "../../common-components/Header";
import {fetchPosts} from "../../actions/PostActions";
import PostModal from "../Flow/PostModal";
import {fetchFavourites} from "../../actions/ProfileActions";

class FavoritePosts extends Component {
    state = {
        baslik: "Favorite Posts",
        posts: [],
    };
    componentWillMount() {
        this.props.fetchPosts();
        this.props.fetchFavourites();
    }
    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({
                posts: nextProps.posts.posts,
            });
        }
    }
    headerLeftButtonOnPress = () => {
        Actions.Profile();
    };
    renderHeader = () => {
        return <Header headerBaslik={this.state.baslik}
                       headerRightButtonExist={false}
                       headerRightIconName={"ios-add"}
                       headerLeftIconSize={40}
                       headerLeftButtonExist={true}
                       headerLeftIconName={"angle-left"}
                       headerLeftButtonClick={this.headerLeftButtonOnPress}
        />;
    };

    renderFavoritePosts() {
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
                if (this.props.profile.favorites && this.props.profile.favorites.size !== null || undefined){
                    if(this.props.profile.favorites.includes(keysPosts[i])) {
                        return <PostModal {...post} key={keysPosts[i]} postKey={keysPosts[i]}/>;
                    }
                }
            }).reverse(); // son atılanın en başa gelmesini sağlıyor :)
        }
    }

    render() {
        let backgroundImage = require("../../common-components/background.jpg");
        return (

            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                {this.renderHeader()}
                {

                    <ScrollView contentContainerStyle={styles._mainScrollview}
                                scrollEventThrottle={200}
                                directionalLockEnabled={true}>
                        {this.renderFavoritePosts()}
                    </ScrollView>
                }
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    posts: state.post,
});


export default connect(
    mapStateToProps,
    {checkIfUserLoggedOnce,fetchPosts,fetchFavourites}
)(FavoritePosts);

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        // remove width and height to override fixed static size
        width: null,
        height: null,
        position: 'relative'
    },
});
