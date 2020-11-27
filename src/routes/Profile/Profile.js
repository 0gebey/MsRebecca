import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Header from '../../common-components/Header';
import {connect} from 'react-redux';
import {logoutUser, isUserLogged} from '../../actions/AuthActions';
import {fetchProfile} from '../../actions/ProfileActions';

import Personalinformations from './ProfileComponents/Personalinformations';
import RNFetchBlob from 'react-native-fetch-blob';
import ProfileImage from './ProfileComponents/ProfileImage';

import MyLoadingView from '../../common-components/MyLoadingView';
import ProfileCover from './ProfileComponents/ProfileCover';
import MyButton from '../../common-components/MyButton';
import {Actions} from 'react-native-router-flux';

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

class Profile extends Component {
  state = {
    baslik: 'Profile',
    userpic: '',
    name: '',
    surname: '',
    gender: '',
    age: '',
    position: '',
    department: '',
  };

  componentWillMount() {
    this.props.fetchProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        name: nextProps.profile.profile.name,
        surname: nextProps.profile.profile.surname,
        gender: nextProps.profile.profile.gender,
        age: nextProps.profile.profile.age,
        position: nextProps.profile.profile.position,
        department: nextProps.profile.profile.department,
        userpic: nextProps.profile.profile.photo,
      });
    }
  }

  renderHeader = () => {
    return (
      <Header
        headerBaslik={'Profil'}
        headerRightButtonClick={this.onPressLogout}
        headerRightButtonExist={true}
        headerRightIconName={'md-log-out'}
        headerRightIconSize={22}
        headerLeftButtonExist={false}
      />
    );
  };

  onPressLogout = () => {
    this.props.logoutUser();
  };
  goToFavoritePosts = () => {
    Actions.FavoritePosts();
  };
  goToFeedback = () => {
    Actions.Myfeedbacks();
  };
  goToNotificationSettings = () => {
    Actions.NotificationSettings();
  };
  goToMyRewards = () => {
    Actions.MyRewards();
  };
  goToRecentActivities = () => {
    Actions.RecentActivities();
  };
  goToToDo = () => {
    Actions.ToDo();
  }
  renderProfileView() {
    return (
      <View>
        <View style={{width: windowWidth, height: windowHeight / 4}}>
          <ProfileImage profileImageUri={this.state.userpic} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: windowWidth,
            height: windowHeight / 7,
          }}>
          <Personalinformations
            varbaslik={'Name'}
            vartitle={this.state.name}
            myPInfoIcon={'md-person'}
          />
          <Personalinformations
            varbaslik={'Surname'}
            vartitle={this.state.surname}
            iconControlState={true}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: windowWidth,
            height: windowHeight / 7,
          }}>
          <Personalinformations
            varbaslik={'Gender'}
            vartitle={this.state.gender}
            myPInfoIcon={'md-transgender'}
          />
          <Personalinformations
            varbaslik={'Age'}
            vartitle={this.state.age}
            myPInfoIcon={'ios-flag'}
          />
        </View>
        <View style={{width: windowWidth, height: windowHeight / 7}}>
          <Personalinformations
            varbaslik={'Position'}
            vartitle={this.state.position}
            myPInfoIcon={'md-folder'}
          />
        </View>
        <View style={{width: windowWidth, height: windowHeight / 7}}>
          <Personalinformations
            varbaslik={'Department'}
            vartitle={this.state.department}
            myPInfoIcon={'md-git-network'}
          />
        </View>
      </View>
    );
  }

  renderProfileCover() {
    return (
      <ProfileCover
        profileImageUri={this.state.userpic}
        profileCoverName={this.state.name}
        profileCoverSurname={this.state.surname}
        profileCoverYas={this.state.age}
        profileCoverCinsiyet={this.state.gender}
        profileCoverDepartman={this.state.department}
        profileCoverPozisyon={this.state.position}
      />
    );
  }

  renderProfileSections() {
    return (
      <View>
        <MyButton
          myButtonText={'About me'}
          buttonTextColor={'#803262'}
          myButtonWidth={windowWidth}
          myButtonHeight={40}
          myButtonPadHorizontal={10}
          willThereIcon={true}
          myButtonIconName={'ios-person'}
          myButtonIconColor={'#803262'}
        />
        <MyButton
          myButtonText={'Favorite Posts'}
          onClickMyButton={this.goToFavoritePosts}
          buttonBackgroundColor={'transparent'}
          buttonTextColor={'#803262'}
          myButtonWidth={windowWidth}
          myButtonHeight={40}
          myButtonPadHorizontal={10}
          willThereIcon={true}
          myButtonIconName={'md-star'}
          myButtonIconColor={'#803262'}
        />

        <MyButton
          myButtonText={'My requests'}
          buttonBackgroundColor={'transparent'}
          buttonTextColor={'#803262'}
          myButtonWidth={windowWidth}
          myButtonHeight={40}
          myButtonPadHorizontal={10}
          willThereIcon={true}
          myButtonIconName={'ios-return-right'}
          myButtonIconColor={'#803262'}
        />
        <MyButton
          onClickMyButton={this.goToMyRewards}
          myButtonText={'My rewards'}
          buttonBackgroundColor={'transparent'}
          buttonTextColor={'#803262'}
          myButtonWidth={windowWidth}
          myButtonHeight={40}
          myButtonPadHorizontal={10}
          willThereIcon={true}
          myButtonIconName={'md-trophy'}
          myButtonIconColor={'#803262'}
        />
        <MyButton
          onClickMyButton={this.goToFeedback}
          myButtonText={'My feedbacks'}
          buttonBackgroundColor={'transparent'}
          buttonTextColor={'#803262'}
          myButtonWidth={windowWidth}
          myButtonHeight={40}
          myButtonPadHorizontal={10}
          willThereIcon={true}
          myButtonIconName={'md-thumbs-up'}
          myButtonIconColor={'#803262'}
        />
        <MyButton
          onClickMyButton={this.goToRecentActivities}
          myButtonText={'Recent Activities'}
          buttonBackgroundColor={'transparent'}
          buttonTextColor={'#803262'}
          myButtonWidth={windowWidth}
          myButtonHeight={40}
          myButtonPadHorizontal={10}
          willThereIcon={true}
          myButtonIconName={'md-move'}
          myButtonIconColor={'#803262'}
        />
        <MyButton
          myButtonText={'Notification Settings'}
          buttonBackgroundColor={'transparent'}
          buttonTextColor={'#803262'}
          myButtonWidth={windowWidth}
          myButtonHeight={40}
          myButtonPadHorizontal={10}
          willThereIcon={true}
          myButtonIconName={'md-notifications'}
          myButtonIconColor={'#803262'}
          onClickMyButton={this.goToNotificationSettings}
        />
          <MyButton
          myButtonText={'To-Do List'}
          buttonBackgroundColor={'transparent'}
          buttonTextColor={'#803262'}
          myButtonWidth={windowWidth}
          myButtonHeight={40}
          myButtonPadHorizontal={10}
          willThereIcon={true}
          myButtonIconName={'md-clock'}
          myButtonIconColor={'#803262'}
          onClickMyButton={this.goToToDo}
        />
      </View>
    );
  }

  renderProfileAppSections() {
    return (
      <View style={{marginTop: 25}}>
        <MyButton
          myButtonText={'About'}
          buttonBackgroundColor={'transparent'}
          buttonTextColor={'#803262'}
          myButtonWidth={windowWidth}
          myButtonHeight={40}
          myButtonPadHorizontal={10}
          willThereIcon={true}
          myButtonIconName={'ios-information-circle-outline'}
          myButtonIconColor={'#803262'}
        />
        <MyButton
          myButtonText={'Security'}
          buttonBackgroundColor={'transparent'}
          buttonTextColor={'#803262'}
          myButtonWidth={windowWidth}
          myButtonHeight={40}
          myButtonPadHorizontal={10}
          willThereIcon={true}
          myButtonIconName={'ios-aperture'}
          myButtonIconColor={'#803262'}
        />
        <MyButton
          myButtonText={'Help'}
          buttonBackgroundColor={'transparent'}
          buttonTextColor={'#803262'}
          myButtonWidth={windowWidth}
          myButtonHeight={40}
          myButtonPadHorizontal={10}
          willThereIcon={true}
          myButtonIconName={'ios-help-circle-outline'}
          myButtonIconColor={'#803262'}
        />
      </View>
    );
  }

  render() {
    let backgroundImage = require('../../common-components/background.jpg');
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        {this.renderHeader()}
        <ScrollView
          contentContainerStyle={styles._mainScrollview}
          scrollEventThrottle={200}
          directionalLockEnabled={true}>
          {this.renderProfileCover()}
          {this.renderProfileSections()}
          {this.renderProfileAppSections()}
        </ScrollView>
        {this.props.profile.loadingProfile ? <MyLoadingView /> : null}
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  {fetchProfile, logoutUser, isUserLogged},
)(Profile);

const styles = StyleSheet.create({
  _mainScrollview: {
    alignItems: 'center',
    width: windowWidth,
  },
  ScrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderSeparator: {
    height: 0.6,
    width: windowWidth,
    backgroundColor: 'grey',
  },
  backgroundImage: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
    position: 'relative',
  },
});
