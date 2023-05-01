/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function S_TodayClass() {
  const [todayClassesList, setTodayClassesList] = useState([]);
  const [stdEmail, setStdEmail] = useState('');

  useEffect(() => {
    getgmail();
  }, []);

  useEffect(() => {
    if (stdEmail !== '') {
      console.log('Email address against which classes are fetched is ', stdEmail);
      get_today_classes();
    }
  }, [stdEmail]);

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
        `http://192.168.43.231/HouseOfTutors/api/Student/Get_Today_Classes?semail=${stdEmail}`,
      );
      const data = await response.json();
      console.log('Result from get_today_classes API =>', data);
      console.log(
        '----------------------------------------------------------------------------',
      );
      if (data !== 'No class are schedule for today' && data !== 'No Record Found in the Enrollment') {
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

  return (
    <View>
      <View style={styles.heading}>
        <Text style={styles.h_text}>CName</Text>
        <Text style={styles.h_text}>Student</Text>
        <Text style={styles.h_text}>Class</Text>
        <Text style={styles.h_text}>Status</Text>
      </View>
      {!todayClassesList && (
        <View style={styles.FList_BM}>
          <FlatList
            data={todayClassesList}
            renderItem={({ item }) => (
              <View style={styles.modal}>
                {/* <Text style={styles.text}>CID: {item.cid}</Text> */}
                <Text style={styles.text}>{item.ccode}</Text>
                <Text style={styles.text}>{item.cname}</Text>
                <View>
                  <Pressable
                    style={styles.btn}
                    onPress={() => {
                      console.log(
                        'course id and email to be passed in enlist course api is ',
                        item.cid,
                        stdEmail,
                      );
                      console.log(
                        '----------------------------------------------------------------------------',
                      );
                    }}>
                    <Text style={styles.btn_text}>Take</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'rgba(102,24,231,0.7)',
    marginHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    //backgroundColor: '#ffffff',
    marginHorizontal: 10,
    paddingVertical: 15,
    marginTop: 10,
  },
  h_text: {
    //color: '#000000',
    fontWeight: 'bold',
    marginBottom: 5,
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
