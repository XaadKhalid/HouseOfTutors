/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../Assests/Styling';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import { GetWithParams, PostWithParams } from '../../Api/API_Types';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function EnlistCourses({ route, navigation }) {

    const [completeCourseList, setcompleteCourseList] = useState([]);
    //const [courseName, setCourseName] = useState('');
    const [courseid, setcourseid] = useState(0);
    const [temail, setTEmail] = useState('');
    const [addCourseFlag, setAddCourseFlag] = useState(false);
    const { selectedCourse } = route.params;

    useEffect(() => {
        getcourses();
    }, []);

    useEffect(() => {
        if (addCourseFlag) {
            //handle_addCourse();
            CourseEnlist();
        }
        setAddCourseFlag(false);
    }, [addCourseFlag]);

    // const handle_addCourse = () => {
    //     navigation.navigate('AddCourse', { courseName });
    // };

    const getcourses = async () => {
        let asyncresponse = await getgmailFormAsync();
        if (asyncresponse !== null) {
            setTEmail(asyncresponse);
            const paramsObject = {
                controller: 'Tutor',
                action: 'GetTutorCourses',
                params: { temail: asyncresponse },
            };
            let response = await GetWithParams(paramsObject);
            if (response !== null) {
                if (selectedCourse !== null) {
                    console.log('actual length of total courses is ', response.length);
                    console.log();
                    const temparray = response.filter(
                        (course) => !selectedCourse.find((c) => c.coursename === course.coursename)
                    );
                    setcompleteCourseList(temparray);
                    console.log('updated length of total courses is ', temparray.length);
                    console.log();
                }
                else {
                    setcompleteCourseList(response);
                    console.log('updated length of total courses is ', response.length);
                    console.log();
                }
            } else {
                Alert.alert('No Course Found!');
            }
        }
    };

    const CourseEnlist = async () => {
        const paramsObject = {
            controller: 'Tutor',
            action: 'TutorCourseEnlist',
            params: {
                temail: temail,
                cid: courseid,
            },
        };
        let response = await PostWithParams(paramsObject);
        if (response !== null) {
            Alert.alert(response);
            navigation.navigate('EnlistedCourses');
        }
    };

    const renderclasses = ({ item, index }) => (
        <View key={index} style={styles.containerbox}>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Course Id: </Text>
                <Text style={styles.itemText}>{item.courseid}</Text>
            </View>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Course Grade: </Text>
                <Text style={styles.itemText}>{item.coursegrade}</Text>
            </View>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Course Name: </Text>
                <Text style={styles.itemText}>{item.coursename}</Text>
            </View>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Course Code: </Text>
                <Text style={styles.itemText}>{item.coursecode}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => {
                console.log('Add Course is Pressed and ', item.courseid, 'is passing to add');
                console.log();
                setcourseid(item.courseid);
                //setCourseName(item.cname);
                setAddCourseFlag(true);
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
                        No course found in courses table{'\n'}
                        <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
                        <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
                        <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
                    </Text>
                </View>
            )}
        </View>
    );
}
