/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from 'react-native-dialog';
import DialogInput from 'react-native-dialog/lib/Input';
import Entypo from 'react-native-vector-icons/Entypo';

export default function Enlisted_Courses({ navigation }) {
    const [selectedCourse, setSelectedCourse] = useState([]);
    const [stdEmail, setStdEmail] = useState('');
    const [visible, setVisible] = useState(false);
    const [numOfSlots, setNumOfSlots] = useState(0);
    const [courseId, setCourseId] = useState(0);

    useEffect(() => {
        if (stdEmail !== '') {
            console.log('Email address against which courses are fetched is ', stdEmail);
            getEnlistedCourses();
        }
    }, [stdEmail]);

    // useEffect(() => {
    //     if (selectedCourse !== []) {
    //         console.log('No courses added yet!');
    //         getEnlistedCourses();
    //     }
    // }, [selectedCourse]);

    useEffect(() => {
        getgmail();
    }, []);

    const getgmail = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('std_email');
            if (jsonValue != null) {
                setStdEmail(jsonValue);
                console.log(
                    'Getting the email address of student from Asyncstorage => ',
                    jsonValue,
                );
                console.log(
                    '----------------------------------------------------------------------------',
                );
            } else {
                console.log('No gmail found in Asyncstorage');
                console.log(
                    '----------------------------------------------------------------------------',
                );
            }
        } catch (e) {
            console.log(e);
            console.log(
                '----------------------------------------------------------------------------',
            );
        }
    };

    const getEnlistedCourses = async () => {
        try {
            const response = await fetch(
                `http://192.168.43.231/HouseOfTutors/api/Student/GetStudentEnlist?semail=${stdEmail}`,
            );
            const data = await response.json();
            console.log('Result from getEnlistedCourses API =>', data);
            console.log(
                '----------------------------------------------------------------------------',
            );
            if (data.length > 0) {
                setSelectedCourse(data);
            } else {
                Alert.alert('No courses Enlisted pleae Press Add to Enlist Course');
                console.log('No courses added yet');
                console.log(
                    '----------------------------------------------------------------------------',
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const showDialog = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handle_Find_tutor = () => {
        console.log('Number of slots required => ', numOfSlots);
        console.log('coruseid against which tutor will be searched ', courseId);
        setVisible(false);
        navigation.navigate('Finding_Tutor', { numOfSlots: { numOfSlots }, courseId: { courseId }, stdEmail: { stdEmail } });
    };

    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <Pressable style={{ marginRight: 60, marginLeft: 8 }} onPress={() => {
                    navigation.navigate('Enlist_Courses');
                }}>
                    <Entypo name={'add-to-list'} size={50} color="#6618E7" />
                </Pressable>
                <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 23 }}>
                    Courses Wishlist
                </Text>
            </View>
            <View style={styles.FList_BM}>
                <FlatList
                    data={selectedCourse}
                    renderItem={({ item }) => (
                        <View style={styles.modal}>
                            <Text style={styles.text}>Course ID: {item.cid}</Text>
                            <Text style={styles.text}>Name: {item.cname}</Text>
                            <View>
                                <Pressable
                                    style={styles.btn}
                                    onPress={() => {
                                        showDialog();
                                        setCourseId(item.cid);
                                    }}>
                                    <Text style={styles.btn_text}>Find Tutor</Text>
                                </Pressable>
                            </View>
                            <View>
                                <Dialog.Container visible={visible}>
                                    <Dialog.Title>Slots Confirmation</Dialog.Title>
                                    <DialogInput
                                        label="Enter no of slots"
                                        onChangeText={value => setNumOfSlots(value)}
                                        keyboardType="number-pad"
                                    />
                                    <Dialog.Button label="Cancel" onPress={handleCancel} />
                                    <Dialog.Button label="Confirm" onPress={handle_Find_tutor} />
                                </Dialog.Container>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(102,24,231,0.8)',
        marginHorizontal: 90,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    text: {
        color: '#ffffff',
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    btn: {
        backgroundColor: '#FFB22F',
        elevation: 10,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 5,
    },
    btn_text: {
        color: '#000000',
        fontWeight: '600',
    },
    FList_BM: {
        marginBottom: 110,
    },
});
