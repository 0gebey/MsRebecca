import { FETCH_GROUP_CHAT } from '../../actions/types'

const INITIAL_STATE = {
    chatlists: []
}

const chatlist = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_GROUP_CHAT:
            return {...state, chatlists: action.payload };
        default:
            return state
    }
}

export default chatlist
