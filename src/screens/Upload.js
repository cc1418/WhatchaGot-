import React from 'react'
import { View, Text, Alert, TouchableWithoutFeedbackBase, Modal, CameraRoll, ScrollView } from 'react-native'
import * as firebase from 'firebase'
import { Button, Avatar, Overlay, Input } from 'react-native-elements'

import styles from '../../components/Style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ImagePicker } from 'react-native-image-picker';

import PhotoComponent from '../../components/PhotoComponent'
import ButtonComponent from '../../components/ButtonComponent'

export default class UploadScreen extends React.Component {

    // More info on all the options is below in the API Reference... just some common use cases shown here
    constructor(props) {
        super(props)
        this.state = {
            uploadSource: null
        }
    }
    // componentDidMount() {
    //     this.getPermissionAsync();
    // }
    // getPermissionAsync = async () => {
    //     if (Constants.platform.ios) {
    //         const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    //         if (status !== 'granted') {
    //             alert('Sorry, we need camera roll permissions to make this work!');
    //         }
    //     }
    // }
    // _pickImage = /* async */ () => {
    //     let result = ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //     });
    //     console.log(result);
    //     if (!result.cancelled) {
    //         this.setState({ uploadSource: result.uri });
    //     }
    // };
    // _takePhoto = /* async */ () => {
    //     let result = ImagePicker.launchCameraAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //     });
    //     console.log(result);
    //     if (!result.cancelled) {
    //         this.setState({ uploadSource: result.uri });
    //     }
    // };

    componentDidMount() {
        ImagePicker.launchCamera(null, (response) => {
            console.log('response= ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <PhotoComponent uri={this.state.uploadSource} />
                <View style={{ flexDirection: 'row', paddingBottom: 40 }}>
                    {/* <ButtonComponent onPress={this._takePhoto} icon='camera' /> */}
                    <ButtonComponent onPress={this.componentDidMount} icon='image' />
                </View>
            </View>
        )
    }
}