import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import {createAppContainer, SafeAreaView} from 'react-navigation';
import {createStackNavigator} from  'react-navigation-stack'
import { ImageBackground } from 'react-native'
import MenuDrawer from 'react-native-side-drawer'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';

//import Home from './src/screens/Home';
import AddItem from './src/screens/AddItem';
import ListItem from './src/screens/ListItem';

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

  constructor(){
    super();
    this.state ={
      fontLoaded: false
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Sriracha-Regular': require('./assets/fonts/Sriracha-Regular.ttf')
    });

    this.setState({ fontLoaded:true })
  }

  render() {
    return (
      <View>
        <View>
          <Text>WhatChaGot</Text>
        </View>
          <fumiInput> </fumiInput>
          <fumiInput2> </fumiInput2>
        <View>

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
        </View>

        
      </View>
    );
  }
}

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
        <Text style={styles.username}>MyNamesZelda</Text>
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

  render () {
    return (
      <View style={styles.container} sytle={{backgroundColor: "#cce6ff"}}>
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
        <Text>
          Cory
        </Text>
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
        <Text style={styles.username}>MyNamesZelda</Text>
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
    Home: HomeScreen,
    Search: SearchScreen,
    //List: ListScreen,
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

const fumiInput = (
  <Fumi
    label={'User Name'}
    iconClass={FontAwesomeIcon}
    iconName={'user-secret'}
    iconColor={'#1893cc'}
    iconSize={20}
    iconWidth={40}
    inputPadding={16}
  />
);

const fumiInput2 = (
  <Fumi
    label={'Password'}
    iconClass={FontAwesomeIcon}
    iconName={'unlock-alt'}
    iconColor={'#1893cc'}
    iconSize={20}
    iconWidth={40}
    inputPadding={16}
  />
);

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

  backgroundImage: {
    height: '100%',
    width: '100%',
    opacity: .2,
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
    width: '65%',
    height: 42,
    marginTop: 50,
    marginLeft: 85,
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
    width: '65%',
    height: 42,
    marginLeft: 85,
    marginBottom: 20,
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
    marginLeft: 180,
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -5,
    zIndex: 0
  },
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
