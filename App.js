/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';

export default class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyDvabNw7adv0T9gGW7U96L5vetXl9oO2QQ',
      authDomain: 'auth-36a0f.firebaseapp.com',
      databaseURL: 'https://auth-36a0f.firebaseio.com',
      projectId: 'auth-36a0f',
      storageBucket: 'auth-36a0f.appspot.com',
      messagingSenderId: '508080176890'
    };

    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return <View style={styles.logoutButtonContainerStyle}>
                <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
               </View>;
      case false:
        return <LoginForm />;
      default:
        return <View style={{ paddingTop: 100 }}><Spinner size="large" /></View>;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoutButtonContainerStyle: {
    paddingTop: 10,
    height: 50,
    alignSelf: 'stretch',
  }
});
