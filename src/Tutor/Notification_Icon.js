/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Notification_Icon() {
    return (
        <View>
            <View style={style.main_container}>
                <Ionicons name="notifications" size={30} color="black" />
                <View style={style.bage_container}>
                    <Text style={style.txt}>3</Text>
                </View>
            </ View>
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
        height: 25,
        width: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt: {
        color: 'white',
        fontSize: 16,
    },
});
