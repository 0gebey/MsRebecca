import {
    CHANGE_MESSAGE,
    SEND_MESSAGE_SUCCESS,
} from '../../actions/types'

const INITIAL_STATE = {
    add_email_contact: '',
    txt_register_result_error: '',
    register_result_include: false,
    messages: '',
    msgOpened: false
};

const chat = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_MESSAGE:
            return {...state, messages: action.payload};
        case SEND_MESSAGE_SUCCESS:
            return {...state, messages: ''};
        default:
            return state
    }
};

export default chat
