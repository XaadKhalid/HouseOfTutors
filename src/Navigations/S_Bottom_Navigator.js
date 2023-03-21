/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import S_Profile from '../Student/S_Profile';
import S_Courses from '../Student/S_Courses';
import S_Fee from '../Student/S_Fee';
import S_Learning from '../Student/S_Learning';
import S_Shedule from '../Student/S_Shedule';
import S_TodayClass from '../Student/S_TodayClass';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Foundation';
import Icon3 from 'react-native-vector-icons/FontAwesome5';

export default function S_Bottom_Navigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#FFB22F',
        },
        tabBarInactiveBackgroundColor: '#6618E7',
        tabBarActiveBackgroundColor: '#1A2421',
      }}>
      <Tab.Screen
        name="Set/Update Schedule"
        component={S_Shedule}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => {
            return <Icons name={'calendar-clock'} size={24} color="#FFB22F" />;
          },
        }}
      />
      <Tab.Screen
        name="Enlisted Courses"
        component={S_Courses}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => {
            return <Icon name={'book-open'} size={24} color="#FFB22F" />;
          },
        }}
      />
      <Tab.Screen
        name="Courses Learning"
        component={S_Learning}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => {
            return <Icon2 name={'clipboard-pencil'} size={24} color="#FFB22F" />;
          },
        }}
      />
      <Tab.Screen
        name="Courses Fee"
        component={S_Fee}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => {
            return <Icon3 name={'credit-card'} size={24} color="#FFB22F" />;
          },
        }}
      />
      <Tab.Screen
        name="Today Classes"
        component={S_TodayClass}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => {
            return <Icon3 name={'chalkboard-teacher'} size={24} color="#FFB22F" />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={S_Profile}
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
