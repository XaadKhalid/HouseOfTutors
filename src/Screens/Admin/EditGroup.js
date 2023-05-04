/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UpdateGroup, deleteCourseOfGroup, getCourseOfGroup } from '../../Api/ApiForAdmin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import styles from '../../Assests/Styling';

export default function EditGroup({ navigation, route }) {
    const { groupid } = route.params;
    const [courseslist, setCoursesList] = useState([]);
    const [flag, setflag] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            GetGroupCoruses();
        }
    }, [isFocused]);

    useEffect(() => {
        if (flag) {
            getSelectedItems();
            setflag(false);
        }
    }, [flag]);

    const GetGroupCoruses = async () => {
        const response = await getCourseOfGroup(groupid);
        setCoursesList(response);
        setflag(true);
    };

    const getSelectedItems = async () => {
        const selectedItemsString = await AsyncStorage.getItem('selectedCourse');
        const selectedItems = JSON.parse(selectedItemsString);
        if (selectedItems !== null) {
            const tempArray = [...courseslist];
            selectedItems.forEach((item) => {
                if (!tempArray.includes(item)) {
                    tempArray.push(item);
                }
            });
            setCoursesList(tempArray);
            console.log('aysncstorage is ', selectedItems);
        }
        else {
            console.log('aysncstorage is ', selectedItems);
            //storeData();
        }
    };

    const deleteAysncStorage = async () => {
        try {
            await AsyncStorage.removeItem('selectedCourse');
            console.log('AsyncStorage deletd successfully');
        } catch (e) {
            console.log(e);
        }
    };

    const renderCoursesList = ({ item }) => (
        <View style={styles.containerbox}>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>{item}</Text>
                <TouchableOpacity onPress={() => {
                    let tempArray = [...courseslist.filter(course => course !== item)];
                    setCoursesList(tempArray);
                    deleteCourseOfGroup(groupid, item);
                    console.log('data in couslist is ', courseslist);
                    Alert.alert('Course Removed From Group');
                }}>
                    <MaterialCommunityIcons name="delete" size={30} style={styles.iconcolor} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.bodyContainer}>
            <View style={styles.addtoListbox}>
                <Text style={styles.addtoListtxt}>Press Right Button to add more courses to a Group</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('CoursesForGroup');
                }}>
                    <Entypo name={'add-to-list'} size={50} color="#4C4B49" />
                </TouchableOpacity>
            </View>
            {courseslist.length > 0 && (
                <View>
                    <FlatList
                        data={courseslist}
                        renderItem={renderCoursesList}
                    />
                    <TouchableOpacity onPress={() => {
                        try {
                            UpdateGroup(groupid, courseslist);
                            Alert.alert('Group Updated');
                            deleteAysncStorage();
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                        style={styles.SubmitButton}
                    >
                        <Text style={styles.SubbmitText}>Update Group</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}
