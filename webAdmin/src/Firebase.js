import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDXpY1B4RjI7M1zDh7vS0DfBdwmNkHKIoY",
  authDomain: "webadmin-chatapp.firebaseapp.com",
  databaseURL: "https://webadmin-chatapp.firebaseio.com",
  projectId: "webadmin-chatapp",
  storageBucket: "webadmin-chatapp.appspot.com",
  messagingSenderId: "442335614857",
  appId: "1:442335614857:web:8b2b3088e1337a226b7358",
  measurementId: "G-8DHN394BVV"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase;