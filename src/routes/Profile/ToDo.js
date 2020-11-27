import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../common-components/Header';
import ToDoComponent from './ToDoComponent';
import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from "react-native-router-flux";

export default class Main extends React.Component {
  state = {
    toDoArray: [],
    toDoText: ' ',
  };

  renderHeader = () => {
    return (
      <Header
        headerBaslik={'To-Do List'}
        headerLeftButtonClick={this.headerLeftButtonOnPress}
        headerRightButtonExist={false}
        headerLeftIconName={'arrow-left'}
        headerLeftIconSize={20}
        headerLeftButtonExist={true}
      />
    );
  };

  headerLeftButtonOnPress = () => {
    this.storeData();
    Actions.Profile();
};

  storeData = async () => {
    let toDoList = {
        toDoArray:this.state.toDoArray,
        todoText: this.state.toDoText,
        
    }
try {
  const jsonValue = JSON.stringify(toDoList)
  await AsyncStorage.setItem('ToDoListItems', jsonValue)
} catch (e) {
  console.log(e)
}
}


getData = async () => {
  const jsonValue = await AsyncStorage.getItem('ToDoListItems')
  let toDoList = JSON.parse(jsonValue);
  this.setState({
    toDoArray: toDoList.toDoArray,
    todoText: toDoList.toDoText,
  })
}

componentWillMount() {
    this.getData();
}

  addToDo = (e) => {
    if (this.state.toDoText) { //if the array is not empty
      let d = new Date(); //crate new date object
      const newToDo = {
        date: d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate(),
        toDo: this.state.toDoText,
      };
      this.setState({
        toDoArray: [...this.state.toDoArray, newToDo],
        toDoText: '', //girilen notu aliyor
      });
    }
  };

  deleteToDo(key) {
    this.state.toDoArray.splice(key, 1); //siliyoruz
    this.setState({toDoArray: this.state.toDoArray}); //arrayi update ediyoruz
  }

  render() {
    let toDos = this.state.toDoArray.map((val, key) => {
      return (
        <ToDoComponent key={key} val={val} deleteMethod={() => this.deleteToDo(key)} />
      );
    });

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ScrollView style={styles.scrollViewContainer}>{toDos}</ScrollView>

        <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(toDoText) => this.setState({toDoText})}
            value={this.state.toDoText}
            placeholder="Write Here"
            placeholderTextColor="white"
          />
        </View>
        <TouchableOpacity
          onPress={this.addToDo.bind(this)}
          style={styles.AddButton}>
          <Text style={styles.AddButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#00008b',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 26,
  },
  scrollViewContainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    backgroundColor: '#252525',
    borderTopWidth: 2,
    borderTopColor: '#ededed',
  },
  AddButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: '#803262',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  AddButtonText: {
    color: '#fff',
    fontSize: 24,
  },
});
