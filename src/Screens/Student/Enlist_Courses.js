/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Enlist_Courses({ route, navigation }) {
    const [completeCourseList, setCompleteCourseList] = useState([]); //array in which all courseslist will be saved from API
    const [stdEmail, setStdEmail] = useState(''); //hold the email of the Student from AsyncStorage
    const { selectedCourse } = route.params;

    useEffect(() => {
        getgmail();
        getcourses();
    }, []);

    const getgmail = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('std_email');
            if (jsonValue != null) {
                setStdEmail(jsonValue);
                console.log('Getting the email address of student from Asyncstorage => ', jsonValue);
                console.log('----------------------------------------------------------------------------');
            } else {
                console.log('No gmail found in Asyncstorage');
                console.log('----------------------------------------------------------------------------');
            }
        }
        catch (e) {
            console.log(e);
            console.log('----------------------------------------------------------------------------');
        }
    };

    const getcourses = async () => {
        try {
            const response = await fetch(
                'http://192.168.43.231/HouseOfTutors/api/Student/GetCourses',
            );
            const data = await response.json();
            console.log('Result from Getcourses API=> ', data);
            console.table(data);
            console.log('----------------------------------------------------------------------------');
            if (data !== null) {
                const temparray = data.filter(
                    (course) => !selectedCourse.find((c) => c.cname === course.cname)
                );
                setCompleteCourseList(temparray);
                console.log('updated length of total courses is ', temparray.length);
            } else {
                Alert.alert('No Course Found!');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const CourseEnlist = async id => {
        try {
            const response = await fetch(
                `http://192.168.43.231/HouseOfTutors/api/Student/StudentCourseEnlist?semail=${stdEmail}&cid=${id}`,
                {
                    method: 'POST',
                },
            );
            const data = await response.json();
            console.log('Response from Student CourseEnlist API => ', data);
            console.log('----------------------------------------------------------------------------');
            if (data === 'Course Already Enlisted') {
                Alert.alert('Course Already Enlisted!');
            } else {
                Alert.alert(data);
                navigation.navigate('Enlisted_Courses');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View>
            <View style={styles.FList_BM}>
                <FlatList
                    data={completeCourseList}
                    renderItem={({ item }) => (
                        <View style={styles.modal}>
                            {/* <Text style={styles.text}>CID: {item.cid}</Text> */}
                            <Text style={styles.text}>{item.ccode}</Text>
                            <Text style={styles.text}>{item.cname}</Text>
                            <View>
                                <Pressable
                                    style={styles.btn}
                                    onPress={() => {
                                        console.log('course id and email to be passed in enlist course api is ', item.cid, stdEmail);
                                        console.log('----------------------------------------------------------------------------');
                                        CourseEnlist(item.cid);
                                    }}>
                                    <Text style={styles.btn_text}>Add Course</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    modal: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'rgba(40,38,52,0.8)',
        marginHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 10,
    },
    text: {
        color: '#ffffff',
        marginBottom: 5,
        textAlign: 'center',
    },
    btn: {
        backgroundColor: '#FFB22F',
        elevation: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
    },
    btn_text: {
        color: '#000000',
        fontWeight: '600',
    },
    FList_BM: {
        marginBottom: 3,
    },
});
