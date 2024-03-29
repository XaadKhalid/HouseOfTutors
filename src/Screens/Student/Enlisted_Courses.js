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
            if (response !== 'No Course Enlisted' && response !== 'No User found on requested email') {
                response.sort((a, b) => a.IsEnrolled - b.IsEnrolled);
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

    const rendercourses = ({ item, index }) => (
        <View key={index} style={[styles.containerbox, { padding: 8 }]}>
            <View style={styles.itembox}>
                <Text style={[styles.itemText, { marginTop: 14 }]}>{item.CCode}</Text>
                <Text style={[styles.itemText, { marginTop: 14 }]}>{item.CName}</Text>
                {item.IsEnrolled === 0 ? (
                    <TouchableOpacity style={styles.button} onPressIn={() => {
                        console.log('Find Tutor is Pressed');
                        console.log();
                        showDialog();
                        setCourseId(item.CId);
                    }}>
                        <Text style={styles.buttonText}>Find Tutor</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.disablebutton} disabled={true}>
                        <Text style={styles.buttonText}>Already Enrolled</Text>
                    </TouchableOpacity>)}
            </View>
        </View>
    );

    return (
        <View style={styles.bodyContainer}>
            <TouchableOpacity style={styles.addRounded} onPress={() => {
                // navigation.navigate('Enlist_Courses', { selectedCourse });
                navigation.navigate('Enlist_Courses');
            }}>
                <Ionicons name="add-outline" size={45} color="#fff" />
            </TouchableOpacity>
            {selectedCourse ? (
                <View>
                    <FlatList
                        data={selectedCourse}
                        renderItem={rendercourses}
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
