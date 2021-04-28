export const signIn = (username, password, platform) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //const firestore = getFirestore();
        const firebase = getFirebase();

        const email = username;
        platform = "/" + platform;

        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                dispatch({
                    type: "SIGNIN_SUCCESS",
                    payload: { username, platform }
                });
            })
            .catch(() => {
                dispatch({
                    type: "SIGNIN_ERROR",
                    payload: { error: "Invalid login credentials" }
                });
            });
    }
};

export const signUp = (username, password) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //const firestore = getFirestore();
        const firebase = getFirebase();

        firebase.auth()
            .createUserWithEmailAndPassword(username, password)
            .then(dataBeforeEmail => {
                firebase.auth().onAuthStateChanged(function (user) {
                    user.sendEmailVerification();
                });
            })
            .then(dataAfterEmail => {
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user.emailVerified) {
                        // Email is verified
                        dispatch({
                            type: "SIGNUP_SUCCESS",
                            payload:
                                "Your account was successfully created! Now you need to verify your e-mail address, please go check your inbox."
                        });
                    } else {
                        // Email is not verified
                        dispatch({
                            type: "SIGNUP_ERROR",
                            payload:
                                "Something went wrong, we couldn't create your account. Please try again."
                        });
                    }
                });
            })
            .catch(function (error) {
                dispatch({
                    type: "SIGNUP_ERROR",
                    payload:
                        "Something went wrong, we couldn't create your account. Please try again."
                });
            });
    }
};

export const signOut = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //const firestore = getFirestore();
        const firebase = getFirebase();

        firebase.auth()
            .signOut()
            .then(() => {
                dispatch({
                    type: "SIGNOUT_SUCCESS",
                    payload: { signOut: true }
                });
            })
            .catch(() => {
                dispatch({
                    type: "SIGNOUT_ERROR",
                    payload: "We are having difficulties on signing out"
                });
            });
    }
};

export const resetPassword = (username) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //const firestore = getFirestore();
        const firebase = getFirebase();

        const email = username;

        firebase.auth()
            .sendPasswordResetEmail(email)
            .then(() =>
                dispatch({
                    type: "RESET_SUCCESS",
                    payload: "Reset email sent. Go check your inbox."
                })
            )
            .catch(err => {
                dispatch({
                    type: "RESET_ERROR",
                    payload: { error: "We are having difficulties on resetting password." }
                });
            });
    }
};


/*export const test = (data) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //console.log("Action", data);
        const firestore = getFirestore();
        const firebase = getFirebase();

        console.log(firestore.collection('users').add({
            data : data
        }));
        
        dispatch({ type: 'loginSystem', payload: data })
    }
};*/

//REFER (firebase auth and routing): https://betterprogramming.pub/https-medium-com-clairechabas-auth-with-firebase-for-react-redux-apps-from-0-to-1-104e7343521b