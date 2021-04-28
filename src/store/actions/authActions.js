export const loginSystem = (username, password, platform) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //do the logic here
        const firestore = getFirestore();
        console.log(firestore.collection('users').add({
            username,password,platform
        }));
        console.log("Action", { username, password, platform });
        dispatch({ type: 'loginSystem', payload: { username, password, platform } })
    }
};