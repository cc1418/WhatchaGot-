import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground} from 'react-native';
import {createAppContainer, SafeAreaView} from 'react-navigation';
import {createStackNavigator} from  'react-navigation-stack'
import MenuDrawer from 'react-native-side-drawer'
import {Button, Input, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import './src/config.js'
import styles from './components/Style';

import LoginScreen from './src/screens/Login';
import SignUpScreen from './src/screens/SignUp';
import HomeScreen from './src/screens/Home';
import SearchScreen from './src/screens/Search';
import ListScreen from './src/screens/Diet';
import Profile from './src/screens/Profile'

import AddItem from './src/screens/AddItem';
import ListItem from './src/screens/ListItem';
import SignUp1 from './src/screens/SignUp1';
import Login1 from './src/screens/Login1';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Diet"
        component={ListScreen}
        options={{
          tabBarLabel: 'Diet',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="food-apple" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarVisible: false,
          tabBarLabel: 'Login',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          tabBarVisible: false,
          tabBarLabel: 'SignUp',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Nav() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}


// import SearchData from './src/screens/SearchData';

// function Item({title}) {
//   return (
//     <TouchableOpacity style={styles.item}>
//       <Text style={styles.title}>{title}</Text>
//     </TouchableOpacity>
//   );
// }


// class Header extends React.Component {
//   render () {
//     return (
//       <Image 
//         source={require('./assets/menu.png')}
//         style={styles.menuBtn}
//         //onPress={}
//       />
//     );
//   }
// }

//import * as recipeJson from './Data.json';    //Practice json document for working with Json without making API call

// const RootStack = createStackNavigator (
//   {
//     Login: LoginScreen,
//     SignUp: SignUpScreen,
//     Home: HomeScreen,
//     Search: SearchScreen,
//     List: ListScreen,
//     //Home, 
//     AddItem, 
//     ListItem, 
//     SignUp1, 
//     Login1
//   },
//   {
//     initialRouteName: 'Login',
//   },
// )

// const AppContainer = createAppContainer(RootStack);

// export default class App extends React.Component {
//   render() {
//     return (
//       <AppContainer />
//     );
//   }
// }



