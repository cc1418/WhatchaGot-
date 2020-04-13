import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, ScrollView, Modal, Dimensions, Picker } from 'react-native';
import { Button, Input, SearchBar, Card, Icon } from 'react-native-elements';
import * as firebase from 'firebase'
import * as Font from 'expo-font';

import styles from '../../components/Style';

class DietScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      diet: '',
      data: [],
      user: [],
      recipeInfo: '',
      modalVisible: false,
      iconName: "heart-outline"
    };
  }

  async componentDidMount() { //Loads the users existing 
    await Font.loadAsync({
      'sriracha': require('../../assets/fonts/Sriracha-Regular.ttf'),
      'montserrat-bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
      'Raleway-semibold-i': require('../../assets/fonts/Raleway-SemiBoldItalic.ttf'),
      'open-sans': require('../../assets/fonts/OpenSans-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });

    let userId = firebase.auth().currentUser.uid; //Creates variable related to logged in user; Firebase knows who's logged in
    this.setState({ user: userId })

  }

  updateDiet = (diet) => {
    this.setState({ diet: diet })
    this.setState({
      refresh: !this.state.refresh
    })
  }

  findDiets() {

    let apiHead = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?number=6&diet="
    let apiCall = apiHead + this.state.diet
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
        
        this.setState({ data: responseJson.results })
        //console.log(this.state.data)
        //alert(responseJson[0].title)  //Debugging: make sure recipes come through
      })
      .catch(err => {
        console.log(err);
      });
  }

  addRecipeToDB() {
    // let userId = firebase.auth().currentUser.uid;
    let recipeState = this.state.recipeInfo.id;

    firebase.database().ref().child('/items/' + this.state.user + '/fridge/recipes').push({
      ID: recipeState
    });
    alert("Recipe Saved!")
    this.setState({
      refresh: !this.state.refresh
    })
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

            <Text index={item.id} style={{ fontSize: 15, marginTop: -5, alignSelf: "center" }}>
              {item.title}
            </Text>

            <Text index={item.id} style={{ fontSize: 13, marginTop: 10, marginLeft: 2 }}>
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


    return (
      <View style={{ flex: 1, marginTop: 50 }}>
        <ScrollView>
          <Text style={{ fontFamily: "Raleway-semibold-i", fontSize: 33, marginLeft: 20}}> Search Diet recipes </Text>
          <View style = {{flex: 1, flexDirection: 'row'}}>
            <Text style={{ fontFamily: "Raleway-semibold-i", fontSize: 33, marginLeft: 20}}> for</Text>
            <Picker selectedValue={this.state.diet} onValueChange={this.updateDiet}
              style={{
                height: styles.device.height / 16,
                width: styles.device.width / 2.2,
                marginLeft: styles.device.width / 18,
                marginBottom: -5,
                transform: [{ scaleX: 1.25 }, { scaleY: 1.25 }],
                fontFamily: "Raleway-semibold-i"
              }}
              itemStyle = {{
                fontFamily: "Raleway-semibold-i"
              }}
              
              // font family change doesn't work on Android because it only supports IOS as this point

              >

              <Picker.Item label="Select a Diet" value="" />
              <Picker.Item label="Gluten Free" value="Gluten Free" />
              {/* Eliminating gluten means avoiding wheat, barley, rye, and other gluten-containing grains and foods made from them (or that may have been cross contaminated) */}
              <Picker.Item label="Ketogenic" value="Ketogenic" />
              {/* The keto diet is based more on the ratio of fat, protein, and carbs in the diet rather than specific ingredients. Generally speaking, high fat, protein-rich foods are acceptable and high carbohydrate foods are not. */}
              <Picker.Item label="Vegetarian" value="Vegetarian" />
              {/* No ingredients may contain meat or meat by-products, such as bones or gelatin. */}
              <Picker.Item label="Lacto-Vegetarian" value="Lacto-Vegetarian" />
              {/* All ingredients must be vegetarian and none of the ingredients can be or contain egg. */}
              <Picker.Item label="Ovo-Vegetarian" value="Ovo-Vegetarian" />
              {/* All ingredients must be vegetarian and none of the ingredients can be or contain dairy. */}
              <Picker.Item label="Vegan" value="Vegan" />
              {/* No ingredients may contain meat or meat by-products, such as bones or gelatin, nor may they contain eggs, dairy, or honey. */}
              <Picker.Item label="Pescetarian" value="Pescetarian" />
              {/* Everything is allowed except meat and meat by-products - some pescetarians eat eggs and dairy, some do not. */}
              <Picker.Item label="Paleo" value="Paleo" />
              {/* Allowed ingredients include meat (especially grass fed), fish, eggs, vegetables, some oils (e.g. coconut and olive oil), and in smaller quantities, fruit, nuts, and sweet potatoes. We also allow honey and maple syrup (popular in Paleo desserts, but strict Paleo followers may disagree). Ingredients not allowed include legumes (e.g. beans and lentils), grains, dairy, refined sugar, and processed foods. */}
              <Picker.Item label="Primal" value="Primal" />
              {/* Very similar to Paleo, except dairy is allowed - think raw and full fat milk, butter, ghee, etc. */}
              <Picker.Item label="Whole30" value="Whole30" />
              {/* Allowed ingredients include meat, fish/seafood, eggs, vegetables, fresh fruit, coconut oil, olive oil, small amounts of dried fruit and nuts/seeds. Ingredients not allowed include added sweeteners (natural and artificial, except small amounts of fruit juice), dairy (except clarified butter or ghee), alcohol, grains, legumes (except green beans, sugar snap peas, and snow peas), and food additives, such as carrageenan, MSG, and sulfites. */}
            </Picker>
          </View>
        {/* <Text style={{ alignSelf: 'center', fontSize: 18, width: styles.device.width / 1.1 }}>{this.state.diet}</Text> */}



        <Icon                                     // CLOSE MODAL
          containerStyle={{
            width: styles.device.width / 5,
            alignSelf: 'center',
          }}
          size={50}
          name='magnify'
          type='material-community'
          color='#ff944d'
          onPress={() => this.findDiets()}
          />

        {/* <Button       //Button for searching recipes based on selected diet
          buttonStyle={{
            width: "45%",
            alignSelf: 'center',
            marginTop: 30,
            backgroundColor: "#ff944d"
          }}
          titleStyle={{
            fontSize: 19,
          }}
          title="Search Diets"
          onPress={() => this.findDiets()}
        /> */}

        <View
          style={{ marginTop: 15, marginLeft: -5, alignSelf: 'center' }}
          onStartShouldSetResponderCapture={() => {
            this.setState({ enableScrollViewScroll: true });
          }}>
          <FlatList
            contentContainerStyle={{ alignSelf: 'flex-start' }}
            numColumns={2}
            extraData={this.state.refresh}
            data={this.state.data}
            scrollEnabled
            keyExtractor={this.keyExtractor}
            renderItem={this.renderRecipes}
          />
        </View>

        <View style={{ marginTop: 5 }}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
          >
              <View>
                <View style={{ flexDirection: "row" }}>

                  <Icon                                     // CLOSE MODAL
                    containerStyle={{
                      width: styles.device.width / 5,
                      alignSelf: 'center',
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
                    style={{ width: styles.device.width / 1.7, height: 200, alignSelf: 'center', justifyContent: 'center', marginTop: 20 }}
                  />

                  <Icon                                    // SAVE RECIPE
                    containerStyle={{
                      width: styles.device.width / 5,
                      alignSelf: 'center',
                      marginTop: -150
                    }}
                    size={33}
                    name={this.state.iconName}
                    type='material-community'
                    color='red'
                    onPress={() => {
                      this.addRecipeToDB();
                      this.setState(
                        { iconName: "heart" })
                    }}
                  />


                </View>
                <View style={{ marginLeft: 22 }}>
                  <Text style={{ fontSize: 17, marginTop: 10, fontWeight: 'bold' }}>{this.state.recipeInfo.title}</Text>
                  <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Number of Servings: {this.state.recipeInfo.servings}</Text>
                  <Text style={{ fontSize: 17, marginBottom: 10, fontWeight: 'bold' }}>Ready in: {this.state.recipeInfo.readyInMinutes} minutes</Text>
                </View>
                <Text style={{ width: styles.device.width / 1.1, alignSelf: 'center' }}>{this.state.recipeInfo.instructions}</Text>

              </View>
          </Modal>
        </View>
      </ScrollView>
      </View>
    );
  }
}

export default DietScreen;