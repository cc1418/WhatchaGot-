import firebase from 'firebase';
let config = {
    apiKey: "AIzaSyAoTVOgyIHACBKfWkv0OAQQpMY5r3MUDd4",
    authDomain: "whatchagot-f6c24.firebaseapp.com",
    databaseURL: "https://whatchagot-f6c24.firebaseio.com",
    projectId: "whatchagot-f6c24",
    storageBucket: "whatchagot-f6c24.appspot.com",
    messagingSenderId: "335618908801",
    appId: "1:335618908801:web:e6a04cee9c489fb48b2380",
    measurementId: "G-0FXPKPPX44"
};
let app = firebase.initializeApp(config);
export const db = app.database();