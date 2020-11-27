import {
 EVENT_ADD
} from '../actions/types';

const INITIAL_STATE = {
    events: [],
};

const event = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EVENT_ADD:
            return { ...state, event: action.payload };
        default:
            return state;
    }
};

export default event;