/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Enlist_Courses from '../Screens/Student/Enlist_Courses';
import Enlisted_Courses from '../Screens/Student/Enlisted_Courses';
import Finding_Tutor from '../Screens/Student/Finding_Tutor';

const Stack = createNativeStackNavigator();

export default function S_NestsedStack() {
    return (
        <Stack.Navigator
            initialRouteName="Enlisted_Courses"
            screenOptions={{ headerTitleAlign: 'center' }}>
            <Stack.Screen name="Enlist_Courses" component={Enlist_Courses} />
            <Stack.Screen name="Enlisted_Courses" component={Enlisted_Courses} />
            <Stack.Screen name="Finding_Tutor" component={Finding_Tutor} />
        </Stack.Navigator>
    );
}
