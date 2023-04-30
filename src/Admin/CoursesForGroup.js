/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { GetCoursesList } from '../Api/ApiForAdmin';

export default function CoursesForGroup({ navigation }) {
    const [complete_Courses_List, set_Complete_Courses_List] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState([]);
    const [flag, setflag] = useState(false);
    const [selectedFlag, setSelectedFlag] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            fetchcourseslist();
        }
    }, [isFocused]);

    useEffect(() => {
        if (flag) {
            storeData(selectedCourse);
            setflag(false);
        }
    }, [flag]);

    useEffect(() => {
        if (selectedFlag) {
            getSelectedItems();
            setSelectedFlag(false);
        }
    }, [selectedFlag]);

    const fetchcourseslist = async () => {
        const response = await GetCoursesList();
        set_Complete_Courses_List(response);
        setSelectedFlag(true);
    };

    const getSelectedItems = async () => {
        const selectedItemsString = await AsyncStorage.getItem('selectedCourse');
        const selectedItems = JSON.parse(selectedItemsString);
        if (selectedItems !== null) {
            const temparray = complete_Courses_List.filter(
                (course) => !selectedItems.includes(course.cname)
            );
            set_Complete_Courses_List(temparray);
            setSelectedCourse(selectedItems);
            console.log('I get this data from aysncstorage when course screen renders', selectedItems);
        }
    };

    const storeData = async value => {
        try {
            await AsyncStorage.setItem('selectedCourse', JSON.stringify(selectedCourse));
            Alert.alert('Course added in group');
        } catch (e) {
            console.log(e);
        }
    };

    const renderCoursesList = ({ item }) => (
        <View style={style.itembox}>
            <TouchableOpacity onPress={() => {
                let itemAdded = selectedCourse;
                itemAdded = [...itemAdded, item.cname];
                setSelectedCourse(itemAdded);
                const temparray = complete_Courses_List.filter(
                    (course) => !course.cname.toLowerCase().includes(item.cname.toLowerCase())
                );
                set_Complete_Courses_List(temparray);
                setflag(true);
            }}>
                <Text style={style.itemText}>{item.cname}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={style.container}>
            <View>
                <TextInput style={style.searchbar}
                    placeholder="Enter course name to filter list"
                    onChangeText={(value) => {
                        if (value !== '') {
                            const temparray = complete_Courses_List.filter(
                                (course) => course.cname.toLowerCase().includes(value.toLowerCase())
                            );
                            set_Complete_Courses_List(temparray);
                        }
                        else {
                            fetchcourseslist();
                        }
                    }}
                />
            </View>
            <View>
                <FlatList
                    data={complete_Courses_List}
                    renderItem={renderCoursesList}
                />
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    itembox: {
        backgroundColor: '#4C4B49',
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 35,
    },
    itemText: {
        textAlign: 'center',
        color: '#fff',
    },
    searchbar: {
        padding: 5,
        borderWidth: 1.5,
        borderColor: 'green',
        marginTop: 7,
        marginHorizontal: 35,
    },
});