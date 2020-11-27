import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text,Dimensions, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import {changeMessage, fetchGroupChat,fetchUserContacts, sendMessage} from '../../../actions/ChatActions'
import {Actions} from "react-native-router-flux";
import Ionicons from "react-native-vector-icons/Ionicons";
import {fetchProfile} from '../../../actions/ProfileActions';
import firebase from "firebase";
import Header from "../../../common-components/Header";
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baslik: 'Group Chat',
            myName: '',
            myEmail: '',
            contacts: [],
            chatlists: [],
            messages: '',
            scrolldownWhenInputFocused: false,
        };
    }

    componentDidMount() {
        this.scrollToBottom()
        this.props.fetchUserContacts();
    }
    componentWillMount() {
        this.props.fetchGroupChat();
        this.props.fetchProfile();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({
                messages: nextProps.messages,
                contacts: nextProps.contacts.contacts === null ||
                nextProps.contacts.contacts === undefined ? '' : nextProps.contacts.contacts,
                chatlists: nextProps.chatlists.chatlists === null ||
                nextProps.chatlists.chatlists === undefined ? '' : nextProps.chatlists.chatlists,
                myName: nextProps.profile.profile.name,
                myEmail: nextProps.profile.profile.email,
            });
        }
    }
    onPressBack = () => {
        Actions.Flow();
    };

    scrollToBottom(){
        setTimeout(() => {
            this.scrollView.scrollToEnd();
        }, 500)
    };
    renderHeader = () => {
        return <Header headerBaslik={this.state.baslik}
                       headerRightButtonExist={false}
                       headerLeftButtonExist={true}
                       headerLeftIconName={"angle-left"}
                       headerLeftIconSize={30}
                       headerLeftButtonClick={this.onPressBack}
        />;
    };
    _sendMessage() {
        this.props.sendMessage(this.state.messages, this.state.myName);
        this.scrollToBottom()
    }


    render() {
        let ArrayOfChatsObject = Object.values(this.state.chatlists);
        let ArrayOfContactsObject = Object.values(this.state.contacts);
        return (
            <KeyboardAvoidingView
                behavior="padding" enabled
                style={{flex: 1, backgroundColor: '#eee4dc'}}>
                {this.renderHeader()}
               {/* <View style={{flexDirection:'row'}}>
                {ArrayOfContactsObject.map((item, i) =>
                        <Text style={{fontSize: 15, color: '#000', padding: 5}}>{item.name}</Text>
                   )}
                </View>*/}
                <View style={{flex: 1, paddingBottom: 20}}>
                    <ScrollView ref={(ref) => {
                        this.scrollView = ref;
                    }}>
                        {
                            ArrayOfChatsObject.map((item, i) => (
                                item.type === 'Sent' ?
                                    <View style={{alignItems: 'flex-end', marginTop: 5, marginBottom: 5, marginLeft: 40}}>
                                        <Text style={{fontSize: 18, color: '#000', padding: 10, backgroundColor: '#dbf5b4', elevation: 1}}>{item.message}</Text>
                                    </View>
                                    :
                                    <View style={{alignItems: 'flex-start', marginTop: 5, marginBottom: 5, marginRight: 40,flexDirection:'row',width: 200,}}>
                                        <Text style={{fontSize: 18, color: '#000', padding: 10, backgroundColor: '#dbf5b4', elevation: 1,}}>{item.sender}</Text>
                                        <Text style={{fontSize: 18, color: '#000', padding: 10, backgroundColor: '#f7f7f7', elevation: 1}}>{item.message}</Text>
                                    </View>
                            ))
                        }

                    </ScrollView>
                </View>
                <View style={{alignItems: 'center', paddingTop: 15,marginBottom:10, height: 60, flexDirection: 'row'}}>
                    <TextInput style={{
                        flex: 1,
                        height: 35,
                        marginHorizontal: 10,
                        backgroundColor: '#fff',
                        borderWidth: 0.5,
                        borderColor: 'grey',
                        borderRadius: 15,
                        fontSize: 18,
                        padding:7.5

                    }}
                               value={this.state.messages}
                               onChangeText={text => this.props.changeMessage(text)}
                               onFocus={()=>this.scrollToBottom()}
                    />
                    <TouchableOpacity style={{marginRight:15}} onPress={this._sendMessage.bind(this)}>
                        <View>
                            <Ionicons name={'ios-send'} size={30} color='#04A5F5'/>
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = state => ({
    chatlists: state.chatlist,
    messages: state.chat.messages,
    contacts: state.contact,
    profile: state.profile
});

export default connect(mapStateToProps, {changeMessage,fetchGroupChat, sendMessage, fetchUserContacts, fetchProfile})(Chat)


