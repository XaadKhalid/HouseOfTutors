/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Notification_Icon({ navigation }) {
    const [counter, setCounter] = useState(0);
    const [tEmail, setTEmail] = useState('');

    useEffect(() => {
        getgmail();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (tEmail !== '') {
                get_notifications();
            }
        }, 2000);
        return () => clearInterval(intervalId);
    }, [tEmail]);


    const getgmail = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('std_email');
            if (jsonValue != null) {
                setTEmail(jsonValue);
                console.log('Getting the email address of tutor from Asyncstorage => ', jsonValue);
                console.log('----------------------------------------------------------------------------');
            } else {
                console.log('No gmail found in Asyncstorage');
                console.log('----------------------------------------------------------------------------');
            }
        } catch (e) {
            console.log(e);
            console.log('----------------------------------------------------------------------------');
        }
    };

    const get_notifications = async () => {
        try {
            const response = await fetch(
                `http://192.168.43.231/HouseOfTutors/api/Tutor/GetStudentRequests?temail=${tEmail}`,
            );
            const data = await response.json();
            console.log('data from get notifications', data);
            console.log('----------------------------------------------------------------------------');
            if (data !== 'No Requests') {
                setCounter(data.length);
            }
        } catch (error) {
            console.log(error);
            console.log('----------------------------------------------------------------------------');
        }
    };

    return (
        <View>
            <View style={style.main_container}>
                <TouchableOpacity onPress={() => navigation.navigate('Notification_Details')}>
                    <Ionicons name="notifications" size={30} color="black" />
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
        fontSize: 13,
    },
});
