import React, { useState } from 'react';
import {Text, View, Image, TouchableOpacity, FlatList, ScrollView, Modal, Dimensions, Picker} from 'react-native';
import { Button, Input, SearchBar, Card, Icon} from 'react-native-elements';
import * as firebase from 'firebase'

import styles from '../../components/Style';

class DietScreen extends React.Component {

  state = {user: ''}
  updateUser = (user) => {
     this.setState({ user: user })
  }

  render () {


    return (
          <View style={{flex: 1, marginTop: 50 }}>
            <Text style = {{alignSelf:'center'}}>一一一一一一一一一一一一一一一一一一一一一一一</Text>
            <Picker selectedValue = {this.state.user} onValueChange = {this.updateUser} 
            style = {{
              height: styles.device.height / 20,
              width: styles.device.width / 2,
              alignSelf:'center',
            }}>
               <Picker.Item label = "Gluten Free" value = "Eliminating gluten means avoiding wheat, barley, rye, and other gluten-containing grains and foods made from them (or that may have been cross contaminated)." />
               <Picker.Item label = "Ketogenic" value = "The keto diet is based more on the ratio of fat, protein, and carbs in the diet rather than specific ingredients. Generally speaking, high fat, protein-rich foods are acceptable and high carbohydrate foods are not." />
               <Picker.Item label = "Vegetarian" value = "No ingredients may contain meat or meat by-products, such as bones or gelatin." />
               <Picker.Item label = "Lacto-Vegetarian" value = "All ingredients must be vegetarian and none of the ingredients can be or contain egg." />
               <Picker.Item label = "Ovo-Vegetarian" value = "All ingredients must be vegetarian and none of the ingredients can be or contain dairy." />
               <Picker.Item label = "Vegan" value = "No ingredients may contain meat or meat by-products, such as bones or gelatin, nor may they contain eggs, dairy, or honey." />
               <Picker.Item label = "Pescetarian" value = "Everything is allowed except meat and meat by-products - some pescetarians eat eggs and dairy, some do not." />
               <Picker.Item label = "Paleo" value = "Allowed ingredients include meat (especially grass fed), fish, eggs, vegetables, some oils (e.g. coconut and olive oil), and in smaller quantities, fruit, nuts, and sweet potatoes. We also allow honey and maple syrup (popular in Paleo desserts, but strict Paleo followers may disagree). Ingredients not allowed include legumes (e.g. beans and lentils), grains, dairy, refined sugar, and processed foods." />
               <Picker.Item label = "Primal" value = "Very similar to Paleo, except dairy is allowed - think raw and full fat milk, butter, ghee, etc." />
               <Picker.Item label = "Whole30" value = "Allowed ingredients include meat, fish/seafood, eggs, vegetables, fresh fruit, coconut oil, olive oil, small amounts of dried fruit and nuts/seeds. Ingredients not allowed include added sweeteners (natural and artificial, except small amounts of fruit juice), dairy (except clarified butter or ghee), alcohol, grains, legumes (except green beans, sugar snap peas, and snow peas), and food additives, such as carrageenan, MSG, and sulfites." />
            </Picker>
            <Text style = {{alignSelf:'center'}}>一一一一一一一一一一一一一一一一一一一一一一一</Text>
            <Text style = {{alignSelf:'center', fontSize: 18, width: styles.device.width / 1.1}}>{this.state.user}</Text>

          </View>
        );
      } 
    }

    export default DietScreen;