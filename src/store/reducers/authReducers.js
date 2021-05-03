const authReducer = (state = {}, action) => {
    switch (action.type) {
        case "SIGNIN_SUCCESS":
            localStorage.setItem('platform', action.payload.platform);
            return action.payload;
        case "SIGNIN_ERROR":
            return action.payload;
        case "SIGNOUT_SUCCESS":
            localStorage.removeItem('platform');
            localStorage.clear();
            return action.payload;
        case "SIGNOUT_ERROR":
            return action.payload;
        default:
            return state;
    }
}

export default authReducer;