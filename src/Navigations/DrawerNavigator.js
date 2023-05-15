/* eslint-disable prettier/prettier */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import S_Bottom_Navigator from './S_Bottom_Navigator';
import ReScheduleNotification from '../Screens/Student/ReScheduleNotification';
import S_Profile from '../Screens/Student/S_Profile';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator screenOptions={{
            headerTitleAlign: 'center',
            headerTintColor: '#FFF',
            headerStyle: {
                backgroundColor: '#282634',
            },
        }}>
            <Drawer.Screen name="Home" component={S_Bottom_Navigator} options={{
                headerTitle: 'Saad Khalid',
            }} />
            <Drawer.Screen name="Schedule Requests" component={ReScheduleNotification} />
            <Drawer.Screen name="Profile" component={S_Profile} />
        </Drawer.Navigator>
    );
}
