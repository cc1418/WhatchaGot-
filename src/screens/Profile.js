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
        return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
            this.state.email = (snapshot.val() && snapshot.val().email) || 'Anonymous';
            this.state.name = (snapshot.val() && snapshot.val().name) || 'Anonymous';
            
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
                (
                {this.state.email.map} {this.state.name.map}
            ) : (
                    <Text>No Items</Text>
                )}
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