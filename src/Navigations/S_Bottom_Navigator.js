/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import S_Profile from '../Student/S_Profile';
import S_Fee from '../Student/S_Fee';
import S_Learning from '../Student/S_Learning';
import S_Shedule from '../Student/S_Shedule';
import S_TodayClass from '../Student/S_TodayClass';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Foundation';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import S_NestsedStack from './S_NestsedStack';

export default function S_Bottom_Navigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarLabelStyle: {
          color: '#ffffff',
          fontWeight: 'bold',
        },
        headerStyle: {
          backgroundColor: '#FFB22F',
        },
        tabBarInactiveBackgroundColor: '#282634',
        tabBarActiveBackgroundColor: '#677567',
      }}>
      <Tab.Screen
        name="Schedule"
        component={S_Shedule}
        options={{
          headerTitle: 'Set/Update Schedule',
          tabBarIcon: () => {
            return <Icons name={'calendar-clock'} size={24} color="#FFB22F" />;
          },
        }}
      />
      <Tab.Screen
        name="Tutor"
        component={S_NestsedStack}
        options={{
          headerTitle: 'Add Courses/Find Tutor',
          tabBarIcon: () => {
            return <Icon name={'book-open'} size={24} color="#FFB22F" />;
          },
        }}
      />
      <Tab.Screen
        name="Learning"
        component={S_Learning}
        options={{
          headerTitle: 'Courses Learning',
          tabBarIcon: () => {
            return <Icon2 name={'clipboard-pencil'} size={24} color="#FFB22F" />;
          },
        }}
      />
      <Tab.Screen
        name="Fees"
        component={S_Fee}
        options={{
          headerTitle: 'Courses Fee',
          tabBarIcon: () => {
            return <Icon3 name={'credit-card'} size={24} color="#FFB22F" />;
          },
        }}
      />
      <Tab.Screen
        name="Today"
        component={S_TodayClass}
        options={{
          headerTitle: 'Today Classes',
          tabBarIcon: () => {
            return <Icon3 name={'chalkboard-teacher'} size={24} color="#FFB22F" />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={S_Profile}
        options={{
          tabBarIcon: () => {
            return <Icon3 name={'user-graduate'} size={24} color="#FFB22F" />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
