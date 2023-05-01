/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, Alert, StyleSheet, FlatList, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import IP_adress from '../Api/IP_adress';

export default function AddCourse({ route, navigation }) {
    const courseName = route.params.courseName;
    const [tEmail, setTEmail] = useState('');
    const [preReqList, setPreReqList] = useState([]);
    const ip = IP_adress();

    useEffect(() => {
        getgmail();
    }, []);

    useEffect(() => {
        if (tEmail !== '') {
            getPreReqofCourse();
        }
    }, [tEmail]);

    const getgmail = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('std_email');
            if (jsonValue != null) {
                setTEmail(jsonValue);
                console.log('Getting the email address of student from Asyncstorage => ', jsonValue);
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

    const getPreReqofCourse = async () => {
        try {
            const response = await fetch(
                `http://${ip}/HouseOfTutors/api/Tutor/Get_PreReq?coursename=${courseName}&temail=${tEmail}`,
            );
            const data = await response.json();
            console.log('Result from get PreReq API: ', data);
            console.log('----------------------------------------------------------------------------');
            if (data !== 'Your Grade is already added WRT PreReq Courses') {
                let objArr = data.map(element => {
                    return { name: element, grade: '0' };
                });
                setPreReqList(objArr);
                console.log('Updated PreReqList with Grade is ', objArr);
                console.log('----------------------------------------------------------------------------');
            } else {
                Alert.alert(data);
            }
        } catch (error) {
            console.log(error);
            console.log('----------------------------------------------------------------------------');
        }
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cname: courseName,
            temail: tEmail,
            courselist: preReqList,
        }),
    };

    const CourseEnlist = async () => {
        try {
            const response = await fetch(
                'http://192.168.43.231/HouseOfTutors/api/Tutor/TutorCourseEnlist', options
            );
            const data = await response.json();
            console.log('Response from Tutor CourseEnlist API => ', data);
            console.log('----------------------------------------------------------------------------');
            Alert.alert(data);
            navigation.navigate('EnlistedCourses');
        } catch (error) {
            console.log(error);
            console.log('----------------------------------------------------------------------------');
        }
    };

    const renderPreReqList = ({ item }) => (
        <View style={styles.container}>
            <View style={styles.coursebox}>
                <Text style={styles.prereqtext}>{item.name}</Text>
                <Picker
                    style={{ width: '30%' }}
                    selectedValue={item.grade}
                    prompt="Choose your grade"
                    onValueChange={(itemValue) => {
                        const updatedPreReqList = preReqList.map((preReq) =>
                            preReq.name === item.name ? { ...preReq, grade: itemValue } : preReq
                        );
                        setPreReqList(updatedPreReqList);
                    }
                    }>
                    <Picker.Item label="A" value="A" />
                    <Picker.Item label="B" value="B" />
                    <Picker.Item label="C" value="C" />
                    <Picker.Item label="D" value="D" />
                    <Picker.Item label="No Grade Yet" value="0" />
                </Picker>
            </View>
        </View>
    );

    return (
        <View>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>Grade Selection</Text>
            <FlatList
                data={preReqList}
                renderItem={renderPreReqList}
            />
            <Pressable onPress={() => {
                console.log('PreReqList after grade selection is ', preReqList);
                console.log('----------------------------------------------------------------------------');
                CourseEnlist();
            }}>
                <Text style={styles.button}>Submit Request</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    prereqtext: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000',
        marginTop: 18,
    },
    container: {
        alignItems: 'center',
    },
    coursebox: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderWidth: 1,
        borderColor: '#4C4B49',
        width: '80%',
        marginTop: 8,
    },
    button: {
        backgroundColor: '#FFB22F',
        paddingVertical: 8,
        borderRadius: 5,
        textAlign: 'center',
        width: '40%',
        color: '#000',
        elevation: 3,
        marginLeft: 120,
        marginTop: 10,
        fontWeight: 'bold',
    },
});
