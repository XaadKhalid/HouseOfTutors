/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { addGroup } from '../Api/ApiForAdmin';

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
        <View style={style.itembox}>
            <Text style={style.itemText}>{item}</Text>
            <TouchableOpacity onPress={() => {
                let tempArray = [...selectedCourse.filter(course => course !== item)];
                setSelectedCourse(tempArray);
                setflag(true);
            }}>
                <MaterialCommunityIcons name="delete" size={30} color="#FFF" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={style.container}>
            <View style={style.AddButtonBox}>
                <Text style={style.ButtonText}>Press Right Button to Select Courses for Group</Text>
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
                        style={style.SubmitButton}
                    >
                        <Text style={style.SubbmitText}>Submit Courses</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    AddButtonBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 5,
    },
    ButtonText: {
        marginTop: 15,
        marginLeft: 5,
    },
    SubmitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        padding: 12,
        borderWidth: 1,
        borderColor: 'white',
        marginHorizontal: 35,
    },
    SubbmitText: {
        textAlign: 'center',
        color: 'white',
    },
    itembox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
});
