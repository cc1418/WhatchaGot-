import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground} from 'react-native';
import {createAppContainer, SafeAreaView} from 'react-navigation';
import {createStackNavigator} from  'react-navigation-stack'
import MenuDrawer from 'react-native-side-drawer'
import {Button, Input, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

//import { Nav } from '../navigation/UniversalNavigator';
import styles from '../../components/Style';

class SearchScreen extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        open: false,
        isLoading: false,
        value: '',               //initialize state to hold user search entry
        ingredients: [{id:0, name:'Bananas'}, {id:1, name:'Apples'}, {id:2, name:'Oranges'}],         //initialize empty array in state to hold user input
        data: [],
        recipeTitles: '',
      };
    }
  
    searchByIngredient () {  //Function for creating the api call to spoonacular and fetching the call
      {/* Michael API key: 6229cd708177474780e6c39e57b69361 */}
      // Cory API key: b22b05749d464305b95df9c21d75c666
      
      let apiCall
      let apiHead = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients='
      let apiList
      let apiFoot = '&number=1&ranking=2&apiKey='
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
         alert(responseJson[0].title)  //Debugging: make sure recipes come through
      });
  
      //this.state.data = recipeJson;     //Practice json document for working with Json without making API call
      //alert(this.state.data[0].title )
  
    };
  
    updateSearch = search => {
      this.setState({ value: search });  //Set state.value to search term
    }
  
    updateList() {
      if (this.state.value === '') {     //don't update list if no search term is entered 
      return
      }
      this.setState(state => {  //push search term to state.ingredients array
        
        let newId

        if (this.state.ingredients === '') {
          newId = 0;
        } else {
          let lastId = this.state.ingredients[(this.state.ingredients.length - 1)].id
          newId = lastId + 1
        }

        const obj = {id:newId, name:this.state.value}

        const ingredients = state.ingredients.concat(obj);
  
        return {
          ingredients,
          value: '',
        };
      });
      this.search.clear();
      // this.SearchBar.Text = '';
    };

    renderIngredients = ({item, index}) => {
  
      return (
        <View>
          <Text index = {item.id}>
            {item.id}: {item.name}
          </Text>
        </View>
      );   
    }

    renderRecipes = ({item, index}) => {
  
      return (
        <View>
          <Text>
            Name: {item.title}
  
          </Text>
        </View>
      );   
    }
  
    keyExtractor = (item, index) => {
      return index.toString();
    }

    // ListWithRemoveItem() {
    //   const [list, setList] = this.state.ingredients;
    
    //   setList(list.filter(item => item.id !== id));
    
    //   return (
    //     <ul>
    //       {list.map(item => (
    //         <li key={item.id}>
    //           <label>{item.name}</label>
    //           <button type="button" onClick={() => handleClick(item.id)}>
    //             Remove
    //           </button>
    //         </li>
    //       ))}
    //     </ul>
    //   );
    // };
  
    render () {
  
      const { search } = this.state.value;

      let list = this.state.ingredients.map((item, key) =>
        <View> {
          <Text>
            {item.name}
          </Text>
        }
        </View>
      )
  
      return (
        <View>
  
          <SearchBar
            ref={search => this.search = search}
            inputStyle={{backgroundColor: 'white'}}
            containerStyle={{backgroundColor: 'white', borderWidth: 0.3, borderRadius: 10, margin:10}}
            inputContainerStyle={{backgroundColor: 'white'}}
            placeholder="Enter an Ingredient"
            onChangeText={this.updateSearch}
            value={search}
            
          />

          <FlatList
            data={this.state.ingredients}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderIngredients}
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
            renderItem={this.renderRecipes}
          />
  
        </View>
        
      );
    }
  }

  export default SearchScreen;