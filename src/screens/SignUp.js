import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground, Alert } from 'react-native';
import { Button, Input, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase'

import styles from '../../components/Style';

class SignUpScreen extends React.Component {

  state = {
    name: '',
    email: '',
    password: ''
  }

  handleSignUp = () => {
    const { name, email, password } = this.state
    try {
      firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((data) => {
          firebase.database().ref('/users/' + data.user.uid).set({
            name: name,
            email: email
          }).then(() => {
            this.props.navigation.navigate('Login');
            Alert.alert('User Created Successfully. Please Login.')
          })
        }).catch(error => {
          alert(error.message);
        })
    } catch (err) {
      alert(err)
    }
  }

  render() {
    return (
      <View>
        <ImageBackground source={require('../../assets/412bg2.jpg')} style={{ height: "100%", width: "100%" }}>
          <View style={styles.container}>
            <View>
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
                label='Name'
                placeholder='John Smith'
                leftIcon={
                  <Icon
                    name='lock'
                    size={24}
                    color='black'
                  />
                }
                value={this.state.name}
                onChangeText={name => this.setState({ name })}
              />
              <Input
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
                  />
                }
                autoCapitalize='none'
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
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
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
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
                onPress={this.handleSignUp}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
export default SignUpScreen;
