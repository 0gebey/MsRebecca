import {
    POLL_FETCH_ALL,
    POLL_ADD,
    POLL_VOTE,
    POLL_ANNOUNCE_RESULTS,
    POLL_REFLESH_DUE_TIME
} from './types';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';


export const addPoll = (question, answers, userpicc, user, dueAsMs) => {
    const {currentUser} = firebase.auth();
    let thatTime = Date.now();
    let yenipostlar = [];
    let yenianketler = [];
    return dispatch => {
        var newPostKey =
            firebase
                .database()
                .ref(`/posts/`)
                .push({
                    username: user,
                    userpic: userpicc,
                    question: question,
                    isResulted: false,
                    answers: answers,
                    dateWithSec: thatTime,
                    dueAsMs: dueAsMs,
                    type: 2,
                    totalVoteNumber: 0
                });
        const postId = newPostKey.key;    // key attribute sadece firebase.push'tan sonra response donduruyor. amacımız postların unique generated key'leri almak....
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/profile/posts_number`)
            .once('value', snapshot => {
                const posts = snapshot.val() + 1;
                firebase
                    .database()
                    .ref(`/users/${currentUser.uid}/profile/`)
                    .update({
                        posts_number: posts,
                    });
            })
            .then(() => {
                dispatch({type: POLL_ADD});
                Actions.reset('app');
            });
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/profile/postNames`)
            .once('value', function (snapshot) {

                snapshot.forEach(function (childSnapshot) {

                    var value = childSnapshot.val();
                    yenipostlar.push(value)

                });
                yenipostlar.push(postId);
                firebase
                    .database()
                    .ref(`/users/${currentUser.uid}/profile/`)
                    .update({
                        postNames: yenipostlar
                    });
            });
        for (let i = 0; i < answers.length; i++) {
            firebase
                .database()
                .ref(`/posts/${postId}/votes/${i}`)
                .update({
                    voteNumber: 0,
                });
        }


    };
};

export const fetchPolls = () => {
    return dispatch => {
        firebase
            .database()
            .ref(`/polls/`)
            .on('value', snapshot => {
                if (snapshot.val() === null || snapshot.val() === undefined) {
                    let arrayPosts = [];
                    dispatch({type: POLL_FETCH_ALL, payload: arrayPosts});
                } else {
                    dispatch({type: POLL_FETCH_ALL, payload: snapshot.val()});
                }
            });
    };
};

export const vote = (index, poll) => {
    let yenianketler = [];
    let allVotes = [];
    const {currentUser} = firebase.auth();
    return dispatch => {
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/profile/votedPolls`)
            .once('value', function (snapshot) {

                snapshot.forEach(function (childSnapshot) {

                    var value = childSnapshot.val();
                    yenianketler.push(value)

                });
                if (yenianketler.includes(poll)) {
                    alert("You've already voted on this poll!")
                }
                else {
                    firebase
                        .database()
                        .ref(`/posts/${poll}/votes/${index}/voteNumber`)
                        .once('value', snapshot => {
                            const votes = snapshot.val() + 1;
                            firebase
                                .database()
                                .ref(`/posts/${poll}/votes/${index}`)
                                .update({
                                    voteNumber: votes,
                                });
                        })
                        .then(() => {
                            dispatch({type: POLL_VOTE});
                            Actions.reset('app');
                        });
                    firebase
                        .database()
                        .ref(`/posts/${poll}/totalVoteNumber`)
                        .once('value', snapshot => {
                            const totalVotes = snapshot.val() + 1;
                            firebase
                                .database()
                                .ref(`/posts/${poll}/`)
                                .update({
                                    totalVoteNumber: totalVotes,
                                });
                        });
                    yenianketler.push(poll);
                    firebase
                        .database()
                        .ref(`/users/${currentUser.uid}/profile/`)
                        .update({
                            votedPolls: yenianketler
                        });
                }
            });
    }
};

export const announcePollResults = (poll) => {
    return dispatch => {
        firebase
            .database()
            .ref(`/posts/${poll}/`)
            .update({
                isResulted: true,
            })
            .then(() => {
                dispatch({type: POLL_ANNOUNCE_RESULTS});
                Actions.reset('app');
            });
    }
};

export const refleshDueTime = (poll, duration) => {

    return dispatch => {
        firebase
            .database()
            .ref(`/posts/${poll}/`)
            .child('dueAsMs')
            .set( duration )
            .then(() => {
                dispatch({type: POLL_REFLESH_DUE_TIME});
            });
    }
};