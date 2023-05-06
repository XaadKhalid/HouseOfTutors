/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../Assests/Styling';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import { GetWithoutParams } from '../../Api/API_Types';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function EnlistCourses({ route, navigation }) {

    const [completeCourseList, setcompleteCourseList] = useState([]);
    const [courseName, setCourseName] = useState('');
    const [addCourseFlag, setAddCourseFlag] = useState(false);
    const { selectedCourse } = route.params;

    useEffect(() => {
        getcourses();
    }, []);

    useEffect(() => {
        if (addCourseFlag) {
            handle_addCourse();
        }
        setAddCourseFlag(false);
    }, [addCourseFlag]);

    const handle_addCourse = () => {
        navigation.navigate('AddCourse', { courseName });
    };

    const getcourses = async () => {
        let asyncresponse = await getgmailFormAsync();
        if (asyncresponse !== null) {
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

    const renderclasses = ({ item, index }) => (
        <View key={index} style={styles.containerbox}>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Course Id: </Text>
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
                console.log('Add Course is Pressed and ', item.cname, 'is passing to add');
                console.log();
                setCourseName(item.cname);
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
