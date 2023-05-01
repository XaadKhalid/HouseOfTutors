/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function PDashBoard({ navigation }) {
    return (
        <View>
            <Text>PDashBoard</Text>
            <TouchableOpacity onPress={() => {
                navigation.navigate('ChildDetails');
            }}>
                <Text>Clkck me</Text>
            </TouchableOpacity>
        </View>
    );
}
