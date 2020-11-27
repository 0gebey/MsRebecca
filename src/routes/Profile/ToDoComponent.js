import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Header from '../../common-components/Header';
export default class ToDo extends React.Component {

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

  render() {
    return (
      <View style={styles.todo}>
        <Text>{this.props.val.date}</Text>
        <Text>{this.props.val.toDo}</Text>
        <TouchableOpacity
          onPress={this.props.deleteMethod}
          style={styles.toDoDelete}>
          <Text style={styles.toDoDeleteText}>Del</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  todo: {
    padding: 20,
    borderBottomWidth: 2,

  },
  toDoText: {
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderLeftColor: '#e91e63',
  },
  toDoDelete: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#803262',
    padding: 10,
    top: 10,
    bottom: 10,
    right: 10,
  },
  toDoDeleteText: {
    color: 'black',
  },
});
