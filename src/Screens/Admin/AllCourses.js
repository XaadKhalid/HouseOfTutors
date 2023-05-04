/* eslint-disable prettier/prettier */
import { Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../Assests/Styling';
import { GetWithoutParams } from '../../Api/API_Types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AllCourses() {
    const [courseslist, setCoursesList] = useState([]);

    useEffect(() => {
        getAllCourses();
    }, []);

    const getAllCourses = async () => {
        const paramsObject = {
            controller: 'Student',
            action: 'GetCourses',
        };
        let response = await GetWithoutParams(paramsObject);
        if (response !== null) {
            setCoursesList(response);
        }
        else {
            setCoursesList(null);
        }
    };

    const renderCourses = ({ item, index }) => (
        <View style={styles.containerbox}>
            <View key={index} style={styles.itembox}>
                <Text style={styles.itemText}>{item.cname}</Text>
                <TouchableOpacity onPress={() => {
                    let tempArray = [...courseslist.filter(course => course !== item)];
                    setCoursesList(tempArray);
                    Alert.alert('Course Removed From List');
                }}>
                    <MaterialCommunityIcons name="delete" size={30} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.bodyContainer}>
            <FlatList
                data={courseslist}
                renderItem={renderCourses} />
        </View>
    );
}
