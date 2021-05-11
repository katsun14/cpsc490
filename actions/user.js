import Firebase, { db } from '../config/Firebase.js'
import firebase from "firebase/app"

// define types

export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const LOGIN = 'LOGIN'
export const SIGNUP = 'SIGNUP'

// actions

export const updateEmail = email => {
    return {
        type: UPDATE_EMAIL,
        payload: email
    }
}

export const updatePassword = password => {
    return {
        type: UPDATE_PASSWORD,
        payload: password
    }
}

export const login = () => {
    return async (dispatch, getState) => {
        try {
            const { email, password } = getState().user
            const response = await Firebase.auth().signInWithEmailAndPassword(email, password)

            dispatch(getUser(response.user.uid))
        } catch (e) {
            alert(e)
        }
    }
}

export const getUser = uid => {
    return async (dispatch, getState) => {
        try {
            const user = await db
                .collection('users')
                .doc(uid)
                .get()

            dispatch({ type: LOGIN, payload: user.data() })
        } catch (e) {
            alert(e)
        }
    }
}

export const signup = () => {
    return async (dispatch, getState) => {
        try {
            const { email, password } = getState().user
            const response = await Firebase.auth().createUserWithEmailAndPassword(email, password)
            if (response.user.uid) {
                const user = {
                    uid: response.user.uid,
                    email: email,
                    connections: [],
                }

                db.collection('users')
                    .doc(response.user.uid)
                    .set(user)

                dispatch({ type: SIGNUP, payload: user })
            }
        } catch (e) {
            alert(e)
        }
    }
}

export const addConnection = (email) => {
    return async (dispatch, getState) => {
        try {
            console.log("Adding connection:")
            console.log(email)

            // Check if person exists
            let querySnapshot = await db
                .collection('users')
                .where('email', '==', email)
                .get();

            if (querySnapshot.empty){
                alert("This user doesn't exist");
            } else {
                let currentUser = Firebase.auth().currentUser

                // Update Users
                let userDoc = db.collection("users").doc(currentUser.uid)
                if (userDoc.connections != []){
                    userDoc.update({
                        connections: firebase.firestore.FieldValue.arrayUnion(email)
                    })
                } else {
                    userDoc.update({
                        connections: [email]
                    })
                }
                
                // Update Connections
                db.collection("connections").add({
                    user1: currentUser.email,
                    user2: email,
                    online: false
                })
                db.collection("connections").add({
                    user1: email,
                    user2: currentUser.email,
                    online: false
                })

            }
        } catch (e) {
            alert(e)
        }
    }
}

// export const toggleConnection = (email, downloaded) => {
//     return async (dispatch, getState) => {
//         try {
//             console.log("Toggling connection:")
//             console.log(email)
//             console.log(downloaded)

//             // let currentUser = Firebase.auth().currentUser
//             // let userDoc = db.collection("users").doc(currentUser.uid)
//             // if (userDoc.connections != []){
//             //     userDoc.update({
//             //         connections: firebase.firestore.FieldValue.arrayUnion(email)
//             //     })
//             // } else {
//             //     userDoc.update({
//             //         connections: [email]
//             //     })
//             // }
//         } catch (e) {
//             alert(e)
//         }
//     }
// }
