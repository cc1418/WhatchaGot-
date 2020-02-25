import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground} from 'react-native';
import {createAppContainer, SafeAreaView} from 'react-navigation';
import {createStackNavigator} from  'react-navigation-stack'
import MenuDrawer from 'react-native-side-drawer'
import {Button, Input, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../../components/Style';

class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation}) => {
    return {
      headerLeft: () => (
        <View>
          <TouchableOpacity
            style={styles.customBtnBG}
            onPress={navigation.getParam('toggleOpen')}  >
            <Text style={styles.customBtnText}>☰</Text>
          </TouchableOpacity>
        </View>
      ),
    };
  };

  UNSAFE_componentWillMount() {
    this.props.navigation.setParams({ toggleOpen: this.toggleOpen});
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };
  
  drawerContent = () => {
    return (
      <View style={styles.animatedBox}>
        <Image style={styles.info} source={require('../../assets/link.jpg')}/>
        <Text style={styles.username}>MyNamesCory</Text>
        <Text style={styles.menu} onPress={() => {
          if (this.state.open){
            this.toggleOpen();
          } 
          this.props.navigation.navigate('Search')
          }
        }>
          Search
        </Text>
        <Text style={styles.menu} onPress={() => {
          if (this.state.open){
            this.toggleOpen();
          } 
          this.props.navigation.navigate('List')
          }
        }>
           Library 
        </Text>
      </View>
    );
  };

  render () {
    return (
      <View style={styles.container}>
        <MenuDrawer 
          open={this.state.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={60}
          animationTime={200}
          overlay={true}
          opacity={0.4}>  
          <TouchableOpacity onPress={this.toggleOpen} style={styles.body}>
            <Text> </Text>
          </TouchableOpacity>    
        </MenuDrawer>

        <View> 
          <Text>Home Screen</Text>
          <Button title="Add an Item"
          onPress={() => this.props.navigation.navigate('AddItem')}
          />
          <Button title="List of Items"
          color="green"
          onPress={() => this.props.navigation.navigate('ListItem')}
          />
          <Button title="SignUp1"
          onPress={() => this.props.navigation.navigate('SignUp1')}
          />
          <Button title="Login1"
          onPress={() => this.props.navigation.navigate('Login1')}
          />
        </View>

        
      </View>
    );
  }
}

export default HomeScreen;