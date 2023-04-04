/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';

export default function Notification_Details() {
    const [notificationList, setNotificationList] = useState([]);
    const [notificationFlag, setNotificationFalg] = useState(false);
    const [tEmail, setTEmail] = useState('');
    const [approvedSlots, setApprovedSlots] = useState([]);
    const [stdEmail, setStdEmail] = useState('');
    const [courseId, setCourseId] = useState(-1);
    const [acceptance_Flag, set_Accpetance_Flag] = useState(false);
    const [rejection_Flag, set_Rejection_Flag] = useState(false);

    useEffect(() => {
        getgmail();
    }, []);

    useEffect(() => {
        if (tEmail !== '') {
            get_notifications();
        }
    }, [tEmail]);

    useEffect(() => {
        if (acceptance_Flag) {
            handle_accept_request();
            set_Accpetance_Flag(false);
        }
    }, [acceptance_Flag]);

    useEffect(() => {
        if (rejection_Flag) {
            handle_reject_request();
            set_Rejection_Flag(false);
        }
    }, [rejection_Flag]);

    const getgmail = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('std_email');
            if (jsonValue != null) {
                setTEmail(jsonValue);
                console.log('Getting the email address of tutor from Asyncstorage => ', jsonValue);
                console.log('----------------------------------------------------------------------------');
            } else {
                console.log('No gmail found in Asyncstorage');
                console.log('----------------------------------------------------------------------------');
            }
        } catch (e) {
            console.log(e);
            console.log('----------------------------------------------------------------------------');
        }
    };

    const get_notifications = async () => {
        try {
            const response = await fetch(
                `http://192.168.43.231/HouseOfTutors/api/Tutor/GetStudentRequests?temail=${tEmail}`,
            );
            const data = await response.json();
            console.log('data from get notifications', data);
            console.log('----------------------------------------------------------------------------');
            if (data !== 'No Requests') {
                data.forEach(element => {
                    element.checkedslots = [];
                });
                setNotificationList(data);
                setNotificationFalg(true);
                console.log('updated notificationlist is ', data);
                console.log('----------------------------------------------------------------------------');
            }
            else {
                setNotificationFalg(false);
            }
        } catch (error) {
            console.log(error);
            console.log('----------------------------------------------------------------------------');
        }
    };

    const handle_accept_request = () => {
        if (approvedSlots.length === 0) {
            Alert.alert('No slot confirmed yet');
        }
        else {
            console.log('temail => ', tEmail);
            console.log('semail => ', stdEmail);
            console.log('courseid => ', courseId);
            console.log('approved slots => ', approvedSlots);
            accept_request();
        }
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            semail: stdEmail,
            temail: tEmail,
            courseid: courseId,
            selectedslots: approvedSlots,
        }),
    };

    const accept_request = async () => {
        console.log('options are ', options);
        try {
            const response = await fetch(
                'http://192.168.43.231/HouseOfTutors/api/Tutor/Accept_Student_Request', options
            );
            const data = await response.json();
            console.log('Result from accept request API => ', data);
            if (data === 'No Requests') {
                Alert.alert('Request Already Accepted');
                get_notifications();
            } else {
                Alert.alert(data);
                get_notifications();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handle_reject_request = () => {
        console.log('temail', tEmail);
        console.log('stdemail', stdEmail);
        console.log('courseid', courseId);
        reject_request();
    };

    const reject_request = async () => {
        try {
            const response = await fetch(`http://192.168.43.231/HouseOfTutors/api/Tutor/Reject_Student_Request?temail=${tEmail}&semail=${stdEmail}&cid=${courseId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            console.log(data);
            console.log('----------------------------------------------------------------------------');
            Alert.alert(data);
            get_notifications();
        }
        catch (error) {
            console.log(error);
            console.log('----------------------------------------------------------------------------');
        }
    };

    const renderItem = ({ item, index }) => (
        <View style={style.modal}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 18, marginRight: 55 }}>
                <Text style={style.text}>{item.semail}</Text>
                <Text style={style.text}>{item.cname}</Text>
            </View>
            <View>
                {item.Slots.map((slot, sIndex) => {
                    let flagsofslot = [slot, false];
                    if (item.checkedslots.includes(slot)) {
                        flagsofslot = [slot, true];
                    }
                    console.log('flagofslot is ', flagsofslot);
                    return (
                        <View key={sIndex} style={{ flexDirection: 'row', marginLeft: 10 }}>
                            <CheckBox
                                tintColors={{ true: 'gold', false: 'white' }}
                                value={flagsofslot[1]}
                                onValueChange={() => {
                                    flagsofslot[1] = !flagsofslot[1];
                                    if (flagsofslot[1]) {
                                        console.log('checked');
                                        setNotificationList(previous => {
                                            let arr = [...previous];
                                            arr[index].checkedslots = [...item.checkedslots, flagsofslot[0]];
                                            return arr;
                                        });
                                    } else {
                                        console.log('un-checked');
                                        setNotificationList(previous => {
                                            let arr = [...previous];
                                            arr[index].checkedslots = item.checkedslots.filter((checkedSlot) => checkedSlot !== flagsofslot[0]);
                                            return arr;
                                        });
                                    }
                                }}
                            />
                            <Text style={style.text}>{slot}</Text>
                        </View>
                    );
                })}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Pressable
                    style={style.btn}
                    onPress={() => {
                        setStdEmail(item.semail);
                        setCourseId(item.cid);
                        setApprovedSlots(item.checkedslots);
                        set_Accpetance_Flag(true);
                        console.log('Request Accpeted');
                    }}>
                    <Text style={style.btn_text}>Accept Request</Text>
                </Pressable>
                <Pressable
                    style={style.btn}
                    onPress={() => {
                        console.log('Request Rejected');
                        setStdEmail(item.semail);
                        setCourseId(item.cid);
                        set_Rejection_Flag(true);
                    }}>
                    <Text style={style.btn_text}>Reject Request</Text>
                </Pressable>
            </View>
        </View>
    );

    return (
        <View>
            {!notificationFlag && (
                <View style={style.no_request_div}>
                    <Text style={style.no_request_txt}>No New Requests Available</Text>
                </View>
            )}
            {notificationFlag && (
                <View>
                    <View style={style.heading}>
                        <Text style={style.h_text}>Std Email</Text>
                        <Text style={style.h_text}>Course Name</Text>
                    </View>
                    <View>
                        <FlatList
                            data={notificationList}
                            renderItem={renderItem}
                        />
                    </View>
                </View>
            )}
        </View>
    );
}

const style = StyleSheet.create({
    no_request_div: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 250,
    },
    no_request_txt: {
        fontWeight: '900',
        fontStyle: 'italic',
    },
    modal: {
        justifyContent: 'center',
        backgroundColor: 'rgba(102,24,231,0.7)',
        marginHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    heading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginHorizontal: 10,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop: 10,
    },
    h_text: {
        color: '#000000',
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
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
        paddingHorizontal: 20,
        paddingVertical: 7,
        borderRadius: 5,
        marginHorizontal: 20,
    },
    btn_text: {
        color: '#000000',
        fontWeight: '600',
    },
});
