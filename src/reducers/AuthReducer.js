import {
    AUTH_LOGIN_USER,
    AUTH_LOGIN_USER_FAIL,
    AUTH_LOGIN_USER_SUCCESS,
    AUTH_LOGOUT_USER,
    AUTH_IS_USER_LOGGED,
    AUTH_USER_IS_LOGGED,
    AUTH_USER_IS_NOT_LOGGED,
    AUTH_USER_LOGGED_ONCE,

} from '../actions/types';

export const INITIAL_STATE = {
    errorLoging: '',
    errorCreating: '',
    loading: false,
    user: null,
    isLogged: false,
};

const auth = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_LOGIN_USER:
            return {...state, ...INITIAL_STATE, loading: true, user: action.payload};
        case AUTH_LOGIN_USER_FAIL:
            return {...state, errorLoging: 'Login failed! Please check the credentials!', loading: false};
        case AUTH_LOGIN_USER_SUCCESS:
            return {...state, loading: false, error: ''};
        case AUTH_LOGOUT_USER:
            return {...state, ...INITIAL_STATE, loading: false};
        case AUTH_IS_USER_LOGGED:
            return {...state, loading: true, error: ''};
        case AUTH_USER_IS_LOGGED:
            return {...state, isLogged: true, loading: false, error: ''};
        case AUTH_USER_IS_NOT_LOGGED:
            return {...state, isLogged: false, loading: false, error: ''};
        case AUTH_USER_LOGGED_ONCE:
            return {...state};
        default:
            return state;
    }
};

export default auth;
