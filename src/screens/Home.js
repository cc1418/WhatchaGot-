import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground} from 'react-native';
import {Button, Input, SearchBar } from 'react-native-elements';

import styles from '../../components/Style';

class HomeScreen extends React.Component {

  render () {
    return (
      <View style={styles.container}>

        <View> 
          <Text>Home Screen</Text>
          <Button title="Add an Item"
          onPress={() => this.props.navigation.navigate('AddItem')}
          />
          <Button title="List of Items"
          color="green"
          onPress={() => this.props.navigation.navigate('ListItem')}
          />
        </View>

      </View>
    );
  }
}

export default HomeScreen;