/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GetCourseGroupIds } from '../Api/ApiForAdmin';

export default function CoursesGroup({ navigation }) {
    const [groupidList, setgroupidList] = useState([]);

    useEffect(() => {
        const updatedList = async () => {
            const groupIds = await GetCourseGroupIds();
            setgroupidList(groupIds);
        };
        updatedList();
    }, []);

    const showAlert = () => {
        Alert.alert(
            'Confirmation!!!',
            'Are you sure you want to take this action?',
            [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        Alert.alert('Its Deleted Now');
                    },
                },
            ],
        );
    };

    const renderGroupIds = ({ item }) => (
        <View style={style.GroupIdBox}>
            <Text style={style.GroupIdBoxText}>Group ID: {item}</Text>
            <View style={style.EditingButtons}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('EditGroup');
                }}>
                    <MaterialIcons name="edit" size={20} color="#FFB22F" style={style.GroupIdBoxText} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    showAlert();
                }}>
                    <MaterialCommunityIcons name="delete" size={20} color="#FFB22F" style={style.GroupIdBoxText} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={style.container}>
            <TouchableOpacity style={style.AddButton} onPress={() => {
                navigation.navigate('AddGroup');
            }}>
                <Text style={style.AddButtonText}>Add New Group</Text>
            </TouchableOpacity>
            <FlatList
                data={groupidList}
                renderItem={renderGroupIds}
            />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    GroupIdBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#4C4B49',
        padding: 15,
        marginVertical: 4,
        marginHorizontal: 12,
        borderRadius: 5,
    },
    GroupIdBoxText: {
        textAlign: 'center',
        color: '#ffffff',
    },
    EditingButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '30%',
    },
    AddButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 4,
    },
    AddButtonText: {
        backgroundColor: '#4C4B49',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#fff',
        padding: 8,
    },
});
