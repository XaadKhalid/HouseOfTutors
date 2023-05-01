/* eslint-disable prettier/prettier */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Notification_Icon from '../Screens/Tutor/Notification_Icon';
import Notification_Details from '../Screens/Tutor/Notification_Details';
import T_TodayClass from '../Screens/Tutor/T_TodayClass';
import T_Profile from '../Screens/Tutor/T_Profile';
import T_Shedule from '../Screens/Tutor/T_Shedule';
import T_Fee from '../Screens/Tutor/T_Fee';
import T_Teaching from '../Screens/Tutor/T_Teaching';

const Stack = createNativeStackNavigator();

export default function Notification_Stack() {
    return (
        <Stack.Navigator initialRouteName="T_Shedule" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Notification_Icon" component={Notification_Icon} />
            <Stack.Screen name="Notification_Details" component={Notification_Details} options={{ headerShown: true }} />
            <Stack.Screen name="T_Fee" component={T_Fee} />
            <Stack.Screen name="T_Shedule" component={T_Shedule} />
            <Stack.Screen name="T_Teaching" component={T_Teaching} />
            <Stack.Screen name="T_TodayClass" component={T_TodayClass} />
            <Stack.Screen name="T_Profile" component={T_Profile} />
        </Stack.Navigator>
    );
}
