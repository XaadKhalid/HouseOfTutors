/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../Assests/Styling';
import { GetWithParams, PostWithParams } from '../../Api/API_Types';

const Available_Classes = ({ route, navigation }) => {
    const { sname, tname, date, cname, slotFrom, scheduleType } = route.params;
    const [classesList, setClassesList] = useState([]);

    useEffect(() => {
        getclasses();
    }, []);

    const getclasses = async () => {
        let paramsObject = {
            controller: 'Tutor',
            action: 'ReSchedule_Available_Slots',
            params: {
                tname: tname,
                sname: sname,
                userDate: date,
            },
        };
        if (scheduleType === 3) {
            paramsObject = {
                ...paramsObject,
                action: 'PreSchedule_Available_Slots',
            };
        }
        let response = await GetWithParams(paramsObject);
        if (response !== 'No matching slot available' && response !== 'No schedule id found for tutor') {
            setClassesList(response);
        } else {
            setClassesList(null);
        }
    };

    const sendRequest = async (dateTo, slotTo) => {
        const paramsObject = {
            controller: 'Tutor',
            action: 'Send_Reschedule_Request',
            params: {
                tname: tname,
                sname: sname,
                cname: cname,
                dateFrom: date,
                dateTo: dateTo,
                slotFrom: slotFrom,
                slotTo: slotTo,
                schedulingType: scheduleType,
            },
        };
        let response = await PostWithParams(paramsObject);
        if (response !== 'No record found in enrollement table') {
            ToastAndroid.show(response, ToastAndroid.SHORT);
            navigation.navigate('Rescheduling');
        }
    };

    const renderclasses = ({ item, index }) => (
        <View>
            <TouchableOpacity onPress={() => {
                sendRequest(item.date, item.slot);
            }}>
                <View key={index} style={styles.containerbox}>
                    <View style={styles.itembox}>
                        <Text style={styles.itemText}>{item.date}</Text>
                        <Text style={styles.itemText}>{item.slot}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.bodyContainer}>
            {classesList ? (
                <View>
                    <FlatList
                        data={classesList}
                        renderItem={renderclasses} />
                </View>
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>
                        No Matching Slots found for Scheduling!
                    </Text>
                </View>
            )
            }
        </View >
    );
};

export default Available_Classes;
