

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");


var firebaseConfig = {
    apiKey: "AIzaSyA3a7JPso-jCL06Eepb3D4sTWpM2nMqfRQ",
    authDomain: "newsintegration.firebaseapp.com",
    databaseURL: "https://newsintegration.firebaseio.com",
    projectId: "newsintegration",
    storageBucket: "newsintegration.appspot.com",
    messagingSenderId: "1025719057822",
    appId: "1:1025719057822:web:36037bcb29a8e67e5b6a8f",
    measurementId: "G-NJ0250XDSR"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 //firebase.analytics();

/*firebase.initializeApp({
  apiKey: 'AIzaSyA3a7JPso-jCL06Eepb3D4sTWpM2nMqfRQ',
  authDomain: 'newsintegration.firebaseapp.com',
  projectId: 'newsintegration'
});*/

var db = firebase.firestore();

export default db;