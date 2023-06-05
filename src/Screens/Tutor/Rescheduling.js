/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../../Assests/Styling';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Rescheduling({ navigation }) {
    const [selectedDate, setSelectedDate] = useState('');
    const [showDatebox, setShowDatebox] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, settoDate] = useState('');
    const [preDate, setPreDate] = useState('');
    const [saveFDate, setSaveFDate] = useState(false);
    const [savetDate, setSaveTDate] = useState(false);
    const [savePDate, setSavePDate] = useState(false);
    const [isMaxDateEnabled, setisMaxDateEnabled] = useState(false);
    const [isMinDateEnabled, setisMinDateEnabled] = useState(false);
    const [isSingleDate, setisSingleDate] = useState(false);
    const [isMulitDate, setisMulitDate] = useState(false);
    const [isPreSchedule, setisPreSchedule] = useState(false);
    const [minDate, setMinDate] = useState(new Date());
    const [maxDate, setMaxDate] = useState(new Date());

    const handleDateSelect = (event, selDate) => {
        const customDate = new Date(selDate);
        setShowDatebox(false);
        if (!isNaN(customDate)) {
            const day = customDate.getDate().toString().padStart(2, '0');
            const month = (customDate.getMonth() + 1).toString().padStart(2, '0');
            const year = customDate.getFullYear().toString();
            const formattedDate = `${month}/${day}/${year}`;
            if (saveFDate) {
                setFromDate(formattedDate);
                setSaveFDate(false);
            } else if (savetDate) {
                settoDate(formattedDate);
                setSaveTDate(false);
            } else if (savePDate) {
                setPreDate(formattedDate);
                setSavePDate(false);
            } else {
                setSelectedDate(formattedDate);
            }
            console.log(formattedDate);
            console.log();
        } else {
            console.log('Invalid date object');
        }
    };

    return (
        <View style={[styles.bodyContainer, { flexDirection: 'column', justifyContent: 'center' }]}>
            {showDatebox && (
                <View>
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display="default"
                        minimumDate={isMinDateEnabled ? minDate : undefined}
                        //minimumDate={minDate}
                        maximumDate={isMaxDateEnabled ? maxDate : undefined}
                        onChange={handleDateSelect}
                    />
                </View>
            )}
            <View style={styles.containerbox}>
                <TouchableOpacity style={[styles.button, { marginBottom: 5 }]} onPressIn={() => {
                    setMinDate(new Date()); // Reset minDate to current date
                    setMaxDate(new Date()); // Reset maxDate to current date
                    setMinDate((prevDate) => {
                        prevDate.setDate(prevDate.getDate() + 1);
                        return new Date(prevDate);
                    });
                    setMaxDate((prevDate) => {
                        prevDate.setDate(prevDate.getDate() + 7);
                        return new Date(prevDate);
                    });
                    setisMaxDateEnabled(true);
                    setisMinDateEnabled(true);
                    setisPreSchedule(true);
                    setisSingleDate(false);
                    setisMulitDate(false);
                }}>
                    <Text style={styles.buttonText}>Pre Schedule</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { marginBottom: 5 }]} onPressIn={() => {
                    setMinDate(new Date()); // Reset minDate to current date
                    setMaxDate(new Date()); // Reset maxDate to current date
                    setMinDate((prevDate) => {
                        prevDate.setDate(prevDate.getDate() - 1);
                        return new Date(prevDate);
                    });
                    setisMaxDateEnabled(false);
                    setisMinDateEnabled(true);
                    setisSingleDate(true);
                    setisPreSchedule(false);
                    setisMulitDate(false);
                }}>
                    <Text style={styles.buttonText}>Single Reschedule</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { marginBottom: 4 }]} onPressIn={() => {
                    setMinDate(new Date()); // Reset minDate to current date
                    setMaxDate(new Date()); // Reset maxDate to current date
                    setMinDate((prevDate) => {
                        prevDate.setDate(prevDate.getDate() + 1);
                        return new Date(prevDate);
                    });
                    setisMinDateEnabled(true);
                    setisMaxDateEnabled(false);
                    setisMulitDate(true);
                    setisSingleDate(false);
                    setisPreSchedule(false);
                }}>
                    <Text style={styles.buttonText}>Multiple ReSchedule</Text>
                </TouchableOpacity>
            </View>
            {isSingleDate && (
                <View style={styles.containerbox}>
                    <Text style={styles.itemText}>Select Date for ReScheduling Class</Text>
                    <View style={styles.itembox}>
                        <Text style={[styles.itemText, { marginTop: 5 }]}>Selected Date : {selectedDate}</Text>
                        <TouchableOpacity onPress={() => {
                            setShowDatebox(true);
                            setFromDate('');
                            settoDate('');
                            setPreDate('');
                        }}>
                            <MaterialIcons name="date-range" size={30} color="#FFB22F" style={styles.ip_icon} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button} onPressIn={() => {
                        if (selectedDate !== '') {
                            navigation.navigate('Classes_List', { selectedDate });
                        }
                        else {
                            ToastAndroid.show('Please select Date first', ToastAndroid.SHORT);
                        }
                    }}>
                        <Text style={styles.buttonText}>Search Classes</Text>
                    </TouchableOpacity>
                </View>
            )}
            {isPreSchedule && (
                <View style={styles.containerbox}>
                    <Text style={styles.itemText}>Select Date for PreScheduling Class</Text>
                    <View style={styles.itembox}>
                        <Text style={[styles.itemText, { marginTop: 5 }]}>Selected Date : {preDate}</Text>
                        <TouchableOpacity onPress={() => {
                            setFromDate('');
                            settoDate('');
                            setSelectedDate('');
                            setShowDatebox(true);
                            setSavePDate(true);
                        }}>
                            <MaterialIcons name="date-range" size={30} color="#FFB22F" style={styles.ip_icon} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button} onPressIn={() => {
                        if (preDate !== '') {
                            navigation.navigate('Classes_List', { preDate });
                        }
                        else {
                            ToastAndroid.show('Please select Date first', ToastAndroid.SHORT);
                        }
                    }}>
                        <Text style={styles.buttonText}>Search Classes</Text>
                    </TouchableOpacity>
                </View>
            )}
            {isMulitDate && (
                <View style={styles.containerbox}>
                    <Text style={styles.itemText}>Select Date Range for Multiple Schedule</Text>
                    <View style={styles.itembox}>
                        <TouchableOpacity onPress={() => {
                            setShowDatebox(true);
                            setSaveFDate(true);
                            setSelectedDate('');
                            setPreDate('');
                        }}>
                            <MaterialIcons name="date-range" size={30} color="#FFB22F" style={styles.ip_icon} />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.itemText}>From: {fromDate}</Text>
                        </View>
                        <View>
                            <Text style={styles.itemText}>To: {toDate}</Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            setShowDatebox(true);
                            setSaveTDate(true);
                            setSelectedDate('');
                            setPreDate('');
                        }}>
                            <MaterialIcons name="date-range" size={30} color="#FFB22F" style={styles.ip_icon} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button} onPressIn={() => {
                        if (fromDate !== '' && toDate !== '' && toDate > fromDate) {
                            navigation.navigate('MultiClasses_List', { fromDate, toDate });
                        }
                        else {
                            ToastAndroid.show('Please select a Valid Date first', ToastAndroid.SHORT);
                        }
                    }}>
                        <Text style={styles.buttonText}>Search Classes</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View >
    );
}
