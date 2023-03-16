/* eslint-disable prettier/prettier */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
import Icon4 from 'react-native-vector-icons/Entypo';

export default function Std_Screens({}) {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={[{headerShown: true}, {tabBarShowLabel: false}]}>
      <Tab.Screen
        name="S_Shedule"
        component={S_Shedule}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => {
            return <Icons name={'calendar-clock'} size={24} />;
          },
        }}
      />
      <Tab.Screen
        name="Courses"
        component={S_Courses}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => {
            return <Icon name={'book-open'} size={24} />;
          },
        }}
      />
      <Tab.Screen
        name="Learning"
        component={S_Learning}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => {
            return <Icon2 name={'clipboard-pencil'} size={24} />;
          },
        }}
      />
      <Tab.Screen
        name="Fee"
        component={S_Fee}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => {
            return <Icons name={'cash-check'} size={24} />;
          },
        }}
      />
      <Tab.Screen
        name="Today"
        component={S_TodayClass}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => {
            return <Icon3 name={'chalkboard-teacher'} size={24} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={S_Profile}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => {
            return <Icon4 name={'user'} size={24} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
