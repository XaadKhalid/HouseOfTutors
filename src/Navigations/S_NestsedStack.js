/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Finding_Tutor from '../Student/Finding_Tutor';
import S_Courses from '../Student/S_Courses';
import Enlist_Courses from '../Student/Enlist_Courses';
import Enlisted_Courses from '../Student/Enlisted_Courses';

const Stack = createNativeStackNavigator();

export default function S_NestsedStack() {
    return (
        <Stack.Navigator
            initialRouteName="Enlisted_Courses"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="S_Courses" component={S_Courses} />
            <Stack.Screen name="Enlist_Courses" component={Enlist_Courses} />
            <Stack.Screen name="Enlisted_Courses" component={Enlisted_Courses} />
            <Stack.Screen name="Finding_Tutor" component={Finding_Tutor} />
        </Stack.Navigator>
    );
}
