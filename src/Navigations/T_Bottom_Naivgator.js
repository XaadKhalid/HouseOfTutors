/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import T_Fee from '../Screens/Tutor/T_Fee';
import T_Teaching from '../Screens/Tutor/T_Teaching';
import T_TodayClass from '../Screens/Tutor/T_TodayClass';
import Notification_Icon from '../Screens/Tutor/Notification_Icon';
import Notification_Stack from './Notification_Stack';
import T_NestsedStack from './T_NestsedStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Profile_Icon from '../Screens/Tutor/Profile_Icon';
import Rescheduling from '../Screens/Tutor/Rescheduling';

export default function T_Bottom_Navigator({ }) {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={({ navigation }) => ({
                headerRight: () => <Notification_Icon navigation={navigation} />,
                headerLeft: () => <Profile_Icon navigation={navigation} />,
                headerTitleAlign: 'center',
                headerTintColor: '#FFF',
                headerTitle: 'Tutors',
                tabBarActiveTintColor: '#FFB22F',
                tabBarInactiveTintColor: '#FFF',
                tabBarStyle: { backgroundColor: '#282634' },
                headerStyle: { backgroundColor: '#282634' },
                tabBarLabelStyle: {
                    fontSize: 12,
                },
            })}>
            <Tab.Screen
                name="Schedule"
                component={Notification_Stack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="calendar-clock" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Courses"
                component={T_NestsedStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="book-open" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Teaching"
                component={T_Teaching}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Foundation name="clipboard-pencil" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Fee"
                component={T_Fee}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="credit-card" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Today Class"
                component={T_TodayClass}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="chalkboard-teacher" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Reschedule"
                component={Rescheduling}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="back-in-time" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
