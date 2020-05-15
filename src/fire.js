import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyD7IhQMMaMIey5EtltwifTlJBnA_d6cZXM",
    authDomain: "respect-me-generation.firebaseapp.com",
    databaseURL: "https://respect-me-generation.firebaseio.com",
    projectId: "respect-me-generation",
    storageBucket: "respect-me-generation.appspot.com",
    messagingSenderId: "483399260701",
    appId: "1:483399260701:web:55314a007780e2080ec4f4",
    measurementId: "G-E4JYGZMKGP"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
