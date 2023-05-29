/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import S_NestsedStack from './S_NestsedStack';
import S_Shedule from '../Screens/Student/S_Shedule';
import S_Learning from '../Screens/Student/S_Learning';
import S_Fee from '../Screens/Student/S_Fee';
import S_TodayClass from '../Screens/Student/S_TodayClass';
import Profile_Icon from '../Screens/Student/Profile_Icon';
import Notification_Icon from '../Screens/Student/Notification_Icon';

export default function S_Bottom_Navigator({ navigation }) {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => <Notification_Icon navigation={navigation} />,
        headerLeft: () => <Profile_Icon navigation={navigation} />,
        headerTitleAlign: 'center',
        headerTintColor: '#FFF',
        headerTitle: 'Student',
        tabBarActiveTintColor: '#FFB22F',
        tabBarInactiveTintColor: '#FFF',
        tabBarStyle: { backgroundColor: '#282634' },
        headerStyle: { backgroundColor: '#282634' },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}>
      <Tab.Screen
        name="Schedule"
        component={S_Shedule}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-clock" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Find Tutor"
        component={S_NestsedStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person-search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Learning"
        component={S_Learning}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Foundation name="clipboard-pencil" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Fees"
        component={S_Fee}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="credit-card" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Today Class"
        component={S_TodayClass}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="chalkboard-teacher" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
