import authReducer from "./authReducers";
import customerReducer from "./customerReducer";

import { combineReducers } from "redux";
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: authReducer,
    customer: customerReducer,
});

export default rootReducer;