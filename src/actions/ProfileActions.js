import {FETCH_FAVOURITES, PROFILE_FETCH, FETCH_LIKES } from './types';
import firebase from 'firebase';

export const fetchProfile = () => {
    const { currentUser } = firebase.auth();
    return dispatch => {
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/profile`)
            .on('value', snapshot => {
                dispatch({
                    type: PROFILE_FETCH,
                    payload: snapshot.val()
                });
            })
    };
};

export const fetchFavourites = () => {
    const { currentUser } = firebase.auth();
    return dispatch => {
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/favorites`)
            .on('value', snapshot => {
                dispatch({
                    type: FETCH_FAVOURITES,
                    payload: snapshot.val()
                });
            })
    };
};
export const fetchLikes = () => {
    const { currentUser } = firebase.auth();
  
    return dispatch => {
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/likes`)
            .on('value', snapshot => {
                dispatch({
                    type: FETCH_LIKES,
                    payload: snapshot.val()
                });
            })
    };
};


