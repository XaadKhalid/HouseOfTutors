/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../Assests/Styling';
import { useIsFocused } from '@react-navigation/native';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import { GetWithParams } from '../../Api/API_Types';

const Classes_List = ({ route, navigation }) => {
    const { preDate, selectedDate } = route.params;
    const [classesList, setClassesList] = useState([]);
    const [buttonname, setbuttonname] = useState('');
    const [date, setdate] = useState(new Date());
    const [scheduleType, setScheduleType] = useState(0);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getclasses();
        }
    }, [isFocused]);

    const getclasses = async () => {
        let asyncresponse = await getgmailFormAsync();
        if (asyncresponse !== null) {
            console.log('Before checking date is ', preDate, selectedDate);
            let mydate = new Date();
            if (preDate !== undefined) {
                console.log('PreScheduling...');
                console.log();
                setdate(preDate);
                setScheduleType(3);
                mydate = preDate;
                setbuttonname('PreSchedule Class');
            }
            else {
                console.log('ReScheduling...');
                console.log();
                setdate(selectedDate);
                setScheduleType(2);
                mydate = selectedDate;
                setbuttonname('ReSchedule Class');
            }
            const paramsObject = {
                controller: 'Tutor',
                action: 'Pre_Re_Schedule_Classes_List',
                params: {
                    temail: asyncresponse,
                    date: mydate,
                },
            };
            let response = await GetWithParams(paramsObject);
            if (response !== 'No Classes are scheduled on given date' && response !== 'No Record Available in Enrollement Table') {
                setClassesList(response);
            } else {
                setClassesList(null);
            }
        }
    };

    const renderclasses = ({ item, index }) => (
        <View key={index} style={styles.containerbox}>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Course: </Text>
                <Text style={styles.itemText}>{item.cname}</Text>
            </View>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Student: </Text>
                <Text style={styles.itemText}>{item.sname}</Text>
            </View>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Date: </Text>
                <Text style={styles.itemText}>{item.date}</Text>
            </View>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Time: </Text>
                <Text style={styles.itemText}>{item.slotindexes}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate('Available_Classes', {
                    sname: item.sname,
                    tname: item.tname,
                    date,
                    cname: item.cname,
                    slotFrom: item.slotindexes,
                    scheduleType,
                });
            }}>
                <Text style={styles.buttonText}>{buttonname}</Text>
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
                        No classes found for Scheduling!
                    </Text>
                </View>
            )
            }
        </View >
    );
};

export default Classes_List;
