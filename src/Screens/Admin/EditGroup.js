/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UpdateGroup, deleteCourseOfGroup, getCourseOfGroup } from '../../Api/ApiForAdmin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

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
        <View style={style.itembox}>
            <Text style={style.itemText}>{item}</Text>
            <TouchableOpacity onPress={() => {
                let tempArray = [...courseslist.filter(course => course !== item)];
                setCoursesList(tempArray);
                deleteCourseOfGroup(groupid, item);
                console.log('data in couslist is ', courseslist);
                Alert.alert('Course Removed From Group');
            }}>
                <MaterialCommunityIcons name="delete" size={30} color="#FFF" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View>
            <View style={style.AddButtonBox}>
                <Text style={style.ButtonText}>Press Right Button to add more courses to a Group</Text>
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
                        style={style.SubmitButton}
                    >
                        <Text style={style.SubbmitText}>Update Group</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const style = StyleSheet.create({
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
