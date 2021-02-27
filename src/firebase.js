import firebase from "firebase/app";
import "firebase/firestore";

let config = {
    apiKey: "AIzaSyBsFqHJr-NR_FN-VbSF_AiJscIilQqM13g",
    authDomain: "pain2viedata.firebaseapp.com",
    databaseURL: "https://pain2viedata-default-rtdb.firebaseio.com",
    projectId: "pain2viedata",
    storageBucket: "pain2viedata.appspot.com",
    messagingSenderId: "21075538993",
    appId: "1:21075538993:web:0cea75167a53e3b2b1d110",
    measurementId: "G-6MYBBPZMVK"
};

firebase.initializeApp(config);

export default firebase.firestore();