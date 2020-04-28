import React, { Component } from 'react';
import { View, Input, Button, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import * as firebase from 'firebase';
import { Card } from 'react-native-elements';
import styles from '../../components/Style';
import { TouchableHighlight } from 'react-native-gesture-handler';



export default class SignUpPickPictureScreen extends Component {

    state = {
        apples: [],
        asparagus: [],
        bananas: [],
        blueberries: [],
        broccoli: [],
        cabbage: [],
        cherries: [],
        corn: [],
        cucumber: [],
        dates: [],
        ginger: [],
        grapes: [],
        kiwis: [],
        mushroom: [],
        oranges: [],
        peas: [],
        raspberries: [],
        spinach: [],
        strawberries: [],
        tomatoes: [],
        profilePicture: [],
    }

    componentDidMount() {
        firebase.database().ref('/images/apples').on('value', snapshot => {
            console.log(snapshot.val())
            this.setState({ apples: snapshot.val() });
        });
        firebase.database().ref('/images/asparagus').on('value', snapshot => {
            console.log(snapshot.val())
            this.setState({ asparagus: snapshot.val() });
        });
        firebase.database().ref('/images/bananas').on('value', snapshot => {
            console.log(snapshot.val())
            this.setState({ bananas: snapshot.val() });
        });
        firebase.database().ref('/images/blueberries').on('value', snapshot => {
            console.log(snapshot.val())
            this.setState({ blueberries: snapshot.val() });
        });
        firebase.database().ref('/images/broccoli').on('value', snapshot => {
            console.log(snapshot.val())
            this.setState({ broccoli: snapshot.val() });
        });
        firebase.database().ref('/images/cabbage').on('value', snapshot => {
            console.log(snapshot.val())
            this.setState({ cabbage: snapshot.val() });
        });
        firebase.database().ref('/images/cherries').on('value', snapshot => {
            console.log(snapshot.val())
            this.setState({ cherries: snapshot.val() });
        });
        firebase.database().ref('/images/corn').on('value', snapshot => {
            console.log(snapshot.val())
            this.setState({ corn: snapshot.val() });
        });
        firebase.database().ref('/images/cucumber').on('value', snapshot => {
            console.log(snapshot.val())
            this.setState({ cucumber: snapshot.val() });
        });
        firebase.database().ref('/images/dates').on('value', snapshot => {
            console.log(snapshot.val())
            this.setState({ dates: snapshot.val() });
        });
        firebase.database().ref('/images/ginger').on('value', snapshot => {
            console.log(snapshot.val())
            this.setState({ ginger: snapshot.val() });
        });
        firebase.database().ref('/images/grapes').on('value', snapshot => {
            console.log(snapshot.val())
            this.setState({ grapes: snapshot.val() });
        });
        firebase.database().ref('/images/kiwis').on('value', snapshot => {
            console.log(snapshot.val())
            this.setState({ kiwis: snapshot.val() });
        });
        firebase.database().ref('/images/mushroom').on('value', snapshot => {
            console.log(snapshot.val())
            this.setState({ mushroom: snapshot.val() });
        });
        firebase.database().ref('/images/oranges').on('value', snapshot => {
            console.log(snapshot.val())
            this.setState({ oranges: snapshot.val() });
        });
        firebase.database().ref('/images/peas').on('value', snapshot => {
            console.log(snapshot.val())
            this.setState({ peas: snapshot.val() });
        });
        firebase.database().ref('/images/raspberries').on('value', snapshot => {
            console.log(snapshot.val())
            this.setState({ raspberries: snapshot.val() });
        });
        firebase.database().ref('/images/spinach').on('value', snapshot => {
            console.log(snapshot.val())
            this.setState({ spinach: snapshot.val() });
        });
        firebase.database().ref('/images/strawberries').on('value', snapshot => {
            console.log(snapshot.val())
            this.setState({ strawberries: snapshot.val() });
        });
        firebase.database().ref('/images/tomatoes').on('value', snapshot => {
            console.log(snapshot.val())
            this.setState({ tomatoes: snapshot.val() });
        });
    }

    changeApples() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/profile/' + userId).set({
            profilePicture: this.state.apples
        }).then(Alert.alert('Profile Picture Selection Successful. Please Login.'))

            .then(() => this.props.navigation.navigate('Login'))
    }

    changeAsparagus() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/profile/' + userId).set({
            profilePicture: this.state.asparagus
        }).then(Alert.alert('Profile Picture Selection Successful. Please Login.'))

            .then(() => this.props.navigation.navigate('Login'))
    }

    changeBananas() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/profile/' + userId).set({
            profilePicture: this.state.bananas
        }).then(Alert.alert('Profile Picture Selection Successful. Please Login.'))

            .then(() => this.props.navigation.navigate('Login'))
    }

    changeBlueberries() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/profile/' + userId).set({
            profilePicture: this.state.blueberries
        }).then(Alert.alert('Profile Picture Selection Successful. Please Login.'))

            .then(() => this.props.navigation.navigate('Login'))
    }

    changeBroccoli() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/profile/' + userId).set({
            profilePicture: this.state.broccoli
        }).then(Alert.alert('Profile Picture Selection Successful. Please Login.'))

            .then(() => this.props.navigation.navigate('Login'))
    }

    changeCabbage() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/profile/' + userId).set({
            profilePicture: this.state.cabbage
        }).then(Alert.alert('Profile Picture Selection Successful. Please Login.'))

            .then(() => this.props.navigation.navigate('Login'))
    }

    changeCherries() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/profile/' + userId).set({
            profilePicture: this.state.cherries
        }).then(Alert.alert('Profile Picture Selection Successful. Please Login.'))

            .then(() => this.props.navigation.navigate('Login'))
    }

    changeCorn() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/profile/' + userId).set({
            profilePicture: this.state.corn
        }).then(Alert.alert('Profile Picture Selection Successful. Please Login.'))

            .then(() => this.props.navigation.navigate('Login'))
    }

    changeCucumber() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/profile/' + userId).set({
            profilePicture: this.state.cucumber
        }).then(Alert.alert('Profile Picture Selection Successful. Please Login.'))

            .then(() => this.props.navigation.navigate('Login'))
    }

    changeDates() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/profile/' + userId).set({
            profilePicture: this.state.dates
        }).then(Alert.alert('Profile Picture Selection Successful. Please Login.'))

            .then(() => this.props.navigation.navigate('Login'))
    }

    changeGinger() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/profile/' + userId).set({
            profilePicture: this.state.ginger
        }).then(Alert.alert('Profile Picture Selection Successful. Please Login.'))

            .then(() => this.props.navigation.navigate('Login'))
    }

    changeGrapes() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/profile/' + userId).set({
            profilePicture: this.state.grapes
        }).then(Alert.alert('Profile Picture Selection Successful. Please Login.'))

            .then(() => this.props.navigation.navigate('Login'))
    }

    changeKiwis() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/profile/' + userId).set({
            profilePicture: this.state.kiwis
        }).then(Alert.alert('Profile Picture Selection Successful. Please Login.'))

            .then(() => this.props.navigation.navigate('Login'))
    }

    changeMushroom() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/profile/' + userId).set({
            profilePicture: this.state.mushroom
        }).then(Alert.alert('Profile Picture Selection Successful. Please Login.'))

            .then(() => this.props.navigation.navigate('Login'))
    }

    changeOranges() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/profile/' + userId).set({
            profilePicture: this.state.oranges
        }).then(Alert.alert('Profile Picture Selection Successful. Please Login.'))

            .then(() => this.props.navigation.navigate('Login'))
    }

    changePeas() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/profile/' + userId).set({
            profilePicture: this.state.peas
        }).then(Alert.alert('Profile Picture Selection Successful. Please Login.'))

            .then(() => this.props.navigation.navigate('Login'))
    }

    changeRaspberries() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/profile/' + userId).set({
            profilePicture: this.state.raspberries
        }).then(Alert.alert('Profile Picture Selection Successful. Please Login.'))

            .then(() => this.props.navigation.navigate('Login'))
    }

    changeSpinach() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/profile/' + userId).set({
            profilePicture: this.state.spinach
        }).then(Alert.alert('Profile Picture Selection Successful. Please Login.'))

            .then(() => this.props.navigation.navigate('Login'))
    }

    changeStrawberries() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/profile/' + userId).set({
            profilePicture: this.state.strawberries
        }).then(Alert.alert('Profile Picture Selection Successful. Please Login.'))

            .then(() => this.props.navigation.navigate('Login'))
    }

    changeTomatoes() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/profile/' + userId).set({
            profilePicture: this.state.tomatoes
        }).then(Alert.alert('Profile Picture Selection Successful. Please Login.'))

            .then(() => this.props.navigation.navigate('Login'))
    }

    render() {
        return (
            <View style = {{
                flex: 1,
                alignItems: 'center'
            }}>
                <View style = {{flex: 1, flexDirection: 'row', marginTop: 50, alignContent: 'center'}}>
                    <TouchableOpacity
                        onPress={() => this.changeApples()}>
                        <Image
                            source={{ uri: `${this.state.apples}` }}
                            style={styles.logo2}>
                        </Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.changeAsparagus()}>
                        <Image
                            source={{ uri: `${this.state.asparagus}` }}
                            style={styles.logo3}>
                        </Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => this.changeBananas()}>
                        <Image
                            source={{ uri: `${this.state.bananas}` }}
                            style={styles.logo2}>
                        </Image>
                    </TouchableOpacity>
                </View>

                <View style = {{flex: 1, flexDirection: 'row'}}>
                    <TouchableOpacity
                    onPress={() => this.changeBlueberries()}>
                        <Image
                            source={{ uri: `${this.state.blueberries}` }}
                            style={styles.logo2}>
                        </Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => this.changeBroccoli()}>
                        <Image
                            source={{ uri: `${this.state.broccoli}` }}
                            style={styles.logo3}>
                        </Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => this.changeCabbage()}>
                        <Image
                            source={{ uri: `${this.state.cabbage}` }}
                            style={styles.logo2}>
                        </Image>
                    </TouchableOpacity>
                </View>

                <View style = {{flex: 1, flexDirection: 'row'}}>
                    <TouchableOpacity
                    onPress={() => this.changeCherries()}>
                        <Image
                            source={{ uri: `${this.state.cherries}` }}
                            style={styles.logo2}>
                        </Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => this.changeCorn()}>
                        <Image
                            source={{ uri: `${this.state.corn}` }}
                            style={styles.logo3}>
                        </Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => this.changeCucumber()}>
                        <Image
                            source={{ uri: `${this.state.cucumber}` }}
                            style={styles.logo2}>
                        </Image>
                    </TouchableOpacity>
                </View>

                <View style = {{flex: 1, flexDirection: 'row'}}>
                    <TouchableOpacity
                    onPress={() => this.changeDates()}>
                        <Image
                            source={{ uri: `${this.state.dates}` }}
                            style={styles.logo2}>
                        </Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => this.changeGinger()}>
                        <Image
                            source={{ uri: `${this.state.ginger}` }}
                            style={styles.logo3}>
                        </Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => this.changeGrapes()}>
                        <Image
                            source={{ uri: `${this.state.grapes}` }}
                            style={styles.logo2}>
                        </Image>
                    </TouchableOpacity>
                </View>

                <View style = {{flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity
                    onPress={() => this.changeKiwis()}>
                        <Image
                            source={{ uri: `${this.state.kiwis}` }}
                            style={styles.logo2}>
                        </Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => this.changeMushroom()}>
                        <Image
                            source={{ uri: `${this.state.mushroom}` }}
                            style={styles.logo3}>
                        </Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => this.changeOranges()}>
                        <Image
                            source={{ uri: `${this.state.oranges}` }}
                            style={styles.logo2}>
                        </Image>
                    </TouchableOpacity>
                </View>

                <View style = {{flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity
                    onPress={() => this.changePeas()}>
                        <Image
                            source={{ uri: `${this.state.peas}` }}
                            style={styles.logo2}>
                        </Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => this.changeRaspberries()}>
                        <Image
                            source={{ uri: `${this.state.raspberries}` }}
                            style={styles.logo3}>
                        </Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => this.changeSpinach()}>
                        <Image
                            source={{ uri: `${this.state.spinach}` }}
                            style={styles.logo2}>
                        </Image>
                    </TouchableOpacity>
                </View>

                <View style = {{flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity
                onPress={() => this.changeStrawberries()}>
                    <Image
                        source={{ uri: `${this.state.strawberries}` }}
                        style={styles.logo2}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => this.changeTomatoes()}>
                    <Image
                        source={{ uri: `${this.state.tomatoes}` }}
                        style={styles.logo3}>
                    </Image>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}