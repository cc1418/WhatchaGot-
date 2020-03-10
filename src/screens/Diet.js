import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground} from 'react-native';

import Video from 'react-native-video';

import styles from '../../components/Style';

class DietScreen extends React.Component {
  
    render () {
          return (
          <View style={styles.container}>
            <Video
              source={require('../../assets/cuttingsteak.mp4')}
              ref={(ref) => {
                this.player = ref
              }}
              style={styles.backgroundVideo}
              muted={true}
              repeat={true}
              resizeMode="cover"
              rate={1.0}
            /> 
            <Text>111</Text>
          </View>
        );
      } 
    }

    export default DietScreen;