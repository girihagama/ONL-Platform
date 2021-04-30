const authReducer = (state = {platform:"/"}, action) => {
    switch (action.type) {
        case "SIGNIN_SUCCESS":
            return action.payload;
        case "SIGNIN_ERROR":
            return action.payload;
        case "SIGNOUT_SUCCESS":
            return action.payload;
        case "SIGNOUT_ERROR":
            return action.payload;
        default:
            return state;
    }
}

export default authReducer;