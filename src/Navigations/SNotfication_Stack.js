/* eslint-disable prettier/prettier */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Notification_Icon from '../Screens/Student/Notification_Icon';
import S_Fee from '../Screens/Student/S_Fee';
import S_Shedule from '../Screens/Student/S_Shedule';
import S_Learning from '../Screens/Student/S_Learning';
import S_TodayClass from '../Screens/Student/S_TodayClass';
import S_Profile from '../Screens/Student/S_Profile';
import ReScheduleNotification from '../Screens/Student/ReScheduleNotification';

const Stack = createNativeStackNavigator();

export default function SNotfication_Stack() {
    return (
        <Stack.Navigator initialRouteName="S_Shedule" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Notification_Icon" component={Notification_Icon} />
            <Stack.Screen name="ReScheduleNotification" component={ReScheduleNotification} />
            <Stack.Screen name="S_Fee" component={S_Fee} />
            <Stack.Screen name="S_Shedule" component={S_Shedule} />
            <Stack.Screen name="S_Learning" component={S_Learning} />
            <Stack.Screen name="S_TodayClass" component={S_TodayClass} />
            <Stack.Screen name="S_Profile" component={S_Profile} />
        </Stack.Navigator>
    );
}
