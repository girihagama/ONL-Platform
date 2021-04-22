const authReducer = (state = {}, action) => {
    switch (action.type) {
        case "test":
            console.log(action);
            return "https://picsum.photos/500?"+Math.random();
        default:
            return state;
    }
}

export default authReducer;