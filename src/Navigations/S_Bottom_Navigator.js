/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Foundation';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import S_NestsedStack from './S_NestsedStack';
import S_Shedule from '../Screens/Student/S_Shedule';
import S_Learning from '../Screens/Student/S_Learning';
import S_Fee from '../Screens/Student/S_Fee';
import S_TodayClass from '../Screens/Student/S_TodayClass';

export default function S_Bottom_Navigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          color: '#FFFFFF',
          fontSize: 12,
        },
        tabBarInactiveBackgroundColor: '#282634',
        tabBarActiveBackgroundColor: '#677567',
      }}>
      <Tab.Screen
        name="Schedule"
        component={S_Shedule}
        options={{
          headerTitle: 'Student Schedule',
          tabBarIcon: () => {
            return <Icons name={'calendar-clock'} size={24} color="#FFB22F" />;
          },
        }}
      />
      <Tab.Screen
        name="Find Tutor"
        component={S_NestsedStack}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return <MaterialIcons name={'person-search'} size={32} color="#FFB22F" />;
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
        name="Today Class"
        component={S_TodayClass}
        options={{
          headerTitle: 'Today Classes',
          tabBarIcon: () => {
            return <Icon3 name={'chalkboard-teacher'} size={24} color="#FFB22F" />;
          },
        }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={S_Profile}
        options={{
          tabBarIcon: () => {
            return <Icon3 name={'user-graduate'} size={24} color="#FFB22F" />;
          },
        }}
      /> */}
    </Tab.Navigator>
  );
}
