import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground} from 'react-native';
import {createAppContainer, SafeAreaView} from 'react-navigation';
import {createStackNavigator} from  'react-navigation-stack'
import MenuDrawer from 'react-native-side-drawer'
import {Button, Input, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


//import Home from './src/screens/Home';
import AddItem from './src/screens/AddItem';
import ListItem from './src/screens/ListItem';
// import SearchData from './src/screens/SearchData';
import SignUp1 from './src/screens/SignUp1';

function Item({title}) {
  return (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}



class Header extends React.Component {
  render () {
    return (
      <Image 
        source={require('./assets/menu.png')}
        style={styles.menuBtn}
        //onPress={}
      />
    );
  }
}


class LoginScreen extends React.Component {
  
  static navigationOptions = {
    headerShown: false,
  }

  render() {
    return (
      <View>
        <ImageBackground source={require('./assets/412bg2.jpg')} style={{height: "100%", width: "100%"}}>
        <View style={styles.container}>
          <View>
            <Text style={{fontStyle: 'italic', fontWeight: 'bold', fontSize: 31, marginLeft: 67, marginTop: 100}}>Welcome</Text>
            <Text style={{fontStyle: 'italic', fontWeight: 'bold', fontSize: 28, marginLeft: 122}}>To</Text>
            <Text style={{fontStyle: 'italic', fontWeight: 'bold', fontSize: 45}}>WhatChaGot</Text>
          </View>

          <View>
            <Input
              inputContainerStyle = {{
                width: "75%"
              }}
              containerStyle = {{
                marginTop: 40
              }}
              inputStyle = {{
                marginLeft: 8
              }}
              placeholder=' Email@address.com'
              leftIcon={
                <Icon
                name='envelope'
                size={20}
                color='black'
              />
              }
            />
            <Input
              inputContainerStyle = {{
                width: "75%",
              }}
              containerStyle = {{
                marginTop: 20
              }}
              inputStyle = {{
                marginLeft: 8
              }}
              placeholder=' Password'
              secureTextEntry={true}
              leftIcon={
                <Icon
                  name='lock'
                  size={24}
                  color='black'
                />
              }
            />
            <Button
              buttonStyle = {{
                backgroundColor: "#454647",
                width: "45%",
                alignSelf:'center',
                marginTop: 30
              }}
              titleStyle = {{
                fontSize: 19,
              }}
              title="Sign In"
              onPress={() => this.props.navigation.navigate('Home')}
            />
            <Text style={{marginTop: 15, marginBottom: 3, fontSize: 12, color: "#454647", textAlign: 'center'}}>
              Don't have an account yet?
            </Text>
            <Button
              buttonStyle = {{
                //backgroundColor: "#454647",
                width: "30%",
                alignSelf:'center',
                //fontFamily='Comic Sans MS'
              }}
              titleStyle = {{
                fontSize: 14,
              }}
              type="outline"
              title="Sign Up"
              onPress={() => this.props.navigation.navigate('SignUp1')}
            />
          </View>
        </View>
        </ImageBackground> 
      </View>
    );
  }
}

class SignUpScreen extends React.Component {
  
  static navigationOptions = {
    headerShown: false,
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Input
            inputContainerStyle = {{
              width: "85%"
            }}
            inputStyle = {{
              marginLeft: 8
            }}
            label = "Email Address"
            placeholder=' Email@address.com'
            leftIcon={
              <Icon
              name='envelope'
              size={20}
              color='black'
            />
            }
          />
          <Input
            inputContainerStyle = {{
              width: "85%",
            }}
            containerStyle = {{
              marginTop: 20
            }}
            inputStyle = {{
              marginLeft: 8
            }}
            label = 'Password'
            placeholder=' Password'
            secureTextEntry={true}
            leftIcon={
              <Icon
                name='lock'
                size={24}
                color='black'
              />
            }
          />

          <Input
            inputContainerStyle = {{
              width: "85%",
            }}
            containerStyle = {{
              marginTop: 20
            }}
            inputStyle = {{
              marginLeft: 8
            }}
            label = 'Re-type Password'
            placeholder=' Type your password again'
            secureTextEntry={true}
            leftIcon={
              <Icon
                name='lock'
                size={24}
                color='black'
              />
            }
          />

          <Button
            buttonStyle = {{
              backgroundColor: "#454647",
              width: "45%",
              alignSelf:'center',
              //fontFamily='Comic Sans MS'
              marginTop: 30
            }}
            titleStyle = {{
              fontSize: 16,
            }}
            title="Sign Up"
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View> 
      </View>
    );
  }
}

class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation}) => {
    return {
      headerLeft: () => (
        <View>
          <TouchableOpacity
            style={styles.customBtnBG}
            onPress={navigation.getParam('toggleOpen')}  >
            <Text style={styles.customBtnText}>☰</Text>
          </TouchableOpacity>
        </View>
      ),
    };
  };

  UNSAFE_componentWillMount() {
    this.props.navigation.setParams({ toggleOpen: this.toggleOpen});
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };
  
  drawerContent = () => {
    return (
      <View style={styles.animatedBox}>
        <Image style={styles.info} source={require('./assets/link.jpg')}/>
        <Text style={styles.username}>MyNamesCory</Text>
        <Text style={styles.menu} onPress={() => {
          if (this.state.open){
            this.toggleOpen();
          } 
          this.props.navigation.navigate('Search')
          }
        }>
          Search
        </Text>
        <Text style={styles.menu} onPress={() => {
          if (this.state.open){
            this.toggleOpen();
          } 
          this.props.navigation.navigate('List')
          }
        }>
           Library 
        </Text>
      </View>
    );
  };

  render () {
    return (
      <View style={styles.container}>
        <MenuDrawer 
          open={this.state.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={60}
          animationTime={200}
          overlay={true}
          opacity={0.4}>  
          <TouchableOpacity onPress={this.toggleOpen} style={styles.body}>
            <Text> </Text>
          </TouchableOpacity>    
        </MenuDrawer>

        <View> 
          <Text>Home Screen</Text>
          <Button title="Add an Item"
          onPress={() => this.props.navigation.navigate('AddItem')}
          />
          <Button title="List of Items"
          color="green"
          onPress={() => this.props.navigation.navigate('ListItem')}
          />
          <Button title="SignUp"
          color="green"
          onPress={() => this.props.navigation.navigate('SignUp1')}
          />
        </View>

        
      </View>
    );
  }
}

//import * as recipeJson from './Data.json';    //Practice json document for working with Json without making API call

class SearchScreen extends React.Component {

  

  static navigationOptions = ({ navigation}) => {
    return {
      headerLeft: () => (
        <View>
          <TouchableOpacity
            style={styles.customBtnBG}
            onPress={navigation.getParam('toggleOpen')}  >
            <Text style={styles.customBtnText}>☰</Text>
          </TouchableOpacity>
        </View>
      ),
    };
  };

  UNSAFE_componentWillMount() {
    this.props.navigation.setParams({ toggleOpen: this.toggleOpen});
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isLoading: false,
      value: '',               //initialize state to hold user search entry
      ingredients: [],         //initialize empty array in state to hold user input
      data: [],
      recipeTitles: '',
    };
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  drawerContent = () => {
    return (
      <View style={styles.animatedBox}>
        <Image style={styles.info} source={require('./assets/link.jpg')}/>
        <Text style={styles.username}>MyNamesCory</Text>
        <Text style={styles.menu} onPress={() => {
          if (this.state.open){
            this.toggleOpen();
          } 
          this.props.navigation.navigate('Home')
          }
        }>
          Home
        </Text>
        <Text style={styles.menu} onPress={() => {
          if (this.state.open){
            this.toggleOpen();
          } 
          this.props.navigation.navigate('List')
          }
        }>
          Library
        </Text>
      </View>
    );
  };

  searchByIngredient () {  //Function for creating the api call to spoonacular and fetching the call
    {/* Michael API key: 6229cd708177474780e6c39e57b69361 */}
    // Cory API key: b22b05749d464305b95df9c21d75c666
    
    let apiCall
    let apiHead = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients='
    let apiList
    let apiFoot = '&number=2&ranking=2&apiKey='
    let apiKey = 'b22b05749d464305b95df9c21d75c666'

    if (this.state.ingredients.length > 1) {
      apiList = this.state.ingredients.join(",+")
    } else {
      apiList = this.state.ingredients[0]
    }

    apiCall = apiHead + apiList + apiFoot + apiKey

    // alert(apiCall)    //Debugging: Check created api string

     fetch(apiCall)
     .then((response) => response.json())
     .then((responseJson) => {
       this.setState({data: responseJson})
       alert(responseJson[0].title + ', ' + responseJson[1].title)
    });

    //this.state.data = recipeJson;     //Practice json document for working with Json without making API call
    //alert(this.state.data[0].title )

    // + ', ' + this.state.data[1].title


    // return(
    //   <View>
    //     <Text>
    //       {recipeJson[0].title}
    //       {recipeJson[1].title}
    //     </Text>
    //   </View>

    // );

  };

  state = {

  }

  updateSearch = search => {
    this.setState({ value: search });  //Set state.value to search term
  }

  updateList() {
    if (this.state.value === '') {     //don't update list if no search term is entered
      return
    }
    this.setState(state => {  //push search term to state.ingredients array
      const ingredients = state.ingredients.concat(state.value);

      return {
        ingredients,
        value: '',
      };
    });
    // this.SearchBar.Text = '';
  };

  
  // componentDidMount(){
  //   this.searchByIngredient();
  // }

  renderItem = ({item, index}) => {
    let {title} = item;

    return (
      <View>
        <Text>
          {title}
        </Text>
      </View>
    );   
  
  }

  keyExtractor = (item, index) => {
    return index.toString();
  }

  render () {

    const { search } = this.state.value;

    return (
      <View>
        <MenuDrawer 
          open={this.state.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={60}
          animationTime={200}
          overlay={true}
          opacity={0.4}>  
          <TouchableOpacity onPress={this.toggleOpen} style={styles.body}>
            <Text>
           </Text>
          </TouchableOpacity>    
        </MenuDrawer>


        <SearchBar
          inputStyle={{backgroundColor: 'white'}}
          containerStyle={{backgroundColor: 'white', borderWidth: 0.3, borderRadius: 10, margin:10}}
          inputContainerStyle={{backgroundColor: 'white'}}
          placeholder="Search for recipes"
          onChangeText={this.updateSearch}
          value={search}
        />

        <Button       //Button for adding search term to search list
              buttonStyle = {{
                backgroundColor: "#454647",
                width: "45%",
                alignSelf:'center',
                marginTop: 30
              }}
              titleStyle = {{
                fontSize: 19,
              }}
              title="Add Item"
              onPress={() => this.updateList() }
        />

        <Button       //Debugging tool, check to make sure list was updated
              buttonStyle = {{
                backgroundColor: "#454647",
                width: "45%",
                alignSelf:'center',
                marginTop: 30
              }}
              titleStyle = {{
                fontSize: 19,
              }}
              title="Check Array"
              onPress={() => alert(this.state.ingredients) }
        />

        <Button       //Call searchByIngredient function
              buttonStyle = {{
                backgroundColor: "#454647",
                width: "45%",
                alignSelf:'center',
                marginTop: 30
              }}
              titleStyle = {{
                fontSize: 19,
              }}
              title="Search"
              onPress={() => this.searchByIngredient() }
        />

        <FlatList
          data={this.state.data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />

      </View>
      
    );
  }
}

class ListScreen extends React.Component {

  static navigationOptions = ({ navigation}) => {
    return {
      headerLeft: () => (
        <View>
          <TouchableOpacity
            style={styles.customBtnBG}
            onPress={navigation.getParam('toggleOpen')}  >
            <Text style={styles.customBtnText}>☰</Text>
          </TouchableOpacity>
        </View>
      ),
    };
  };

  UNSAFE_componentWillMount() {
    this.props.navigation.setParams({ toggleOpen: this.toggleOpen});
  }

  // componentDidMount() {
  //   this.fetchAllGames();
  // }

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      games: []
    };
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  // fetchAllGames = async () => {
  //   const steamResponse = await fetch("http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?&key=E4DF01887A0F46A34C852888E2D5D946&steamid=76561198121597846&include_appinfo=true&format=json");
  //   const json = await steamResponse.json();

  //   let data = JSON.parse(JSON.stringify(json));
  //   let gameList = data.response.games;
  //   this.setState({ games : gameList });
  // }

  // keyExtractor = (item, index) => {
  //   var key = item.appid.toString();
  //   return key;
  // }

  // renderItem = ({item}) => {
  // var render = <Item title={item.name} />
  //   return render;
  // }

  drawerContent = () => {
    return (
      <View style={styles.animatedBox}>
        <Image style={styles.info} source={require('./assets/link.jpg')}/>
        <Text style={styles.username}>MyNamesCory</Text>
        <Text style={styles.menu} onPress={() => {
          if (this.state.open){
            this.toggleOpen();
          } 
          this.props.navigation.navigate('Home')
          }
        }>
           Home
        </Text>
        <Text style={styles.menu} onPress={() => {
          if (this.state.open){
            this.toggleOpen();
          } 
          this.props.navigation.navigate('Search')
          }
        }>
        Search 
        </Text>
      </View>
    );
  };

  render () {
        return (
        <View style={styles.container}>
          <MenuDrawer 
            open={this.state.open} 
            drawerContent={this.drawerContent()}
            drawerPercentage={60}
            animationTime={200}
            overlay={true}
            opacity={0.4}>  
            <TouchableOpacity onPress={this.toggleOpen} style={styles.body}>
              <Text> </Text>
            </TouchableOpacity>    
          </MenuDrawer>

          <SafeAreaView style={styles.apiContainer}>
            <FlatList 
            data={this.state.games}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem} />
          </SafeAreaView>
        </View>
      );
    } 
  }

const RootStack = createStackNavigator (
  {
    Login: LoginScreen,
    SignUp: SignUpScreen,
    Home: HomeScreen,
    Search: SearchScreen,
    List: ListScreen,
    //Home, 
    AddItem, 
    ListItem
  },
  {
    initialRouteName: 'Login',
  },
)

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

const styles = StyleSheet.create({

  apiContainer: {
    flex: 1,
    backgroundColor: '#397299',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 5,
  },
  item: {
    backgroundColor: '#1b2838',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    color: '#c7d5e0',
    fontWeight: "bold"
  },

  enterTitle: {
    fontSize: 20,
    margin: 80
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  libraryContainer: {
    flex: 1,
    alignContent: "flex-start",
    justifyContent: 'flex-start',
    backgroundColor: '#404040'
  },
  libraryItem: {
    marginBottom: 17,
    height: '10%',
  },
  libraryItemImage: {
    height: 100,
    paddingBottom: 20
  },

  supportContainer: {
    textAlignVertical: 'top',
    paddingLeft: 15,
  },
  textbox: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 0.8,
    borderColor: '#000000',
    paddingBottom: 8,
    width: 220,
    height: 42,
    marginTop: 50,
    marginBottom: 1
  },
  textbox2: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 0.8,
    borderColor: '#000000',
    paddingBottom: 8,
    width: 220,
    height: 42,
    marginBottom: 30,
  },

  loginbtn:{
    padding: 10,
    width: '50%',
    height: '50%',
    color: 'green',

  },
  logo: {
    marginLeft: 130,
    marginTop: 300,
    width:220,
    height:220,
  },

  username: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 3,
    marginLeft: 59,
  },

  info: {
    width: 130,
    height: 130,
    marginLeft: 60,
    marginTop: 10,
  },

  signin: {
    marginLeft: 175,
    borderRadius: 10,
    width: 115,
    height: 42
  },

  menu: {
    marginTop: 55,
    marginLeft: 65,
    fontSize: 20
  },

  menuBtn: {
    flex: 1,
    width: 60,
    height: 60,
  },
  nextbtn:{
    width: 50,
    paddingTop: 50,
  },

  navBtnBG: {
    color: '#bfbfbf',
  },

  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginTop: -5,
  //   zIndex: 0
  // },
  animatedBox: {
    flex: 1,
    backgroundColor: "#d9d9d9",
    padding: 9
  },
  customBtnText:{
    fontSize: 30,
  },
  customBtnBG:{
    paddingLeft: 10,
  }
});
