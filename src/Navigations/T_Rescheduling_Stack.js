/* eslint-disable prettier/prettier */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Rescheduling from '../Screens/Tutor/Rescheduling';
import Classes_List from '../Screens/Tutor/Classes_List';
import Available_Classes from '../Screens/Tutor/Available_Classes';
import MultiClasses_List from '../Screens/Tutor/MultiClasses_List';


const Stack = createNativeStackNavigator();

export default function T_Rescheduling_Stack() {
    return (
        <Stack.Navigator initialRouteName="Rescheduling" screenOptions={{
            headerTitleAlign: 'center',
            headerTintColor: '#FFB22F',
            headerStyle: {
                backgroundColor: '#282634',
            },
        }}>
            <Stack.Screen name="Rescheduling" component={Rescheduling} />
            <Stack.Screen name="Classes_List" component={Classes_List} />
            <Stack.Screen name="Available_Classes" component={Available_Classes} />
            <Stack.Screen name="MultiClasses_List" component={MultiClasses_List} />
        </Stack.Navigator>
    );
}
