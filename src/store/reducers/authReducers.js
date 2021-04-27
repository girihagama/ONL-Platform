const authReducer = (state = {}, action) => {
    switch (action.type) {
        case "loginSystem":
            console.log("Reducer", action);
            return action;
        default:
            return state;
    }
}

export default authReducer;