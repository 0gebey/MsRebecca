import {
    POST_FETCH_ALL,
    POST_ADD,
    POST_DELETE,
    POST_SELECT_IMAGE,
    POST_FAVORITE,
    POST_UNFAVORITE,
    POST_ADD_COMMENT,
    POST_DISLIKE,
    POST_LIKE,
    POST_REFLESH_TIME_AGO, IS_NOT_FAVORITE, IS_FAVORITE, FETCH_FAVOURITES
} from './types';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';

//Action creators

// a function that converts milliseconds to minutes hours and months as string.
// for example 'posted 5 hours ago...'
function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " year";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

//fetch all posts with keys
export const fetchPosts = () => {
    return dispatch => {
        firebase.database().ref(`/posts/`).on('value', snapshot => {
                if (snapshot.val() === null || snapshot.val() === undefined) {
                    let arrayPosts = [];
                    dispatch({type: POST_FETCH_ALL, payload: arrayPosts});
                } else {
                    dispatch({type: POST_FETCH_ALL, payload: snapshot.val()});
                }
            });
    };
};

// add a post with four parameter
export const addPost = (image, description, user, userpicc) => {
    const {currentUser} = firebase.auth();
    const date = new Date().toLocaleString();
    let thatTime = Date.now();
    let yenipostlar = [];
    return dispatch => {
        var newPostKey =
            firebase
                .database()
                .ref(`/posts/`)
                .push({
                    userpic: userpicc,
                    username: user,
                    dateWithSec: thatTime,
                    image: image,
                    title: description,
                    likes: 0,
                    comments_number: 0,
                    liked: false,
                    type: 1
                });
        Actions.reset('app');
    };
};

// reflesh time in every openings of app, we use it in post component.

export const refleshTime = (post) => {
    return dispatch => {
        firebase
            .database()
            .ref(`/posts/${post}/dateWithSec`)
            .once('value', snapshot => {
                const thatTime = snapshot.val();
                firebase
                    .database()
                    .ref(`/posts/${post}/`)
                    .update({
                        date: timeSince(thatTime)
                    })
            })
            .then(() => {
                dispatch({type: POST_REFLESH_TIME_AGO});
            });
    }
};

export const deletePost = (post) => {
    const {currentUser} = firebase.auth();
    let yenianketler = [];
    return dispatch => {
        firebase
            .database()
            .ref(`/posts/${post}`)
            .remove()
            .then(() => {
                dispatch({type: POST_DELETE});
            });
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/profile/votedSurveys`)
            .once('value', function (snapshot) {

                snapshot.forEach(function (childSnapshot) {

                    var value = childSnapshot.val();
                    yenianketler.push(value)

                });
                yenianketler.pop();
                firebase
                    .database()
                    .ref(`/users/${currentUser.uid}/profile/`)
                    .update({
                        votedSurveys: yenianketler
                    });
            });

    }
};

export const selectImage = url => ({
    type: POST_SELECT_IMAGE,
    payload: url
});

export const favorite = (post) => {
    const {currentUser} = firebase.auth();
    let newFavorites = [];
    return dispatch => {
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/favorites`)
            .once('value', function (snapshot) { //first get the favorites array

                snapshot.forEach(function (childSnapshot) {
                    var value = childSnapshot.val();
                    newFavorites.push(value);
                });
                if (newFavorites.includes(post)) {  //if selected post is already in the array remove it from the array by splice function
                    let index = newFavorites.indexOf(post);
                    if (index > -1) {
                        newFavorites.splice(index, 1);
                    }
                    firebase
                        .database()
                        .ref(`/users/${currentUser.uid}/`)
                        .update({
                            favorites: newFavorites
                        });
                } else {  // if selected post is not in the array then push it into array
                    newFavorites.push(post);
                    firebase
                        .database()
                        .ref(`/users/${currentUser.uid}/`)
                        .update({
                            favorites: newFavorites
                        });
                }
            });
    };
};
export const like = (post, likes) => {
    const newLikes = likes + 1;
    const {currentUser} = firebase.auth();
    let yenilikedbywho = [];

    return dispatch => {
        firebase
            .database()
            .ref(`/posts/${post}/`)
            .update({
                likes: newLikes,
                liked: true
            })
            .then(() => {
                dispatch({type: POST_LIKE});
            });
        firebase
            .database()
            .ref(`posts/${post}/likedByWho`)
            .once('value', function (snapshot) {

                snapshot.forEach(function (childSnapshot) {

                    var value = childSnapshot.val();
                    yenilikedbywho.push(value)

                });
                yenilikedbywho.push(currentUser.uid);
                firebase
                    .database()
                    .ref(`/posts/${post}/`)
                    .update({
                        likedByWho: yenilikedbywho
                    });
            })
    };
};


//just reverse of like, we delete the unique id of user from database by using splice! very useful.
export const dislike = (post, likes) => {
    const newLikes = likes - 1;
    const {currentUser} = firebase.auth();
    let yenilikedbywho = [];

    return dispatch => {
        firebase
            .database()
            .ref(`/posts/${post}/`)
            .update({
                likes: newLikes,
                liked: false
            })
            .then(() => {
                dispatch({type: POST_DISLIKE});
            });
        firebase
            .database()
            .ref(`posts/${post}/likedByWho`)
            .once('value', function (snapshot) {

                snapshot.forEach(function (childSnapshot) {

                    var value = childSnapshot.val();
                    yenilikedbywho.push(value)

                });
                let index = yenilikedbywho.indexOf(currentUser.uid);
                if (index > -1) {
                    yenilikedbywho.splice(index, 1);
                }
                firebase
                    .database()
                    .ref(`/posts/${post}/`)
                    .update({
                        likedByWho: yenilikedbywho
                    });
            });
    };
};

export const sendComment = (post, comments, newcomment, commentusername) => {
    const newcomments = comments + 1;
    return dispatch => {
        firebase
            .database()
            .ref(`/posts/${post}/`)
            .update({
                comments_number: newcomments
            })
            .then(() => {
                firebase
                    .database()
                    .ref(`/posts/${post}/comments`)
                    .push({
                        username: commentusername,
                        message: newcomment
                    });
            })
            .then(() => {
                dispatch({type: POST_ADD_COMMENT});
            });
    };
};



