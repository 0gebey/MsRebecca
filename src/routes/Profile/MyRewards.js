import React, {Component} from 'react';
import {Text, View, Button, TouchableHighlight, StyleSheet, ImageBackground, Dimensions,  FlatList, Modal, Alert} from 'react-native';
import Header from "../../common-components/Header";
import {Actions} from "react-native-router-flux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ListItem} from 'react-native-elements';
import { Image } from 'react-native-elements';

let windowWidth = Dimensions.get('window').width;


const list = [
    {
      name: 'Employee of the Month',
      avatar_url: 'https://image.freepik.com/free-vector/avatar-man-woman-with-big-trophy-cup_18591-62064.jpg',
      subtitle: 'The best employee of the company.'
    },
    {
      name: 'The Most Disciplined Employee',
      avatar_url: 'http://www.littlethingsmatter.com/wp-content/blogs.dir/1/files/2011/01/iStock_000013629812Discipline-300x199.jpg',
      subtitle: 'Rewards for the disciplined behaviours.'
    },
    {
      name: 'Veteran',
      avatar_url: 'https://image.freepik.com/free-vector/head-old-man-with-beard-glasses-avatar-character_24877-36775.jpg',
      subtitle: 'Working on the company for 5 years.'
    },
    {
        name: 'Member of the Founding Team',
        avatar_url: 'https://pickaface.net/gallery/avatar/20130624_144308_996_CEO.png',
        subtitle: 'One of the Founders of the Company'
      }
  ];

export default class MyRewards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rewards: [],
            modalVisible: false,
        };
    };

    handleModalVisible = () => {
        this.setState(
            { modalVisible: !this.state.modalVisible }
        )
      }

    renderModal = () => {
        return(
            <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Detailed informations will be added in the future updates </Text>
  
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#803262" }}
                  onPress={() => {
                    this.handleModalVisible();
                  }}
                >
                  <Text style={styles.textStyle}>GOT IT!</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        )
    }
    renderHeader = () => {
        return <Header headerBaslik={"My Rewards"}
                       headerLeftButtonClick={this.headerLeftButtonOnPress}
                       headerRightButtonExist={false}
                       headerLeftIconName={"arrow-left"}
                       headerLeftIconSize={20}
                       headerLeftButtonExist={true}/>
            ;
    };


    headerLeftButtonOnPress = () => {
        Actions.Profile();
    };

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListItem
        title={item.name}
        subtitle={item.subtitle}
        leftAvatar={{ source: { uri: item.avatar_url } }}
        bottomDivider
        chevron
        button onPress={() => this.handleModalVisible()}
        style= {{paddingTop: 2,borderBottomWidth:1}}
         />
)

    render () {
        let backgroundImage = require("../../common-components/background.jpg");
        return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
             {this.renderHeader()}
             {this.renderModal()}
            <View style= {{alignItems: 'center',justifyContent: 'center'}}>
                <Text style={styles.rewardsText}> Evidence of Success </Text>
            </View>
            <View stlye = { styles.listStyle}>
            <FlatList
      keyExtractor={this.keyExtractor}
      data={list}
      renderItem={this.renderItem}
    />
    
    </View>
    <View style = {{alignItems: 'center', justifyContent: 'center'}}>
    <Image
  source={{ uri: 'https://josiahharrydotcom.files.wordpress.com/2017/06/ef819da44c100d45bdcb47417986076c.jpeg?w=640' }}
  style={{ width: 250, height: 200, alignItems: 'center', justifyContent: 'center' }}
/>
    </View>
            
        </ImageBackground>
        )
    }

}

const styles = StyleSheet.create({
backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    position: 'relative'
},
rewardsText: {
    color: '#803262',
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
},
listStyle: {
    alignItems: 'center',
    justifyContent: 'center',
},
centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#E6E6FA",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#803262",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

})