/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Dashboard({ navigation }) {

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
                <TouchableOpacity style={style.buttonn} onPress={() => {
                    navigation.navigate('AllCourses');
                }}>
                    <Text style={style.button_text}>Courses</Text>
                </TouchableOpacity>
            </View>
            <View style={style.RowForButtons}>
                <TouchableOpacity style={style.buttonn} onPress={() => {
                    navigation.navigate('AllStudents');
                }}>
                    <Text style={style.button_text}>Students</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.buttonn} onPress={() => {
                    navigation.navigate('AllTutors');
                }}>
                    <Text style={style.button_text}>Tutors</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.buttonn} onPress={() => {
                    navigation.navigate('Enrollements');
                }}>
                    <Text style={style.button_text}>Enrollements</Text>
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
        backgroundColor: '#FFFFFF',
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
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 500,
    },
    RowForButtons: {
        flexDirection: 'row',
        marginBottom: 10,
    },
});
