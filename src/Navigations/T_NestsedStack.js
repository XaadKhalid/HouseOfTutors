import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import T_Courses from '../Tutor/T_Courses';

const Stack = createNativeStackNavigator();

export default function T_NestsedStack() {
    return (
        <Stack.Navigator initialRouteName="T_Courses" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="T_Courses" component={T_Courses} />
        </Stack.Navigator>
    );
}