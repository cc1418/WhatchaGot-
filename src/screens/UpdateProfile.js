import React from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import * as firebase from 'firebase'
import { Input } from 'react-native-elements';

export default class UpdateProfile extends React.Component {

    state = {
        name: [], 
        email: [], 
        // password: []
    }

    componentDidMount() {
        var userId = firebase.auth().currentUser.uid;
        let userRef = this.firebase.database().ref('users/' + userId);
        userRef.child(currentUser).update({
            name: name, 
            email: email
        }).then(() => {
            this.props.navigation.navigate('Profile');
            Alert.alert('Updated User Information Successfully')
        })
    }

    render() {
        return (
            <Input 
            placeholder={this.state.name} 
            value={this.state.name}
            onChangeText={name => this.setState({name})}
            />
            <Input
            
            />
            <Button onPress={this.componentDidMount} />
        )
    }


}