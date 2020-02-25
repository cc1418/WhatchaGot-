import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground} from 'react-native';
import {createAppContainer, SafeAreaView} from 'react-navigation';
import {createStackNavigator} from  'react-navigation-stack'
import MenuDrawer from 'react-native-side-drawer'
import {Button, Input, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from 'react-navigation-tabs';

import { MaterialCommunityIcons } from 'react-native-vector-icons';

import './src/config.js'
import styles from './components/Style';

import LoginScreen from './src/screens/Login';
import SignUpScreen from './src/screens/SignUp';
import HomeScreen from './src/screens/Home';
import SearchScreen from './src/screens/Search';
import DietScreen from './src/screens/Diet';
import Profile from './src/screens/Profile'

import AddItem from './src/screens/AddItem';
import ListItem from './src/screens/ListItem';
// import SignUp1 from './src/screens/SignUp1';
// import Login1 from './src/screens/Login1';


const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="magnify" color={color} size={26} />
        ),
      }
    },
    Diet: {
      screen: DietScreen,
      navigationOptions: {
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="food-apple" color={color} size={25} />
        ),
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account-circle" color={color} size={26} />
        ),
      }
    },
  },  
);

const ScreenNavigator = createStackNavigator(
  {
    tabs: AppNavigator,
    Login: LoginScreen,
    SignUp: SignUpScreen,
    AddItem: AddItem,
    ListItem: ListItem,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
)

const AppContainer = createAppContainer(ScreenNavigator);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}