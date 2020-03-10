import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground, SnapshotViewIOS } from 'react-native';
import { Button, Input, SearchBar, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
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
      recipeTitles: '',
    };
  }

  state = {
    fridge: []
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
        obj = {id:newId, name:element};
        newFridge.push(obj);
        newId++;
      });
      this.state.ingredients = newFridge
      //alert(JSON.stringify(newFridge))
      this.setState({
        refresh: !this.state.refresh
      })
    }).catch(function(error){
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
    let apiFoot = 'number=5&ranking=2&ingredients='
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

    fetch()
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });

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

    alert(JSON.stringify(this.state.ingredients));

  };

  addFridgeToDB() {
    let userId = firebase.auth().currentUser.uid;
    let fridgeState = this.state.ingredients
    let fridgePush = []
    fridgeState.map((item) => {
      fridgePush.push(item.name);
    });

    let newItem = this.state.value

    alert(fridgePush)
    firebase.database().ref().child('/items/' + userId + '/fridge').set({
      shelf: fridgePush
    });
  }

  renderIngredients = ({ item, index }) => {

    return (
      <View>
        <Card 
        styles = {{
          borderRadius: 1
        }}
        containerStyle = {{
          width: 90,
          height: 55,
          marginLeft: 0,
          marginTop: 3,
          borderColor: "#ff944d"
        }}>
          <TouchableOpacity
            key={item.id}
            onPress={() => this.deleteFromList(item.id)}>
          <Text index={item.id} style={{ fontSize: 13, marginTop: -5, alignSelf: "center"}}>
            {item.name}
          </Text>
          </TouchableOpacity> 
        </Card>
      </View>

    );
  }

  renderRecipes = ({ item, index }) => {

    return (
      <View>
        <Text>
          Name: {item.title}
          
        </Text>

      </View>
    );
  }

  keyExtractor = (item, index) => {
    return index.toString();
  }

  render() {

    const { search } = this.state.value;

    let list = this.state.ingredients.map((item, key) =>
      <View> {
        <Text>
          {item.name}
        </Text>
      }
      </View>
    )

    return (
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
        <View style = {{paddingLeft:10}}> 
          <FlatList
            contentContainerStyle={{alignSelf: 'flex-start'}}
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

        {/* <Button       //Debugging tool, check to make sure list was updated
                buttonStyle = {{
                  backgroundColor: "#454647",
                  width: "45%",
                  alignSelf:'center',
                  marginTop: 30
                }}
                titleStyle = {{
                  fontSize: 19,
                }}
                title="Check Array"
                onPress={() => alert(this.state.ingredients) }
          /> */}

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

        <FlatList
          data={this.state.data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderRecipes}
        />

      </View>

    );
  }
}

export default SearchScreen;