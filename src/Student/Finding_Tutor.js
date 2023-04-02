/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import CheckBox from '@react-native-community/checkbox';

export default function Finding_Tutor({ route }) {
    const [tutorsList, setTutorsList] = useState([]);
    const [tEmail, setTEmail] = useState('');
    const [stdSlots, setStdSltos] = useState([]);
    let numOfSlots = route.params.numOfSlots;
    let courseId = route.params.courseId;
    let stdEmail = route.params.stdEmail;

    useEffect(() => {
        console.log('numofslots-courseid-stdemail', numOfSlots, courseId, stdEmail);
        get_tutors();
    }, []);

    useEffect(() => {
        if (stdSlots !== [] && tEmail !== '') {
            console.log('numofslots-courseid-stdemail', numOfSlots, courseId, stdEmail);
            send_tutor_request();
        }
    }, [stdSlots, tEmail]);

    const get_tutors = async () => {
        try {
            const response = await fetch(
                `http://192.168.43.231/HouseOfTutors/api/student/FindTutor?semail=${stdEmail}&cid=${courseId}`,
            );
            const data = await response.json();
            console.log('Result from get_tutors API => ', data);
            console.log('----------------------------------------------------------------------------');
            if (data === 'No tutor available') {
                Alert.alert('No tutor available!');
            } else {
                data.forEach(element => {
                    element.checkedslots = [];
                });
                setTutorsList(data);
            }
            console.log('Updated tutorlist is ', data);
        } catch (error) {
            console.log(error);
            console.log('----------------------------------------------------------------------------');
        }
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.modal}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Text style={styles.text}>{courseId}</Text>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.rating}/{item.grade}</Text>
            </View>
            <View>
                {/* <Text style={styles.text}>Available Slots:</Text> */}
                {item.slots.slice(0, numOfSlots).map((slot, sIndex) => {
                    let flagsofslot = [slot, false];
                    if (item.checkedslots.includes(slot)) {
                        flagsofslot = [slot, true];
                    }
                    console.log('flagofslot is ', flagsofslot);
                    return (
                        <View key={sIndex} style={{ flexDirection: 'row' }}>
                            <CheckBox
                                tintColors={{ true: 'gold', false: 'white' }}
                                value={flagsofslot[1]}
                                onValueChange={() => {
                                    flagsofslot[1] = !flagsofslot[1];
                                    if (flagsofslot[1]) {
                                        console.log('checked');
                                        setTutorsList(previous => {
                                            let arr = [...previous];
                                            arr[index].checkedslots = [...item.checkedslots, flagsofslot[0]];
                                            return arr;
                                        });
                                    } else {
                                        console.log('un-checked');
                                        setTutorsList(previous => {
                                            let arr = [...previous];
                                            arr[index].checkedslots = item.checkedslots.filter((checkedSlot) => checkedSlot !== flagsofslot[0]);
                                            return arr;
                                        });
                                    }
                                }}
                            />
                            <Text style={styles.text}>{slot}</Text>
                        </View>
                    );
                })}
            </View>
            <View>
                <Pressable
                    style={styles.btn}
                    onPress={() => {
                        console.log('send request is sent');
                        setTEmail(item.email);
                        setStdSltos(item.checkedslots);
                        send_tutor_request();
                    }}>
                    <Text style={styles.btn_text}>Send Request</Text>
                </Pressable>
            </View>
        </View>
    );

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            semail: stdEmail,
            temail: tEmail,
            courseid: courseId,
            selectedslots: stdSlots,
        }),
    };

    const send_tutor_request = async () => {
        console.log('options are ', options);
        try {
            const response = await fetch(
                'http://192.168.43.231/HouseOfTutors/api/Student/SendTutorRequest', options
            );
            const data = await response.json();
            console.log('Result from send_tutor_request API => ', data);
            if (data === 'Already Requested') {
                Alert.alert('Already Requested!');
            } else {
                Alert.alert(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View>
            <View style={styles.heading}>
                <Text style={styles.h_text}>Course ID</Text>
                <Text style={styles.h_text}>Name</Text>
                <Text style={styles.h_text}>Rating/Grade</Text>
            </View>
            <View style={styles.FList_BM}>
                <FlatList
                    data={tutorsList}
                    renderItem={renderItem}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        backgroundColor: 'rgba(102,24,231,0.7)',
        marginHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    text: {
        color: '#ffffff',
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 6,
        textAlign: 'center',
    },
    btn: {
        backgroundColor: '#FFB22F',
        elevation: 10,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 5,
        width: '40%',
        marginHorizontal: 120,
    },
    btn_text: {
        color: '#000000',
        fontWeight: '600',
    },
    FList_BM: {
        marginBottom: 110,
    },
    heading: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginHorizontal: 10,
        paddingVertical: 15,
        marginTop: 10,
    },
    h_text: {
        color: '#000000',
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
});
