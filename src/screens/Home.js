import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground} from 'react-native';
import {Button, Input, SearchBar } from 'react-native-elements';
import * as firebase from 'firebase'
import styles from '../../components/Style';

class HomeScreen extends React.Component {

  state = {
    name: [],
    email: []
}

  componentDidMount() {
    var userId = firebase.auth().currentUser.uid;
    console.log(userId)
    firebase.database().ref('users/' + userId).once('value').then(snapshot => {
        console.log("snapshot", snapshot.val())
        this.setState({ email: snapshot.val().email });
        this.setState({ name: snapshot.val().name })
    })
}

  render () {
    return (
      <View style={styles.homeContainer}>

        <View> 
          <Text style={{ fontFamily: "", fontSize: 35, marginLeft: 15, marginTop: 50 }}>Welcome Back,</Text>
          <Text style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: 35, marginLeft: 15 }}>{this.state.name} !</Text>
        </View>

      </View>
    );
  }
}

export default HomeScreen;