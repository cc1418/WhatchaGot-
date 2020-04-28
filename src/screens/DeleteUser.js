import React from 'react';
import { View, Alert } from 'react-native';
import * as firebase from 'firebase';
import { Button, Text } from 'react-native-elements';

import styles from '../../components/Style';

export default class DeleteUserScreen extends React.Component {

    onDeletePress = () => {
        var user = firebase.auth().currentUser;
        var userId = firebase.auth().currentUser.uid;
        let userRef = firebase.database().ref('/users');
        firebase.database().ref('users/' + userId).off('value');

        userRef.child(userId).remove().then(() => {
            user.delete().then(() => {
                Alert.alert('User was Deleted')
            }).catch((error) => {
                Alert.alert(error.massage)
            }).then(this.props.navigation.navigate('Login'))
        }).catch((error) => {
            Alert.alert(error.message)
        });
    }

    render() {
        return (
            <View>
                <Text 
                style={{ 
                    color: 'red', 
                    fontSize: 30, 
                    marginTop: 250, 
                    marginLeft: 10, 
                    textAlign: 'center',
                    }}>
                    ARE YOU SURE YOU WANT TO DELETE THIS USER?
                </Text>
                <Button
                    title='Delete User'
                    buttonStyle={{
                        width: "80%",
                        alignSelf: 'center',
                        marginTop: 60,
                        marginBottom: 20,
                        backgroundColor: "red",
                    }}
                    titleStyle={{
                        fontSize: 19,
                    }}
                    onPress={() => {this.onDeletePress()}}
                />
                <Button
                    title='Back'
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