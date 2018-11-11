import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDsI8OO11QGZ8JpEQbL6YIvggwgzEg6Tqc",
  authDomain: "react-client-panel-e5278.firebaseapp.com",
  databaseURL: "https://react-client-panel-e5278.firebaseio.com",
  projectId: "react-client-panel-e5278",
  storageBucket: "react-client-panel-e5278.appspot.com",
  messagingSenderId: "871127032505"
};

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
// const firestore = firebase.firestore();

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

// Create initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
  reactReduxFirebase(firebase),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;