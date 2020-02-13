import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Alert
} from 'react-native';

import { db } from '../config';

let addItem = item => {
  db.ref('/items').push({
    ingredients: items
  });
};

export default class AddItem extends Component {
  state = {
    ingredient1: '',
    ingredient2: '',
    ingredient3: '',
    ingredient4: '',
    ingredient5: ''
  };

  handleIngredient1Change = e => {
    this.setState({
      ingredient1: e.nativeEvent.text
    });
  };
  handleIngredient2Change = e => {
    this.setState({
      ingredient2: e.nativeEvent.text
    });
  };
  handleIngredient3Change = e => {
    this.setState({
      ingredient3: e.nativeEvent.text
    });
  };
  handleIngredient4Change = e => {
    this.setState({
      ingredient4: e.nativeEvent.text
    });
  };
  handleIngredient5Change = e => {
    this.setState({
      ingredient5: e.nativeEvent.text
    });
  };
  handleSubmit = () => {
    addItem(this.state);
    Alert.alert('Item saved successfully');
  };

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Add Item</Text>
        <TextInput style={styles.itemInput} onChange={this.handleIngredient1Change} value={this.state.TextInput} />
        <Text style={styles.title}>Add Item</Text>
        <TextInput style={styles.itemInput} onChange={this.handleIngredient2Change} value={this.state.TextInput} />
        <Text style={styles.title}>Add Item</Text>
        <TextInput style={styles.itemInput} onChange={this.handleIngredient3Change} value={this.state.TextInput} />
        <Text style={styles.title}>Add Item</Text>
        <TextInput style={styles.itemInput} onChange={this.handleIngredient4Change} value={this.state.TextInput} />
        <Text style={styles.title}>Add Item</Text>
        <TextInput style={styles.itemInput} onChange={this.handleIngredient5Change} value={this.state.TextInput} />
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#6565fc'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});