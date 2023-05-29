/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import { GetWithParams } from '../../Api/API_Types';

export default function Notification_Icon({ navigation }) {
    const [counter, setCounter] = useState(0);

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         get_notifications();
    //     }, 1000);
    //     return () => clearInterval(intervalId);
    // }, []);

    useEffect(() => {
        get_notifications();
    }, []);

    const get_notifications = async () => {
        let gmail = await getgmailFormAsync();
        if (gmail !== null) {
            const paramsObject = {
                controller: 'Tutor',
                action: 'GetStudentRequests',
                params: { temail: gmail },
            };
            let response = await GetWithParams(paramsObject);
            if (response !== 'No Requests') {
                setCounter(response.length);
            }
        }
    };

    return (
        <View>
            <View style={style.main_container}>
                <TouchableOpacity onPress={() => navigation.navigate('Notification_Details')}>
                    <Ionicons name="notifications" size={30} color="white" />
                </TouchableOpacity>
                {counter > 0 && (
                    <View style={style.bage_container}>
                        <Text style={style.txt}>{counter}</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    main_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
    },
    bage_container: {
        backgroundColor: 'red',
        borderRadius: 50,
        marginBottom: 25,
        marginRight: 2,
        height: 20,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt: {
        color: 'white',
        fontSize: 12,
    },
});
