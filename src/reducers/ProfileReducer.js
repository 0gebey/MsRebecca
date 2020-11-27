import {FETCH_FAVOURITES, PROFILE_FETCH, FETCH_LIKES, PROFILE_NOTIFICATION_SETTING_FETCH,PROFILE_NOTIFICATION_SETTING_PUSH} from '../actions/types';

const INITIAL_STATE = {
    loadingProfile: true,
};

const profile = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROFILE_FETCH:
            return { ...state, loadingProfile: false, profile: action.payload };
        case FETCH_FAVOURITES:
            return { ...state, favorites: action.payload };
        case FETCH_LIKES:
            return { ...state, likes: action.payload };
        default:
            return state;
    }   
};

export default profile;
