import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground} from 'react-native';
import {Button, Input, SearchBar } from 'react-native-elements';
import * as firebase from 'firebase'
import styles from '../../components/Style';
import * as Font from 'expo-font';


class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'sriracha': require('../../assets/fonts/Sriracha-Regular.ttf'),
      'montserrat-bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
      'Raleway-semibold-i': require('../../assets/fonts/Raleway-SemiBoldItalic.ttf'),
      'open-sans': require('../../assets/fonts/OpenSans-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }


  state = {
    name: [],
    email: []
}

  componentDidMount() {
    var userId = firebase.auth().currentUser.uid;
    console.log(userId)
    firebase.database().ref('users/' + userId).on('value', snapshot => {
      this.setState({ email: snapshot.val().email });
      this.setState({ name: snapshot.val().name });
  })
}

  render () {

    return (
      <View style={styles.homeContainer}>

        <View> 
          <Text style={{ fontFamily: "Raleway-semibold-i", fontSize: 35, marginLeft: 15, marginTop: 50 }}>Welcome Back,</Text>
          <Text style={{ fontFamily: "Raleway-semibold-i", fontSize: 35, marginLeft: 15 }}>{this.state.name} !</Text>
        </View>

      </View>
    );
  }
}

export default HomeScreen;