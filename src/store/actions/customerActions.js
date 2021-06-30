export const addCustomer = (customerData, locationData) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        // const firebase = getFirebase();

        firestore.collection('customers')
            .add(customerData)
            .then((res) => {
                console.log('Customer Added!', res);
            });

        // firebase.auth()
        //     .createUserWithEmailAndPassword(username, password)
        //     .then(dataBeforeEmail => {
        //         firebase.auth().onAuthStateChanged(function (user) {
        //             user.sendEmailVerification();
        //         });
        //     })
        //     .then(dataAfterEmail => {
        //         firebase.auth().onAuthStateChanged(function (user) {
        //             if (user.emailVerified) {
        //                 // Email is verified
        //                 dispatch({
        //                     type: "SIGNUP_SUCCESS",
        //                     payload:
        //                         "Your account was successfully created! Now you need to verify your e-mail address, please go check your inbox."
        //                 });
        //             } else {
        //                 // Email is not verified
        //                 dispatch({
        //                     type: "SIGNUP_ERROR",
        //                     payload:
        //                         "Something went wrong, we couldn't create your account. Please try again."
        //                 });
        //             }
        //         });
        //     })
        //     .catch(function (error) {
        //         dispatch({
        //             type: "SIGNUP_ERROR",
        //             payload:
        //                 "Something went wrong, we couldn't create your account. Please try again."
        //         });
        //     });
    }
};

export const addLocation = (customerId, locationData) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        // const firebase = getFirebase();

        firestore.collection('customers').doc(customerId).collection('locations')
            .add({
                ...locationData
            })
            .then(() => {
                console.log('Location Added!');
            });

        // firebase.auth()
        //     .createUserWithEmailAndPassword(username, password)
        //     .then(dataBeforeEmail => {
        //         firebase.auth().onAuthStateChanged(function (user) {
        //             user.sendEmailVerification();
        //         });
        //     })
        //     .then(dataAfterEmail => {
        //         firebase.auth().onAuthStateChanged(function (user) {
        //             if (user.emailVerified) {
        //                 // Email is verified
        //                 dispatch({
        //                     type: "SIGNUP_SUCCESS",
        //                     payload:
        //                         "Your account was successfully created! Now you need to verify your e-mail address, please go check your inbox."
        //                 });
        //             } else {
        //                 // Email is not verified
        //                 dispatch({
        //                     type: "SIGNUP_ERROR",
        //                     payload:
        //                         "Something went wrong, we couldn't create your account. Please try again."
        //                 });
        //             }
        //         });
        //     })
        //     .catch(function (error) {
        //         dispatch({
        //             type: "SIGNUP_ERROR",
        //             payload:
        //                 "Something went wrong, we couldn't create your account. Please try again."
        //         });
        //     });
    }
};

export const editCustomer = (customerId, customerData) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        // const firebase = getFirebase();

        firestore.collection('customers').doc(customerId)
            .update({
                customerName: customerData
            })
            .then(() => {
                console.log('Customer Updated!');
            });

        // firebase.auth()
        //     .createUserWithEmailAndPassword(username, password)
        //     .then(dataBeforeEmail => {
        //         firebase.auth().onAuthStateChanged(function (user) {
        //             user.sendEmailVerification();
        //         });
        //     })
        //     .then(dataAfterEmail => {
        //         firebase.auth().onAuthStateChanged(function (user) {
        //             if (user.emailVerified) {
        //                 // Email is verified
        //                 dispatch({
        //                     type: "SIGNUP_SUCCESS",
        //                     payload:
        //                         "Your account was successfully created! Now you need to verify your e-mail address, please go check your inbox."
        //                 });
        //             } else {
        //                 // Email is not verified
        //                 dispatch({
        //                     type: "SIGNUP_ERROR",
        //                     payload:
        //                         "Something went wrong, we couldn't create your account. Please try again."
        //                 });
        //             }
        //         });
        //     })
        //     .catch(function (error) {
        //         dispatch({
        //             type: "SIGNUP_ERROR",
        //             payload:
        //                 "Something went wrong, we couldn't create your account. Please try again."
        //         });
        //     });
    }
};

export const editLocation = (customerId, locationId, locationData) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        // const firebase = getFirebase();

        firestore.collection('customers').doc(customerId).collection('locations').doc(locationId)
            .update(
                locationData
            )
            .then(() => {
                console.log('Location Updated!');
            });

        // firebase.auth()
        //     .createUserWithEmailAndPassword(username, password)
        //     .then(dataBeforeEmail => {
        //         firebase.auth().onAuthStateChanged(function (user) {
        //             user.sendEmailVerification();
        //         });
        //     })
        //     .then(dataAfterEmail => {
        //         firebase.auth().onAuthStateChanged(function (user) {
        //             if (user.emailVerified) {
        //                 // Email is verified
        //                 dispatch({
        //                     type: "SIGNUP_SUCCESS",
        //                     payload:
        //                         "Your account was successfully created! Now you need to verify your e-mail address, please go check your inbox."
        //                 });
        //             } else {
        //                 // Email is not verified
        //                 dispatch({
        //                     type: "SIGNUP_ERROR",
        //                     payload:
        //                         "Something went wrong, we couldn't create your account. Please try again."
        //                 });
        //             }
        //         });
        //     })
        //     .catch(function (error) {
        //         dispatch({
        //             type: "SIGNUP_ERROR",
        //             payload:
        //                 "Something went wrong, we couldn't create your account. Please try again."
        //         });
        //     });
    }
};

export const deleteCustomer = (customerId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        //const firebase = getFirebase();

        firestore.collection('customers').doc(customerId)
            .delete()
            .then(() => {
                console.log('Customer Removed!');
            });

        // const email = username;
        // platform = "/" + platform;

        // firebase.auth()
        //     .signInWithEmailAndPassword(email, password)
        //     .then(() => {
        //         dispatch({
        //             type: "SIGNIN_SUCCESS",
        //             payload: { username, platform }
        //         });
        //     })
        //     .catch(() => {
        //         dispatch({
        //             type: "SIGNIN_ERROR",
        //             payload: { error: "Invalid login credentials" }
        //         });
        //     });
    }
};

export const deleteLocation = (customerId, locationId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        // const firebase = getFirebase();

        firestore.collection('customers').doc(customerId).collection('locations').doc(locationId)
            .delete()
            .then(() => {
                console.log('Location Removed!');
            });

        // firebase.auth()
        //     .createUserWithEmailAndPassword(username, password)
        //     .then(dataBeforeEmail => {
        //         firebase.auth().onAuthStateChanged(function (user) {
        //             user.sendEmailVerification();
        //         });
        //     })
        //     .then(dataAfterEmail => {
        //         firebase.auth().onAuthStateChanged(function (user) {
        //             if (user.emailVerified) {
        //                 // Email is verified
        //                 dispatch({
        //                     type: "SIGNUP_SUCCESS",
        //                     payload:
        //                         "Your account was successfully created! Now you need to verify your e-mail address, please go check your inbox."
        //                 });
        //             } else {
        //                 // Email is not verified
        //                 dispatch({
        //                     type: "SIGNUP_ERROR",
        //                     payload:
        //                         "Something went wrong, we couldn't create your account. Please try again."
        //                 });
        //             }
        //         });
        //     })
        //     .catch(function (error) {
        //         dispatch({
        //             type: "SIGNUP_ERROR",
        //             payload:
        //                 "Something went wrong, we couldn't create your account. Please try again."
        //         });
        //     });
    }
};

export const customerSearch = (keyword) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        // const firebase = getFirebase();

        firestore.collection('customers').orderBy('customerName').startAt(keyword).endAt(keyword + '\uf8ff')
            .get()
            .then((res) => {
                console.log(res);
            });

        // firebase.auth()
        //     .createUserWithEmailAndPassword(username, password)
        //     .then(dataBeforeEmail => {
        //         firebase.auth().onAuthStateChanged(function (user) {
        //             user.sendEmailVerification();
        //         });
        //     })
        //     .then(dataAfterEmail => {
        //         firebase.auth().onAuthStateChanged(function (user) {
        //             if (user.emailVerified) {
        //                 // Email is verified
        //                 dispatch({
        //                     type: "SIGNUP_SUCCESS",
        //                     payload:
        //                         "Your account was successfully created! Now you need to verify your e-mail address, please go check your inbox."
        //                 });
        //             } else {
        //                 // Email is not verified
        //                 dispatch({
        //                     type: "SIGNUP_ERROR",
        //                     payload:
        //                         "Something went wrong, we couldn't create your account. Please try again."
        //                 });
        //             }
        //         });
        //     })
        //     .catch(function (error) {
        //         dispatch({
        //             type: "SIGNUP_ERROR",
        //             payload:
        //                 "Something went wrong, we couldn't create your account. Please try again."
        //         });
        //     });
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