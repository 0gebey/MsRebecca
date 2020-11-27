import React, {Component} from 'react';
import {
    Dimensions,
    Platform,
    TouchableOpacity,
    Alert,
    ImageBackground,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Header from "../../common-components/Header";
import {Actions} from "react-native-router-flux";
import _ from 'lodash';
import {AgendaList, ExpandableCalendar, CalendarProvider} from 'react-native-calendars';
import Icon from "react-native-vector-icons/FontAwesome5";
import Modal from 'react-native-modalbox';
import MapView from 'react-native-maps';
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;
const initialRegion = {
    latitude: 38.423733,
    longitude: 27.142826,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

function getFutureDates(days) {
    const array = [];
    for (let index = 1; index <= days; index++) {
        const date = new Date(Date.now() + (864e5 * index)); // 864e5 == 86400000 == 24*60*60*1000
        const dateString = date.toISOString().split('T')[0];
        array.push(dateString);
    }
    return array;
}

function getPastDate(days) {
    return new Date(Date.now() - (864e5 * days)).toISOString().split('T')[0];
}

const ITEMS = [
    {title: dates[0], data: [{hour: '12am', duration: '1h', title: 'Networking Conferences'}]},
    {
        title: dates[1],
        data: [{hour: '4pm', duration: '1h', title: 'Corporate Seminar'},
            {
                hour: '5pm', duration: '1h', title: 'Trade Show',
            }],
    },
    {
        title: dates[2],
        data: [{hour: '1pm', duration: '1h', title: 'Golf Event'}, {
            hour: '2pm',
            duration: '1h',
            title: 'Deep Streches',
        }, {hour: '3pm', duration: '1h', title: 'Team-building'}],
    },
    {title: dates[3], data: [{hour: '12am', duration: '1h', title: 'Ashtanga Yoga'}]},
    {title: dates[4], data: [{}]},
    {
        title: dates[5],
        data: [{hour: '9pm', duration: '1h', title: 'Executive Program'}, {
            hour: '10pm',
            duration: '1h',
            title: 'Technology Speeches',
        }, {hour: '11pm', duration: '1h', title: 'TRX'}, {hour: '12pm', duration: '1h', title: 'Running Group'}],
    },
    {title: dates[6], data: [{hour: '12am', duration: '1h', title: 'Design Workshop'}]},
    {title: dates[7], data: [{}]},
    {
        title: dates[8],
        data: [{hour: '9pm', duration: '1h', title: 'Appreciation Event'}, {
            hour: '10pm',
            duration: '1h',
            title: 'Company and Organization Milestones Evaluation',
        }, {hour: '11pm', duration: '1h', title: 'TRX'}, {hour: '12pm', duration: '1h', title: 'Running Group'}],
    },
    {
        title: dates[9],
        data: [{hour: '1pm', duration: '1h', title: 'Product Launch'}, {
            hour: '2pm',
            duration: '1h',
            title: 'Board Meeting',
        }, {hour: '3pm', duration: '1h', title: 'Shareholder Meeting'}],
    },
    {title: dates[10], data: [{hour: '12am', duration: '1h', title: 'Basketball & Picnic'}]},
];

export default class EventsMain extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            isDisabled: false,
            swipeToClose: false,
            sliderValue: 0.3,
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
            },

        };
    }

    componentDidMount() {
        this.getCurrentPosition();
    }

    getCurrentPosition() {
        try {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const region = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    };
                    this.setState({region});
                },
            );
        } catch (e) {
            console.log('basarisiz');
        }
    };


    onClose() {
        console.log('Modal just closed');
    }

    onOpen() {
        console.log('Modal just opened');
    }

    onClosingState(state) {
        console.log('the open/close of the swipeToClose just changed');
    }

    onPressGoAddEvent = () => {
        Actions.AddEvent()
    };

    setRegion = (region) => {
        if (this.map) {
            this.map.animateToRegion(this.state.region, 3000);
        }

        this.setState({region, iconClicked: true});
    };

    onDayPress(day) {
        this.setState({
            selected: day.dateString,
        });
    }

    buttonPressed() {
        Alert.alert('show more');
    }

    itemPressed(id) {
        Alert.alert(id);
    }

    renderEmptyItem() {
        return (
            <View style={styles.emptyItem}>
                <Text style={styles.emptyItemText}>No Events Planned</Text>
            </View>
        );
    }

    renderItem = ({item}) => {
        if (_.isEmpty(item)) {
            return this.renderEmptyItem();
        }

        return (
            <TouchableOpacity
                onPress={() => this.itemPressed(item.title)}
                style={styles.item}
            >
                <View>
                    <Text style={styles.itemHourText}>{item.hour}</Text>
                    <Text style={styles.itemDurationText}>{item.duration}</Text>
                </View>
                <Text style={styles.itemTitleText}>{item.title}</Text>
                <TouchableOpacity onPress={() => this.modal.open()} style={styles.btn}>
                    <View style={styles.itemButtonContainer}>
                        <Icon name="search-location" size={22} color={'#803262'}/>
                    </View>
                </TouchableOpacity>


            </TouchableOpacity>
        );
    };
    getTheme = () => {
        const themeColor = '#E04A1A';
        const lightThemeColor = '#FF7E55';
        const disabledColor = '#EEEEEE';
        const black = '#803262';
        const white = 'white';

        return {
            // arrows
            arrowColor: black,
            arrowStyle: {padding: 0},
            // month
            monthTextColor: black,
            textMonthFontSize: 16,
            textMonthFontFamily: 'HelveticaNeue',
            textMonthFontWeight: 'bold',
            // day names
            textSectionTitleColor: black,
            textDayHeaderFontSize: 12,
            textDayHeaderFontFamily: 'HelveticaNeue',
            textDayHeaderFontWeight: 'normal',
            // today
            todayBackgroundColor: lightThemeColor,
            todayTextColor: themeColor,
            // dates
            dayTextColor: themeColor,
            textDayFontSize: 18,
            textDayFontFamily: 'HelveticaNeue',
            textDayFontWeight: '500',
            textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
            // selected date
            selectedDayBackgroundColor: themeColor,
            selectedDayTextColor: white,
            // disabled date
            textDisabledColor: disabledColor,
            // dot (marked date)
            dotColor: themeColor,
            selectedDotColor: white,
            disabledDotColor: disabledColor,
            dotStyle: {marginTop: -2},
        };
    };
    getMarkedDates = () => {
        const marked = {};
        ITEMS.forEach(item => {
            // only mark dates with data
            if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
                marked[item.title] = {marked: true};
            }
        });
        return marked;
    };
    renderHeader = () => {
        return <Header headerBaslik={"Events"}
                       headerRightButtonClick={this.onPressGoAddEvent}
                       headerRightButtonExist={true}
                       headerRightIconName={"ios-add"}
                       headerRightIconSize={35}
                       headerLeftButtonExist={false}/>
            ;
    };

    render() {
        let backgroundImage = require("../../common-components/background.jpg");
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                {this.renderHeader()}
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <CalendarProvider
                        date={ITEMS[0].title}
                        onDateChanged={this.onDateChanged}
                        onMonthChange={this.onMonthChange}
                        theme={{todayButtonTextColor: '#803262'}}
                        showTodayButton
                        disabledOpacity={0.6}
                    >
                        <ExpandableCalendar
                            onDayPress={(day) => {
                                alert('selected day', day)
                            }}
                            disablePan={false}
                            disableWeekScroll={true}
                            firstDay={1}
                            initialPosition={ExpandableCalendar.positions.CLOSED}
                            markedDates={this.getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
                            theme={this.getTheme()}
                            calendarStyle={styles.calendar}
                            // headerStyle={styles.calendarHeader} // for horizontal only

                        />
                            <AgendaList
                                sections={ITEMS}
                                extraData={this.state}
                                renderItem={this.renderItem}
                                sectionStyle={styles.section}
                                // alwaysRenderEmptyDates={true}
                            />
                    </CalendarProvider>
                </View>

                <Modal
                    style={[styles.modal, styles.modal1]}
                    ref={modal => {
                        this.modal = modal;
                    }}
                    swipeToClose={false}
                    onClosed={this.onClose}
                    onOpened={this.onOpen}
                    onClosingState={this.onClosingState}>
                    <MapView
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        style={StyleSheet.absoluteFill}/>
                    <TouchableOpacity onPress={() => this.modal.close()}
                                      style={{
                                          flex: 1,
                                          position: 'absolute',
                                          justifyContent: 'center',
                                          left: 20,
                                          top: 20
                                      }}>
                        <View>
                            <Icon name="times" size={22} color={'#04A5F5'}/>
                        </View>
                    </TouchableOpacity>
                    {/*<TouchableOpacity onPress={this.setRegion}
                                      style={{
                                          flex: 1,
                                          position: 'absolute',
                                          justifyContent: 'center',
                                          right: 20,
                                          top: 20
                                      }}>
                        <View>
                            <Icon name="location-arrow" size={22} color={'#04A5F5'}/>
                        </View>
                    </TouchableOpacity>*/}
                </Modal>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    _mainScrollview: {
        alignItems: 'center',
        width: windowWidth
    },
    btn: {
        backgroundColor: "transparent",
        color: "white",
        flex: 1,
    },
    modal: {
        position:'absolute',
        zIndex: 9999,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal1: {
        marginTop: windowHeight / 9,
        height: '55%',
        width: '90%'
    },
    ScrollContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    renderSeparator: {
        height: 0.6,
        width: windowWidth,
        backgroundColor: "grey",
    },
    backgroundImage: {
        flex: 1,
        // remove width and height to override fixed static size
        width: null,
        height: null,
        position: 'relative'
    },
    text: {
        textAlign: 'center',
        borderColor: '#bbb',
        padding: 10,
        backgroundColor: '#eee',
    },
    container: {
        backgroundColor: 'transparent',
    },
    calendar: {
        position:'relative',
        backgroundColor: 'transparent',
        paddingLeft: 15,
        paddingRight: 15,
    },
    calendarHeader: {
        justifyContent: 'center'
    },
    section: {
        paddingTop: 7,
        backgroundColor: 'white',
        color: '#803262',
    },
    item: {
        padding: 15,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: '#c09455',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    itemHourText: {
        color: 'black',
    },
    itemDurationText: {
        color: 'grey',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
    itemTitleText: {
        color: 'black',
        marginLeft: 16,
        fontWeight: 'bold',
        fontSize: 16,
    },
    itemButtonContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    emptyItem: {
        paddingLeft: 20,
        height: 52,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#c09455',
    },
    emptyItemText: {
        color: '#79838a',
        fontSize: 14,
    },
})
