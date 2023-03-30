/* eslint-disable prettier/prettier */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Notification_Details from '../Tutor/Notification_Details';
import Notification_Icon from '../Tutor/Notification_Icon';
import T_Profile from '../Tutor/T_Profile';
import T_Courses from '../Tutor/T_Courses';
import T_Fee from '../Tutor/T_Fee';
import T_Teaching from '../Tutor/T_Teaching';
import T_Shedule from '../Tutor/T_Shedule';
import T_TodayClass from '../Tutor/T_TodayClass';

const Stack = createNativeStackNavigator();

export default function Notification_Stack() {
    return (
        <Stack.Navigator initialRouteName="T_Profile" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Notification_Icon" component={Notification_Icon} />
            <Stack.Screen name="Notification_Details" component={Notification_Details} options={{ headerShown: true }} />
            <Stack.Screen name="T_Courses" component={T_Courses} />
            <Stack.Screen name="T_Fee" component={T_Fee} />
            <Stack.Screen name="T_Shedule" component={T_Shedule} />
            <Stack.Screen name="T_Teaching" component={T_Teaching} />
            <Stack.Screen name="T_TodayClass" component={T_TodayClass} />
            <Stack.Screen name="T_Profile" component={T_Profile} />
        </Stack.Navigator>
    );
}
