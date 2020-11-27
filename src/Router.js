import React from 'react';
import {Router, Stack, Scene, Tabs } from 'react-native-router-flux';
import Login from './routes/auth/Login';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import DocMain from "./routes/Doc/DocMain";
import EventsMain from "./routes/Events/EventsMain";
import Flow from "./routes/Flow/Flow";
import Chat from "./routes/Flow/ChatRoom/Chat"

import Create from "./routes/Flow/Create";
import Profile from "./routes/Profile/Profile";
import AddImageVideoText from "./routes/Flow/PostTypes/AddImageVideoText";
import AddPoll from "./routes/Flow/PostTypes/AddPoll";
import FavoritePosts from "./routes/Profile/FavoritePosts";
import AddEvent from "./routes/Events/AddEvent";
import RecordVideo from "./routes/Flow/PostTypes/RecordVideo";
import Myfeedbacks from "./routes/Profile/Myfeedbacks";
import OpenVideo from './routes/Doc/OpenVideo';
import NotificationSettings from './routes/Profile/NotificationSettings';
import MyRewards from './routes/Profile/MyRewards';
import RecentActivities from './routes/Profile/RecentActivities';
import ToDo from './routes/Profile/ToDo';

const EventsIcon = ({icon, focused}) => <Icon name="calendar-check-o" size={25} color={focused ? '#803262' : 'grey'}/>;
const ProfileIcon = ({icon, focused}) => <Icon name="user" size={25} color={focused ? '#803262' : 'grey'}/>;
const FlowIcon = ({icon, focused}) => <Icon name="leaf" size={25} color={focused ? '#803262' : 'grey'}/>;
const DocIcon = ({icon, focused}) => <Icon name="file" size={25} color={focused ? '#803262' : 'grey'}/>;
const ChatIcon = ({icon, focused}) => <Icon name="wechat" size={25} color={focused ? '#803262' : 'grey'}/>;



const RouterComponent = () => (
    <Router >
        <Stack key="root">
            <Stack key="auth" hideNavBar>
                <Scene key="login" component={Login} />
            </Stack>
            <Stack key="app" hideNavBar panHandlers={null} >
                <Tabs showLabel={true}  inactiveTintColor="grey" activeTintColor='#803262' tabBarStyle={{ backgroundColor: 'transparent'}}>
                    <Scene key="Events" component={EventsMain} icon={EventsIcon} hideNavBar/>
                    <Scene key="Flow" component={Flow} initial={true} icon={FlowIcon}  hideNavBar/>
                    <Scene key="Doc" component={DocMain} icon={DocIcon} hideNavBar/>
                    <Scene key="Chat" component={Chat} icon={ChatIcon} hideNavBar />
                    <Scene key="Profile" component={Profile} icon={ProfileIcon} hideNavBar />
                </Tabs>
                <Scene key="Create" component={Create} />
                <Scene key="login" component={Login} />
                <Scene key="AddImageVideoText" component={AddImageVideoText} />
                <Scene key="AddPoll" component={AddPoll} />
                <Scene key="ChatRoom" component={Chat} />
                <Scene key="Flow" component={Flow} hideNavBar/>
                <Scene key="FavoritePosts" component={FavoritePosts} hideNavBar/>
                <Scene key="AddEvent" component={AddEvent} hideNavBar/>
                <Scene key="RecordVideo" component={RecordVideo} hideNavBar/>
                <Scene key="Myfeedbacks" component={Myfeedbacks} hideNavBar/>
                <Scene key="OpenVideo" component={OpenVideo} hideNavBar/>
                <Scene key="NotificationSettings" component={NotificationSettings} hideNavBar/>
                <Scene key="MyRewards" component={MyRewards} hideNavBar/>
                <Scene key="RecentActivities" component={RecentActivities} hideNavBar/>
                <Scene key="ToDo" component={ToDo} hideNavBar />
            </Stack>
        </Stack>
    </Router>
);

export default RouterComponent;
