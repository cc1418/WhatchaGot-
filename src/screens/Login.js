import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Alert } from 'react-native';
import { Button, Input, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase'
import * as Font from 'expo-font';


import styles from '../../components/Style';

class LoginScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      fontLoaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'sriracha': require('../../assets/fonts/Sriracha-Regular.ttf'),
      'montserrat-bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
      'Raleway-semibold-i': require('../../assets/fonts/Raleway-SemiBoldItalic.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  state = {
    email: '',
    password: '',
  }

  handleLogin = () => {
    const { email, password } = this.state

    try {
      firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Home'))
        .catch(error => {
          alert(error.message);
        })
    } catch (err) {
      alert(err)
    }
  }

  render() {
    if (!this.state.fontLoaded) {
      return (<View>{/*some loader*/}</View>);
    }
    return (
      <View>
        <ImageBackground source={require('../../assets/412bg2.jpg')} style={{ width: '100%', height: '100%' }}>
          <View style={styles.container}>
            <View>
              <Text style={{ fontFamily: 'Raleway-semibold-i', fontSize: 31, marginLeft: 75, marginTop: 53 }}>Welcome</Text>
              <Text style={{ fontFamily: 'Raleway-semibold-i', fontSize: 28, marginLeft: 130 }}>To</Text>
              <Text style={{ fontFamily: 'Raleway-semibold-i', fontSize: 45 }}>WhatchaGot</Text>
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
                  marginLeft: 12
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
                //onPress={() => this.props.navigation.navigate('Home')}
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