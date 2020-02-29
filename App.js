import * as React from 'react';
import { YellowBox } from 'react-native';
import {createAppContainer, SafeAreaView} from 'react-navigation';
import {createStackNavigator} from  'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import _ from 'lodash'

import './src/config.js'

import LoginScreen from './src/screens/Login';
import SignUpScreen from './src/screens/SignUp';
import HomeScreen from './src/screens/Home';
import SearchScreen from './src/screens/Search';
import DietScreen from './src/screens/Diet';
import Profile from './src/screens/Profile'
import AddItem from './src/screens/AddItem';
import ListItem from './src/screens/ListItem';  

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

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