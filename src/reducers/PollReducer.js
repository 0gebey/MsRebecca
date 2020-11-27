import {
    POLL_FETCH_ALL,
    POLL_ADD,
    POLL_ADD_COMMENT,
} from '../actions/types';

const INITIAL_STATE = {
    polls: [],
    voteds: [],
};

const poll = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case POLL_FETCH_ALL:
            return { ...state, polls: action.payload };
        case POLL_ADD:
            return { ...state, poll: action.payload };
        case POLL_ADD_COMMENT:
            return { ...state, poll: action.payload };
        default:
            return state;
    }
};

export default poll;