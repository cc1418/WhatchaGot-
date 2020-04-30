import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, ScrollView, Modal, Dimensions, Alert } from 'react-native';
import { Button, Input, SearchBar, Card, Icon } from 'react-native-elements';
import * as firebase from 'firebase'
import Dialog, { DialogTitle, DialogContent } from 'react-native-popup-dialog';

import styles from '../../components/Style';

class SearchScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      open: false,
      fontLoaded: false,
      isLoading: false,
      value: '',               //initialize state to hold user search entry
      ingredients: [],         //initialize empty array in state to hold user input
      data: [],
      recipeInfo: '',
      modalVisible: false,
      iconName: "heart-outline"

      //enableScrollViewScroll: true,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Baskerville-bold': require('../../assets/fonts/LibreBaskerville-Bold.ttf'),
      'Baskerville': require('../../assets/fonts/LibreBaskerville-Regular.ttf'),
      'sriracha': require('../../assets/fonts/Sriracha-Regular.ttf'),
      'montserrat-bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
      'Raleway-semibold-i': require('../../assets/fonts/Raleway-SemiBoldItalic.ttf'),
      'open-sans': require('../../assets/fonts/OpenSans-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });

  }

  componentDidMount() { //Loads the users existing 
    let userId = firebase.auth().currentUser.uid; //Creates variable related to logged in user; Firebase knows who's logged in
    let fridge
    let newId = 0
    let obj
    let newFridge = []
    firebase.database().ref('items/' + userId + '/fridge/fridge/shelf/').once('value')
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
    
    firebase.database().ref('items/' + this.state.user + '/fridge/recipes/').orderByKey().on('value', snapshot => {

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
    this.setState({
      refresh: !this.state.refresh
    })
  }

  // addRecipeToDB() {
  //   let userId = firebase.auth().currentUser.uid;
  //   let recipeState = this.state.recipeInfo.id;

  //   // firebase.database().ref(`items/${userId}/fridge/recipes/`).transaction(function(currentData) {
  //   //   if (currentData === null) {
  //   //     return Alert.alert('worked')
  //   //   } else {
  //   //     return Alert.alert('failed')
  //   //   }
  //   // })


  //   firebase.database().ref(`items/${userId}/fridge/recipes/`).orderByChild('ID').limitToFirst(1).once("value").then( snapshot => {

  //     // .child('/items/' + userId + '/fridge/recipes/ID')


  //     if (snapshot.child('ID').exists()) {
  //       console.log('exists')
  //     } else {
  //       // firebase.database().ref().child('/items/' + userId + '/fridge/recipes').push({
  //       //   ID: recipeState
  //       // })
  //       // alert("Recipe Saved!")
  //       // this.setState({
  //       //   refresh: !this.state.refresh
  //       // })
  //       Alert.alert(snapshot.val())
  //     }
  //   })

  // }
  addFridgeToDB() {
    let userId = firebase.auth().currentUser.uid;
    let fridgeState = this.state.ingredients
    let fridgePush = []
    fridgeState.map((item) => {
      fridgePush.push(item.name);
    });

    alert("List Stored!")
    firebase.database().ref().child('/items/' + userId + '/fridge/fridge').set({
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
            borderColor: "#ff944d",
            borderRadius: 20
          }}
          wrapperStyle={{

          }}
        >
          <TouchableOpacity
            key={item.id}
            onPress={() => this.deleteFromList(item.id)}>
            <Text style={{ fontSize: 10, marginTop: -15, marginLeft: 0, marginRight: -15, marginBottom: -3 ,color: 'grey', fontFamily: 'open-sans'}}>
              x
              </Text>
            <Text index={item.id} style={{ fontSize: 13, marginTop: -1, marginLeft: -20, marginRight: -20, alignSelf: "center", textTransform: 'capitalize',  fontFamily: 'Baskerville'}}>
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
            containerStyle={{
              width: (styles.device.width) / 2.4,
              height: 275,
              marginBottom: 5,
              marginTop: 7,
              borderColor: "#ff944d",
              borderRadius: 10,
              borderWidth: 1.3
            }}
            image={{ uri: item.image }}
            imageProps={{
              borderRadius: 10
            }}
          >

            <Text index={item.id} style={{ fontSize: 14, marginTop: -5, alignSelf: "center", fontFamily: 'Baskerville'}}>
              {item.title}
            </Text>

            <Text index={item.id} style={{ fontSize: 12, marginTop: 10, marginLeft: 2, fontFamily: 'Baskerville'}}>
              Likes: {item.likes}
            </Text>

            <Text index={item.id} style={{ fontSize: 12, marginTop: 2, marginLeft: 2, fontFamily: 'Baskerville'}}>
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

    if (this.state.recipeInfo.instructions === null) {
      this.state.recipeInfo.instructions = `Instructions could not be fetched, please visit this site for more info: 
${this.state.recipeInfo.sourceUrl}`
    }

    return (
      <View>
      <View>
        <ScrollView>
          <View>
            <SearchBar
              ref={search => this.search = search}
              inputStyle={{ backgroundColor: 'white', fontFamily: 'open-sans'}}
              containerStyle={{
                backgroundColor: 'white',
                borderWidth: 0.7,
                borderRadius: 20,
                margin: 16,
                marginTop: 50,
                borderColor: "#ff944d",
                borderTopColor: "#ff944d",
                borderBottomColor: "#ff944d"
              }}
              lightTheme
              inputContainerStyle={{ backgroundColor: 'white' }}
              placeholder="Enter an Ingredient"
              onChange={this.handleChange}
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
                width: styles.device.width / 2.2,
                alignSelf: 'center',
                marginTop: 25,
                backgroundColor: "#ff944d",
                borderRadius: 10
              }}
              titleStyle={{
                fontSize: 16,
                fontFamily: 'Baskerville-bold',
              }}
              title="Add Item"
              disabled={(!this.state.value.length && this.state.ingredients == 0 ? true : false)}
              onPress={() => this.updateList()}
            />

            <View style={{flex: 1, flexDirection:"row", alignItems:'center', justifyContent:"center"}}>
              <Button       //Button for adding value in search abr to ingredients table in DB
                buttonStyle={{
                  width: styles.device.width / 2.2,
                  marginTop: 20,
                  backgroundColor: "#ff944d",
                  borderRadius: 10,
                  alignSelf:'center',
                  marginLeft: 27
                }}
                titleStyle={{
                  fontSize: 16,
                  fontFamily: 'Baskerville-bold',
                }}
                // style = {{
                //   justifyContent:'center',
                //   alignSelf:'center'
                // }}
                title="Store List in Fridge"
                disabled={(this.state.ingredients.length == 0 ? true : false)}
                onPress={() => {this.addFridgeToDB();
                }}

              />

              <Icon 
                  containerStyle={{
                    marginTop: 20,
                    marginLeft: 10
                  }}
                  size={20}
                  name='information-outline'
                  type='material-community'
                  //color='#ff944d'
                  onPress={() => this.setState({ visible: true })}
              />
            </View>

            <Dialog
                visible={this.state.visible}
                onTouchOutside={() => {
                  this.setState({ visible: false });
                }}
                dialogTitle={<DialogTitle title="What is Fridge?" textStyle = {{fontSize: 15, fontFamily: 'Baskerville-bold'}}/>}
                width = {styles.device.width / 1.4}
              >
                <DialogContent>
                  <Text style = {{marginTop: 10,  fontFamily: 'Baskerville'}}>Fridge stores your current list of ingredients as your default set of ingredients.</Text>
                </DialogContent>
            </Dialog>

            <Button       //Call searchByIngredient function
              buttonStyle={{
                width: styles.device.width / 2.2,
                alignSelf: 'center',
                marginTop: 20,
                backgroundColor: "#ff944d",
                borderRadius: 10
              }}
              titleStyle={{
                fontSize: 16,
                fontFamily: 'Baskerville-bold',
              }}
              title="Search"
              disabled={(this.state.ingredients.length == 0 ? true : false)}
              onPress={() => this.searchByIngredient()}
            />

            <View
              style={{ marginTop: 15, marginLeft: -5, alignSelf: 'center' }}
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

    <View style={{ marginTop: 5 }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
      >
        <ScrollView style={{ marginTop: 5 }}>
          <View>
            <View style={{flexDirection:"row"}}>

            <Icon                                     // CLOSE MODAL
                containerStyle={{
                  width: styles.device.width / 5,
                  alignSelf:'center',
                  marginTop: -150
                }}
                size={40}
                name='arrow-left'
                type='material-community'
                color='#ff944d'
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                  this.setState(
                    { iconName: "heart-outline" });
                }}
            />

              <Image
                source={{ uri: this.state.recipeInfo.image }}
                style={{ width: styles.device.width / 1.7, height: 200, alignSelf:'center', justifyContent:'center', marginTop: 20}}
              />

            <Icon                                    // SAVE RECIPE
                containerStyle={{
                  width: styles.device.width / 5,
                  alignSelf:'center',
                  marginTop: -150
                }}
                size={33}
                name= {this.state.iconName}
                type='material-community'
                color='red'
                onPress={() => {
                  this.addRecipeToDB();
                  this.setState(
                    { iconName: "heart" })
                }}
            />
              
            </View>
              <View style={{alignItems:'center' }}>
                <Text style={{ fontSize: 17, marginTop: 10, fontFamily: 'Baskerville-bold'}}>{this.state.recipeInfo.title}</Text>
                <Text style={{ fontSize: 17, fontFamily: 'Baskerville-bold' }}>Number of Servings: {this.state.recipeInfo.servings}</Text>
                <Text style={{ fontSize: 17, marginBottom: 10, fontFamily: 'Baskerville-bold' }}>Ready in: {this.state.recipeInfo.readyInMinutes} minutes</Text>
              </View>
            <Text style={{ width: styles.device.width / 1.1, alignSelf: 'center', fontFamily: 'Baskerville', lineHeight: 25, fontSize: 14}}>{this.state.recipeInfo.instructions}</Text>

          </View>
        </ScrollView>
      </Modal>
    </View>

    </View>
    );
  }

}



export default SearchScreen;