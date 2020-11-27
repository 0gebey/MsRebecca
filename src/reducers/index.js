import { combineReducers } from 'redux';
import auth from './AuthReducer';
import profile from "./ProfileReducer";
import post from "./PostReducer";
import poll from "./PollReducer";
import chat from "./ChatReducers/ChatReducer";
import contact from "./ChatReducers/ContactsReducer";
import chatlist from "./ChatReducers/ChatListReducer";
import event from "./EventReducer"



export default combineReducers({
    auth: auth,
    profile: profile,
    post: post,
    poll: poll,
    chat: chat,
    contact: contact,
    chatlist: chatlist,
    event: event,
});
