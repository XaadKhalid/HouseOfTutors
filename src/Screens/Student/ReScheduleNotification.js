/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../Assests/Styling';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import { GetWithParams } from '../../Api/API_Types';

export default function ReScheduleNotification() {
    const [isTutoring, setIsTutoring] = useState(true);
    const [isReschedule, setIsReschedule] = useState(false);
    const [tutorsRequests, settutorsRequests] = useState([]);
    const [rescheduleRequests, setRescheduleRequests] = useState([]);

    useEffect(() => {
        getTutorRequest();
    }, []);

    const getTutorRequest = async () => {
        let asyncresponse = await getgmailFormAsync();
        if (asyncresponse !== null) {
            const paramsObject = {
                controller: 'Student',
                action: 'Get_Tutor_Requests_Status',
                params: { semail: asyncresponse },
            };
            let response = await GetWithParams(paramsObject);
            if (response !== 'You didnt send any request yet') {
                settutorsRequests(response);
            }
            else {
                settutorsRequests(null);
            }
        }
    };

    const togglebutton = () => {
        setIsReschedule(!isReschedule);
        setIsTutoring(!isTutoring);
    };

    const renderTRequest = ({ item, index }) => (
        <View key={index} style={styles.containerbox}>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Course: </Text>
                <Text style={styles.itemText}>{item.cname}</Text>
            </View>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Tutor: </Text>
                <Text style={styles.itemText}>{item.temail}</Text>
            </View>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Request Status: </Text>
                {item.status === '0' ? (
                    <Text style={styles.itemText}>Pending</Text>
                ) : item.status === '1' ? (
                    <Text style={styles.itemText}>Accepted</Text>
                ) : (
                    <Text style={styles.itemText}>Rejected</Text>
                )}
            </View>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Request D&T: </Text>
                <Text style={styles.itemText}>{item.requestDT}</Text>
            </View>
        </View>
    );

    const renderRRequest = ({ item, index }) => (
        <View key={index} style={styles.containerbox}>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Course: </Text>
                <Text style={styles.itemText}>{item.cname}</Text>
            </View>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Tutor: </Text>
                <Text style={styles.itemText}>{item.tname}</Text>
            </View>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Time: </Text>
                <Text style={styles.itemText}>{item.slotindexes}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.bodyContainer}>
            <View style={styles.containerbox}>
                <View style={styles.itembox}>
                    <TouchableOpacity
                        disabled={isTutoring}
                        style={isTutoring ? styles.disablebutton : styles.button2}
                        onPress={() => {
                            togglebutton();
                        }}>
                        <Text style={styles.buttonText}>Tutoring Requests</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={isReschedule}
                        style={!isReschedule ? styles.button2 : styles.disablebutton}
                        onPress={() => {
                            togglebutton();
                        }}>
                        <Text style={styles.buttonText}>ReSchedule Requests</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {isTutoring && (
                <View>
                    {tutorsRequests ? (
                        <FlatList
                            data={tutorsRequests}
                            renderItem={renderTRequest}
                            style={{ marginBottom: 78 }} />
                    ) : (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataText}>
                                You had not make any request
                            </Text>
                        </View>
                    )
                    }
                </View>
            )}
            {isReschedule && (
                <View>
                    {rescheduleRequests ? (
                        <FlatList
                            data={rescheduleRequests}
                            renderItem={renderRRequest}
                            style={{ marginBottom: 78 }} />
                    ) : (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataText}>
                                No tutor send request for ReSchedule
                            </Text>
                        </View>
                    )
                    }
                </View>
            )}
        </View >
    );
}
