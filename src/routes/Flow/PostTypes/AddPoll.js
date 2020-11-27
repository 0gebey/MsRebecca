import React, {Component} from 'react';
import {
    Image,
    View,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    Dimensions,
    Switch, Text, TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchProfile} from '../../../actions/ProfileActions';
import {addPost, selectImage} from '../../../actions/PostActions';
import {addPoll} from '../../../actions/PollActions';
import {Actions} from 'react-native-router-flux';
import Ionicons from "react-native-vector-icons/Ionicons";
import MyLoadingView from "../../../common-components/MyLoadingView";
import Icon from "react-native-vector-icons/FontAwesome";
import MyPicker from "../FlowComponents/MyPicker";
import HeaderCreate from "../FlowComponents/HeaderCreate";
import FooterCreate from "../FlowComponents/FooterCreate";

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;


class AddPoll extends Component {
    constructor() {
        super();
        let textArray = Array(2).fill('');
        this.state = {
            textArray: textArray,
            focusedIndex: null,
            addIconControl: true,
            pickerValueGun: 1,
            pickerValueSaat: 0,
            pickerValueDakika: 0,
            showTimeControl: false,
            switchValue: true,
            baslik: 'Gönderi Oluştur',
            userpic: '',
            username: '',
            buttonOpacity: 0.35,
            disableButton: true,
            dueAsMs: 1000 * 60 * 60 * 24,
        }
    }

    componentDidMount() {

        if (this.state.textPost === '') {
            this.setState({disableButton: true, buttonOpacity: 0.35})
        }
    }

    componentWillMount() {
        this.props.fetchProfile();
    }

    denemeOnPress = () => {
        if (!this.state.switchValue) {
            console.log(this.state.pickerValueGun + ' Gün ' +
                this.state.pickerValueSaat + ' Saat ' + this.state.pickerValueDakika + ' Dakika')
        } else {
            console.log('Süresiz')
        }
    };

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            console.log(nextProps);
            this.setState({
                userpic: nextProps.profile.profile.photo,
                username: nextProps.profile.profile.name + " " + nextProps.profile.profile.surname,
                pickerValueGun: nextProps.pickerValueGun ? nextProps.pickerValueGun : 1,
                pickerValueSaat: nextProps.pickerValueSaat ? nextProps.pickerValueSaat : 0,
                pickerValueDakika: nextProps.pickerValueDakika ? nextProps.pickerValueDakika : 0,
                dueAsMs: nextProps.dueAsMs ? nextProps.dueAsMs : 1000 * 60 * 60 * 24,
                textArray: nextProps.textArray ? nextProps.textArray : this.state.textArray
            });
        }
    }

    onAddPoll = () => {
        this.props.addPoll(
            this.state.textPost,
            this.state.textArray,
            this.state.userpic,
            this.state.username,
            !this.state.switchValue ? this.state.dueAsMs : 'Limitless');
        Actions.reset('app');
    };

    onPressBack = () => {
        Actions.Create();
    };

    renderHeader() {
        return <HeaderCreate
            headerCreateText={"New Poll"}
            onClickGonderButton={this.onAddPoll}
            gonderButtonOpacity={this.state.buttonOpacity}
            headerLeftIconName={"md-close"}
            headerLeftIconSize={25}
            headerLeftButtonClick={this.onPressBack}
            isGonderButtonDisabled={this.state.disableButton}
        />
    };

    createPost = () => {
        Actions.addpost();
    };

    renderFooter() {
        return <FooterCreate
            onClickImage={this.createPost}
            onClickPoll={() => alert('You are already on poll module')}
            onClickLocation
        />
    };

    incrementInputCounter = () => {
        this.forceUpdate()
        this.state.textArray.length += 1;
        this.state.textArray.fill('', this.state.textArray.length - 1);
        if (this.state.textArray.length === 4) {
            this.setState({addIconControl: false});

        }
    };

    onChangeText = (text, index) => {
        // this function will handle setting of the state when each TextInput changes
        // as there are going to be a lot of setState calls
        // we need access the prevState before we set the next state.
        this.setState(prevState => {
            prevState.textArray[index] = text;
            return {
                textArray: prevState.textArray
            }
        }, () => console.log(this.state.textArray))
    };

    handleBorderColor = (index) => {
        return index === this.state.focusedIndex ? '#803262' : 'grey'
    };

    pickerHandleValueGun = (itemValue, itemIndex) => {
        this.setState({
            pickerValueGun: itemValue,
            dueAsMs: (itemValue * 24 * 60 * 60000) + (this.state.pickerValueSaat * 60 * 60000) + (this.state.pickerValueDakika * 60000)
        });
        if (itemValue === 7) {  // anketin maximum 7 gün olma koşulu
            this.setState({
                pickerValueSaat: 0,
                pickerValueDakika: 0,
                dueAsMs: 7 * 24 * 60 * 60000
            });
        }
        if ((this.state.pickerValueSaat === 0 && this.state.pickerValueDakika < 30)
            && itemValue === 0) { // Gün ve Saat 0, dakika da 30'dan az ise, 1 saat eklenmeli
            this.setState({
                pickerValueSaat: 1,
                dueAsMs: 60 * 60000
            });
        }
        console.log(this.state.dueAsMs)
    };

    pickerHandleValueSaat = (itemValue, itemIndex) => {
        this.setState({
            pickerValueSaat: itemValue,
            dueAsMs: (this.state.pickerValueGun * 24 * 60 * 60000) + (itemValue * 60 * 60000) + (this.state.pickerValueDakika * 60000)
        });
        if (this.state.pickerValueGun === 7) { // anketin maximum 7 gün olma koşulu
            this.setState({
                pickerValueSaat: 0,
                pickerValueDakika: 0,
                dueAsMs: 7 * 24 * 60 * 60000
            });
        }
        if ((this.state.pickerValueGun === 0 && this.state.pickerValueDakika < 30)
            && itemValue === 0) {  // gün ve saat 0, dakika da 30'dan az ise dakika en az 30 olmalıdır
            this.setState({
                pickerValueDakika: 30,
                dueAsMs: 30 * 60000
            });
        }
        console.log(this.state.dueAsMs)
    };

    pickerHandleValueDakika = (itemValue, itemIndex) => {
        this.setState({
            pickerValueDakika: itemValue,
            dueAsMs: (this.state.pickerValueGun * 24 * 60 * 60000) + (this.state.pickerValueSaat * 60 * 60000) + (itemValue * 60000)
        });
        if (this.state.pickerValueGun === 7) { // anketin maximum 7 gün olma koşulu
            this.setState({
                pickerValueSaat: 0,
                pickerValueDakika: 0,
                dueAsMs: 7 * 24 * 60 * 60000
            });
        }
        if ((this.state.pickerValueGun === 0 && this.state.pickerValueSaat === 0)
            && itemValue < 30) { //gün ve saat 0, dakika da 30'dan az ise dakika en az 30 olmalıdır
            this.setState({
                pickerValueDakika: 30,
                dueAsMs: 30 * 60000
            });
        }
        console.log(this.state.dueAsMs)
    };

    _valueTextGun() {
        if (this.state.pickerValueGun) return this.state.pickerValueGun + ' days ';
        else return ''
    }

    _valueTextSaat() {
        if (this.state.pickerValueSaat) return this.state.pickerValueSaat + ' hours ';
        else return ''
    }

    _valueTextDakika() {
        if (this.state.pickerValueDakika) return this.state.pickerValueDakika + ' minutes ';
        else return ''
    }

    _renderPicker() {
        return <View style={{flexDirection: 'row', justifyContent: 'center',}}>
            <MyPicker myPickerItemCount={7}
                      myPickerLabelName={'days'}
                      myPickerValue={this.state.pickerValueGun}
                      myPickerHandle={this.pickerHandleValueGun}
                      myDueAsMs={this.state.dueAsMs}/>
            <MyPicker myPickerItemCount={23}
                      myPickerLabelName={'hours'}
                      myPickerValue={this.state.pickerValueSaat}
                      myPickerHandle={this.pickerHandleValueSaat}/>
            <MyPicker myPickerItemCount={59}
                      myPickerLabelName={'minutes'}
                      myPickerValue={this.state.pickerValueDakika}
                      myPickerHandle={this.pickerHandleValueDakika}/>
        </View>
    }

    _renderTimes() {
        if (this.state.showTimeControl) return this._renderPicker();
        else return <Text> </Text>;
    }

    _controlTimes = () => {
        if (this.state.showTimeControl || !this.state.showTimeControl)
            this.setState({showTimeControl: !this.state.showTimeControl})
    };

    _controlPickerIcon() {
        if (this.state.switchValue) {
            return null;
        } else {
            if (!this.state.showTimeControl) return <TouchableOpacity onPress={this._controlTimes}>
                <View>
                    <Icon name="angle-down" size={25} color={'grey'}/>
                </View>
            </TouchableOpacity>;
            else return <TouchableOpacity onPress={this._controlTimes}>
                <View>
                    <Icon name="angle-up" size={25} color={'grey'}/>
                </View>
            </TouchableOpacity>;
        }

    }

    _toggleSwitch = (value) => {
        this.setState({
            switchValue: value,
            showTimeControl: false,
        });
    };

    _renderPoll() {
        return <View style={styles._pollMainContainer}>
            <View>
                {this.state.textArray.map((text, index) => {
                    // where the index is the value you want
                    return <View style={{flexDirection: 'row'}}>
                        <TextInput
                            style={{
                                margin: 7,
                                width: '83.5%',
                                height: 40,
                                borderRadius: 5,
                                padding: 5,
                                borderColor: this.handleBorderColor(index), borderWidth: 1
                            }}
                            onChangeText={text => this.onChangeText(text, index)}
                            value={this.state.textArray[index]}
                            placeholder={`Option ${index + 1}`}
                            onFocus={() => this.setState({focusedIndex: index})}
                            onBlur={() => this.setState({focusedIndex: null})}
                        />
                    </View>
                })}
                {
                    this.state.addIconControl
                        ?
                        <TouchableOpacity style={{position: 'absolute', right: 5, bottom: 10}}
                                          onPress={this.incrementInputCounter}>
                            <Ionicons name={"ios-add-circle"}
                                      size={30}
                                      color={'#803262'}
                            />
                        </TouchableOpacity>
                        :
                        <View style={{position: 'absolute', right: 5, bottom: 10}}>
                            <Ionicons name={"ios-add-circle"}
                                      size={30}
                                      color={'grey'}
                            />
                        </View>
                }
            </View>
            <View
                style={styles.renderSeparator}
            />
            <View style={{
                marginBottom: -15
            }}>
                <View style={{
                    height: 25,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 7.5,
                }}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={{fontWeight: 'bold', margin: 5, fontSize: 12}}>Poll Duration</Text>
                    </View>
                    <View style={{flex: 0.1, alignItems: 'flex-end'}}>
                        <Switch
                            style={{margin: -15, transform: [{scaleX: .65}, {scaleY: .65}]}}
                            onValueChange={this._toggleSwitch}
                            value={this.state.switchValue}/>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                        {
                            this.state.switchValue ?
                                <Text style={{fontSize: 11}}>
                                    Limitless
                                </Text>
                                :
                                <Text style={{fontSize: 11}}>
                                    {this._valueTextGun() +
                                    this._valueTextSaat() +
                                    this._valueTextDakika()}
                                </Text>
                        }

                    </View>

                    <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                        {
                            this._controlPickerIcon()
                        }
                    </View>

                </View>
                {this._renderTimes()}
            </View>
        </View>
    }

    renderBody() {
        return <View
            style={{
                paddingHorizontal: 5,
                margin: 10,
            }}>
            <TextInput style={{
                width: 250,
                fontSize: 17.5,
            }} placeholderTextColor={"grey"}
                       onChangeText={this.disableButtonTransparency}
                       value={this.state.textPost}
                       placeholder='Enter poll title'
                       autoCorrect={false}
                       multiline={true}>
            </TextInput>
            {
                this._renderPoll()
            }
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

    render() {
        return (
            <View style={styles._addPostContainer}>
                {this.renderHeader()}
                <ScrollView style={styles._addPostScroll}>
                    {this.renderBody()}
                    <KeyboardAvoidingView
                        behavior="height" enabled
                        keyboardVerticalOffset={10}>

                        {
                            this.state.imageLoading
                                ?
                                <MyLoadingView/>
                                :
                                this.state.isImagePicked
                                    ?
                                    <View>
                                        <Image source={this.state.imageShowInside} style={styles._imagePostStyle}/>
                                        <Ionicons name={"ios-close-circle"}
                                                  size={30}
                                                  color={'black'}
                                                  style={{position: 'absolute', right: 5, top: 5}}/>
                                    </View>
                                    :
                                    null

                        }
                    </KeyboardAvoidingView>
                </ScrollView>
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
    {selectImage, addPost, fetchProfile, addPoll},
)(AddPoll);

const styles = StyleSheet.create({
    _addPostContainer: {
        flex: 1,
        width: windowWidth,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    _addPostScroll: {
        width: windowWidth,
    },
    _imagePostStyle: {
        aspectRatio: 0.9,
        resizeMode: 'contain',
        backgroundColor: 'transparent'
    },
    _pollMainContainer: {
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'grey',
        borderRadius: 10,
        margin: 15,
        width: windowWidth / 1.3,
    },
    _pollTextInput: {
        margin: 7,
        width: '83.5%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 5
    },
    renderSeparator: {
        height: 0.6,
        width: '100%',
        backgroundColor: "grey",
    },
});
