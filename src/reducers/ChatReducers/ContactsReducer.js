import {USER_CONTACT_LIST} from '../../actions/types'

const INITIAL_STATE = {
    contacts: []
};

const contact = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case USER_CONTACT_LIST:
            return { ...state, contacts: action.payload};
        default:
            return state
    }
};
export default contact
