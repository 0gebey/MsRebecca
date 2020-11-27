import React, {Component} from 'react';
import {
    Text,
    Image,
    View,
    Platform,
    ScrollView,
    StyleSheet,
    Dimensions,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import {connect} from 'react-redux';
import {fetchProfile} from '../../../actions/ProfileActions';
import {addPost, selectImage, favorite} from '../../../actions/PostActions';
import {Actions} from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker'
import HeaderCreate from "../FlowComponents/HeaderCreate";
import FooterCreate from "../FlowComponents/FooterCreate";
import Ionicons from "react-native-vector-icons/Ionicons";
import RNFetchBlob from "react-native-fetch-blob";
import MyLoadingView from "../../../common-components/MyLoadingView";

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;
const options = {
    title: 'Fotoraf seçin',
    storageOptions: {
        skipBackup: true,
        path: 'images',
        disableButton: true,
        buttonOpacity: 0.35,
        isImagePicked: false,
    },
};
// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

// fetch-blob ve image-picker yüklemesi problem oluyor react 60 tan büyük olduğu için
// o yüzden podfile'dan bir ayar değiştirmek gerekiyor
//  https://github.com/joltup/rn-fetch-blob/pull/397/files

class AddImageVideoText extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('todos');
    }

    state = {
        baslik: 'Create Post',
        userpic: '',
        username: '',
        textPost: '',
        imagePost: '',
        imageShowInside: '',
        imageLoading: false,
        isImageSelected: false,
    };

    componentDidMount() {
        if (this.state.textPost === '') {
            this.setState({disableButton: true, buttonOpacity: 0.35})
        }
    }

    componentWillMount() {
        this.props.fetchProfile();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            console.log(nextProps);
            this.setState({
                userpic: nextProps.profile.profile.photo,
                username: nextProps.profile.profile.name + " " + nextProps.profile.profile.surname
            });
        }
    }

    onAddPost = () => {
        this.props.addPost(this.state.imagePost, this.state.textPost, this.state.username, this.state.userpic);
        Actions.Flow();
    };

    goToRecordVideo = () => {
        Actions.RecordVideo();
    };

    onPressBack = () => {
        Actions.Create();
    };

    guidGenerator() {
        let S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    onUploadImage(uri, mime = 'image/jpg') {
        return new Promise((resolve, reject) => {
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
            let uploadBlob = null;
            const {currentUser} = firebase.auth();

            const imageRef = firebase
                .storage()
                .ref(`/images/${currentUser.uid}`)
                .child(this.guidGenerator());

            fs.readFile(uploadUri, 'base64')
                .then(data => {
                    return Blob.build(data, {type: `${mime};BASE64`});
                })
                .then(blob => {
                    uploadBlob = blob;
                    return imageRef.put(blob, {contentType: mime});
                })
                .then(() => {
                    uploadBlob.close();
                    return imageRef.getDownloadURL();
                })
                .then(url => {
                    resolve(url);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    imagePickerFunc = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                let source = {uri: response.uri};
                this.setState({imageLoading: true});
                this.onUploadImage(response.uri).then(url => {
                    alert("Successful!");
                    this.setState({
                        imageLoading: false,
                        imageShowInside: source,
                        imagePost: url,
                        isImagePicked: true,
                    });
                });
            }
        });
    }

    renderHeader() {
        return <HeaderCreate
            headerCreateText={"New Post"}
            onClickGonderButton={this.onAddPost}
            gonderButtonOpacity={this.state.buttonOpacity}
            headerLeftIconName={"md-close"}
            headerLeftIconSize={25}
            headerLeftButtonClick={this.onPressBack}
            isGonderButtonDisabled={this.state.disableButton}
        />
    };

    renderFooter() {
        return <FooterCreate
            onClickMyButton={this.imagePickerFunc}
            onClickRecordVideo={this.goToRecordVideo}
        />
    };

    renderBody() {
        return <View
            style={{
                flexDirection: 'row',
                paddingHorizontal: 5,
                margin: 10,
                backgroundColor:'transparent'
            }}>
            <View style={{}}>
                <Image source={{uri: this.state.userpic}}
                       style={{marginRight: 15, width: 35, height: 35, borderRadius: 15}}
                />
            </View>
            <TextInput style={{
                width: 250,
                fontSize: 17.5,
            }} placeholderTextColor={"grey"}
                       onChangeText={this.disableButtonTransparency}
                       value={this.state.textPost}
                       placeholder='Type here...'
                       autoCorrect={false}
                       multiline={true}>
            </TextInput>
        </View>

    };

    disableButtonTransparency = textPost => {
        this.setState({textPost: textPost});
        if (!textPost) {
            this.setState({disableButton: true, buttonOpacity: 0.35})
        } else {
            this.setState({disableButton: false, buttonOpacity: 1})
        }
    };
    //daha içerdeki keyboardAvoigindView ios'ta height android'de padding
    render() {
        return (
            <View style={styles._addPostContainer}>
                {this.renderHeader()}
                <ScrollView style={styles._addPostScroll}>
                    {this.renderBody()}
                    <KeyboardAvoidingView
                        behavior="padding" enabled
                        keyboardVerticalOffset={0}>
                        {
                            this.state.imageLoading
                                ?
                                <MyLoadingView/>
                                :
                                this.state.isImagePicked
                                    ?
                                    <View style={styles._imageBackground}>
                                        <Image source={this.state.imageShowInside} style={styles._imagePostStyle}/>
                                    </View>
                                    :
                                    <View style={styles._imageBackground}>
                                    </View>
                        }
                    </KeyboardAvoidingView>
                </ScrollView>
                {this.renderFooter()}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(
    mapStateToProps,
    {selectImage, addPost, fetchProfile, favorite}
)(AddImageVideoText);

const styles = StyleSheet.create({
    _addPostContainer: {
        flex:1,
        width: windowWidth,
        alignItems: 'center',
        backgroundColor:'white'
    },
    _addPostScroll: {
        width: windowWidth,
    },
    _imagePostStyle: {
        aspectRatio: 0.9,
        resizeMode: 'contain',
        backgroundColor: 'transparent'
    },
    _imageBackground: {
        width: '100%',
        height: 300,
        flex: 1,
        position: 'relative',
        backgroundColor: 'white'
    },
});
