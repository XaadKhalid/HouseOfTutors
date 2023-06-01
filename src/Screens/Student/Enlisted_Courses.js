/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../Assests/Styling';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import { GetWithParams } from '../../Api/API_Types';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Dialog from 'react-native-dialog';
import DialogInput from 'react-native-dialog/lib/Input';
import { useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Enlisted_Courses({ navigation }) {

    const [selectedCourse, setselectedCourse] = useState([]);
    const [visible, setVisible] = useState(false);
    const [numOfSlots, setNumOfSlots] = useState(0);
    const [courseId, setCourseId] = useState(0);
    const [gmail, setgmail] = useState('');
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getEnlistedCourses();
        }
    }, [isFocused]);

    const getEnlistedCourses = async () => {
        let asyncresponse = await getgmailFormAsync();
        if (asyncresponse !== null) {
            console.log();
            setgmail(asyncresponse);
            const paramsObject = {
                controller: 'Student',
                action: 'GetStudentEnlist',
                params: { semail: asyncresponse },
            };
            let response = await GetWithParams(paramsObject);
            if (response.length > 0) {
                setselectedCourse(response);
            }
            else {
                setselectedCourse(null);
            }
        }
    };

    const showDialog = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handle_Find_tutor = () => {
        setVisible(false);
        navigation.navigate('Finding_Tutor', { numOfSlots, courseId, gmail });
    };

    const renderclasses = ({ item, index }) => (
        <View key={index} style={styles.containerbox}>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Course ID: </Text>
                <Text style={styles.itemText}>{item.cid}</Text>
            </View>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Course Name: </Text>
                <Text style={styles.itemText}>{item.cname}</Text>
            </View>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Course Fee: </Text>
                <Text style={styles.itemText}>{item.cfee}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPressIn={() => {
                console.log('Find Tutor is Pressed');
                console.log();
                showDialog();
                setCourseId(item.cid);
            }}>
                <Text style={styles.buttonText}>Find Tutor</Text>
            </TouchableOpacity>
            <View style={styles.itembox}>
                {/* <TouchableOpacity style={styles.button} onPress={() => {
                    console.log('Find Best Tutor is Pressed');
                    console.log();
                }}>
                    <Text style={styles.buttonText}>Best Tutor</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );

    return (
        <View style={styles.bodyContainer}>
            <TouchableOpacity style={styles.addRounded} onPress={() => {
                navigation.navigate('Enlist_Courses', { selectedCourse });
            }}>
                <Ionicons name="add-outline" size={45} color="#fff" />
            </TouchableOpacity>
            {selectedCourse ? (
                <View>
                    <FlatList
                        data={selectedCourse}
                        renderItem={renderclasses}
                        contentContainerStyle={{ paddingBottom: 45 }} />
                </View>
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>
                        You had not added any course to Learn{'\n'}
                        <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
                        <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
                        <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
                    </Text>
                </View>
            )}
            <View>
                <Dialog.Container visible={visible}>
                    <Dialog.Title>Slots Confirmation</Dialog.Title>
                    <DialogInput
                        label="Enter no of slots"
                        onChangeText={value => setNumOfSlots(value)}
                        keyboardType="number-pad"
                    />
                    <Dialog.Button label="Cancel" onPress={handleCancel} />
                    <Dialog.Button label="Confirm" onPress={handle_Find_tutor} />
                </Dialog.Container>
            </View>
        </View>
    );
}
