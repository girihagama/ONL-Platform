import rootReducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';
import firebase from "firebase/app";
//import firebase from './../config/fbConfig';
import firebaseConfig from './../config/fbConfig';

const enhancers = [
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase, firebaseConfig)
];

const store = createStore(rootReducer, compose(...enhancers));

export default store;