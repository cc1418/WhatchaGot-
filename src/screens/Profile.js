import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import * as firebase from 'firebase'
import { Input } from 'react-native-elements'

export default class Profile extends React.Component {

    state = {
        name: [],
        email: []
    }

    componentDidMount() {
        var userId = firebase.auth().currentUser.uid;
        console.log(userId)
        // firebase.database().ref('users/' + userId).once('value').then(snapshot => {
        //     console.log("snapshot", snapshot.val())
        //     this.setState({ email: snapshot.val().email });
        //     this.setState({ name: snapshot.val().name })
        // })
        firebase.database().ref('users/' + userId).on('value', snapshot => {
            this.setState({ email: snapshot.val().email });
            this.setState({ name: snapshot.val().name });
        })
    }

    updateName = name => {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + userId).update({
            name: name
        })
    }

    updateEmail = email => {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + userId).update({
            email: email
        })
        firebase.auth().updateCurrentUser({
            email: email
        })
    }

    signOut = () => {
        firebase.auth().signOut()
        .then(this.props.navigation.navigate('Login'))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Name: {this.state.name}</Text>
                <Text>Email:{this.state.email}</Text>
                <Input
                    value={this.state.name}
                    onChangeText={this.updateName} />
                <Input
                    value={this.state.email}
                    onChangeText={this.updateEmail} />
                <Button title='Signout'
                onPress={this.signOut}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

