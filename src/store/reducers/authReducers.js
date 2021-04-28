const authReducer = (state = {}, action) => {
    switch (action.type) {
        case "SIGNIN_SUCCESS":
            return action.payload;
        case "SIGNIN_ERROR":
            return action.payload;
        default:
            return state;
    }
}

export default authReducer;