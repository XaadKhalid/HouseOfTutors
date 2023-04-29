/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoursesGroup from '../Admin/CoursesGroup';
import SemesterFee from '../Admin/SemesterFee';
import Dashboard from '../Admin/Dashboard';
import TutorRequest from '../Admin/TutorRequest';
import AllTutors from '../Admin/AllTutors';
import EditGroup from '../Admin/EditGroup';
import AddGroup from '../Admin/AddGroup';
import CoursesForGroup from '../Admin/CoursesForGroup';

const Stack = createNativeStackNavigator();

export default function AdminStack() {
    return (
        <Stack.Navigator initialRouteName="Dashboard"
            screenOptions={{ headerTitleAlign: 'center' }}
        >
            <Stack.Screen name="Dashboard" component={Dashboard}
                options={{ headerBackVisible: false }}
            />
            <Stack.Screen name="SemesterFee" component={SemesterFee} />
            <Stack.Screen name="CoursesGroup" component={CoursesGroup} />
            <Stack.Screen name="TutorRequest" component={TutorRequest} />
            <Stack.Screen name="AllTutors" component={AllTutors} />
            <Stack.Screen name="EditGroup" component={EditGroup} />
            <Stack.Screen name="AddGroup" component={AddGroup} />
            <Stack.Screen name="CoursesForGroup" component={CoursesForGroup} />
        </Stack.Navigator>
    );
}
