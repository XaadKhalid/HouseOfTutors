/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard({ navigation }) {
    const isFocused = useIsFocused();

    useEffect(() => {
        if (useIsFocused) {
            const getSelectedItems = async () => {
                const selectedItemsString = await AsyncStorage.getItem('selectedCourse');
                const selectedItems = JSON.parse(selectedItemsString);
                if (selectedItems !== null) {
                    console.log('I get this data from aysncstorage when DBscreen renders', selectedItems);
                }
            };
            getSelectedItems();
        }
    }, [isFocused]);

    return (
        <View style={style.container}>
            <View style={style.RowForButtons}>
                <TouchableOpacity style={style.buttonn} onPress={() => {
                    navigation.navigate('CoursesGroup');
                }}>
                    <Text style={style.button_text}>CoursesGroup</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.buttonn} onPress={() => {
                    navigation.navigate('SemesterFee');
                }}>
                    <Text style={style.button_text}>SemesterFee</Text>
                </TouchableOpacity>
            </View>
            <View style={style.RowForButtons}>
                <TouchableOpacity style={style.buttonn} onPress={() => {
                    navigation.navigate('AllStudents');
                }}>
                    <Text style={style.button_text}>AllStudents</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.buttonn} onPress={() => {
                    navigation.navigate('AllTutors');
                }}>
                    <Text style={style.button_text}>AllTutors</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonn: {
        backgroundColor: '#4C4B49',
        width: '30%',
        elevation: 3,
        paddingVertical: 40,
        borderRadius: 4,
        marginHorizontal: 5,
    },
    button_text: {
        color: '#FFB22F',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    RowForButtons: {
        flexDirection: 'row',
        marginBottom: 10,
    },
});
