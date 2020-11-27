import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, Button, Alert, StyleSheet, TextInput, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {refleshTime, deletePost, favorite, like, sendComment, dislike} from '../../actions/PostActions';
import {fetchFavourites, fetchLikes, fetchProfile} from '../../actions/ProfileActions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CheckBox} from "react-native-elements";
import MyButton from "../../common-components/MyButton";
import {announcePollResults, refleshDueTime, vote} from '../../actions/PollActions';
import ActionSheet from 'react-native-actionsheet'
import EvilIcons from "react-native-vector-icons/EvilIcons";
import firebase from "firebase";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

let windowWidth = Dimensions.get('window').width;
let pollWidth = Dimensions.get('window').width / 1.125;



class PostModal extends Component {
    state = {
        checked: false,
        focusedIndex: null,
        pollResults: false,
        name: '',
        surname: '',
        imageLoading: false,
        favorites: [],
        likes : [],
        message: '',
        showMessages: false,
    };

    componentWillMount() {
        this.props.fetchProfile();
        this.props.fetchFavourites();
        this.props.fetchLikes();
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.refleshTime(this.props.postKey);
        }, 1500);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({
                name: nextProps.profile.profile.name,
                surname: nextProps.profile.profile.surname,
            });
        }
    }

    // post funcs
    onWriteComment = text => {
        this.setState({
            message: text
        });
    };

    onSendComment = () => {
        this.props.sendComment(this.props.postKey, this.props.comments_number, this.state.message, this.state.name+' '+this.state.surname);
        this.setState({
            message: ''
        });
    };
    showMessages = () => {
        this.setState({
            showMessages: !this.state.showMessages
        });
    };
    renderSendMessage() {
        if (this.state.message.length > 0) {
            return (
                <TouchableOpacity onPress={this.onSendComment.bind(this)}>
                    <View>
                        <Text style={{color: '#0091FA'}}>Send</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    };

    renderShowMessages = () => {
        if (!this.state.showMessages) {
            return (
                <TouchableOpacity style={{marginVertical: 10}} onPress={this.showMessages.bind(this)}>
                    <View style={{flexDirection: 'row'}}>
                        <EvilIcons name="comment" size={27} style={{marginRight: 3}} color={'grey'}/>
                        <View style={{width: 25}}>
                            <Text style={styles.textSeeComments}>{this.props.comments_number}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={{marginVertical: 10}} onPress={this.showMessages.bind(this)}>
                    <View style={{flexDirection: 'row'}}>
                        <EvilIcons name="comment" size={27} style={{marginRight: 3}} color={'black'}/>
                        <View style={{width: 25}}>
                            <Text style={styles.textSeeComments}>{this.props.comments_number}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    };

    renderMessages = () => {
        if (this.props.comments !== undefined) {
            const arrayMessages = Object.values(this.props.comments);
            const arrayKeys = Object.keys(this.props.comments);
            if (this.state.showMessages) {
                return arrayMessages.map((message, i) => {
                    return (
                        <View style={styles.messages} key={arrayKeys[i]}>
                            <Text style={[styles.username, {fontSize: 13}]}>{message.username}:</Text>
                            <Text style={[styles.text, {fontSize: 13}]}>{message.message}</Text>
                        </View>
                    );
                });
            }
        }
    };
    renderFav = () => {
        if (this.props.profile.favorites && this.props.profile.favorites.size !== null || undefined) {
            if (this.props.profile.favorites.includes(this.props.postKey)) {
                return (
                    <View style={{marginVertical: 10}}>
                        <TouchableOpacity onPress={() => this.props.favorite(this.props.postKey)}>
                            <View style={{width: 25}}>
                                <EvilIcons name="star" size={27}  color="#803262"/>
                            </View>
                        </TouchableOpacity>
                    </View>

                );
            } else {
                return (
                    <View style={{marginVertical: 10}}>
                        <TouchableOpacity onPress={() => this.props.favorite(this.props.postKey)}>
                            <View style={{width: 25}}>
                                <EvilIcons name="star" size={27}  color={'grey'}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                );
            }
        } else
            return (
                <View style={{marginVertical: 10}}>
                    <TouchableOpacity onPress={() => this.props.favorite(this.props.postKey)}>
                        <View style={{width: 25}}>
                            <EvilIcons name="star" size={27} color="grey"/>
                        </View>
                    </TouchableOpacity>
                </View>

            );
    };
    like = () => {
        this.props.like(this.props.postKey, this.props.likes);
    };
    dislike = () => {
        this.props.dislike(this.props.postKey, this.props.likes);
    };
    renderHeart = () => {
        var user = firebase.auth().currentUser

        if (undefined !== this.props.likedByWho && this.props.likedByWho.length) {
            for (var i = 0; i < this.props.likedByWho.length; i++) {
                if (this.props.likedByWho.includes(user.uid)) {
                    return (
                        <TouchableOpacity style={{marginVertical: 10}} onPress={this.dislike.bind(this)}>
                            <View style={{flexDirection: 'row'}}>
                                <EvilIcons name="heart" size={27} style={{marginRight: 3}} color="red"/>
                                <View style={{width: 25}}>
                                    <Text style={styles.textSeeComments}>{this.props.likes}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                } else{
                    return (
                        <TouchableOpacity style={{marginVertical: 10}} onPress={this.like.bind(this)}>
                            <View style={{flexDirection: 'row'}}>
                                <EvilIcons name="heart" size={27} style={{marginRight: 3}} color={'grey'}/>
                                <View style={{width: 25}}>
                                    <Text style={styles.textSeeComments}>{this.props.likes}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }
            }
        } else {
            return (
                <TouchableOpacity style={{marginVertical: 10}} onPress={this.like.bind(this)}>
                    <View style={{flexDirection: 'row'}}>
                        <EvilIcons name="heart" size={27} style={{marginRight: 3}} color={'grey'}/>
                        <View style={{width: 25}}>
                            <Text style={styles.textSeeComments}>{this.props.likes}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    };
    renderImage = () => {
        return (
            <TouchableOpacity activeOpacity={0.7}>
                {
                    this.props.image
                        ?
                        <View style={{flexDirection: 'row'}}>

                            <Image source={{uri: this.props.image}} style={styles.image}/>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <Text style={styles.text}>{this.props.title}</Text>
                            </View>
                        </View>
                        :
                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <Text style={styles.text}>{this.props.title}</Text>
                        </View>
                }
            </TouchableOpacity>
        );
    };

    renderMorePost = () => {
        this.ActionSheet.show()
    };

    // these are poll funcs

    handleChecked = (index) => {
        return index === this.state.focusedIndex ? 'dot-circle-o' : 'circle-o'
    };

    handleUnchecked = (index) => {
        return index === this.state.focusedIndex ? 'circle-o' : 'circle-o'
    };

    vote = () => {
        this.props.vote(this.state.focusedIndex, this.props.postKey);
        alert('Vote saved!')
    };

    returnPollDue(duration) {
        let day = Math.floor(duration / 86400000);
        let hour = Math.floor((duration - (86400000 * day)) / 3600000);
        let min = Math.floor(((duration - [(86400000 * day) + (3600000 * hour)]) / 60000));
        if (duration === 'Limitless') {
            return 'Limitless';
        } else {
            return (day !== 0 ? day + ' day ' : '') +
                (hour !== 0 ? hour + ' hours ' : '') +
                (min !== 0 ? min + ' minute' : '')
        }
    }

    render() {

        if (this.props.type === 1)    //if post is with image
            return (
                <View style={{padding: 15, width: windowWidth, backgroundColor: 'transparent'}}>
                    <View style={{margin: 5, flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={{uri: this.props.userpic}} style={styles.userPic}/>
                        <Text style={styles.usernameTop}>{this.props.username}</Text>
                        <Text
                            style={styles.textDate}>• {this.props.date ? this.props.date + ' ago' : 'now'}</Text>
                        <TouchableOpacity onPress={this.renderMorePost}>
                            <View>
                                <Ionicons name="md-more" size={30} color={'grey'}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {this.renderImage()}

                    <View style={{flexDirection: 'row'}}>
                        {this.renderHeart()}
                        {this.renderShowMessages()}
                        {this.renderFav()}
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TextInput
                            onChangeText={this.onWriteComment.bind(this)}
                            style={styles.writeComment}
                            value={this.state.message}
                            placeholder="Write a message..."
                        />
                        {this.renderSendMessage()}
                    </View>

                    <View style={styles.seeComments}>
                        {this.renderMessages()}
                    </View>
                    <View>
                        <ActionSheet
                            styles={stylesActionSheet}
                            ref={o => this.ActionSheet = o}
                            title={'Admin Actions'}
                            options={['Delete post', 'Disable Commenting','Cancel']}
                            cancelButtonIndex={2}
                            destructiveButtonIndex={0}
                            onPress={
                                (index) => {
                                    if (index === 0) this.props.deletePost(this.props.postKey);
                                    if (index === 1) alert('This feature will be added in the future');
                                }
                            }
                        />
                    </View>
                </View>
            );
        else {
            if (this.props.isResulted === true) {
                return (
                    <View style={{padding: 15, width: windowWidth, backgroundColor: 'transparent'}}>
                        <View style={{margin: 5, flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={{uri: this.props.userpic}} style={styles.userPic}/>
                            <Text style={styles.usernameTop}>{this.props.username}</Text>
                            <Text
                                style={styles.textDate}>• {this.props.date
                                ? this.props.date + ' ago' : 'now'} </Text>
                            <TouchableOpacity onPress={this.renderMorePost}>
                                <View>
                                    <Ionicons name="md-more" size={30} color={'grey'}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Text>{this.props.question}</Text>
                        {this.props.answers.map((text, index) => {
                            return <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{
                                    width: ((pollWidth / this.props.totalVoteNumber) * (Object.values(this.props.votes[index]))),
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        justifyContent: 'center',
                                        width: '100%',
                                        height: 20,
                                        backgroundColor: '#ff7878',
                                        borderRadius: 5,
                                        margin: 7,
                                    }}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{marginLeft: 2.5, position: 'absolute', fontSize: 12.5}}>
                                                {((text).length > 45) ?
                                                    (((text).substring(0, 45 - 3)) + '...') :
                                                    text}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <Text style={{right: 5, position: 'absolute', fontSize: 12.5}}>
                                    {'%' + Math.round((Object.values(this.props.votes[index]) / this.props.totalVoteNumber) * 100)} </Text>

                            </View>
                        })}
                        <Text style={{color: 'grey', fontSize: 12, marginBottom: 4}}>
                            {this.props.totalVoteNumber ? this.props.totalVoteNumber + ' times voted' : '0 times voted'}
                        </Text>

                        <View>
                            <ActionSheet
                                styles={stylesActionSheet}
                                ref={o => this.ActionSheet = o}
                                title={'Admin Actions ?'}
                                options={['Delete post', 'Disable Commenting', 'Cancel']}
                                cancelButtonIndex={2}
                                destructiveButtonIndex={0}
                                onPress={
                                    (index) => {
                                        if (index === 0) this.props.deletePost(this.props.postKey);
                                        if (index === 1) alert('This feature will be added in the future');
                                        if (index === 2) alert('Announce results')
                                    }
                                }
                            />
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={{padding: 15, width: windowWidth, backgroundColor: 'transparent'}}>
                        <View style={{margin: 5, flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={{uri: this.props.userpic}} style={styles.userPic}/>
                            <Text style={styles.usernameTop}>{this.props.username}</Text>
                            <Text
                                style={styles.textDate}>• {this.props.date ? this.props.date + ' ago' : 'now'} </Text>
                            <TouchableOpacity onPress={this.renderMorePost}>
                                <View>
                                    <Ionicons name="md-more" size={30} color={'grey'}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Text> {this.props.question} </Text>
                        {this.props.answers.map((text, index) => {
                            return <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <CheckBox
                                    containerStyle={{}}
                                    uncheckedColor={'#803262'}
                                    checkedColor={'#803262'}
                                    center
                                    checkedIcon={this.handleChecked(index)}
                                    uncheckedIcon={this.handleUnchecked(index)}
                                    checked={this.state.checked}
                                    onPress={() => this.setState({
                                        checked: true,
                                        focusedIndex: index,
                                    })} //alert(text)
                                />
                                <Text style={{flex: 1}}> {text}  </Text>
                            </View>
                        })}
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <MyButton myButtonText={"Vote"}
                                      buttonBackgroundColor={'transparent'}
                                      buttonTextColor={'#803262'}
                                      myButtonWidth={windowWidth / 5}
                                      myButtonHeight={35}
                                      myButtonMargin={10}
                                      myButtonBorderColor={'#803262'}
                                      myButtonBorderWidth={1}
                                      myButtonBorderRadius={25}
                                      myButtonAlignItems={"center"}
                                      onClickMyButton={this.vote}
                                      willThereIcon={false}/>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={{color: 'grey', fontSize: 12, marginBottom: 4}}>
                                    {this.props.totalVoteNumber ? this.props.totalVoteNumber + ' times voted' : '0 times voted'}
                                </Text>
                                <Text style={{color: 'grey', fontSize: 11}}>
                                    Poll Duration: {this.returnPollDue(this.props.dueAsMs)}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <ActionSheet
                                styles={stylesActionSheet}
                                ref={o => this.ActionSheet = o}
                                title={'Admin Actions'}
                                options={['Delete post', 'Cancel', 'Announce results']}
                                cancelButtonIndex={1}
                                destructiveButtonIndex={0}
                                onPress={
                                    (index) => {
                                        if (index === 0) this.props.deletePost(this.props.postKey);
                                        if (index === 2) this.props.announcePollResults(this.props.postKey)
                                    }
                                }
                            />
                        </View>
                    </View>
                )
            }

        }
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    posts: state.post,
});
export default connect(
    mapStateToProps,
    {vote, refleshTime, deletePost, announcePollResults, refleshDueTime, sendComment, fetchProfile, fetchFavourites, favorite, fetchLikes, like, dislike}
)(PostModal);

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: 150,
        height: 120,
    },
    username: {
        fontSize: 15,
        fontWeight: 'bold',
        margin: 15,
        marginTop: 1,
        marginRight: 5,
        marginBottom: 1
    },
    text: {
        flex: 1,
        padding: 3.5,
        fontSize: 15,
    },
    textDate: {
        flex: 1,
        padding: 3.5,
        fontSize: 12.5,
        color: 'grey',
    },
    seeComments: {
        margin: 15,
        marginTop: 1,
        marginLeft: 15
    },
    textSeeComments: {
        fontSize: 13.5,
        fontWeight: 'bold',
        color: 'grey',
        paddingTop: 2
    },
    usernameTop: {
        marginLeft: 5,
        fontWeight: 'bold'
    },
    userPic: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    writeComment: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderRadius: 0,
        borderWidth: 0,
        flex:1
    },
    messages: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 2.5,
    },
});

const stylesActionSheet = {
    titleBox: {
        background: 'red'
    },
    titleText: {
        fontSize: 16,
        color: '#000'
    }
}
