import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCSA1aZZdmTctyXKaNW3p_EuENcGILGNHA',
  authDomain: 'duckr-app-a4632.firebaseapp.com',
  databaseURL: 'https://duckr-app-a4632.firebaseio.com',
  storageBucket: 'duckr-app-a4632.appspot.com',
  messagingSenderId: '866181008942'
};
firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;