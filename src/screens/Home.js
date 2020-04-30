import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, ScrollView, Modal, Dimensions, Alert } from 'react-native';
import { Button, Input, SearchBar, Card, Icon, Avatar } from 'react-native-elements';
import * as firebase from 'firebase'
import styles from '../../components/Style';
import * as Font from 'expo-font';
console.disableYellowBox = true;

class HomeScreen extends React.Component {

  constructor() {
    super();

    var userId = firebase.auth().currentUser.uid;

    this.state = {
      fontLoaded: false,
      name: [],
      email: [],
      user: userId,
      recipeId: [],  //recipe IDs as they are in the user's database
      apiId: [],  //recipe IDs fetched to be displayed; initialized to same value as reipeId since recipes automatically fetched on load
      recipeList: [],  //recipes displayed on the home page
      recipeInfo: '',
      modalVisible: false,
    };

    

  }

  componentWillMount() {

    firebase.database().ref('users/' + this.state.user).on('value', snapshot => {
      this.setState({ email: snapshot.val().email });
      this.setState({ name: snapshot.val().name });
    })

    firebase.database().ref('profile/' + this.state.user ).on('value', snapshot => {
      this.setState({ profile: snapshot.val().profilePicture })
    })   

  }

  async componentDidMount() {
    let recipe = [];
    let i = 0
    firebase.database().ref('items/' + this.state.user + '/fridge/recipes/').orderByKey().on('value', snapshot => {
      //console.log("snapshot", snapshot.val())
      //console.log("key", snapshot.key)
      let recipeJson = snapshot.val();

      if(recipeJson == undefined) {
        console.log("no recipes")
        return;
      } else {
        console.log("why")
        recipe = this.createRecipeList(recipeJson);
        this.setRecipes(recipe);
        this.setState({recipeId: recipe});
        console.log("firebase", recipe);
      }

      
      
      recipe = [];
      return;
      //console.log(Object.values(recipeJson)[i].ID)
      //recipe.push(Object.values(recipeJson)[0]);
      //this.setRecipes(recipe)
    })

    await Font.loadAsync({
      'Baskerville-bold': require('../../assets/fonts/LibreBaskerville-Bold.ttf'),
      'Baskerville': require('../../assets/fonts/LibreBaskerville-Regular.ttf'),
      'sriracha': require('../../assets/fonts/Sriracha-Regular.ttf'),
      'montserrat-bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
      'Raleway-semibold-i': require('../../assets/fonts/Raleway-SemiBoldItalic.ttf'),
      'open-sans': require('../../assets/fonts/OpenSans-Regular.ttf'),
    });

    this.setState({ fontLoaded: true }); 

    // firebase.database().ref('/items/' + this.state.user + '/fridge/recipes/')

  }

  createRecipeList(json) {
    let recipe = [];
    if (json == undefined) return recipe;
    Object.values(json).map((data) => {
      console.log("success");
      recipe.push(data.ID);
    });
    console.log(recipe)
    return recipe;
  }

  setRecipes(idArray) {
    //console.log(idArray)
    if(idArray.length > 0){
      console.log("running")
      this.fetchRecipes(idArray);
    }
    
  }

  fetchRecipes(idArray) {
    console.log("repeating")
    let apiId = idArray.join(",")
    let apiCall = ("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=" + apiId)

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
        this.setState({ recipeList: responseJson })  //<<<<<-------------------------------------------------------------------
        //console.log(JSON.stringify(responseJson))
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        //console.log(this.state.recipeList)
      })
      .catch(err => {
        this.setState({ recipeList: [] })
        alert("error")
      });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  openRecipe = (recipeId) => {
    let apiCall
    let apiHead1 = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/'
    let apiHead2 = '/information'

    apiCall = apiHead1 + recipeId + apiHead2

    //alert(apiCall)


    fetch(apiCall, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "f7edf2ef0dmsh3fd3127a79e6f9dp1f017bjsn56de39cdf5b6"
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(JSON.stringify(responseJson))
        this.state.recipeInfo = responseJson
        this.setModalVisible(!this.state.modalVisible)
        //alert(responseJson.image)
      });

  }
  // debug() {
  //   console.log(JSON.stringify(this.state.recipeList))
  // }

  renderRecipes = ({ item, index }) => {

    return (
      <View>
        <TouchableOpacity onPress={() => this.openRecipe(item.id)}>
          <Card
            containerStyle={{
              width: (styles.device.width) / 2.4,
              height: 215,
              marginLeft: 1,
              marginTop: 12,
              borderColor: "#ff944d",
              borderRadius: 10,
              borderWidth: 1.3
            }}
            image={{ uri: item.image }}
            imageProps={{
              borderRadius: 10
            }}
          >
            <Text index={item.id} style={{ fontSize: 13, marginTop: -5, alignSelf: "center", fontFamily: 'Baskerville' }}>
              {item.title}
            </Text>

          </Card>
        </TouchableOpacity>
      </View>
    );
  }

  deleteFromDB = () => {

    let recipeState = this.state.recipeInfo.id;
    //console.log(recipeState)
    let recipeRef
    let targetObjectKey
    firebase.database().ref('/items/' + this.state.user + '/fridge/recipes/').once('value', snapshot => {
      let recipeJson = snapshot.val();
      //console.log(Object.keys(recipeJson))
      //console.log(Object.values(recipeJson))
      console.log("delete")

      let i = 0;
      
      Object.values(recipeJson).map((data) => {   // Identify recipe key
        if (data.ID == recipeState){
          targetObjectKey = Object.keys(recipeJson)[i]
        } else {
          i++
        }
      })

    });

    //console.log(targetObjectKey)

    firebase.database().ref('/items/' + this.state.user + '/fridge/recipes/' + targetObjectKey).remove()
    this.setState({recipeList: []})
  }

  ListEmpty = () => {
    return (
      //View to show when list is empty
      <View style={styles.MainContainer}>
        <Text style={{ textAlign: 'center' }}>No recipe stored...</Text>
      </View>
    );
  };

  keyExtractor = (item, index) => {
    return index.toString();
  }

  _listEmptyComponent = () => {
    return (
        <View>
            // any activity indicator or error component
        </View>
    )
}

  render() {

    const { fontLoaded } = this.state;

    if (fontLoaded) {
      return (
        <View>
          <ScrollView>
            <View style={styles.homeContainer}>
              <View>
                <View style = {{flex: 1, flexDirection: 'row' }}>
                  <Text style={{ fontFamily: "Baskerville-bold", fontSize: 27, marginLeft: 15, marginTop: 60 }}>Welcome Back,</Text>
                  <Avatar
                    containerStyle={{
                      marginTop: 30,
                      marginLeft: 20,
                      marginBottom: -20,
                      alignSelf: 'center',

                    }}
                    rounded
                    size="large"
                    source={{ uri: `${this.state.profile}` }}>
                  </Avatar>
                </View>
                <Text style={{ fontFamily: "Baskerville-bold", fontSize: 32, marginLeft: 15, marginBottom: 30, marginTop: 10}}>{this.state.name} !</Text>
              </View>

              {/* <Button
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
            /> */}

              <View
                style={{ marginTop: 15, marginLeft: 15 }}
                onStartShouldSetResponderCapture={() => {
                  this.setState({ enableScrollViewScroll: true });
                }}>
                <Text style={{ fontFamily: "Baskerville-bold", fontSize: 20, marginLeft: 0, marginTop: 10, marginBottom: 10 }}>Stored Recipes: </Text>
                
                <FlatList
                  contentContainerStyle={{ alignSelf: 'flex-start' }}
                  numColumns={2}
                  data={this.state.recipeList}
                  ListEmptyComponent = {this.ListEmpty}
                  extradata={this.state.refresh}
                  scrollEnabled
                  keyExtractor={this.keyExtractor}
                  renderItem={this.renderRecipes}
                />

              </View>

            </View>
          </ScrollView>

          <View>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
            >
              <ScrollView style={{ marginTop: 5 }}>
                <View>
                  <View style={{ flexDirection: "row" }}>

                    <Icon                                     // CLOSE MODAL
                      containerStyle={{
                        width: styles.device.width / 5,
                        alignSelf: 'center',
                        marginTop: -150,
                        marginLeft: -20
                      }}
                      size={40}
                      name='arrow-left'
                      type='material-community'
                      color='#ff944d'
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}
                    />

                    <Image
                      source={{ uri: this.state.recipeInfo.image }}
                      style={{ width: styles.device.width / 1.7, height: 200, alignSelf: 'center', justifyContent: 'center', marginTop: 20, marginLeft: 20 }}
                    />

                    <Icon                                    // DELETE RECIPE
                      containerStyle={{
                        width: styles.device.width / 5,
                        alignSelf: 'center',
                        marginTop: -150,
                        marginLeft: 15
                      }}
                      size={33}
                      name='delete-outline'
                      type='material-community'
                      color='red'
                    onPress={() => {
                      this.deleteFromDB(), this.setModalVisible(!this.state.modalVisible);
                    }}
                    />


                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 17, marginTop: 10, fontFamily: 'Baskerville-bold' }}>{this.state.recipeInfo.title}</Text>
                    <Text style={{ fontSize: 17, fontFamily: 'Baskerville-bold' }}>Number of Servings: {this.state.recipeInfo.servings}</Text>
                    <Text style={{ fontSize: 17, marginBottom: 10, fontFamily: 'Baskerville-bold' }}>Ready in: {this.state.recipeInfo.readyInMinutes} minutes</Text>
                  </View>
                  <Text style={{ width: styles.device.width / 1.1, alignSelf: 'center', fontFamily: 'Baskerville', lineHeight: 25, fontSize: 14 }}>{this.state.recipeInfo.instructions}</Text>

                </View>
              </ScrollView>
            </Modal>
          </View>
        </View >
      );
    }
    else {
      return (
        <View style={styles.container}>
          <Text>LOADING</Text>
        </View>
      )
    };
  }
}

export default HomeScreen;