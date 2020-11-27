import {
    AUTH_LOGIN_USER,
    AUTH_LOGIN_USER_FAIL,
    AUTH_LOGIN_USER_SUCCESS,
    AUTH_LOGOUT_USER,
    AUTH_IS_USER_LOGGED,
    AUTH_USER_IS_LOGGED,
    AUTH_USER_IS_NOT_LOGGED,
    AUTH_USER_LOGGED_ONCE, USER_CONTACT_LIST,
} from './types';
import firebase from 'firebase';
import b64 from 'base-64'

import {Actions} from 'react-native-router-flux';

//Action creators

export const checkIfUserLoggedOnce = () => {
    const { currentUser } = firebase.auth();
    return dispatch => {
        dispatch({type: AUTH_USER_LOGGED_ONCE});
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/authInfo`)
            .on('value', snapshot => {
                if (snapshot.val() === null) {
                    const {currentUser} = firebase.auth();
                    firebase
                        .database()
                        .ref(`/users/${currentUser.uid}/`)
                        .set({
                            profile: {
                                name: '?',
                                surname: '?',
                                gender: '?',
                                age: '?',
                                department: '?',
                                photo: 'https://www.alitumbas.av.tr/uploads/empty-profile-picture-woman.jpg',
                                email: '?'
                            },
                            authInfo: {
                                isLoggedOnce: true,
                            }

                        });
                }
                if(snapshot.val() && snapshot.val().isLoggedOnce === true) {
                    console.log('Already logged in')
                }
            })
    }
};

//login the app
export const loginUser = (email, password) => {

    return dispatch => {
        dispatch({type: AUTH_LOGIN_USER});
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(() => loginUserFail(dispatch));
    };
};

const loginUserFail = dispatch => {
    dispatch({type: AUTH_LOGIN_USER_FAIL});
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: AUTH_LOGIN_USER_SUCCESS,
        payload: user
    });
    Actions.app();
};

//logout the app
export const logoutUser = () => {
    const {currentUser} = firebase.auth();
    let userEmail64 = b64.encode(currentUser.email);
    let mUserRefGroupChat = firebase.database().ref(`/groupchat/${userEmail64}`);
    let mUserRefPosts = firebase.database().ref(`/posts/`);

    return dispatch => {
        mUserRefGroupChat.off('value'); // stop listening end point
        mUserRefPosts.off('value'); // stop listening end point
        firebase.auth().signOut().then(() => {
            dispatch({type: AUTH_LOGOUT_USER});
            Actions.login();
        }).catch();
    };
};

//check if the user is logged or not
export const isUserLogged = () => {
    return dispatch => {
        dispatch({type: AUTH_IS_USER_LOGGED});
        firebase
            .auth()
            .onAuthStateChanged((user) => {
                if (user) userIsLogged(dispatch);
                else userIsNotLogged(dispatch);
            });
    };
};

//results of log control
const userIsLogged = (dispatch) => {
    dispatch({
        type: AUTH_USER_IS_LOGGED
    });
    console.log("redux user is logged");
};

const userIsNotLogged = (dispatch) => {
    dispatch({
        type: AUTH_USER_IS_NOT_LOGGED,
    });
    console.log("redux user is not logged");
};

