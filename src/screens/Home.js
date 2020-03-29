import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, ScrollView, Modal, Dimensions } from 'react-native';
import { Button, Input, SearchBar, Card, Icon } from 'react-native-elements';
import * as firebase from 'firebase'
import styles from '../../components/Style';
import * as Font from 'expo-font';
console.disableYellowBox = true;

class HomeScreen extends React.Component {
  
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
      name: [],
      email: [],
      recipeList: [],
      recipeId: []
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

  componentDidMount() {
    var userId = firebase.auth().currentUser.uid;

    // console.log(userId)
    // firebase.database().ref('users/' + userId).on('value', snapshot => {
    //   this.setState({ email: snapshot.val().email });
    //   this.setState({ name: snapshot.val().name });
    // })

    firebase.database().ref('users/' + userId).on('value', snapshot => {
      this.setState({ email: snapshot.val().email });
      this.setState({ name: snapshot.val().name });
    })

    firebase.database().ref('items/' + userId + '/fridge/recipes/').on('child_added', snapshot => {
      //console.log("snapshot", snapshot.val())
      recipeJson = snapshot.val();
      console.log("==================================================================================================");
      console.log(Object.values(recipeJson))

      //let numRecipes = (Object.keys(recipeJson).length)
      //console.log(Object.values(recipeJson))
      this.state.recipeId.push(Object.values(recipeJson))

      // while (i < numRecipes) {
      //   let freshId = Object.values(recipeJson)[i].ID
      //   console.log(Object.values(recipeJson)[i].ID)
      //   recipeId.push(freshId)
      //   i++
      // } 

      //alert(recipeId)
      //alert(apiCall)

    })
  
    let apiId = this.state.recipeId.join(",")
    let apiCall = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=" + apiId
    console.log(apiCall)

    fetch(apiCall, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "f7edf2ef0dmsh3fd3127a79e6f9dp1f017bjsn56de39cdf5b6"
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson)
        this.setState({recipeList : responseJson})
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        //console.log(this.state.recipeList)
        //console.log("goodbye")
      })

      .catch(err => {
        //console.log(err);
      });

  }

  debug() {
    console.log(JSON.stringify(this.state.recipeList))
  }

  renderRecipes = ({ item, index }) => {

    return (
      <View>
        {/* <TouchableOpacity onPress={() => this.openRecipe(item.id)}> */}
        <Card
          styles={{
            borderRadius: 5
          }}
          containerStyle={{
            width: (styles.device.width) / 2.4,
            height: 275,
            marginLeft: 0,
            marginTop: 3,
            borderColor: "#ff944d"
          }}
          image={{ uri: item.image }}
        >


          <Text index={item.id} style={{ fontSize: 15, marginTop: -5, alignSelf: "center" }}>
            {item.title}
          </Text>

          {/* <Text index={item.id} style={{ fontSize: 13, marginTop: 15, marginLeft: 2 }}>
            Likes: {item.likes}
          </Text>

          <Text index={item.id} style={{ fontSize: 13, marginTop: 2, marginLeft: 2 }}>
            Missed Ingredients: {item.missedIngredientCount}
          </Text> */}

        </Card>
        {/* </TouchableOpacity> */}
      </View>
    );
  }

  keyExtractor = (item, index) => {
    return index.toString();
  }

  render() {

    return (
      <View
      onStartShouldSetResponderCapture={() => {
        this.setState({ enableScrollViewScroll: true });
      }}>
      <ScrollView
        scrollEnabled={this.state.enableScrollViewScroll}
      >
        <View style={styles.homeContainer}>
          <View>
            <Text style={{ fontFamily: "Raleway-semibold-i", fontSize: 35, marginLeft: 15, marginTop: 50 }}>Welcome Back,</Text>
            <Text style={{ fontFamily: "Raleway-semibold-i", fontSize: 35, marginLeft: 15 }}>{this.state.name} !</Text>
          </View>

          <Button
            buttonStyle={{
              width: "45%",
              alignSelf: 'center',
              marginTop: 30,
              backgroundColor: "#ff944d"
            }}
            titleStyle={{
              fontSize: 19,
            }}
            title="Console Log Recipes"
            onPress={() => this.debug()}
          />

          <View
            style={{ marginTop: 15, marginLeft: 4, alignSelf: 'center' }}
            onStartShouldSetResponderCapture={() => {
              this.setState({ enableScrollViewScroll: true });

            }}>
            <FlatList
              contentContainerStyle={{ alignSelf: 'flex-start' }}
              numColumns={2}
              data={this.state.recipeList}
              scrollEnabled
              keyExtractor={this.keyExtractor}
              renderItem={this.renderRecipes}
            />
          </View>

        </View>
       </ScrollView>
       </View> 
    );
  }
}

export default HomeScreen;