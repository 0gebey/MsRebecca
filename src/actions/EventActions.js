import {EVENT_ADD} from './types';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';

export const addEvent = (eventDateTime, eventTitle, moreInfo,eventLocation,eventAvatar) => {

  return dispatch => {
    firebase
      .database()
      .ref(`/events/`)
      .push({
        eventDate: eventDateTime,
        eventName: eventTitle,
        eventInfo: moreInfo,
        eventLocation: eventLocation,
        eventPhoto: eventAvatar,
      })
      .then(() => {
        dispatch({type: EVENT_ADD});
        Actions.reset('app');
    });
  };
};
