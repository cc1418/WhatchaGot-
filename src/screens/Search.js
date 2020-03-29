import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, ScrollView, Modal, Dimensions } from 'react-native';
import { Button, Input, SearchBar, Card, Icon } from 'react-native-elements';
import * as firebase from 'firebase'

import styles from '../../components/Style';

class SearchScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isLoading: false,
      value: '',               //initialize state to hold user search entry
      ingredients: [],         //initialize empty array in state to hold user input
      data: [],
      recipeInfo: '',
      modalVisible: false
      //enableScrollViewScroll: true,
    };
  }

  componentDidMount() { //Loads the users existing 
    let userId = firebase.auth().currentUser.uid; //Creates variable related to logged in user; Firebase knows who's logged in
    let fridge
    let newId = 0
    let obj
    let newFridge = []
    firebase.database().ref('items/' + userId + '/fridge/shelf/').once('value')
      .then(snapshot => {
        console.log("snapshot", snapshot.val())
        fridge = snapshot.val()

        fridge.map((element) => {
          obj = { id: newId, name: element };
          newFridge.push(obj);
          newId++;
        });
        this.state.ingredients = newFridge
        //alert(JSON.stringify(newFridge))
        this.setState({
          refresh: !this.state.refresh
        })
      }).catch(function (error) {
        return
      })
  }

  searchByIngredient() {  //Function for creating the api call to spoonacular and fetching the call
    {/* Michael API key: 6229cd708177474780e6c39e57b69361 */ }
    // Cory API key: b22b05749d464305b95df9c21d75c666
    //New API key: f7edf2ef0dmsh3fd3127a79e6f9dp1f017bjsn56de39cdf5b6

    let apiCall
    let apiHead = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/'
    let apiFunction = 'findByIngredients?'
    let apiList
    let apiFoot = 'number=8&ranking=2&ingredients='
    let apiKey = 'f7edf2ef0dmsh3fd3127a79e6f9dp1f017bjsn56de39cdf5b6'

    if (this.state.ingredients.length === 0) {
      alert('enter some ingredients first')
      return
    } else if (this.state.ingredients.length > 1) {
      let newArray = []
      this.state.ingredients.map((item) => {
        newArray.push(item.name);
      });
      apiList = newArray.join(",")
    } else {
      apiList = this.state.ingredients[0].name
    }

    apiCall = apiHead + apiFunction + apiFoot + apiList

    // alert(apiCall)    //Debugging: Check created api string

    // fetch()
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    fetch(apiCall, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "f7edf2ef0dmsh3fd3127a79e6f9dp1f017bjsn56de39cdf5b6"
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ data: responseJson })
        //console.log(this.state.data)
        //alert(responseJson[0].title)  //Debugging: make sure recipes come through
      });

    //this.state.data = recipeJson;     //Practice json document for working with Json without making API call
    //alert(this.state.data[0].title )

  };

  updateSearch = search => {
    this.setState({ value: search });  //Set state.value to search term
  }

  updateList() {
    if (this.state.value === '') {     //don't update list if no search term is entered 
      return
    }
    this.setState(state => {  //push search term to state.ingredients array

      let newId

      if (this.state.ingredients.length >= 1) {
        let lastId = this.state.ingredients[(this.state.ingredients.length - 1)].id
        newId = lastId + 1
      } else {
        newId = 0;
      }

      const obj = { id: newId, name: this.state.value }

      const ingredients = state.ingredients.concat(obj);

      return {
        ingredients,
        value: '',
      };
    });
    this.search.clear();
    // this.SearchBar.Text = '';
  };

  deleteFromList = (itemId) => {
    let updatedList = this.state.ingredients
    let num = updatedList.filter(updatedList => updatedList.id !== itemId)
    this.state.ingredients = num
    this.setState({
      refresh: !this.state.refresh
    })

    //alert(JSON.stringify(this.state.ingredients));

  };

  addRecipeToDB() {
    let userId = firebase.auth().currentUser.uid;
    let recipeState = this.state.recipeInfo.id;

    firebase.database().ref().child('/items/' + userId + '/fridge/recipes').push({
      ID: recipeState
    });
    alert("Recipe Saved!")
  }

  addFridgeToDB() {
    let userId = firebase.auth().currentUser.uid;
    let fridgeState = this.state.ingredients
    let fridgePush = []
    fridgeState.map((item) => {
      fridgePush.push(item.name);
    });

    alert(fridgePush)
    firebase.database().ref().child('/items/' + userId + '/fridge').set({
      shelf: fridgePush
    });
  }

  renderIngredients = ({ item, index }) => {

    return (
      <View style={{ marginLeft: 2 }}>
        <Card
          styles={{
            borderRadius: 1,
          }}
          containerStyle={{
            width: (styles.device.width) / 4.5,
            height: 45,
            marginLeft: 0,
            marginRight: 4,
            marginTop: 3,
            borderColor: "#ff944d"
          }}
          wrapperStyle={{

          }}
        >
          <TouchableOpacity
            key={item.id}
            onPress={() => this.deleteFromList(item.id)}>
            <Text index={item.id} style={{ fontSize: 13, marginTop: -5, marginLeft: -20, marginRight: -20, alignSelf: "center" }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        </Card>
      </View>

    );
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

  renderRecipes = ({ item, index }) => {

    return (
      <View>
        <TouchableOpacity onPress={() => this.openRecipe(item.id)}>
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

            <Text index={item.id} style={{ fontSize: 13, marginTop: 15, marginLeft: 2 }}>
              Likes: {item.likes}
            </Text>

            <Text index={item.id} style={{ fontSize: 13, marginTop: 2, marginLeft: 2 }}>
              Missed Ingredients: {item.missedIngredientCount}
            </Text>



          </Card>
        </TouchableOpacity>
      </View>
    );
  }


  keyExtractor = (item, index) => {
    return index.toString();
  }

  render() {

    const { search } = this.state.value;

    let recipeImage = this.state.recipeInfo.image;

    //let deviceWidth = Dimensions.get('window').width;

    let list = this.state.ingredients.map((item, key) =>
      <View> {
        <Text>
          {item.name}
        </Text>
      }
      </View>
    )

    if (this.state.recipeInfo.instructions === "") {
      this.state.recipeInfo.instructions = "Instructions could not be fetched, please visit this site for more info: "
    }

    return (

      <View
        onStartShouldSetResponderCapture={() => {
          this.setState({ enableScrollViewScroll: true });
        }}>
        <ScrollView
          scrollEnabled={this.state.enableScrollViewScroll}
        >
          <View>
            <SearchBar
              ref={search => this.search = search}
              inputStyle={{ backgroundColor: 'white' }}
              containerStyle={{
                backgroundColor: 'white',
                borderWidth: 0.3,
                borderRadius: 20,
                margin: 16,
                marginTop: 50,
                borderColor: "#ffffff00",
              }}
              lightTheme
              inputContainerStyle={{ backgroundColor: 'white' }}
              placeholder="Enter an Ingredient"
              onChangeText={this.updateSearch}
              value={search}
            />
            <View style={{ paddingLeft: 10, flexDirection: "row" }}>
              <FlatList
                contentContainerStyle={{ alignSelf: 'flex-start' }}
                numColumns={4}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={this.state.ingredients}
                extraData={this.state.refresh}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderIngredients}
              />
            </View>

            <Button       //Button for adding search term to search list
              buttonStyle={{
                width: "45%",
                alignSelf: 'center',
                marginTop: 30,
                backgroundColor: "#ff944d"
              }}
              titleStyle={{
                fontSize: 19,
              }}
              title="Add Item"
              onPress={() => this.updateList()}
            />

            <Button       //Button for adding value in search abr to ingredients table in DB
              buttonStyle={{
                width: "45%",
                alignSelf: 'center',
                marginTop: 30,
                backgroundColor: "#ff944d"
              }}
              titleStyle={{
                fontSize: 19,
              }}
              title="Store List in Fridge"
              onPress={() => this.addFridgeToDB()}
            />

            <Button       //Call searchByIngredient function
              buttonStyle={{
                width: "45%",
                alignSelf: 'center',
                marginTop: 30,
                backgroundColor: "#ff944d"
              }}
              titleStyle={{
                fontSize: 19,
              }}
              title="Search"
              onPress={() => this.searchByIngredient()}
            />

            <View style={{ marginTop: 22 }}>
              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                <View style={{ marginTop: 22 }}>
                  <View>
                    <Image
                      source={{ uri: this.state.recipeInfo.image }}
                      style={{ width: '100%', height: 300, resizeMode: 'stretch' }}
                    />
                    <Text>{this.state.recipeInfo.title}</Text>
                    <Text>Number of Servings: {this.state.recipeInfo.servings}</Text>
                    <Text>Ready in: {this.state.recipeInfo.readyInMinutes} minutes</Text>
                    <Text>Instructions: {this.state.recipeInfo.instructions}</Text>

                    <TouchableOpacity
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}>
                      <Text style={{
                        alignSelf: 'center',
                        fontSize: 40,
                      }}>CLOSEEEE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        this.addRecipeToDB();
                      }}>
                      <Text style={{
                        alignSelf: 'center',
                        fontSize: 40,
                      }}>Save Recipe</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>

            <View
              style={{ marginTop: 15, marginLeft: 4, alignSelf: 'center' }}
              onStartShouldSetResponderCapture={() => {
                this.setState({ enableScrollViewScroll: true });
              }}>
              <FlatList
                contentContainerStyle={{ alignSelf: 'flex-start' }}
                numColumns={2}
                data={this.state.data}
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

export default SearchScreen;