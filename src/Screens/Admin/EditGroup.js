/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import styles from '../../Assests/Styling';
import { GetWithParams, PostWithObject, PostWithParams } from '../../Api/API_Types';

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
        const paramsObject = {
            controller: 'Admin',
            action: 'GetGroupList',
            params: { groupid: groupid },
        };
        let response = await GetWithParams(paramsObject);
        if (response !== null) {
            setCoursesList(response);
            setflag(true);
        }
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

    const deleteCourseGroup = async (item) => {
        let tempArray = [...courseslist.filter(course => course !== item)];
        setCoursesList(tempArray);
        const paramsObject = {
            controller: 'Admin',
            action: 'deleteCourseofGroup',
            params: { groupid: groupid, course: item },
        };
        let response = await PostWithParams(paramsObject);
        if (response !== null) {
            Alert.alert('Course Removed From Group');
        }
    };

    const renderCoursesList = ({ item }) => (
        <View style={styles.containerbox}>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>{item}</Text>
                <TouchableOpacity onPress={() => {
                    deleteCourseGroup(item);
                }}>
                    <MaterialCommunityIcons name="delete" size={30} style={styles.iconcolor} />
                </TouchableOpacity>
            </View>
        </View>
    );

    const UpdateGroup = async (id, list) => {
        const paramsObject = {
            controller: 'Admin',
            action: 'UpdateGroup',
            params: {
                groupid: id,
                courses: list,
            },
        };
        let response = await PostWithObject(paramsObject);
        if (response !== null) {
            Alert.alert('Group Updated');
            deleteAysncStorage();
        }
    };

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
                        UpdateGroup(groupid, courseslist);
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
