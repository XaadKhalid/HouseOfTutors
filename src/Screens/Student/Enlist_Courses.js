/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../Assests/Styling';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import { GetWithoutParams, PostWithParams } from '../../Api/API_Types';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function Enlist_Courses({ route, navigation }) {

    const [completeCourseList, setcompleteCourseList] = useState([]);
    const [stdEmail, setStdEmail] = useState('');
    const { selectedCourse } = route.params;

    useEffect(() => {
        getcourses();
    }, []);

    const getcourses = async () => {
        let asyncresponse = await getgmailFormAsync();
        if (asyncresponse !== null) {
            setStdEmail(asyncresponse);
            const paramsObject = {
                controller: 'Student',
                action: 'GetCourses',
            };
            let response = await GetWithoutParams(paramsObject);
            if (response !== null) {
                if (selectedCourse !== null) {
                    const temparray = response.filter(
                        (course) => !selectedCourse.find((c) => c.cname === course.cname)
                    );
                    setcompleteCourseList(temparray);
                    console.log('updated length of total courses is ', temparray.length);
                }
                else {
                    setcompleteCourseList(response);
                    console.log('updated length of total courses is ', response.length);
                }
            } else {
                Alert.alert('No Course Found!');
            }
        }
    };

    const CourseEnlist = async id => {
        const paramsObject = {
            controller: 'Student',
            action: 'StudentCourseEnlist',
            params: { semail: stdEmail, cid: id },
        };
        let response = await PostWithParams(paramsObject);
        if (response === 'Course Already Enlisted') {
            Alert.alert(response);
        }
        else {
            Alert.alert(response);
            navigation.navigate('Enlisted_Courses');
        }
    };

    const renderclasses = ({ item, index }) => (
        <View key={index} style={styles.containerbox}>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Course ID: </Text>
                <Text style={styles.itemText}>{item.cid}</Text>
            </View>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Course Name: </Text>
                <Text style={styles.itemText}>{item.cname}</Text>
            </View>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Course Code: </Text>
                <Text style={styles.itemText}>{item.ccode}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => {
                console.log('Add Course is Pressed');
                console.log();
                CourseEnlist(item.cid);
            }}>
                <Text style={styles.buttonText}>Add Course</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.bodyContainer}>
            {completeCourseList ? (
                <View>
                    <FlatList
                        data={completeCourseList}
                        renderItem={renderclasses} />
                </View>
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>
                        You are not having any class for Today{'\n'}
                        <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
                        <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
                        <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
                    </Text>
                </View>
            )}
        </View>
    );
}
