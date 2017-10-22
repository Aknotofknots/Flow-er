import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCQ7bdsLCSKiA_9F0u7LCMmQp5rWpcqqlo",
    authDomain: "flow-er.firebaseapp.com",
    databaseURL: "https://flow-er.firebaseio.com",
    projectId: "flow-er",
    storageBucket: "flow-er.appspot.com",
    messagingSenderId: "872631712968"
};

firebase.initializeApp(config);

export default firebase;