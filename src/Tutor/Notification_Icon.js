/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Notification_Icon({ navigation }) {
    const [counter, setCounter] = useState(2);
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
