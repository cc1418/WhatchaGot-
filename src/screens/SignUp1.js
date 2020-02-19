import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground, Alert } from 'react-native';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import MenuDrawer from 'react-native-side-drawer'
import { Button, Input, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { db } from '../config';

let addUser = user => {
  db.ref('/user').push({
    user: user
  });
};

export default class SignUp1 extends Component {
  state = {
    email: '',
    password: ''
  }

  handleEmailChange = e => {
    this.setState({
      email: e.nativeEvent.Text
    });
  }
  
  handlePasswordChange = e => {
    this.setState({
      password: e.nativeEvent.Text
    });
  }

  handleSubmit = () => {
    db.ref('/user').push(this.state);
    Alert.alert('User Created Successfully. Please Login.');
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
          style={styles.itemInput}
            inputContainerStyle={{
              width: "85%"
            }}
            inputStyle={{
              marginLeft: 8
            }}
            label="Email Address"
            placeholder=' Email@address.com'
            leftIcon={
              <Icon
                name='envelope'
                size={20}
                color='black'
                onChange={this.handleEmailChange}
              />
            }
          />
          <TextInput
          style={styles.itemInput}
            inputContainerStyle={{
              width: "85%",
            }}
            containerStyle={{
              marginTop: 20
            }}
            inputStyle={{
              marginLeft: 8
            }}
            label='Password'
            placeholder=' Password'
            secureTextEntry={true}
            leftIcon={
              <Icon
                name='lock'
                size={24}
                color='black'
              />
            }
            onChange={this.handlePasswordChange}
          />

          <Input
            inputContainerStyle={{
              width: "85%",
            }}
            containerStyle={{
              marginTop: 20
            }}
            inputStyle={{
              marginLeft: 8
            }}
            label='Re-type Password'
            placeholder=' Type your password again'
            secureTextEntry={true}
            leftIcon={
              <Icon
                name='lock'
                size={24}
                color='black'
              />
            }
          />

          <Button
            buttonStyle={{
              backgroundColor: "#454647",
              width: "45%",
              alignSelf: 'center',
              //fontFamily='Comic Sans MS'
              marginTop: 30
            }}
            titleStyle={{
              fontSize: 16,
            }}
            title="Sign Up"
            onPress={this.handleSubmit}
          //onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({

  apiContainer: {
    flex: 1,
    backgroundColor: '#397299',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 5,
  },
  item: {
    backgroundColor: '#1b2838',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    color: '#c7d5e0',
    fontWeight: "bold"
  },

  enterTitle: {
    fontSize: 20,
    margin: 80
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black'
  },
  libraryContainer: {
    flex: 1,
    alignContent: "flex-start",
    justifyContent: 'flex-start',
    backgroundColor: '#404040'
  },
  libraryItem: {
    marginBottom: 17,
    height: '10%',
  },
  libraryItemImage: {
    height: 100,
    paddingBottom: 20
  },

  supportContainer: {
    textAlignVertical: 'top',
    paddingLeft: 15,
  },
  textbox: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 0.8,
    borderColor: '#000000',
    paddingBottom: 8,
    width: 220,
    height: 42,
    marginTop: 50,
    marginBottom: 1
  },
  textbox2: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 0.8,
    borderColor: '#000000',
    paddingBottom: 8,
    width: 220,
    height: 42,
    marginBottom: 30,
  },

  loginbtn: {
    padding: 10,
    width: '50%',
    height: '50%',
    color: 'green',

  },
  logo: {
    marginLeft: 130,
    marginTop: 300,
    width: 220,
    height: 220,
  },

  username: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 3,
    marginLeft: 59,
  },

  info: {
    width: 130,
    height: 130,
    marginLeft: 60,
    marginTop: 10,
  },

  signin: {
    marginLeft: 175,
    borderRadius: 10,
    width: 115,
    height: 42
  },

  menu: {
    marginTop: 55,
    marginLeft: 65,
    fontSize: 20
  },

  menuBtn: {
    flex: 1,
    width: 60,
    height: 60,
  },
  nextbtn: {
    width: 50,
    paddingTop: 50,
  },

  navBtnBG: {
    color: '#bfbfbf',
  },

  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginTop: -5,
  //   zIndex: 0
  // },
  animatedBox: {
    flex: 1,
    backgroundColor: "#d9d9d9",
    padding: 9
  },
  customBtnText: {
    fontSize: 30,
  },
  customBtnBG: {
    paddingLeft: 10,
  }
});
