import React, { createContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import app from '../../firebase/firebase.init';

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    const providerLogIn = (provider) => {
        setLoader(true);
        return signInWithPopup(auth, provider);
    }

    const createUser = (email, password) => {
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (name, photoURL) => {
        setLoader(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
        })
    }

    const verifyEmail = () => {
        return sendEmailVerification(auth.currentUser);
    }

    const logInUser = (email, password) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoader(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser === null || currentUser.emailVerified){
                setUser(currentUser);
            }
            setLoader(false);
        });

        return () => {
            unsubscribe();
        }
    }, [])

    const AuthInfo = { 
        user, 
        providerLogIn, 
        logOut, 
        createUser, 
        logInUser, 
        updateUser, 
        loader, 
        setLoader, 
        verifyEmail 
    };

    return (
        <div>
            <AuthContext.Provider value={AuthInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;