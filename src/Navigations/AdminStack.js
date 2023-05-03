/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../Screens/Admin/Dashboard';
import SemesterFee from '../Screens/Admin/SemesterFee';
import CoursesGroup from '../Screens/Admin/CoursesGroup';
import TutorRequest from '../Screens/Admin/TutorRequest';
import AllTutors from '../Screens/Admin/AllTutors';
import EditGroup from '../Screens/Admin/EditGroup';
import AddGroup from '../Screens/Admin/AddGroup';
import CoursesForGroup from '../Screens/Admin/CoursesForGroup';
import AllStudents from '../Screens/Admin/AllStudents';
import Enrollements from '../Screens/Admin/Enrollements';
import AllCourses from '../Screens/Admin/AllCourses';

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
            <Stack.Screen name="AllStudents" component={AllStudents} />
            <Stack.Screen name="AllCourses" component={AllCourses} />
            <Stack.Screen name="Enrollements" component={Enrollements} />
        </Stack.Navigator>
    );
}
