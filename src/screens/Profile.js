import React from 'react'
import { View, Alert } from 'react-native'
import * as firebase from 'firebase'
import { Button, Avatar, Input, Text } from 'react-native-elements'
import Modal from 'react-native-modal';

import styles from '../../components/Style';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
        modalVisible: false,
        photos: [],
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

    onProfileChoose = () => {
        var listRef = firebase.storage().ref('Profile/uid');

        listRef.listAll()
        .catch(function(error) {
            Alert.alert(error.message)
            //Error
        });
    }

    state = {
        isModalVisible: false,
    };

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>

                <View style={styles.profileContainer}>
                    <TouchableOpacity
                        onPress={() => this.onProfileChoose}>
                        <Avatar
                            size="large"
                            rounded
                            showEditButton
                            icon={{ name: 'user', type: 'font-awesome' }}
                            activeOpacity={0.7}

                        />
                    </TouchableOpacity>
                    <Text>{this.state.name}</Text>
                    <Text>{this.state.email}</Text>

                    <Input
                        containerStyle={{
                            width: '80%'
                        }}
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

                    {/* <Overlay
                    //isVisible={this.state.isVisible}
                    isVisible={this.state.isVisible}
                    windowBackgroundColor="rgba(255, 255, 255, .5)"
                    overlayBackgroundColor="red"
                    width="auto"
                    height="auto"
                    onBackdropPress={() => this.setState({ isVisible: false })}
                    >
                        <Text>Hello from Overlay!</Text>
                    </Overlay>; */}

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
                    <Avatar
                        size="xlarge"
                        rounded
                        showEditButton
                        icon={{ name: 'user', type: 'font-awesome' }}
                        activeOpacity={0.7}
                    />

                    <Text style={{ fontSize: 22, fontWeight: 'bold' }} >{this.state.name}</Text>
                    {/* <Text style = {{fontSize: 20}} >{this.state.email}</Text> */}

                </View>

                <Button                                                 // SETTINGS
                    buttonStyle={{
                        width: "40%",
                        alignSelf: 'center',
                        marginTop: 30,
                        backgroundColor: "#ff944d",

                    }}
                    titleStyle={{
                        fontSize: 18,
                    }}
                    title="User Settings"
                    onPress={this.toggleModal} />
                <Button                                                 // SIGN OUT
                    buttonStyle={{
                        width: "40%",
                        alignSelf: 'center',
                        marginTop: 30,
                        backgroundColor: "#ff944d",

                    }}
                    titleStyle={{
                        fontSize: 18,
                    }}
                    title='Sign Out'
                    onPress={this.signOut}
                />

                <Modal
                    isVisible={this.state.isModalVisible}
                    style={{
                        alignSelf: 'center',
                        width: styles.device.width * 0.8,
                        height: styles.device.height * 0.9,
                    }}
                    hasBackdrop
                    backdropColor="white"
                    backdropOpacity={1}

                >
                    <View style={{ flex: 1 }}>

                        <Input
                            containerStyle={{

                            }}
                            placeholder='Current Password'
                            autoCapitalize='none'
                            value={this.state.currentPassword}
                            secureTextEntry={true}
                            onChangeText={(text) => { this.setState({ currentPassword: text }) }}
                        />

                        <Text style={{ color: "red", fontSize: 14 }}>
                            *You must enter your current password before proceeding to change other information
                            </Text>


                        <Input                                               // CHANGE USER NAME
                            placeholder={this.state.name}
                            value={this.state.newName}
                            onChangeText={(text) => { this.setState({ newName: text }) }}

                            inputStyle={{
                                width: "80%",
                                marginTop: 30
                            }}
                        />

                        <Button
                            title='Change Name'
                            buttonStyle={{
                                width: "80%",
                                alignSelf: 'center',
                                marginTop: 10,
                                marginBottom: 30,
                            }}
                            onPress={this.onChangeNamePress}
                        />


                        <Input                                                // CHANGE EMAIL
                            autoCapitalize='none'
                            value={this.state.newEmail}
                            placeholder={this.state.email}
                            onChangeText={(text) => { this.setState({ newEmail: text }) }}
                        />

                        <Button
                            title='Change Email'
                            onPress={this.onChangeEmailPress}
                            buttonStyle={{
                                width: "80%",
                                alignSelf: 'center',
                                marginTop: 10,
                                marginBottom: 30,
                            }}

                        />

                        <Input                                                // CHANGE PASSWORD
                            placeholder='New Password'
                            autoCapitalize='none'
                            value={this.state.newPassword}
                            secureTextEntry={true}
                            onChangeText={(text) => { this.setState({ newPassword: text }) }}
                        />

                        <Button
                            title='Change Password'
                            onPress={this.onChangePasswordPress}
                            buttonStyle={{
                                width: "80%",
                                alignSelf: 'center',
                                marginTop: 10,
                                marginBottom: 20,
                            }}
                        />

                        <Button                                                // DELETE USER
                            title='Delete User'
                            buttonStyle={{
                                width: "40%",
                                alignSelf: 'center',
                                marginTop: 40,
                                backgroundColor: "red",
                            }}
                            titleStyle={{
                                fontSize: 13,
                            }}
                            onPress={this.onDeletePress}
                        />

                        <Button
                            title="Close Window"
                            buttonStyle={{
                                width: "90%",
                                alignSelf: 'center',
                                marginTop: 40,
                            }}
                            titleStyle={{
                                fontSize: 19,
                            }}
                            onPress={this.toggleModal} />

                    </View>
                </Modal>
            </View>
        )
    }
}

