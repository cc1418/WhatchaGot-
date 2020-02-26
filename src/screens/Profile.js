import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as firebase from 'firebase'

export default class Profile extends React.Component {

    state = {
        name: [],
        email: []
    }

    componentDidMount() {
        var userId = firebase.auth().currentUser.uid;
        console.log(userId)
        firebase.database().ref('users/' + userId).once('value').then(snapshot => {
            console.log("snapshot", snapshot.val())
            this.setState({ email: snapshot.val().email });
            this.setState({ name: snapshot.val().name })
        })
    }

    //     firebase.database().ref('/users')
    //     .on('value', snapshot => {
    //         let data = snapshot.val();
    //         let user = Object.values(data);
    //         this.setState({ user });
    //     })
    // }

    render() {
        return (
            <View style={styles.container}>
                <Text>Name: {this.state.name}</Text>
                <Text>Email:{this.state.email}</Text>
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

