import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
})



export const db = app.firestore()
export const database = {
    users: db.collection("users"),
    stories: db.collection("stories"),
}

// db.collection('stories').where('userID', '==', app.auth().currentUser.uid).get().then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//         console.log(doc.data())
//     })
// })

export const auth = app.auth()
export default app