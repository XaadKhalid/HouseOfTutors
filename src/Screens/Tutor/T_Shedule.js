/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import styles from '../../Assests/Styling';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import { GetWithParams, PostWithParams } from '../../Api/API_Types';

export default function T_Shedule() {
  const [selectedslot, setselectedslot] = useState(Array(112).fill(false));
  const [checkBoxIndex, setCheckBoxIndex] = useState([]);
  const [schedulearray, setSchedulearray] = useState(Array(112).fill(0));
  const [stdemail, setStdEmail] = useState('');

  const daysofweek = [
    'Time Slots',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ];

  const timelsots = [
    '08:00-09:00AM',
    '09:00-10:00AM',
    '10:00-11:00AM',
    '11:00-12:00PM',
    '12:00-01:00PM',
    '01:00-02:00PM',
    '02:00-03:00PM',
    '03:00-04:00PM',
    '04:00-05:00PM',
    '05:00-06:00PM',
    '06:00-07:00PM',
    '07:00-08:00PM',
    '08:00-09:00PM',
    '09:00-10:00PM',
    '10:00-11:00PM',
    '11:00-12:00AM',
  ];

  useEffect(() => {
    getCompleteIndexTable();
    getSchedule();
  }, []);

  useEffect(() => {
    if (schedulearray !== []) {
      setPreCheckedSlots();
    }
  }, [schedulearray]);

  const getIndexesOfSingleRow = rwoindex => {
    let start = rwoindex;
    return Array(7)
      .fill()
      .map((_, index) => {
        const value = start + index * 16;
        return [value];
      });
  };

  const getCompleteIndexTable = () => {
    let rowsarray = [];
    for (let i = 0; i < 16; i++) {
      rowsarray[i] = getIndexesOfSingleRow(i);
    }
    setCheckBoxIndex(rowsarray);
  };

  const getSchedule = async () => {
    let asyncresponse = await getgmailFormAsync();
    if (asyncresponse !== null) {
      setStdEmail(asyncresponse);
      const paramsObject = {
        controller: 'Tutor',
        action: 'GetTutorSchedule',
        params: { email: asyncresponse },
      };
      let response = await GetWithParams(paramsObject);
      if (response !== null) {
        const scheduleData = response.split('');
        if (scheduleData.includes('1')) {
          setSchedulearray(scheduleData);
          console.log('converted api string to array', scheduleData);
          console.log();
        }
        else {
          Alert.alert('No Schedule set please update it first');
        }
      }
      else {
        Alert.alert('No Schedule Found!');
      }
    }
  };

  const setPreCheckedSlots = () => {
    let temarray = [...selectedslot];
    for (let i = 0; i < schedulearray.length; i++) {
      if (schedulearray[i] === '1' || schedulearray[i] === '2') {
        temarray[i] = true;
      } else {
        temarray[i] = false;
      }
    }
    setselectedslot(temarray);
  };

  const setSchedule = async (details, email) => {
    const paramsObject = {
      controller: 'Tutor',
      action: 'TutorSchedule',
      params: { details: details, email: email },
    };
    let response = await PostWithParams(paramsObject);
    if (response !== null) {
      Alert.alert(response);
    }
  };

  const renderDaysOfWeek = ({ item }) => (
    <View style={{ marginHorizontal: 9 }}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  const renderTimeSlots = ({ item, index }) => (
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ color: '#000', marginTop: 7 }}>{item}</Text>
      <FlatList
        data={checkBoxIndex[index]}
        renderItem={renderRowWiseCheckBox}
        horizontal
      />
    </View>
  );

  const renderRowWiseCheckBox = ({ item }) => {
    return (
      <View style={{ marginHorizontal: 4 }}>
        {item.map(index => (
          <CheckBox
            key={index}
            value={selectedslot[index]}
            onValueChange={value => {
              const newSelectedSlot = [...selectedslot];
              newSelectedSlot[index] = value;
              setselectedslot(newSelectedSlot);
            }}
            tintColors={
              selectedslot[index] && schedulearray[index] === '2'
                ? { true: 'red', false: 'gray' }
                : { true: 'green', false: 'gray' }
            }
          />
        ))}
      </View>
    );
  };

  const updateSchedule = () => {
    let str1 = '';
    for (let i = 0; i < selectedslot.length; i++) {
      if (selectedslot[i] === true) {
        if (schedulearray[i] === '2') {
          str1 = str1 + '2';
        }
        else {
          str1 = str1 + '1';
        }
      } else {
        str1 = str1 + '0';
      }
    }
    setSchedule(str1, stdemail);
  };

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.dayOfWeekWrapper}>
        <FlatList
          data={daysofweek}
          renderItem={renderDaysOfWeek}
          keyExtractor={day => day}
          horizontal
        />
      </View>
      <FlatList
        data={timelsots}
        renderItem={renderTimeSlots}
        keyExtractor={time => time}
        contentContainerStyle={{ marginLeft: 5 }}
      />
      <TouchableOpacity style={styles.button} onPress={() => {
        updateSchedule();
      }}>
        <Text style={styles.buttonText}>Update Schedule</Text>
      </TouchableOpacity>
    </View>
  );
}
