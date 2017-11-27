import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import LoginForm from './components/LoginForm';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyCGDYVVgYatmuE8mLfEXTBfSkgHmM3hpzU',
      authDomain: 'managers-c914d.firebaseapp.com',
      databaseURL: 'https://managers-c914d.firebaseio.com',
      projectId: 'managers-c914d',
      storageBucket: 'managers-c914d.appspot.com',
      messagingSenderId: '877921445192'
    };

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />

      </Provider>
    );
  }
}

export default App;
