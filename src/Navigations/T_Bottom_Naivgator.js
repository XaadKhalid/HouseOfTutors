/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import T_Fee from '../Tutor/T_Fee';
import T_Teaching from '../Tutor/T_Teaching';
import T_Shedule from '../Tutor/T_Shedule';
import T_TodayClass from '../Tutor/T_TodayClass';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Foundation';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Notification_Icon from '../Tutor/Notification_Icon';
import Notification_Stack from './Notification_Stack';
import T_Courses from '../Tutor/T_Courses';

export default function T_Bottom_Navigator({ }) {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={({ navigation }) => ({
                headerRight: () => <Notification_Icon navigation={navigation} />,
                headerShown: true,
                tabBarShowLabel: false,
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#FFB22F' },
                tabBarInactiveBackgroundColor: '#6618E7',
                tabBarActiveBackgroundColor: '#1A2421',
            })}>
            <Tab.Screen
                name="Set/Update Schedule"
                component={T_Shedule}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => {
                        return <Icons name={'calendar-clock'} size={24} color="#FFB22F" />;
                    },
                }}
            />
            <Tab.Screen
                name="Enlisted Courses"
                component={T_Courses}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => {
                        return <Icon name={'book-open'} size={24} color="#FFB22F" />;
                    },
                }}
            />
            <Tab.Screen
                name="Courses Teaching"
                component={T_Teaching}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => {
                        return (
                            <Icon2 name={'clipboard-pencil'} size={24} color="#FFB22F" />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Courses Fee"
                component={T_Fee}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => {
                        return <Icon3 name={'credit-card'} size={24} color="#FFB22F" />;
                    },
                }}
            />
            <Tab.Screen
                name="Today Classes"
                component={T_TodayClass}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => {
                        return (
                            <Icon3 name={'chalkboard-teacher'} size={24} color="#FFB22F" />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Notification_Stack}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => {
                        return <Icon3 name={'user-graduate'} size={24} color="#FFB22F" />;
                    },
                }}
            />
        </Tab.Navigator>
    );
}
