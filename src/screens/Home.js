import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground} from 'react-native';
import {Button, Input, SearchBar } from 'react-native-elements';
import * as firebase from 'firebase'
import styles from '../../components/Style';
import Video from 'react-native-video';

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
        {/* <Video
              source={require("../../assets/cuttingsteak.mp4")}
              style={styles.backgroundVideo}
              ref={(ref) => {
                this.player = ref
              }}
              onBuffer={this.onBuffer}                // Callback when remote video is buffering
              onError={this.videoError}
              muted={true}
              repeat={true}
              resizeMode={"cover"}
              rate={1.0}
              ignoreSilentSwitch={"obey"}
        /> */}
        <View> 
          <Text style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: 35, marginLeft: 15, marginTop: 50 }}>Welcome Back,</Text>
          <Text style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: 35, marginLeft: 15 }}>{this.state.name} !</Text>
        </View>

      </View>
    );
  }
}

export default HomeScreen;