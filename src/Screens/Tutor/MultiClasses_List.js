/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../Assests/Styling';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import { GetWithParams } from '../../Api/API_Types';

const MultiClasses_List = ({ route, navigation }) => {
    const { fromDate, toDate } = route.params;
    const [classesList, setClassesList] = useState([]);

    useEffect(() => {
        getclasses();
    }, []);

    const getclasses = async () => {
        let asyncresponse = await getgmailFormAsync();
        if (asyncresponse !== null) {
            const paramsObject = {
                controller: 'Tutor',
                action: 'Multi_ReSchedule_Classes_List',
                params: {
                    temail: asyncresponse,
                    startDate: fromDate,
                    endDate: toDate,
                },
            };
            let response = await GetWithParams(paramsObject);
            if (response !== 'No Classes are scheduled between the given dates' && response !== 'No Record Available in Enrollement Table') {
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
                <Text style={styles.itemText}>Time: </Text>
                <Text style={styles.itemText}>{item.slotindexes}</Text>
            </View>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Date: </Text>
                <Text style={styles.itemText}>{item.date}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate('Available_Classes', {
                    sname: item.sname,
                    tname: item.tname,
                    date: toDate,
                    cname: item.cname,
                    scheduleType: 2,
                    slotFrom: item.slotindexes[0],
                });
            }}>
                <Text style={styles.buttonText}>ReSchedule Class</Text>
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
                        No classes found for Scheduling on given dates!
                    </Text>
                </View>
            )
            }
        </View >
    );

};

export default MultiClasses_List;
