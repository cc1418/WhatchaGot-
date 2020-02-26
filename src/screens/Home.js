import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground} from 'react-native';
import {createAppContainer, SafeAreaView} from 'react-navigation';
import {createStackNavigator} from  'react-navigation-stack'
import MenuDrawer from 'react-native-side-drawer'
import {Button, Input, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

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