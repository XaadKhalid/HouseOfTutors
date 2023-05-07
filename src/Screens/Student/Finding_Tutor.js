/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../Assests/Styling';
import { GetWithParams, PostWithObject } from '../../Api/API_Types';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import CheckBox from '@react-native-community/checkbox';

export default function Finding_Tutor({ route }) {

    const [tutorsList, settutorsList] = useState([]);
    const [tEmail, settEmail] = useState('');
    const [stdSlots, setStdSltos] = useState([]);
    const [sendRequestFlag, setSendRequestFlag] = useState(false);
    const { numOfSlots, courseId, gmail } = route.params;

    useEffect(() => {
        get_tutors();
    }, []);

    useEffect(() => {
        if (sendRequestFlag) {
            handle_sendtutor_request();
            setSendRequestFlag(false);
        }
    }, [sendRequestFlag]);

    const get_tutors = async () => {
        const paramsObject = {
            controller: 'Student',
            action: 'FindTutor',
            params: {
                semail: gmail,
                cid: courseId,
            },
        };
        let response = await GetWithParams(paramsObject);
        if (response !== 'No tutor available') {
            response.forEach(element => {
                element.checkedslots = [];
            });
            settutorsList(response);
            console.log('Updated tutorlist is ', response);
            console.log();
        }
        else {
            settutorsList(null);
        }
    };

    const handle_sendtutor_request = () => {
        if (stdSlots.length === 0) {
            Alert.alert('Slots Confirmation is mandatory');
        }
        else {
            send_tutor_request();
        }
    };

    const send_tutor_request = async () => {
        try {
            const paramsObject = {
                controller: 'Student',
                action: 'SendTutorRequest',
                params: {
                    semail: gmail,
                    temail: tEmail,
                    courseid: courseId,
                    selectedslots: stdSlots,
                },
            };
            let response = await PostWithObject(paramsObject);
            Alert.alert(response);
        } catch (error) {
            console.log(error);
        }
    };

    const renderclasses = ({ item, index }) => (
        <View key={index} style={styles.containerbox}>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Course ID: </Text>
                <Text style={styles.itemText}>{courseId}</Text>
            </View>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Tutor: </Text>
                <Text style={styles.itemText}>{item.name}</Text>
            </View>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Rating/Grade: </Text>
                <Text style={styles.itemText}>{item.rating}/{item.grade}</Text>
            </View>
            <View>
                {item.slots.slice(0, numOfSlots).map((slot, sIndex) => {
                    let flagsofslot = [slot, false];
                    if (item.checkedslots.includes(slot)) {
                        flagsofslot = [slot, true];
                    }
                    console.log('flagofslot is ', flagsofslot);
                    return (
                        <View key={sIndex} style={{ flexDirection: 'row', marginTop: 5 }}>
                            <CheckBox
                                tintColors={{ true: 'gold', false: 'white' }}
                                value={flagsofslot[1]}
                                onValueChange={() => {
                                    flagsofslot[1] = !flagsofslot[1];
                                    if (flagsofslot[1]) {
                                        console.log('checked');
                                        settutorsList(previous => {
                                            let arr = [...previous];
                                            arr[index].checkedslots = [...item.checkedslots, flagsofslot[0]];
                                            return arr;
                                        });
                                    } else {
                                        console.log('un-checked');
                                        settutorsList(previous => {
                                            let arr = [...previous];
                                            arr[index].checkedslots = item.checkedslots.filter((checkedSlot) => checkedSlot !== flagsofslot[0]);
                                            return arr;
                                        });
                                    }
                                }}
                            />
                            <Text style={{ fontStyle: 'italic', color: '#ffffff', marginTop: 5 }}>{slot}</Text>
                        </View>
                    );
                })}
            </View>
            <TouchableOpacity style={styles.button} onPressIn={() => {
                console.log('Send Request is Pressed');
                console.log();
                settEmail(item.email);
                setStdSltos(item.checkedslots);
                setSendRequestFlag(true);
            }}>
                <Text style={styles.buttonText}>Send Request</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.bodyContainer}>
            {tutorsList ? (
                <View>
                    <FlatList
                        data={tutorsList}
                        renderItem={renderclasses} />
                </View>
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>
                        No tutor is available as per your schedule{'\n'}
                        <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
                        <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
                        <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
                    </Text>
                </View>
            )}
        </View>
    );
}
