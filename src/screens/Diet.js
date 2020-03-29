import React, { useState } from 'react';
import {Text, View, Image, TouchableOpacity, FlatList, ScrollView, Modal, Dimensions} from 'react-native';
import { Button, Input, SearchBar, Card, Icon} from 'react-native-elements';
import * as firebase from 'firebase'

import styles from '../../components/Style';

class DietScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  compnentDidMount(){

  }
  
    render () {
          return (
          <View style={styles.container}>

            <Text>111</Text>
          </View>
        );
      } 
    }

    export default DietScreen;