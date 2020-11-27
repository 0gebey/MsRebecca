import firebase from 'firebase'
import b64 from 'base-64'
import _ from 'lodash'
import {
    CHANGE_MESSAGE, CHAT_MSG_OPENED,
    FETCH_GROUP_CHAT, PROFILE_FETCH,
    SEND_MESSAGE_SUCCESS, USER_CONTACT_LIST,
} from './types'


export const fetchGroupChat = () => {
    const {currentUser} = firebase.auth();
    let userEmailB64 = b64.encode(currentUser.email)

    let groupChatRef = firebase.database().ref(`/groupchat/${userEmailB64}`)
    return dispatch => {
        if (currentUser.email !== firebase.auth().currentUser.email) {
            groupChatRef.off('value')
        } else {
            groupChatRef.on('value', snapshot => {
                dispatch({type: FETCH_GROUP_CHAT, payload: snapshot.val()})
            })
        }
    }
};

export const sendMessage = (messages, userName) => {
    // user email (email)
    const {currentUser} = firebase.auth();
    const userEmail = currentUser.email;

    return dispatch => {
        const userEmailB64 = b64.encode(userEmail);
        firebase.database().ref(`/groupchat/${userEmailB64}`)
            .push({message: messages, type: 'Sent', sender: userName})
            .then(() => {
                firebase.database().ref(`/contacts/`)
                    .on('value', snapshot => {
                        let contactsArray = Object.values(snapshot.val());
                        contactsArray.forEach(
                            (contacts) => {
                                if(contacts.email === userEmail){
                                    console.log('sen yohsun')
                                }else{
                                    firebase.database().ref(`/groupchat/${b64.encode(contacts.email)}`)
                                        .push({message: messages, type: 'Received', sender: userName})
                                        .then(() => dispatch({type: SEND_MESSAGE_SUCCESS}))

                                }
                            });
                    });

            })

    }
};

export const changeMessage = text => {
    console.log(text);
    return ({
        type: CHANGE_MESSAGE,
        payload: text
    })
};

export const chatOpened = (contactEmail) => {
    const {currentUser} = firebase.auth();
    const userEmail = currentUser.email;
    const userEmailB64 = b64.encode(userEmail);
    const contactEmailB64 = b64.encode(contactEmail);

    return dispatch => {
        firebase.database().ref(`/groupchat/${userEmailB64}/${contactEmailB64}`)
            .update({isOpened: true})
            .then(() => dispatch({type: CHAT_MSG_OPENED}))
    }
};

export const fetchUserContacts = () => {
    return (dispatch) => {
        firebase.database().ref(`/contacts/`)
            .on('value', snapshot => {
                dispatch(
                    {
                        type: USER_CONTACT_LIST,
                        payload: snapshot.val()
                    }
                )

            })
    }
};
