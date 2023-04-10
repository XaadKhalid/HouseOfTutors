/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import T_Fee from '../Tutor/T_Fee';
import T_Teaching from '../Tutor/T_Teaching';
import T_TodayClass from '../Tutor/T_TodayClass';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Foundation';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Notification_Icon from '../Tutor/Notification_Icon';
import Notification_Stack from './Notification_Stack';
import T_Profile from '../Tutor/T_Profile';
import T_NestsedStack from './T_NestsedStack';

export default function T_Bottom_Navigator({ }) {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={({ navigation }) => ({
                headerRight: () => <Notification_Icon navigation={navigation} />,
                headerTitleAlign: 'center',
                tabBarLabelStyle: {
                    color: '#ffffff',
                    fontWeight: 'bold',
                },
                headerStyle: { backgroundColor: '#FFB22F' },
                tabBarInactiveBackgroundColor: '#282634',
                tabBarActiveBackgroundColor: '#677567',
            })}>
            <Tab.Screen
                name="Schedule"
                component={Notification_Stack}
                options={{
                    headerTitle: 'Set/Update Schedule',
                    tabBarIcon: () => {
                        return <Icons name={'calendar-clock'} size={24} color="#FFB22F" />;
                    },
                }}
            />
            <Tab.Screen
                name="Courses"
                component={T_NestsedStack}
                options={{
                    //headerTitle: 'Enlisted',
                    headerShown: false,
                    tabBarIcon: () => {
                        return <Icon name={'book-open'} size={24} color="#FFB22F" />;
                    },
                }}
            />
            <Tab.Screen
                name="Teaching"
                component={T_Teaching}
                options={{
                    headerTitle: 'Courses Teaching',
                    tabBarIcon: () => {
                        return (
                            <Icon2 name={'clipboard-pencil'} size={24} color="#FFB22F" />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Fee"
                component={T_Fee}
                options={{
                    headerTitle: 'Courses Fee',
                    tabBarIcon: () => {
                        return <Icon3 name={'credit-card'} size={24} color="#FFB22F" />;
                    },
                }}
            />
            <Tab.Screen
                name="Today"
                component={T_TodayClass}
                options={{
                    headerTitle: 'Today Classes',
                    tabBarIcon: () => {
                        return <Icon3 name={'chalkboard-teacher'} size={24} color="#FFB22F" />;
                    },
                }}
            />
            <Tab.Screen
                name="Profile"
                component={T_Profile}
                options={{
                    headerTitle: 'Profile',
                    tabBarIcon: () => {
                        return <Icon3 name={'user-graduate'} size={24} color="#FFB22F" />;
                    },
                }}
            />
        </Tab.Navigator>
    );
}
