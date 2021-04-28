export const loginSystem = (username, password, platform) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //do the logic here
        console.log("Action", { username, password, platform });
        dispatch({ type: 'loginSystem', payload: { username, password, platform } })
    }
};