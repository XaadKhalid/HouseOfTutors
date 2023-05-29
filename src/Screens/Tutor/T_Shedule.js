/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import styles from '../../Assests/Styling';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import { GetWithParams, PostWithParams } from '../../Api/API_Types';
import { useIsFocused } from '@react-navigation/native';

export default function T_Shedule() {
  const [selectedslot, setselectedslot] = useState(Array(112).fill(false));
  const [checkBoxIndex, setCheckBoxIndex] = useState([]);
  const [schedulearray, setSchedulearray] = useState(Array(112).fill(0));
  const [stdemail, setStdEmail] = useState('');
  const isFocused = useIsFocused();

  const daysofweek = [
    ' Time Slots ',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ];

  const timelsots = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
    '18:00 - 19:00',
    '19:00 - 20:00',
    '20:00 - 21:00',
    '21:00 - 22:00',
    '22:00 - 23:00',
    '23:00 - 24:00',
  ];

  useEffect(() => {
    if (isFocused) {
      getSchedule();
    }
  }, [isFocused]);

  useEffect(() => {
    getCompleteIndexTable();
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
      if (schedulearray[i] === '1' || schedulearray[i] === '2' || schedulearray[i] === '3') {
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

  // const renderRowWiseCheckBox = ({ item }) => {
  //   return (
  //     <View style={{ marginHorizontal: 6 }}>
  //       {item.map(index => (
  //         <CheckBox
  //           key={index}
  //           value={selectedslot[index]}
  //           onValueChange={value => {
  //             const newSelectedSlot = [...selectedslot];
  //             newSelectedSlot[index] = value;
  //             setselectedslot(newSelectedSlot);
  //           }}
  //           tintColors={
  //             selectedslot[index] && schedulearray[index] === '2'
  //               ? { true: 'red', false: 'gray' }
  //               : { true: 'green', false: 'gray' }
  //           }
  //         />
  //       ))}
  //     </View>
  //   );
  // };

  const renderRowWiseCheckBox = ({ item }) => {
    return (
      <View style={{ marginVertical: 7, marginHorizontal: 13 }}>
        {item.map(index => {
          let isChecked = selectedslot[index];
          const scheduleValue = schedulearray[index];
          let disableflag = false;
          let checkboxInnerStyle = null;
          if (isChecked && scheduleValue === '1') {
            checkboxInnerStyle = styles.checkboxInner1;
          } else if (isChecked && scheduleValue === '2') {
            checkboxInnerStyle = styles.checkboxInner2;
            disableflag = true;
          } else if (isChecked && scheduleValue === '3') {
            console.log('i m 3');
            checkboxInnerStyle = styles.checkboxInner3;
            disableflag = true;
          } else if (!isChecked && scheduleValue === '0') {
            checkboxInnerStyle = styles.checkboxInner0;
          }
          return (
            <View key={index}>
              <TouchableOpacity
                onPress={() => {
                  console.log('before updating flag is ', isChecked);
                  console.log();
                  const newSelectedSlot = [...selectedslot];
                  newSelectedSlot[index] = !isChecked;
                  isChecked = !isChecked;
                  console.log('after updating flag is ', newSelectedSlot[index]);
                  console.log();
                  setselectedslot(newSelectedSlot);
                }}
                disabled={disableflag}
                style={[styles.checkbox, isChecked ? styles.checkboxInner1 : styles.checkboxInner0]}>
                {isChecked && <View style={checkboxInnerStyle} />}
                {!isChecked && <View style={checkboxInnerStyle} />}
              </TouchableOpacity>
            </View>
          );
        })}
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
