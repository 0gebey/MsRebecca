import React, {Component} from 'react';
import Main from './src/Main';
import firebase from 'firebase';

export default class App extends Component {
  
  componentWillMount() {
    var config = {
      apiKey: 'AIzaSyB0APjPgShnKmLKS9k3qCKXchHZvu3mVFw',
      authDomain: 'msrebecca-3cf0c.firebaseapp.com',
      databaseURL: 'https://msrebecca-3cf0c.firebaseio.com',
      projectId: 'msrebecca-3cf0c',
      storageBucket: 'msrebecca-3cf0c.appspot.com',
      messagingSenderId: '253726185695',
    };
    firebase.initializeApp(config);
  };

  render() {
    return <Main/>;
  }
}
