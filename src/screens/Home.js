import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground } from 'react-native';
import { Button, Input, SearchBar } from 'react-native-elements';
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
    email: [],
    recipeList: []
  }

  componentDidMount() {
    var userId = firebase.auth().currentUser.uid;
    let recipeList

    // console.log(userId)
    // firebase.database().ref('users/' + userId).on('value', snapshot => {
    //   this.setState({ email: snapshot.val().email });
    //   this.setState({ name: snapshot.val().name });
    // })

    firebase.database().ref('items/' + userId + '/fridge/recipes/').once('value')
    .then(snapshot => {
      console.log("snapshot", snapshot.val())
      recipeJson = snapshot.val();

      let numRecipes = (Object.keys(recipeJson).length)
      let i = 0
      let recipeId = []

      while (i<numRecipes){
        let freshId = Object.values(recipeJson)[i].recipes
        recipeId.push(freshId)
        i++
      }
      
      let apiId = recipeId.join(",")
      let apiCall = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=" + apiId
      alert(apiCall)
      

      fetch(apiCall, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "x-rapidapi-key": "f7edf2ef0dmsh3fd3127a79e6f9dp1f017bjsn56de39cdf5b6"
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
      })
        
      .catch(err => {
          //console.log(err);
      });
      
    })

  }

  render() {

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