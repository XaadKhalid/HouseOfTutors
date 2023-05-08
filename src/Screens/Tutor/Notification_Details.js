/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import styles from '../../Assests/Styling';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import { GetWithParams, PostWithObject, PostWithParams } from '../../Api/API_Types';

export default function Notification_Details() {
    const [notificationList, setNotificationList] = useState([]);
    const [tEmail, setTEmail] = useState('');
    const [approvedSlots, setApprovedSlots] = useState([]);
    const [stdEmail, setStdEmail] = useState('');
    const [courseId, setCourseId] = useState(-1);
    const [acceptance_Flag, set_Accpetance_Flag] = useState(false);
    const [rejection_Flag, set_Rejection_Flag] = useState(false);

    useEffect(() => {
        get_notifications();
    }, []);

    useEffect(() => {
        if (acceptance_Flag) {
            handle_accept_request();
            set_Accpetance_Flag(false);
        }
    }, [acceptance_Flag]);

    useEffect(() => {
        if (rejection_Flag) {
            reject_request();
            set_Rejection_Flag(false);
        }
    }, [rejection_Flag]);

    const get_notifications = async () => {
        let gmail = await getgmailFormAsync();
        if (gmail !== null) {
            const paramsObject = {
                controller: 'Tutor',
                action: 'GetStudentRequests',
                params: { temail: gmail },
            };
            setTEmail(gmail);
            let response = await GetWithParams(paramsObject);
            if (response !== 'No Requests') {
                response.forEach(element => {
                    element.checkedslots = [];
                });
                setNotificationList(response);
                console.log('updated notificationlist is ', response);
            }
            else {
                setNotificationList(null);
            }
        }
    };

    const handle_accept_request = () => {
        if (approvedSlots.length === 0) {
            Alert.alert('No slot confirmed yet');
        }
        else {
            accept_request();
        }
    };

    const accept_request = async () => {
        const paramsObject = {
            controller: 'Tutor',
            action: 'Accept_Student_Request',
            params: {
                semail: stdEmail,
                temail: tEmail,
                courseid: courseId,
                selectedslots: approvedSlots,
            },
        };
        let response = await PostWithObject(paramsObject);
        Alert.alert(response);
        get_notifications();
    };

    const reject_request = async () => {
        const paramsObject = {
            controller: 'Tutor',
            action: 'Reject_Student_Request',
            params: {
                semail: stdEmail,
                temail: tEmail,
                cid: courseId,
            },
        };
        let response = await PostWithParams(paramsObject);
        Alert.alert(response);
        get_notifications();
    };

    const checkboxVerification = (flagsofslot, index, item) => {
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
    };

    const renderNotifications = ({ item, index }) => (
        <View style={styles.containerbox}>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Course :</Text>
                <Text style={styles.itemText}>{item.cname}</Text>
            </View>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Student :</Text>
                <Text style={styles.itemText}>{item.semail}</Text>
            </View>
            <View>
                {item.Slots.map((slot, sIndex) => {
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
                                    checkboxVerification(flagsofslot, index, item);
                                }}
                            />
                            <Text style={{ fontStyle: 'italic', color: '#ffffff', marginTop: 5 }}>{slot}</Text>
                        </View>
                    );
                })}
            </View>
            <View style={styles.itembox}>
                <TouchableOpacity style={styles.button} onPressIn={() => {
                    setStdEmail(item.semail);
                    setCourseId(item.cid);
                    setApprovedSlots(item.checkedslots);
                    set_Accpetance_Flag(true);
                    console.log('Request Accpeted is pressed');
                }}>
                    <Text style={styles.buttonText}>Accept Request</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    console.log('Request Rejected is pressed');
                    setStdEmail(item.semail);
                    setCourseId(item.cid);
                    set_Rejection_Flag(true);
                }}>
                    <Text style={styles.buttonText}>Reject Request</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.bodyContainer}>
            {notificationList ? (
                <View>
                    <FlatList
                        data={notificationList}
                        renderItem={renderNotifications} />
                </View>
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>
                        No new request is available{'\n'}
                        <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
                        <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
                        <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
                    </Text>
                </View>
            )}
        </View>
    );
}
