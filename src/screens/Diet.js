import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground} from 'react-native';
import {createAppContainer, SafeAreaView} from 'react-navigation';
import {createStackNavigator} from  'react-navigation-stack'
import MenuDrawer from 'react-native-side-drawer'
import {Button, Input, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

//import { Nav } from '../navigation/UniversalNavigator';
import styles from '../../components/Style';

class DietScreen extends React.Component {

    // static navigationOptions = ({ navigation}) => {
    //   return {
    //     headerLeft: () => (
    //       <View>
    //         <TouchableOpacity
    //           style={styles.customBtnBG}
    //           onPress={navigation.getParam('toggleOpen')}  >
    //           <Text style={styles.customBtnText}>☰</Text>
    //         </TouchableOpacity>
    //       </View>
    //     ),
    //   };
    // };
  
    // UNSAFE_componentWillMount() {
    //   this.props.navigation.setParams({ toggleOpen: this.toggleOpen});
    // }
  
    // // componentDidMount() {
    // //   this.fetchAllGames();
    // // }
  
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     open: false,
    //     games: []
    //   };
    // }
  
    // toggleOpen = () => {
    //   this.setState({ open: !this.state.open });
    // };
  
    // drawerContent = () => {
    //   return (
    //     <View style={styles.animatedBox}>
    //       <Image style={styles.info} source={require('../../assets/link.jpg')}/>
    //       <Text style={styles.username}>MyNamesCory</Text>
    //       <Text style={styles.menu} onPress={() => {
    //         if (this.state.open){
    //           this.toggleOpen();
    //         } 
    //         this.props.navigation.navigate('Home')
    //         }
    //       }>
    //          Home
    //       </Text>
    //       <Text style={styles.menu} onPress={() => {
    //         if (this.state.open){
    //           this.toggleOpen();
    //         } 
    //         this.props.navigation.navigate('Search')
    //         }
    //       }>
    //       Search 
    //       </Text>
    //     </View>
    //   );
    // };
  
    render () {
          return (
          <View style={styles.container}>

          </View>
        );
      } 
    }

    export default DietScreen;