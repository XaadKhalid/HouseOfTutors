/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function T_TodayClass() {
  const [todayClassesList, setTodayClassesList] = useState([]);
  const [stdEmail, setStdEmail] = useState('');

  useEffect(() => {
    getgmail();
  }, []);

  useEffect(() => {
    if (stdEmail !== '') {
      get_today_classes();
    }
  }, [stdEmail]);

  useEffect(() => {
    if (todayClassesList.length > 0) {
      console.log('updated list is ', todayClassesList);
    }
  }, [todayClassesList]);

  const getgmail = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('std_email');
      if (jsonValue != null) {
        setStdEmail(jsonValue);
        console.log(
          'Getting the email address of student from Asyncstorage => ',
          jsonValue,
        );
        console.log(
          '----------------------------------------------------------------------------',
        );
      } else {
        console.log('No gmail found in Asyncstorage');
        console.log(
          '----------------------------------------------------------------------------',
        );
      }
    } catch (e) {
      console.log(e);
      console.log(
        '----------------------------------------------------------------------------',
      );
    }
  };

  const get_today_classes = async () => {
    try {
      const response = await fetch(
        `http://192.168.43.231/HouseOfTutors/api/Tutor/Get_Today_Classes?temail=${stdEmail}`,
      );
      const data = await response.json();
      console.log('Result from get_today_classes API =>', data);
      console.log(
        '----------------------------------------------------------------------------',
      );
      if (
        data !== 'No class are schedule for today' &&
        data !== 'No Record Found in the Enrollment'
      ) {
        setTodayClassesList(data);
      } else {
        Alert.alert('No class are schedule for today');
        console.log(
          '----------------------------------------------------------------------------',
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.modal}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <Text style={styles.text}>{item.cname}</Text>
        <Text style={styles.text}>{item.sname}</Text>
        <Text style={styles.text}>{item.slotindexes.toString()}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 42,
        }}>
        <Pressable
          style={styles.btn}
          onPress={() => {
            console.log(
              'Take is presseed!'
            );
            console.log(
              '----------------------------------------------------------------------------',
            );
          }}>
          <Text style={styles.btn_text}>Take</Text>
        </Pressable>
        <Pressable
          style={styles.btn}
          onPress={() => {
            console.log(
              'ReSchedule is presseed!'
            );
            console.log(
              '----------------------------------------------------------------------------',
            );
          }}>
          <Text style={styles.btn_text}>ReSchedule</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View>
      <View style={styles.heading}>
        <Text style={styles.h_text}>CName</Text>
        <Text style={styles.h_text}>Student</Text>
        <Text style={styles.h_text}>Time Slot</Text>
      </View>
      {todayClassesList && (
        <View style={styles.FList_BM}>
          <FlatList
            data={todayClassesList}
            renderItem={renderItem}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    backgroundColor: 'rgba(102,24,231,0.7)',
    marginHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
    borderColor: '#ffffff',
    borderWidth: 2,
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 5,
    //textAlign: 'center',
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(102,24,231,0.9)',
    marginHorizontal: 10,
    paddingVertical: 15,
    marginTop: 10,
  },
  h_text: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginHorizontal: 20,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#FFB22F',
    elevation: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
  btn_text: {
    color: '#000000',
    fontWeight: '600',
  },
  FList_BM: {
    marginBottom: 70,
  },
});
