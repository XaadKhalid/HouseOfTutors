/* eslint-disable prettier/prettier */
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Profile_Icon({ navigation }) {

    return (
        <View style={style.main_container}>
            <TouchableOpacity onPress={() => navigation.navigate('S_Profile')}>
                <FontAwesome5 name="user-graduate" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    main_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
    },
});
