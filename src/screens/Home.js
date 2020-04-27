import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, ScrollView, Modal, Dimensions, Alert } from 'react-native';
import { Button, Input, SearchBar, Card, Icon } from 'react-native-elements';
import * as firebase from 'firebase'
import styles from '../../components/Style';
import * as Font from 'expo-font';
console.disableYellowBox = true;

class HomeScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      fontLoaded: false,
      name: [],
      email: [],
      user: [],
      recipeList: [],
      recipeId: [],
      recipeInfo: '',
      apiRun: false,
      recipeTrue: false,
      modalVisible: false,
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

  componentWillMount() {
    var userId = firebase.auth().currentUser.uid;
    this.setState({ user: userId })

    //console.log(userId)
    firebase.database().ref('users/' + userId).on('value', snapshot => {
      this.setState({ email: snapshot.val().email });
      this.setState({ name: snapshot.val().name });
    })

    firebase.database().ref('items/' + userId + '/fridge/recipes/').orderByKey().on('child_added', snapshot => {
      console.log("snapshot", snapshot.val())
      console.log("key", snapshot.key)
      let recipeJson = snapshot.val();
      console.log("==================================================================================================");
      //console.log(Object.values(recipeJson)[0])

      //let numRecipes = (Object.keys(recipeJson).length)
      //console.log(Object.values(recipeJson))
      this.state.recipeId.push(Object.values(recipeJson)[0])
      //console.log(this.state.recipeId)
      this.setState({ apiRun: true })
    })
    //alert("hello")


  }

  componentDidUpdate() {
    console.log(this.state.apiRun)
    if (this.state.apiRun === true && this.state.recipeTrue === false) {

      //console.log("success")
      let apiId = this.state.recipeId.join(",")
      //console.log(this.state.recipeId)
      let apiCall = ("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=" + apiId)
      //console.log(apiCall)
      //alert("hello2")

      fetch(apiCall, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "x-rapidapi-key": "f7edf2ef0dmsh3fd3127a79e6f9dp1f017bjsn56de39cdf5b6"
        }
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //console.log(responseJson)
          //alert("hello3")
          this.setState({ recipeList: responseJson })
          this.setState({ recipeTrue: true })
          console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
          //console.log(this.state.recipeList)
          //console.log("goodbye")
        })
        .catch(err => {
          this.setState({ recipeList: [] })
          alert("error")
        });
    }

  }


  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  openRecipe = (recipeId) => {
    let apiCall
    let apiHead1 = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/'
    let apiHead2 = '/information'

    apiCall = apiHead1 + recipeId + apiHead2

    //alert(apiCall)


    fetch(apiCall, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "f7edf2ef0dmsh3fd3127a79e6f9dp1f017bjsn56de39cdf5b6"
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(JSON.stringify(responseJson))
        this.state.recipeInfo = responseJson
        this.setModalVisible(!this.state.modalVisible)
        //alert(responseJson.image)
      });

  }
  // debug() {
  //   console.log(JSON.stringify(this.state.recipeList))
  // }

  renderRecipes = ({ item, index }) => {

    return (
      <View>
        <TouchableOpacity onPress={() => this.openRecipe(item.id)}>
          <Card
            containerStyle={{
              width: (styles.device.width) / 2.4,
              height: 240,
              marginLeft: 1,
              marginTop: 12,
              borderColor: "#ff944d",
              borderRadius: 10,
              borderWidth: 1.3
            }}
            image={{ uri: item.image }}
            imageProps={{
              borderRadius: 10
            }}
          >

            <Text index={item.id} style={{ fontSize: 15, marginTop: -5, alignSelf: "center" }}>
              {item.title}
            </Text>

          </Card>
        </TouchableOpacity>
      </View>
    );
  }

  deleteFromDB = () => {

    var userId = firebase.auth().currentUser.uid;
    let recipeState = this.state.recipeInfo.id;
    let recipeRef = firebase.database().ref('/items/' + userId + '/fridge/recipes/')
    recipeRef.on('child_added', snapshot => {
      console.log(snapshot.key)
    });
    let recipeRef2 = recipeRef.child(snapshot.key);
    console.log(recipeRef2)
    // console.log(recipeRef)
    // recipeRef.remove().then(() => {
    //   Alert.alert('Recipe Deleted')
    // }).catch((error) => {
    //   Alert.alert(error.message)
    // }).then(this.props.navigation.navigate('Home'));
    // console.log(recipeState)

    // recipeRef.child(snapshot.val()).remove().then(() => {
    //   Alert.alert('Recipe was Deleted')
    // }).catch((error) => {
    //   Alert.alert(error.message)
    // }).then(this.props.navigation.navigate('Home'))
  }

  keyExtractor = (item, index) => {
    return index.toString();
  }

  render() {

    return (
      <View
        onStartShouldSetResponderCapture={() => {
          this.setState({ enableScrollViewScroll: true });
        }}>
        <ScrollView
          scrollEnabled={this.state.enableScrollViewScroll}
        >
          <View style={styles.homeContainer}>
            <View>
              <Text style={{ fontFamily: "Raleway-semibold-i", fontSize: 35, marginLeft: 15, marginTop: 50 }}>Welcome Back,</Text>
              <Text style={{ fontFamily: "Raleway-semibold-i", fontSize: 35, marginLeft: 15, marginBottom: 30 }}>{this.state.name} !</Text>
            </View>

            {/* <Button
            buttonStyle={{
              width: "45%",
              alignSelf: 'center',
              marginTop: 30,
              backgroundColor: "#ff944d"
            }}
            titleStyle={{
              fontSize: 19,
            }}
            title="Console Log Recipes"
            onPress={() => this.debug()}  
          /> */}

            <View
              style={{ marginTop: 15, marginLeft: 15 }}
              onStartShouldSetResponderCapture={() => {
                this.setState({ enableScrollViewScroll: true });
              }}>
              <Text style={{ fontFamily: "Raleway-semibold-i", fontSize: 20, marginLeft: 0, marginTop: 10, marginBottom: 10 }}>Stored Recipes: </Text>
              <FlatList
                contentContainerStyle={{ alignSelf: 'flex-start' }}
                numColumns={2}
                data={this.state.recipeList}
                extradata={this.state.refresh}
                scrollEnabled
                keyExtractor={this.keyExtractor}
                renderItem={this.renderRecipes}
              />
            </View>

          </View>
        </ScrollView>

        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
          >
            <ScrollView style={{ marginTop: 5 }}>
              <View>
                <View style={{ flexDirection: "row" }}>

                  <Icon                                     // CLOSE MODAL
                    containerStyle={{
                      width: styles.device.width / 5,
                      alignSelf: 'center',
                      marginTop: -150,
                      marginLeft: -20
                    }}
                    size={40}
                    name='arrow-left'
                    type='material-community'
                    color='#ff944d'
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  />

                  <Image
                    source={{ uri: this.state.recipeInfo.image }}
                    style={{ width: styles.device.width / 1.7, height: 200, alignSelf: 'center', justifyContent: 'center', marginTop: 20, marginLeft: 20 }}
                  />

                  <Icon                                    // DELETE RECIPE
                    containerStyle={{
                      width: styles.device.width / 5,
                      alignSelf: 'center',
                      marginTop: -150,
                      marginLeft: 15
                    }}
                    size={33}
                    name='delete-outline'
                    type='material-community'
                    color='red'
                  // onPress={() => {
                  //   this.addRecipeToDB();
                  // }}
                  />


                </View>
                <View style={{ marginLeft: 22 }}>
                  <Text style={{ fontSize: 17, marginTop: 10, fontWeight: 'bold' }}>{this.state.recipeInfo.title}</Text>
                  <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Number of Servings: {this.state.recipeInfo.servings}</Text>
                  <Text style={{ fontSize: 17, marginBottom: 10, fontWeight: 'bold' }}>Ready in: {this.state.recipeInfo.readyInMinutes} minutes</Text>
                </View>
                <Text style={{ width: styles.device.width / 1.1, alignSelf: 'center' }}>{this.state.recipeInfo.instructions}</Text>

              </View>
            </ScrollView>
          </Modal>
        </View>
      </View >
    );
  }
}

export default HomeScreen;