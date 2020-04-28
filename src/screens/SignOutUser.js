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
                    color: 'black', 
                    fontSize: 30, 
                    marginTop: 250, 
                    marginLeft: 10, 
                    textAlign: 'center',
                    }}>
                    You are signing out...
                </Text>
                <Button
                    title='Continue'
                    buttonStyle={{
                        width: "80%",
                        alignSelf: 'center',
                        marginTop: 50,
                        marginBottom: 20,
                        backgroundColor: "red",
                    }}
                    titleStyle={{
                        fontSize: 19,
                    }}
                    onPress={() => {this.signOut()}}
                />
                <Button
                    title='Return'
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