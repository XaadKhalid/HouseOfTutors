/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import S_Profile from './S_Profile';
import S_Courses from './S_Courses';
import S_Fee from './S_Fee';
import S_Learning from './S_Learning';
import S_Shedule from './S_Shedule';
import S_TodayClass from './S_TodayClass';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Foundation';
import Icon3 from 'react-native-vector-icons/FontAwesome5';

export default function Std_Screens({ }) {
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
        tabBarActiveBackgroundColor: '#000000',
      }}>
      <Tab.Screen
        name="S_Shedule"
        component={S_Shedule}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => {
            return <Icons name={'calendar-clock'} size={24} color="#FFB22F" />;
          },
        }}
      />
      <Tab.Screen
        name="Courses"
        component={S_Courses}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => {
            return <Icon name={'book-open'} size={24} color="#FFB22F" />;
          },
        }}
      />
      <Tab.Screen
        name="Learning"
        component={S_Learning}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => {
            return <Icon2 name={'clipboard-pencil'} size={24} color="#FFB22F" />;
          },
        }}
      />
      <Tab.Screen
        name="Fee"
        component={S_Fee}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => {
            return <Icon3 name={'credit-card'} size={24} color="#FFB22F" />;
          },
        }}
      />
      <Tab.Screen
        name="Today"
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
