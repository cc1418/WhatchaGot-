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

            <Picker selectedValue = {this.state.user} onValueChange = {this.updateUser} 
            style = {{
              height: styles.device.height / 20,
              width: styles.device.width / 2,
              alignSelf:'center'
            }}>
               <Picker.Item label = "Java" value = "Java is the best programming language" />
               <Picker.Item label = "PHP" value = "PHP is the best programming language" />
               <Picker.Item label = "React" value = "React is the best programming language" />
            </Picker>
            <Text style = {{alignSelf:'center', fontSize: 18}}>{this.state.user}</Text>

          </View>
        );
      } 
    }

    export default DietScreen;