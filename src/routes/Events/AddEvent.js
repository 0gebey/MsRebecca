import React, {Component} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  Alert,
  TouchableHighlight,
  ScrollView,
  Switch,
  Image,
} from 'react-native';
import Header from '../../common-components/Header';
import {Actions} from 'react-native-router-flux';
import MyButton from '../../common-components/MyButton';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Geolocation from 'react-native-geolocation-service';
import moment from 'moment';
import {connect} from 'react-redux';
import {addEvent} from '../../actions/EventActions';
import ImagePicker from 'react-native-image-picker';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

const options = {
  title: 'Choose a Photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
    disableButton: true,
    buttonOpacity: 0.35,
    isImagePicked: false,
    mediaType: 'photo',
    noData: true,
  },
};

class AddEvent extends Component {
  state = {
    eventTitle: '',
    eventDateTime: '',
    eventLocation: '',
    moreInfo: '',
    mapRegion: null,
    lastLat: null,
    lastLong: null,
    cordinate: null,
    isPickerVisible: false,
    modalVisible: false,
    events: [],
    isMapVisible: false,
    imageLoading: false,
    isImageSelected: false,
    eventAvatar: null,
    isPlacesVisible: false,
    isGuestsCanInviteFriends: false,
  };

  headerLeftButtonOnPress = () => {
    Actions.Events();
  };
  renderHeader = () => {
    return (
      <Header
        headerBaslik={'Create New Event'}
        headerRightButtonClick={this.headerLeftButtonOnPress}
        headerRightButtonExist={false}
        headerLeftButtonExist={true}
        headerLeftIconName={'angle-left'}
        headerLeftIconSize={30}
        headerLeftButtonClick={this.headerLeftButtonOnPress}
      />
    );
  };

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        events: nextProps.events.events,
      });
    }
  }

  onAddEvent = () => {
    this.props.addEvent(
      this.state.eventDateTime,
      this.state.eventTitle,
      this.state.moreInfo,
      this.state.eventLocation,
      this.state.eventAvatar,
    );
    Actions.reset('app');
  };

  handleImagePicker = async () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          event: response.uri,
        });
      }
    });
  };
  componentDidMount() {
    async function requestPermissions() {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization();
        Geolocation.setRNConfiguration({
          skipPermissionRequests: false,
          authorizationLevel: 'whenInUse',
        });
      }

      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
    }
    this.takeCurrentLocation();
  }

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong,
    });
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  takeCurrentLocation() {
    this.watchID = Geolocation.watchPosition(
      position => {
        // Create the object to update this.state.mapRegion through the onRegionChange function
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 1.5,
          longitudeDelta: 0.00421 * 1.5,
        };
        this.onRegionChange(region, region.latitude, region.longitude);
      },
      error => console.log(error),
    );

    console.log(this.state.mapRegion);
  }

  toggleGuestInviteFriends = () => {
    this.setState({
      isGuestsCanInviteFriends: !this.state.isGuestsCanInviteFriends,
    });
  };

  handlePickerVisibility = () => {
    this.setState({isPickerVisible: !this.state.isPickerVisible});
  };
  handlePlacesVisibility = () => {
    this.setState({isPlacesVisible: !this.state.isPlacesVisible});
  };

  handleConfirm = datetime => {
    console.warn('A date and time has been picked: ', datetime);
    this.handlePickerVisibility();
    this.setState({
      eventDateTime: moment(datetime).format('MMMM, Do YYYY HH:mm'),
    });
    console.log('Date:', this.state.eventDateTime);
  };

  onChangeEventTitle = text => {
    this.setState({
      eventTitle: text,
    });
  };

  onChangeEvenLocation = text => {
    this.setState({
      eventLocation: text,
    });
  };
  onChangeMoreInfo = text => {
    this.setState({
      moreInfo: text,
    });
  };

  renderGooglePlaces = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isPlacesVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.placesStyle}>
            <GooglePlacesAutocomplete
              placeholder="Search"
              minLength={2}
              autoFocus={false}
              fetchDetails={true}
              onPress={data => {
                // 'details' is provided when fetchDetails = true
                this.setState({eventLocation: data.description});
                console.log(this.state.eventLocation);
              }}
              query={{
                key: 'AIzaSyBrDcCug-vOrCZ-vgXtA8Tf953bHQ8TVzw',
                language: 'en',
              }}
              styles={{
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
                description: {
                  fontWeight: 'bold',
                },
                textInputContainer: {
                  backgroundColor: 'rgba(0,0,0,0)',
                  // borderTopWidth: 1,
                  // borderBottomWidth: 1,
                  height: 40,
                  width: '100%',
                },
                textInput: {
                  marginLeft: 0,
                  marginRight: 0,
                  height: 38,
                  color: '#5d5d5d',
                  fontSize: 16,
                },
              }}
            />
            <Text style={styles.modalText}>
              {' '}
              Event Location: {this.state.eventLocation}{' '}
            </Text>
            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#803262'}}
              onPress={() => {
                this.handlePlacesVisibility();
              }}>
              <Text style={styles.textStyle}>CONFIRM</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  };

  handleModalVisible = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

  handleMapVisible = () => {
    this.setState({isMapVisible: !this.state.isMapVisible});
  };

  renderMap = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isMapVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.mapModalView}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={this.state.mapRegion}
              showsUserLocation={true}
              followUserLocation={true}
              onRegionChange={this.onRegionChange.bind(this)}
              customMapStyle={mapStyle}>
              <Marker.Animated
                coordinate={{
                  latitude: this.state.lastLat + 0.0005 || -36.82339,
                  longitude: this.state.lastLong + 0.0005 || -73.03569,
                }}>
                <View>
                  <Text style={{color: '#000'}}>
                    {this.state.lastLong} / {this.state.lastLat}
                  </Text>
                </View>
              </Marker.Animated>
            </MapView>
          </View>
          <TouchableHighlight
            style={{...styles.openButton, backgroundColor: '#803262'}}
            onPress={() => {
              this.handleMapVisible();
            }}>
            <Text style={styles.textStyle}>CONFIRM</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    );
  };

  renderModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              ARE YOU SURE TO CREATE AN EVENT? {'\n'} Event Title:{' '}
              {this.state.eventTitle} {'\n'} Event Date and Time:{' '}
              {this.state.eventDateTime} {'\n'} Event Brief Information:{' '}
              {this.state.moreInfo} {'\n'} Event Location:{' '}
              {this.state.eventLocation} {'\n'} Guest Can Invite Friends:{' '}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '60%',
              }}>
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: '#803262',
                }}
                onPress={() => {
                  this.handleModalVisible();
                }}>
                <Text style={styles.textStyle}>DECLINE</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{...styles.openButton, backgroundColor: '#803262'}}
                onPress={() => {
                  this.handleModalVisible();
                  this.onAddEvent();
                }}>
                <Text style={styles.textStyle}>CONFIRM</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const {isGuestsCanInviteFriends} = this.state;
    let backgroundImage = require('../../common-components/background.jpg');
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        {this.renderHeader()}
        {this.renderModal()}
        {this.renderMap()}
        {this.renderGooglePlaces()}
        <ScrollView stlye={styles._mainScrollview}>
          <View style={styles.eventTitleStyle}>
            <Text style={styles.titleText}> Event Title: </Text>
            <TextInput
              style={styles._textInputEventTitleStyle}
              onChangeText={this.onChangeEventTitle}
              value={this.state.eventTitle}
              placeholder={'Event Name'}
              autoCorrect={false}
            />
            <EvilIcons
              style={{marginRight: 5}}
              name="image"
              size={40}
              color="#803262"
              onPress={() => {
                this.handleImagePicker();
              }}
            />
          </View>
          <View style={styles.eventDateTime}>
            <Text style={styles.dateTimeTextStyle}>
              {this.state.eventDateTime}
            </Text>
            <MyButton
              myButtonText={'Pick a Date'}
              buttonBackgroundColor={'#803262'}
              buttonTextColor={'white'}
              myButtonHeight={40}
              myButtonWidth={100}
              myButtonBorderColor={'#803262'}
              myButtonBorderWidth={1}
              myButtonBorderRadius={5}
              myButtonAlignItems={'center'}
              onClickMyButton={() => {
                this.handlePickerVisibility();
              }}
              willThereIcon={false}
            />
          </View>
          <View style={styles.eventTitleStyle}>
            <Text style={styles.locationText}>Please choose a location:</Text>
            <EvilIcons
              name="search"
              size={40}
              color="#803262"
              onPress={() => {
                this.handlePlacesVisibility();
              }}
            />
            <EvilIcons
              name="location"
              size={40}
              color="#803262"
              onPress={() => {
                this.handleMapVisible();
              }}
            />
          </View>

          <View style={styles.eventBriefStyle}>
            <Text style={styles.titleText}>Brief: </Text>
            <TextInput
              style={styles._textInputEventMoreInfo}
              onChangeText={this.onChangeMoreInfo}
              value={this.state.moreInfo}
              placeholder={
                'Please enter a brief information for the participants '
              }
              autoCorrect={false}
            />
          </View>
          <View style={styles.guestCanInviteFriendsStyle}>
            <Text style={styles.locationText}> Guests can invite friends:</Text>
            <Switch
              trackColor={{false: 'gray', true: 'teal'}}
              thumbColor="white"
              ios_backgroundColor="gray"
              onValueChange={this.toggleGuestInviteFriends}
              value={isGuestsCanInviteFriends}
            />
          </View>
          <Image
            style={styles.meetingLogo}
            source={{
              uri:
                'https://lh3.googleusercontent.com/proxy/SvGwd9eft5ITVnDJ0mJh6SvEmzoqnyiAUGuDEZb4TiRFLCON6lxSc5pU3M3ggLPoW2mBus0h44kMsZn_sABjPLCmOjCbAgUHcIKD-wwNP6CWYQ',
            }}
          />
          <DateTimePickerModal
            style={{
              shadowColor: '#803262',
              shadowRadius: 0,
              shadowOpacity: 1,
              shadowOffset: {height: 0, width: 0},
            }}
            isVisible={this.state.isPickerVisible}
            mode="datetime"
            onConfirm={this.handleConfirm}
            onCancel={this.handlePickerVisibility}
          />
        </ScrollView>
        <MyButton
          myButtonText={'Create an Event'}
          buttonTextFontSize={24}
          buttonBackgroundColor={'#803262'}
          buttonTextColor={'white'}
          myButtonHeight={50}
          myButtonAlignItems={'center'}
          onClickMyButton={() => {
            this.handleModalVisible();
          }}
          willThereIcon={false}
        />
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events,
});

export default connect(
  mapStateToProps,
  {addEvent},
)(AddEvent);

const styles = StyleSheet.create({
  _mainScrollview: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    position: 'relative',
  },

  dateTimeTextStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    color: '#803262',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#252525',
    paddingLeft: 10,
    fontSize: 20,
  },
  _textInputEventMoreInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '75%',
    color: '#803262',
    padding: 10,
    marginTop: 10,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#252525',
    marginBottom: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    height: 275,
    width: '90%',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  meetingLogo: {
    width: '100%',
    height: 200,
  },

  eventTitleStyle: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    paddingRight: 30,
    flex: 1,
  },
  _textInputEventTitleStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    color: '#803262',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#252525',
    fontSize: 20,
  },
  eventDateTime: {
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    padding: 5,
    flex: 1,
  },
  eventBriefStyle: {
    width: '100%',
    alignItems: 'center',
    borderBottomColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    padding: 5,
    flex: 1,
  },

  guestCanInviteFriendsStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },

  titleText: {
    color: '#803262',
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 6,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationText: {
    color: '#803262',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#E6E6FA',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mapModalView: {
    width: '90%',
    height: '50%',
    margin: 20,
    backgroundColor: '#E6E6FA',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  placesStyle: {
    width: '90%',
    height: '90%',
    margin: 20,
    backgroundColor: '#E6E6FA',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  openButton: {
    backgroundColor: '#803262',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

let mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {featureType: 'road', elementType: 'geometry', stylers: [{color: '#38414e'}]},
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];
