import firebase from 'firebase/app'
import 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAl1xl6-9BNdpAc_FuYeIAq1zJjJHAs89I",
    authDomain: "list-imei.firebaseapp.com",
    projectId: "list-imei",
    storageBucket: "list-imei.appspot.com",
    messagingSenderId: "975717760165",
    appId: "1:975717760165:web:361311fb63577481a1214c",
    measurementId: "G-NCKFSDY13W"
};
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
export const db = firebase
    .initializeApp(firebaseConfig)
    .firestore()

const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }