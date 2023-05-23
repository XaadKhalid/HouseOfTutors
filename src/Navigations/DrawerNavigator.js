/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import S_Bottom_Navigator from './S_Bottom_Navigator';
import S_Profile from '../Screens/Student/S_Profile';
import { getUserFormAsync } from '../AsyncStorage/GlobalData';
import ReScheduleNotification from '../Screens/Student/ReScheduleNotification';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    const [name, setName] = useState(null);

    useEffect(() => {
        const getname = async () => {
            let response = await getUserFormAsync();
            if (response !== null) {
                console.log('result is ', response.sname);
                setName(response.sname);
            }
        };
        getname();
    }, []);

    return (
        <Drawer.Navigator screenOptions={{
            headerTitleAlign: 'center',
            headerTintColor: '#FFF',
            headerStyle: {
                backgroundColor: '#282634',
            },
        }}>
            <Drawer.Screen name="Home" component={S_Bottom_Navigator} options={{
                headerTitle: name,
            }} />
            <Drawer.Screen name="Testing Screen" component={ReScheduleNotification} />
            <Drawer.Screen name="Profile" component={S_Profile} />
        </Drawer.Navigator>
    );
}
