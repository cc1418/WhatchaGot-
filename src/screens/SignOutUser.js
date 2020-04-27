import React from 'react';
import { View, Alert } from 'react-native';
import * as firebase from 'firebase';
import { Button, Text } from 'react-native-elements';

import styles from '../../components/Style';

export default class SignOutUserScreen extends React.Component {

    signOut = () => {
        firebase.auth().signOut()
            .then(this.props.navigation.navigate('Login'))
    }

    render() {
        return (
            <View>
                <Text 
                style={{ 
                    color: 'red', 
                    fontSize: 30, 
                    marginTop: 50, 
                    marginLeft: 10, 
                    textAlign: 'center',

                    }}>
                    ARE YOU SURE YOU WANT TO SIGN OUT?
                </Text>
                <Button
                    title='Sign Out'
                    buttonStyle={{
                        width: "80%",
                        alignSelf: 'center',
                        marginTop: 20,
                        marginBottom: 20,
                        backgroundColor: "red",
                    }}
                    titleStyle={{
                        fontSize: 19,
                    }}
                    onPress={() => {this.signOut()}}
                />
                <Button
                    title='Cancel'
                    buttonStyle={{
                        width: "80%",
                        alignSelf: 'center',
                        marginTop: 10,
                        marginBottom: 30,
                        backgroundColor: "#ff944d",
                    }}
                    titleStyle={{
                        fontSize: 19,
                    }}
                    onPress={() => {
                        this.props.navigation.navigate('Profile')
                    }}
                />
            </View>
        )
    }

}