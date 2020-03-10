import React from 'react'
import { View, Text, Alert, TouchableWithoutFeedbackBase } from 'react-native'
import * as firebase from 'firebase'
import { Input } from 'react-native-elements'
import { Button, Avatar } from 'react-native-elements';

import styles from '../../components/Style';

export default class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
            fontLoaded: false
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            'sriracha': require('../../assets/fonts/Sriracha-Regular.ttf'),
            'montserrat-bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
            'Raleway-semibold-i': require('../../assets/fonts/Raleway-SemiBoldItalic.ttf'),
            'open-sans': require('../../assets/fonts/OpenSans-Regular.ttf'),
        });

        this.setState({ fontLoaded: true });
    }

    state = {
        name: [],
        email: [],
        newPassword: '',
        currentPassword: '',
        newEmail: '',
        newName: '',
    }

    componentDidMount() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + userId).on('value', snapshot => {
            this.setState({ email: snapshot.val().email });
            this.setState({ name: snapshot.val().name });
        })
    }

    signOut = () => {
        firebase.auth().signOut()
            .then(this.props.navigation.navigate('Login'))
    }

    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    onChangePasswordPress = () => {

        this.reauthenticate(this.state.currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(this.state.newPassword).then(() => {
                Alert.alert('Password was Changed!')
            }).catch((error) => {
                Alert.alert(error.message)
            })
        }).catch((error) => {
            Alert.alert(error.message);
        })
    }

    onChangeEmailPress = () => {
        this.reauthenticate(this.state.currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updateEmail(this.state.newEmail).then(() => {
                Alert.alert('Email was Changed!')
            }).catch((error) => {
                Alert.alert(error.message)
            })
        }).then(() => {
            var userId = firebase.auth().currentUser.uid;
            firebase.database().ref('users/' + userId).update({
                email: this.state.newEmail
            })
        }).catch((error) => {
            Alert.alert(error.message);
        })

    }

    onChangeNamePress = () => {
        this.reauthenticate(this.state.currentPassword).then(() => {
            var userId = firebase.auth().currentUser.uid;
            firebase.database().ref('users/' + userId).update({
                name: this.state.newName
            }).then(() => {
                Alert.alert('Name was Changed!');
            })
        }).catch((error) => {
            Alert.alert(error.message);
        })
    }

    onDeletePress = () => {
        var user = firebase.auth().currentUser;
        var userId = firebase.auth().currentUser.uid;
        let userRef = firebase.database().ref('/users');
        firebase.database().ref('users/' + userId).off('value');
        this.reauthenticate(this.state.currentPassword).then(() => {
            userRef.child(userId).remove().then(() => {
                user.delete().then(() => {
                    Alert.alert('User was Deleted')
                }).catch((error) => {
                    Alert.alert(error.massage)
                }).then(this.props.navigation.navigate('Login'))
            })
        })
    }

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <View style={styles.profileContainer}>
                    <Avatar
                        size="large"
                        rounded
                        showEditButton
                        icon={{ name: 'user', type: 'font-awesome' }}
                        activeOpacity={0.7}
                    />
                    <Text>{this.state.name}</Text>
                    <Text>{this.state.email}</Text>

                    <Input
                        placeholder='Current Password'
                        autoCapitalize='none'
                        value={this.state.currentPassword}
                        secureTextEntry={true}
                        onChangeText={(text) => { this.setState({ currentPassword: text }) }}
                    />

                    <Input
                        placeholder={this.state.name}
                        value={this.state.newName}
                        onChangeText={(text) => { this.setState({ newName: text }) }}
                    />

                    <Button
                        title='Change Name'
                        onPress={this.onChangeNamePress}
                    />

                    <Input
                        autoCapitalize='none'
                        value={this.state.newEmail}
                        placeholder={this.state.email}
                        onChangeText={(text) => { this.setState({ newEmail: text }) }}
                    />

                    <Button
                        title='Change Email'
                        onPress={this.onChangeEmailPress}
                    />

                    <Input
                        placeholder='New Password'
                        autoCapitalize='none'
                        value={this.state.newPassword}
                        secureTextEntry={true}
                        onChangeText={(text) => { this.setState({ newPassword: text }) }}
                    />

                    <Button
                        title='Change Password'
                        onPress={this.onChangePasswordPress}
                    />
                </View>
                <View>
                    <Text style={{ marginTop: 40, fontWeight: 'bold', fontSize: 18 }}>RECENTLY VIEWED</Text>
                </View>
                <Button
                    title='Delete User'
                    buttonStyle={{
                        width: "45%",
                        alignSelf: 'center',
                        marginTop: 40,
                        backgroundColor: "red",
                    }}
                    titleStyle={{
                        fontSize: 19,
                    }}
                    onPress={this.onDeletePress}
                />
                <Button
                    buttonStyle={{
                        width: "45%",
                        alignSelf: 'center',
                        marginTop: 30,
                        backgroundColor: "#ff944d",

                    }}
                    titleStyle={{
                        fontSize: 19,
                    }}
                    title='Sign Out'
                    onPress={this.signOut}
                />
            </View>
        )
    }
}

