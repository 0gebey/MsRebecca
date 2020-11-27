import {
    POST_FETCH_ALL,
    POST_ADD,
    POST_DELETE,
    POST_SELECT_IMAGE,
    POST_REFLESH_TIME_AGO,
    POST_ADD_COMMENT
} from '../actions/types';

const INITIAL_STATE = {
    posts: [],
    loadingFeed: true,
};

const post = (state = INITIAL_STATE, action) => { //bu icerdeki state.post olacak
    switch (action.type) {
        case POST_FETCH_ALL:
            return {...state, loadingFeed: false, posts: action.payload};
        case POST_ADD:
            return {...state, post: action.payload};
        case POST_DELETE:
            return {...state};
        case POST_REFLESH_TIME_AGO:
            return {...state};
        case POST_SELECT_IMAGE:
            return {...state, post: action.payload};
        case POST_ADD_COMMENT:
            return { ...state, post: action.payload };
        default:
            return state;
    }
};

export default post;
