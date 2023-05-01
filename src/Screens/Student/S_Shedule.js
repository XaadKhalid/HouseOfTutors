/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function S_Shedule() {
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
    if (stdemail !== '') {
      getSchedule(stdemail);
    }
  }, [stdemail]);

  useEffect(() => {
    getCompleteIndexTable();
    getgmail();
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

  const getgmail = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('std_email');
      if (jsonValue != null) {
        setStdEmail(jsonValue);
      }
      else {
        console.log('No gmail found in Asyncstorage');
        console.log('----------------------------------------------------------------------------');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getSchedule = async (email) => {
    console.log('result to be fethed for ', email);
    console.log('----------------------------------------------------------------------------');
    try {
      const response = await fetch(
        `http://192.168.43.231/HouseOfTutors/api/Student/GetStudentSchedule?email=${email}`,
      );
      const data = await response.json();
      console.log('Result from getschedule API: ', data);
      console.log('----------------------------------------------------------------------------');
      if (data !== null) {
        const scheduleData = data.split('');
        if (scheduleData.includes('1')) {
          setSchedulearray(scheduleData);
          console.log('converted api string to array', scheduleData);
          console.log('----------------------------------------------------------------------------');
        }
        else {
          Alert.alert('No Schedule Set please update first');
        }
      } else {
        Alert.alert('No Schedule Found!');
      }
    } catch (error) {
      console.log(error);
      console.log('----------------------------------------------------------------------------');
    }
  };

  const setPreCheckedSlots = () => {
    console.log('update schedulearry  is ', schedulearray);
    let temarray = [...selectedslot];
    for (let i = 0; i < schedulearray.length; i++) {
      if (schedulearray[i] === '1' || schedulearray[i] === '2') {
        temarray[i] = true;
      } else {
        temarray[i] = false;
      }
    }
    setselectedslot(temarray);
    console.log(temarray);
    console.log('----------------------------------------------------------------------------');
  };

  const setSchedule = async (details, email) => {
    try {
      const response = await fetch(`http://192.168.43.231/HouseOfTutors/api/student/StudentSchedule?details=${details}&email=${email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      console.log(data);
      console.log('----------------------------------------------------------------------------');
      Alert.alert(data);
    }
    catch (error) {
      console.log(error);
      console.log('----------------------------------------------------------------------------');
    }
  };

  const renderDaysOfWeek = ({ item }) => (
    <View style={styles.headerbox}>
      <Text style={styles.headertext}>{item}</Text>
    </View>
  );

  const renderTimeSlots = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.timetext}>{item}</Text>
      <FlatList
        data={checkBoxIndex[index]}
        renderItem={renderRowWiseCheckBox}
        horizontal
      />
    </View>
  );

  const renderRowWiseCheckBox = ({ item }) => {
    return (
      <View style={{ marginHorizontal: 5 }}>
        {item.map(index => (
          <CheckBox
            key={index}
            value={selectedslot[index]}
            onValueChange={value => {
              const newSelectedSlot = [...selectedslot];
              newSelectedSlot[index] = value;
              setselectedslot(newSelectedSlot);
              console.log(schedulearray[index]);
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

  return (
    <View style={styles.container}>
      <FlatList
        data={daysofweek}
        renderItem={renderDaysOfWeek}
        keyExtractor={day => day}
        horizontal
      />
      <FlatList
        data={timelsots}
        renderItem={renderTimeSlots}
        keyExtractor={time => time}
      />
      <Pressable
        onPress={() => {
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
        }}>
        <Text style={styles.button}>Update Schedule</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  row: {
    flexDirection: 'row',
  },
  headerbox: {
    borderWidth: 2,
    borderColor: '#000',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  headertext: {
    fontSize: 14,
    marginRight: 22,
    color: '#000',
  },
  timetext: {
    fontSize: 14,
    color: '#000',
    marginLeft: 0,
    marginTop: 7,
  },
  button: {
    backgroundColor: '#FFB22F',
    paddingVertical: 5,
    borderRadius: 5,
    textAlign: 'center',
    width: '40%',
    color: '#282634',
    elevation: 3,
    marginLeft: 120,
    marginBottom: 18,
    fontWeight: 'bold',
  },
});
