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

import BottomTabBar from "react-navigation-selective-tab-bar";


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
import SignUp1 from './src/screens/SignUp1';
import Login1 from './src/screens/Login1';


const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Search: {
      screen: SearchScreen
    },
    Diet: {
      screen: DietScreen
    },
    Profile: {
      screen: Profile
    },
    Login: {
      screen: LoginScreen
    },
    SignUp: {
      screen: SignUpScreen
    },
  },
  {
    tabBarComponent: props => {
      return (
        <BottomTabBar
          {...props} // Required
          display={["Home", "Search", "Diet", "Profile"]} // Required
          background="White" // Optional
        />
      );
    }
  },

);

// const Tab = createBottomTabNavigator();

//  function MyTabs() {
//   return (
//     <Tab.Navigator
//       initialRouteName="Login"
//       tabBarOptions={{
//         activeTintColor: '#e91e63',
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="home" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Search"
//         component={SearchScreen}
//         options={{
//           tabBarLabel: 'Search',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="magnify" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Diet"
//         component={DietScreen}
//         options={{
//           tabBarLabel: 'Diet',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="food-apple" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarLabel: 'Profile',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="account-circle" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Login"
//         component={LoginScreen}
//         options={{
//           tabBarVisible: false,
//           tabBarLabel: 'Login',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="home" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="SignUp"
//         component={SignUpScreen}
//         options={{
//           tabBarVisible: false,
//           tabBarLabel: 'SignUp',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="home" color={color} size={size} />
//           ),
//         }}
//       />
//       <BottomTabBar
//         {...props} // Required
//         display={["Home", "Search", "Diet", "Profile"]} // Required
//         background="White" // Optional
//       />
//      </Tab.Navigator>
//    );
//  }

//  export default function Nav() {
//    return (
//      <NavigationContainer>
//        <MyTabs />
//      </NavigationContainer>
//    );
//  }

export default createAppContainer(AppNavigator);



