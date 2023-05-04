/* eslint-disable prettier/prettier */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import PDashBoard from '../Screens/Parent/PDashBoard';
import ChildDetails from '../Screens/Parent/ChildDetails';

export default function ParentStack() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="PDashBoard" screenOptions={{
            headerTitleAlign: 'center',
            headerTintColor: '#FFB22F',
            headerStyle: {
                backgroundColor: '#282634',
            },
        }} >
            <Stack.Screen name="PDashBoard" component={PDashBoard} options={{ headerBackVisible: false }} />
            <Stack.Screen name="ChildDetails" component={ChildDetails} />
        </Stack.Navigator>
    );
}
