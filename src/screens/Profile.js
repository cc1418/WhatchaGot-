import React from 'react'
import { View, Text } from 'react-native'
import * as firebase from 'firebase'
import { Input } from 'react-native-elements'
import { Button, Avatar} from 'react-native-elements';

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
            // <View style={styles.container}>
            //     <Text>Name: {this.state.name}</Text>
            //     <Text>Email:{this.state.email}</Text>
            //     <Input
            //         value={this.state.name}
            //         onChangeText={this.updateName} />
            //     <Input
            //         value={this.state.email}
            //         onChangeText={this.updateEmail} />
            //     <Button title='Signout'
            //     onPress={this.signOut}/>
            // </View>s
            <View style = {{ flex: 1, backgroundColor: "#fff" }}>
                <View style={styles.profileContainer}>
                    <Avatar
                        size = "large"
                        rounded
                        showEditButton
                        icon={{name: 'user', type: 'font-awesome'}}
                        activeOpacity={0.7}
                    />
                    <Text style = {{marginTop:8, fontWeight: 'bold', fontSize: 18}}>{this.state.name}</Text>
                    {/* <Text>{this.state.email}</Text> */}
                    {/* <Button onPress={() => this.props.navigation.navigate('UpdateProfile')} title='Update Information'/> */}
                </View>
                <View>
                    <Text style = {{marginTop:8, fontWeight: 'bold', fontSize: 18}}>RECENTLY VIEWED</Text>
                </View>
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
                    title='Sign Out'/>
            </View>
        )
    }
}

