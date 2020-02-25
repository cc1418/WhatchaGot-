import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground, Alert } from 'react-native';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import MenuDrawer from 'react-native-side-drawer'
import { Button, Input, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase'

import styles from '../../components/Style';

class LoginScreen extends React.Component {

  // static navigationOptions = {
  //   headerShown: false,
  // }

  state = {
    email: '',
    password: ''
  }

  handleLogin = () => {
    const { email, password } = this.state

    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <View>
        <ImageBackground source={require('../../assets/412bg2.jpg')} style={{ width: '100%', height: '100%' }}>
          <View style={styles.container}>
            <View>
              <Text style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: 31, marginLeft: 67, marginTop: 100 }}>Welcome</Text>
              <Text style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: 28, marginLeft: 122 }}>To</Text>
              <Text style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: 45 }}>WhatchaGot</Text>
            </View>

            <View>
              <Input
                inputContainerStyle={{
                  width: "75%"
                }}
                containerStyle={{
                  marginTop: 40
                }}
                inputStyle={{
                  marginLeft: 8
                }}
                placeholder=' Email@address.com'
                leftIcon={
                  <Icon
                    name='envelope'
                    size={20}
                    color='black'
                  />
                }
                autoCapitalize='none'
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
              <Input
                inputContainerStyle={{
                  width: "75%",
                }}
                containerStyle={{
                  marginTop: 20
                }}
                inputStyle={{
                  marginLeft: 8
                }}
                placeholder=' Password'
                secureTextEntry={true}
                leftIcon={
                  <Icon
                    name='lock'
                    size={24}
                    color='black'
                  />
                }
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
              <Button
                buttonStyle={{
                  backgroundColor: "#454647",
                  width: "45%",
                  alignSelf: 'center',
                  marginTop: 30
                }}
                titleStyle={{
                  fontSize: 19,
                }}
                title="Sign In"
                onPress={this.handleLogin}
              />
              <Text style={{ marginTop: 15, marginBottom: 3, fontSize: 12, color: "#454647", textAlign: 'center' }}>
                Don't have an account yet?
              </Text>
              <Button
                buttonStyle={{
                  //backgroundColor: "#454647",
                  width: "30%",
                  alignSelf: 'center',
                  //fontFamily='Comic Sans MS'
                }}
                titleStyle={{
                  fontSize: 14,
                }}
                type="outline"
                title="Sign Up"
                onPress={() => this.props.navigation.navigate('SignUp')}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default LoginScreen;