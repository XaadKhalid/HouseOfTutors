/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import CheckBox from '@react-native-community/checkbox';

export default function Finding_Tutor({ route }) {
    const [tutorsList, setTutorsList] = useState([]);
    const [tEmail, setTEmail] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const myslots = ['Mon : 08-AM', 'Mon : 09-AM', 'Mon : 10-AM', 'Wed : 02-PM'];
    let numOfSlots = route.params.numOfSlots.numOfSlots;
    let courseId = route.params.courseId.courseId;
    let stdEmail = route.params.stdEmail.stdEmail;

    useEffect(() => {
        console.log('numofslots-courseid-stdemail', numOfSlots, courseId, stdEmail);
        get_tutors();
    }, []);

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

    const renderItem = ({ item }) => (
        <View style={styles.modal}>
            <View>
                <Text style={styles.text}>Name: {item.name}</Text>
                <Text style={styles.text}>
                    Rating/Grade: {item.rating}/{item.grade}
                </Text>
            </View>
            <View>
                <Text style={styles.text}>Available Slots:</Text>
                {item.slots.slice(0, numOfSlots).map((slot, index) => {
                    //const res = item.slots.map(m => false);
                    //setIsChecked(res);
                    return (
                        <View key={index} style={{ flexDirection: 'row' }}>
                            <CheckBox
                                tintColors={{ true: 'gold', false: 'white' }}
                                value={isChecked}
                                onValueChange={() => {
                                    if (isChecked) {
                                        item.checkedslots = [...item.checkedslots, slot];
                                        setIsChecked(!isChecked);
                                    }
                                    else {
                                        //item.checkedslots.splice(index, 1);
                                        setIsChecked(!isChecked);
                                    }
                                }}
                            />
                            <Text style={styles.text}>
                                {slot}
                            </Text>
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
                        handle_send_request();
                    }}>
                    <Text style={styles.btn_text}>Send Request</Text>
                </Pressable>
            </View>
        </View>
    );

    const handle_send_request = () => {
        console.log('data to be saved in selected slot for send request is ', tutorsList);
        //send_tutor_request();
    };

    const send_tutor_request = async () => {
        try {
            const response = await fetch(
                `http://192.168.43.231/HouseOfTutors/api/Student/SendTutorRequest?semail=${stdEmail}&temail=${tEmail}&cid=${courseId}&slots=${myslots}`,
                {
                    method: 'POST',
                },
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
            <View>
                <Text
                    style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 23 }}>
                    Our Best Teachers
                </Text>
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
        alignItems: 'center',
        backgroundColor: 'rgba(102,24,231,0.8)',
        marginHorizontal: 60,
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
    },
    btn_text: {
        color: '#000000',
        fontWeight: '600',
    },
    FList_BM: {
        marginBottom: 110,
    },
});
