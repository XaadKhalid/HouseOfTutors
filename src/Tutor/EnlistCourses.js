/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function EnlistCourses({ navigation }) {
    const [completeCourseList, setCompleteCourseList] = useState([]);
    const [courseName, setCourseName] = useState('');
    const [addCourseFlag, setAddCourseFlag] = useState(false);

    useEffect(() => {
        getcourses();
    }, []);

    useEffect(() => {
        if (addCourseFlag) {
            handle_addCourse();
        }
        setAddCourseFlag(false);
    }, [addCourseFlag]);

    const getcourses = async () => {
        try {
            const response = await fetch(
                'http://192.168.43.231/HouseOfTutors/api/Student/GetCourses',
            );
            const data = await response.json();
            console.log('Result from Getcourses API => ', data);
            console.log('----------------------------------------------------------------------------');
            if (data !== null) {
                setCompleteCourseList(data);
            } else {
                Alert.alert('No Course Found!');
            }
        } catch (error) {
            console.log(error);
            console.log('----------------------------------------------------------------------------');
        }
    };

    const renderCoursesList = ({ item }) => (
        <View style={styles.modal}>
            <Text style={styles.text}>{item.ccode}</Text>
            <Text style={styles.text}>{item.cname}</Text>
            <View>
                <Pressable
                    style={styles.btn}
                    onPress={() => {
                        setCourseName(item.cname);
                        setAddCourseFlag(true);
                    }}>
                    <Text style={styles.btn_text}>Add Course</Text>
                </Pressable>
            </View>
        </View>
    );

    const handle_addCourse = () => {
        console.log('course name is ', courseName);
        navigation.navigate('AddCourse', { courseName });
    };

    return (
        <View style={styles.main_container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Text
                    style={{ fontWeight: 'bold', fontSize: 23 }}>
                    CCode
                </Text>
                <Text
                    style={{ fontWeight: 'bold', fontSize: 23 }}>
                    CName
                </Text>
                <Text
                    style={{ fontWeight: 'bold', fontSize: 23 }}>
                    Course Addition
                </Text>
            </View>
            <View style={styles.FList_BM}>
                <FlatList
                    data={completeCourseList}
                    renderItem={renderCoursesList}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main_container: {
        padding: 15,
    },
    add_Course_btn: {
        backgroundColor: '#4C4B49',
        borderRadius: 50 / 2,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        elevation: 10,
    },
    modal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#4C4B49',
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: 10,
    },
    text: {
        color: '#ffffff',
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    crse_bm: {
        marginBottom: 100,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    inputField: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
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
        marginBottom: 52,
    },
});
