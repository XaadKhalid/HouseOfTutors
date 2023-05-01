/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddCourse from '../Tutor/AddCourse';
import EnlistedCourses from '../Screens/Tutor/EnlistedCourse';
import EnlistCourses from '../Screens/Tutor/EnlistCourses';

const Stack = createNativeStackNavigator();

export default function T_NestsedStack() {
    return (
        <Stack.Navigator
            initialRouteName="EnlistedCourses"
            screenOptions={{ headerTitleAlign: 'center' }}>
            <Stack.Screen name="EnlistedCourses" component={EnlistedCourses} />
            <Stack.Screen name="EnlistCourses" component={EnlistCourses} />
            <Stack.Screen name="AddCourse" component={AddCourse} />
        </Stack.Navigator>
    );
}
