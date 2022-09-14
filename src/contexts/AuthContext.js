import React, { useContext, useEffect, useState } from "react";
import { auth, database } from "../firebase";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email,password, firstNameRef, lastNameRef) {
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            database.users.doc(cred.user.uid).set({
                firstName: firstNameRef,
                lastName: lastNameRef,
                email: email,
                userID: cred.user.uid
            })
        })
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function getUserStories() {
        return database.stories.where('userID', '==', currentUser.uid).get()    
    }

    function getPublicStories(docId) {
        return database.stories.doc(docId)
    }

    function deleteUserStories(docId) {
        return database.stories.doc(docId).delete()
    }

    function getProfileData() {
        return database.users.doc(currentUser.uid).get()
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])
    

    const value = {
        currentUser,
        login,
        logout,
        signup,
        resetPassword,
        updateEmail,
        updatePassword,
        getUserStories,
        deleteUserStories,
        getProfileData,
        getPublicStories
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}