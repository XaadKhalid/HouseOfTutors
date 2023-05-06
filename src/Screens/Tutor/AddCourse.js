/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { View, Text, Alert, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import styles from '../../Assests/Styling';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import { GetWithParams, PostWithObject } from '../../Api/API_Types';

export default function AddCourse({ route, navigation }) {
    const courseName = route.params.courseName;
    const [tEmail, setTEmail] = useState('');
    const [preReqList, setPreReqList] = useState([]);

    useEffect(() => {
        getPreReqofCourse();
    }, []);

    const getPreReqofCourse = async () => {
        let gmail = await getgmailFormAsync();
        if (gmail !== null) {
            setTEmail(gmail);
        }
        const paramsObject = {
            controller: 'Tutor',
            action: 'Get_PreReq',
            params: { coursename: courseName, temail: gmail },
        };
        let response = await GetWithParams(paramsObject);
        if (response !== 'Your Grade is already added WRT PreReq Courses') {
            let objArr = response.map(element => {
                return { name: element, grade: '0' };
            });
            setPreReqList(objArr);
            console.log('Updated PreReqList with Grade is ', objArr);
            console.log();
        }
        else {
            Alert.alert(response);
        }
    };

    const CourseEnlist = async () => {
        const paramsObject = {
            controller: 'Tutor',
            action: 'TutorCourseEnlist',
            params: {
                cname: courseName,
                temail: tEmail,
                courselist: preReqList,
            },
        };
        let response = await PostWithObject(paramsObject);
        if (response !== null) {
            Alert.alert(response);
            navigation.navigate('EnlistedCourses');
        }
    };

    const renderPreReqList = ({ item, index }) => (
        <View key={index} style={[styles.containerbox, { paddingVertical: 1 }]}>
            <View style={styles.itembox}>
                <Text style={{ color: '#ffffff', marginTop: 18 }}>{item.name}</Text>
                <Picker
                    style={[{ width: '30%' }, styles.itemText]}
                    selectedValue={item.grade}
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
                    <Picker.Item label="Not Graded" value="0" />
                </Picker>
            </View>
        </View>
    );

    const checkAllGradesAreZero = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].grade === '0' && arr[i].name === courseName) {
                console.log('i m the course and i dont have any grade so will not allow you to moveon');
                return false;
            }
        }
        return true;
    };

    return (
        <View style={styles.bodyContainer}>
            <Text style={{ textAlign: 'center' }}>Select your Grades</Text>
            <FlatList
                data={preReqList}
                renderItem={renderPreReqList}
            />
            <TouchableOpacity style={styles.button} onPress={() => {
                console.log('PreReqList after grade selection is ', preReqList);
                console.log();
                let flag = checkAllGradesAreZero(preReqList);
                if (flag) {
                    CourseEnlist();
                }
                else {
                    console.log('I m empty grade array');
                    Alert.alert('Grade submission is mandatory for ', courseName);
                }
            }}>
                <Text style={styles.buttonText}>Submit Grades</Text>
            </TouchableOpacity>
        </View>
    );
}
