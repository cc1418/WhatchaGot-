import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground } from 'react-native';
import { Button, Input, SearchBar } from 'react-native-elements';
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
      ingredients: [{ id: 0, name: 'sugar' }, { id: 1, name: 'flour' }, { id: 2, name: 'eggs' }],         //initialize empty array in state to hold user input
      data: [],
      recipeTitles: '',
    };
  }

  componentDidMount() {
    var userId = firebase.auth().currentUser.uid; //Creates variable related to logged in user; Firebase knows who's logged in
    firebase.database().ref('items/' + userId).on('value', snapshot => { //ref('table/' + userId).on('value') refers to the specific user's area of the table, and constantly looks at whatever 'value' is specified in the following enclosure
      //this.setState({ email: snapshot.val().email }); //.email is the 'value' and snapshot.val() is taking a snapshot of that value
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
    let $fridgeState = this.state.ingredients
    let $fridgePush = []
    $fridgeState.map((item) => {
      $fridgePush.push(item.name);
    });

    let newItem = this.state.value

    alert($fridgePush)
    firebase.database().ref().child('/items/' + userId + '/fridge').set({
      shelf: $fridgePush
    });
  }

  renderIngredients = ({ item, index }) => {

    return (
      <View>
        <TouchableOpacity
          key={item.id}
          onPress={() => this.deleteFromList(item.id)}>
          <Text index={item.id} style={{ fontSize: 20 }}>
            {item.name}
          </Text>
        </TouchableOpacity>
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
          containerStyle={{ backgroundColor: 'white', borderWidth: 0.3, borderRadius: 10, margin: 10, marginTop: 45 }}
          inputContainerStyle={{ backgroundColor: 'white' }}
          placeholder="Enter an Ingredient"
          onChangeText={this.updateSearch}
          value={search}
        />

        <FlatList
          data={this.state.ingredients}
          extraData={this.state.refresh}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderIngredients}
        />

        <Button       //Button for adding search term to search list
          buttonStyle={{
            backgroundColor: "#454647",
            width: "45%",
            alignSelf: 'center',
            marginTop: 30
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
            backgroundColor: "#454647",
            width: "45%",
            alignSelf: 'center',
            marginTop: 30
          }}
          titleStyle={{
            fontSize: 19,
          }}
          title="Store List in Fridge"
          onPress={() => this.addFridgeToDB()}
        />

        <Button       //Call searchByIngredient function
          buttonStyle={{
            backgroundColor: "#454647",
            width: "45%",
            alignSelf: 'center',
            marginTop: 30
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