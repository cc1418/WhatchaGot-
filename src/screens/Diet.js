import React, { useState } from 'react';
import {Text, View, Image, TouchableOpacity, FlatList, ScrollView, Modal, Dimensions, Picker} from 'react-native';
import { Button, Input, SearchBar, Card, Icon} from 'react-native-elements';
import * as firebase from 'firebase'

import styles from '../../components/Style';

class DietScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      diet: '',
      data: [],
      user: []
    };
  }

  componentDidMount() { //Loads the users existing 
    let userId = firebase.auth().currentUser.uid; //Creates variable related to logged in user; Firebase knows who's logged in
    this.setState({ user: userId })

  }

  updateDiet = (diet) => {
    this.setState({ diet: diet })
  }

  findDiets() {
    
    let apiHead = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?number=2&diet="
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
      this.setState({ data: responseJson })
      console.log(this.state.data)
      //alert(responseJson[0].title)  //Debugging: make sure recipes come through
    })
    .catch(err => {
      console.log(err);
    });
  }

  render () {


    return (
          <View style={{flex: 1, marginTop: 50 }}>
            <Text style = {{alignSelf:'center'}}>一一一一一一一一一一一一一一一一一一一一一一一</Text>
            <Picker selectedValue = {this.state.diet} onValueChange = {this.updateDiet} 
            style = {{
              height: styles.device.height / 20,
              width: styles.device.width / 2,
              alignSelf:'center',
            }}>

               <Picker.Item label = "Select a Diet" value = "" />

               <Picker.Item label = "Gluten Free" value = "Gluten Free" />
               {/* Eliminating gluten means avoiding wheat, barley, rye, and other gluten-containing grains and foods made from them (or that may have been cross contaminated) */}

               <Picker.Item label = "Ketogenic" value = "Ketogenic" />
               {/* The keto diet is based more on the ratio of fat, protein, and carbs in the diet rather than specific ingredients. Generally speaking, high fat, protein-rich foods are acceptable and high carbohydrate foods are not. */}

               <Picker.Item label = "Vegetarian" value = "Vegetarian" />
               {/* No ingredients may contain meat or meat by-products, such as bones or gelatin. */}

               <Picker.Item label = "Lacto-Vegetarian" value = "Lacto-Vegetarian" />
               {/* All ingredients must be vegetarian and none of the ingredients can be or contain egg. */}

               <Picker.Item label = "Ovo-Vegetarian" value = "Ovo-Vegetarian" />
               {/* All ingredients must be vegetarian and none of the ingredients can be or contain dairy. */}

               <Picker.Item label = "Vegan" value = "Vegan" />
               {/* No ingredients may contain meat or meat by-products, such as bones or gelatin, nor may they contain eggs, dairy, or honey. */}

               <Picker.Item label = "Pescetarian" value = "Pescetarian" />
               {/* Everything is allowed except meat and meat by-products - some pescetarians eat eggs and dairy, some do not. */}

               <Picker.Item label = "Paleo" value = "Paleo" />
               {/* Allowed ingredients include meat (especially grass fed), fish, eggs, vegetables, some oils (e.g. coconut and olive oil), and in smaller quantities, fruit, nuts, and sweet potatoes. We also allow honey and maple syrup (popular in Paleo desserts, but strict Paleo followers may disagree). Ingredients not allowed include legumes (e.g. beans and lentils), grains, dairy, refined sugar, and processed foods. */}

               <Picker.Item label = "Primal" value = "Primal" />
               {/* Very similar to Paleo, except dairy is allowed - think raw and full fat milk, butter, ghee, etc. */}

               <Picker.Item label = "Whole30" value = "Whole30" />
               {/* Allowed ingredients include meat, fish/seafood, eggs, vegetables, fresh fruit, coconut oil, olive oil, small amounts of dried fruit and nuts/seeds. Ingredients not allowed include added sweeteners (natural and artificial, except small amounts of fruit juice), dairy (except clarified butter or ghee), alcohol, grains, legumes (except green beans, sugar snap peas, and snow peas), and food additives, such as carrageenan, MSG, and sulfites. */}


            </Picker>
            <Text style = {{alignSelf:'center'}}>一一一一一一一一一一一一一一一一一一一一一一一</Text>
            <Text style = {{alignSelf:'center', fontSize: 18, width: styles.device.width / 1.1}}>{this.state.diet}</Text>

            <Button       //Button for searching recipes based on selected diet
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
            />

          </View>
        );
      } 
    }

    export default DietScreen;