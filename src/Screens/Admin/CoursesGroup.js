/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GetCourseGroupIds, deletGroup } from '../../Api/ApiForAdmin';
import styles from '../../Assests/Styling';

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

    const renderGroupIds = ({ item, index }) => (
        <View style={styles.containerbox}>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>GROUP : {index + 1}</Text>
                <View style={styles.EditingButtons}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('EditGroup', { groupid: item });
                    }}>
                        <MaterialIcons name="edit" size={25} style={styles.iconcolor} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        showAlert(item);
                    }}>
                        <MaterialCommunityIcons name="delete" size={25} style={styles.iconcolor} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.bodyContainer}>
            <TouchableOpacity style={styles.addRounded} onPress={() => {
                navigation.navigate('AddGroup');
            }}>
                <Ionicons name="add-outline" size={45} color="#fff" />
            </TouchableOpacity>
            <FlatList
                data={groupidList}
                renderItem={renderGroupIds}
            />
        </View>
    );
}
