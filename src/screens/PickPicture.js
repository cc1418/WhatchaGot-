import React, { Component } from 'react';
import { View, Input, Button, Text } from 'react-native'
import * as firebase from 'firebase';
import { Card } from 'react-native-elements';

export default class PickPictureScreen extends Component {

    state = {
        images: null
    }

    componentDidMount() {
        state = this.state
        firebase.database().ref('/images/profile/').once("value")
            .then(snap => this.setState({ images: snap.val() }))
            .catch(error => console.error(error))
    }

    render() {
        return (
            <View>
                <Text>{this.state.images}</Text>
            </View>
        )
    }
}