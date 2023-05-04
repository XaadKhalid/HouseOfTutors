/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { addGroup } from '../../Api/ApiForAdmin';
import styles from '../../Assests/Styling';

export default function AddGroup({ navigation }) {
    const [selectedCourse, setSelectedCourse] = useState([]);
    const [flag, setflag] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getSelectedItems();
        }
    }, [isFocused]);

    useEffect(() => {
        if (flag) {
            storeData();
        }
    }, [flag]);

    const getSelectedItems = async () => {
        const selectedItemsString = await AsyncStorage.getItem('selectedCourse');
        const selectedItems = JSON.parse(selectedItemsString);
        if (selectedItems !== null) {
            setSelectedCourse(selectedItems);
        }
    };

    const storeData = async () => {
        try {
            await AsyncStorage.setItem('selectedCourse', JSON.stringify(selectedCourse));
            Alert.alert('Course Removed From Group');
        } catch (e) {
            console.log(e);
        }
    };

    const renderSelectedCoursesList = ({ item }) => (
        <View style={styles.containerbox}>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>{item}</Text>
                <TouchableOpacity onPress={() => {
                    let tempArray = [...selectedCourse.filter(course => course !== item)];
                    setSelectedCourse(tempArray);
                    setflag(true);
                }}>
                    <MaterialCommunityIcons name="delete" size={30} style={styles.iconcolor} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.bodyContainer}>
            <View style={styles.addtoListbox}>
                <Text style={styles.addtoListtxt}>Press Right Button to Select Courses for Group</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('CoursesForGroup');
                }}>
                    <Entypo name={'add-to-list'} size={50} color="#4C4B49" />
                </TouchableOpacity>
            </View>
            {selectedCourse.length > 0 && (
                <View>
                    <FlatList
                        data={selectedCourse}
                        renderItem={renderSelectedCoursesList}
                    />
                    <TouchableOpacity onPress={async () => {
                        try {
                            addGroup(selectedCourse);
                            await AsyncStorage.removeItem('selectedCourse');
                            Alert.alert('Group Added Successfully');
                            setSelectedCourse([]);
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                        style={styles.SubmitButton}
                    >
                        <Text style={styles.SubbmitText}>Submit Courses</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}
