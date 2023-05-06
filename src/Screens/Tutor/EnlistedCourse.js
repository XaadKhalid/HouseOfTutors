/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../Assests/Styling';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import { GetWithParams } from '../../Api/API_Types';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function EnlistedCourses({ navigation }) {

    const [selectedCourse, setselectedCourse] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getEnlistedCourses();
        }
    }, [isFocused]);

    const getEnlistedCourses = async () => {
        let asyncresponse = await getgmailFormAsync();
        if (asyncresponse !== null) {
            const paramsObject = {
                controller: 'Tutor',
                action: 'GetTutorEnlist',
                params: { semail: asyncresponse },
            };
            let response = await GetWithParams(paramsObject);
            if (response.length > 0) {
                setselectedCourse(response);
            } else {
                setselectedCourse(null);
            }
        }
    };

    const renderclasses = ({ item, index }) => (
        <View key={index} style={styles.containerbox}>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Course ID: </Text>
                <Text style={styles.itemText}>{item.cid}</Text>
            </View>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Course Grade: </Text>
                <Text style={styles.itemText}>{item.grade}</Text>
            </View>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Course Name: </Text>
                <Text style={styles.itemText}>{item.cname}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.bodyContainer}>
            <TouchableOpacity style={styles.addRounded} onPress={() => {
                navigation.navigate('EnlistCourses', { selectedCourse });
            }}>
                <Ionicons name="add-outline" size={45} color="#fff" />
            </TouchableOpacity>
            {selectedCourse ? (
                <View>
                    <FlatList
                        data={selectedCourse}
                        renderItem={renderclasses} />
                </View>
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>
                        You had not added any course to Teach{'\n'}
                        <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
                        <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
                        <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
                    </Text>
                </View>
            )}
        </View>
    );
}
