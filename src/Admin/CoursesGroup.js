/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GetCourseGroupIds, deletGroup } from '../Api/ApiForAdmin';

export default function CoursesGroup({ navigation }) {
    const [groupidList, setgroupidList] = useState([]);
    const [flag, setflag] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused || flag) {
            updatedList();
            setflag(false);
        }
    }, [isFocused, flag]);

    const updatedList = async () => {
        const groupIds = await GetCourseGroupIds();
        setgroupidList(groupIds);
    };

    const showAlert = (item) => {
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
                        deletGroup(item);
                        Alert.alert('Its Deleted Now');
                        setflag(true);
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
                    navigation.navigate('EditGroup', { groupid: item });
                }}>
                    <MaterialIcons name="edit" size={20} color="#FFB22F" style={style.GroupIdBoxText} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    showAlert(item);
                }}>
                    <MaterialCommunityIcons name="delete" size={20} color="#FFF" />
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
        justifyContent: 'space-between',
        width: '20%',
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
