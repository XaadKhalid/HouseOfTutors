/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function AllTutors() {
    return (
        <View style={style.container}>
            <Text>AllTutors</Text>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
