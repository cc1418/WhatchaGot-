import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground} from 'react-native';
import {createAppContainer, SafeAreaView} from 'react-navigation';
import {createStackNavigator} from  'react-navigation-stack'
import MenuDrawer from 'react-native-side-drawer'
import {Button, Input, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../../components/Style';

class SignUpScreen extends React.Component {
  
    // static navigationOptions = {
    //   headerShown: false,
    // }
  
    render() {
      return (
        <View>
        <ImageBackground source={require('../../assets/412bg2.jpg')} style={{height: "100%", width: "100%"}}>
        <View style={styles.container}>
          <View>
            <Input
              inputContainerStyle = {{
                width: "85%"
              }}
              inputStyle = {{
                marginLeft: 8
              }}
              label = "Email Address"
              placeholder=' Email@address.com'
              leftIcon={
                <Icon
                name='envelope'
                size={20}
                color='black'
              />
              }
            />
            <Input
              inputContainerStyle = {{
                width: "85%",
              }}
              containerStyle = {{
                marginTop: 20
              }}
              inputStyle = {{
                marginLeft: 8
              }}
              label = 'Password'
              placeholder=' Password'
              secureTextEntry={true}
              leftIcon={
                <Icon
                  name='lock'
                  size={24}
                  color='black'
                />
              }
            />
  
            <Input
              inputContainerStyle = {{
                width: "85%",
              }}
              containerStyle = {{
                marginTop: 20
              }}
              inputStyle = {{
                marginLeft: 8
              }}
              label = 'Re-type Password'
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
              buttonStyle = {{
                backgroundColor: "#454647",
                width: "45%",
                alignSelf:'center',
                //fontFamily='Comic Sans MS'
                marginTop: 30
              }}
              titleStyle = {{
                fontSize: 16,
              }}
              title="Sign Up"
              onPress={() => this.props.navigation.navigate('Home')}
            />
          </View> 
        </View>
        </ImageBackground>
        </View>
      );
    }
  }
  export default SignUpScreen;
  