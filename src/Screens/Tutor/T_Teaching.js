/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GetWithParams } from '../../Api/API_Types';
import styles from '../../Assests/Styling';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function T_Teaching() {
  const [teachingCourses, SetteachingCourses] = useState([]);
  const [stdEmail, setStdEmail] = useState('');

  useEffect(() => {
    getgmail();
  }, []);

  useEffect(() => {
    if (stdEmail !== '') {
      getteachingCourses();
    }
  }, [stdEmail]);

  const getgmail = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('std_email');
      if (jsonValue != null) {
        setStdEmail(jsonValue);
        console.log('Getting the email address of student from Asyncstorage => ', jsonValue);
        console.log('----------------------------------------------------------------------------');
      } else {
        console.log('No gmail found in Asyncstorage');
        console.log('----------------------------------------------------------------------------');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getteachingCourses = async () => {
    const paramsObject = {
      controller: 'Tutor',
      action: 'Get_Ttr_Teaching',
      params: { email: stdEmail },
    };
    let response = await GetWithParams(paramsObject);
    if (response !== 'No Courses found in enrollement Table') {
      SetteachingCourses(response);
    }
    else {
      SetteachingCourses(null);
    }
  };

  const renderteachingCourses = ({ item, index }) => (
    <View key={index} style={styles.containerbox}>
      <View style={styles.detailsbox}>
        <View style={styles.itembox}>
          <Text style={styles.itemText}>Course :</Text>
          <Text style={styles.itemText}>{item.cname}</Text>
        </View>
        <View style={styles.itembox}>
          <Text style={styles.itemText}>Student :</Text>
          <Text style={styles.itemText}>{item.sname}</Text>
        </View>
        <View style={styles.itembox}>
          <Text style={styles.itemText}>Status :</Text>
          <Text style={styles.itemText}>{item.status}</Text>
        </View>
        <View style={styles.itembox}>
          <Text style={styles.itemText}>Class Time :</Text>
          {item.timeslots.map((slot) => (
            <Text key={slot} style={styles.itemText}>{slot}</Text>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.bodyContainer}>
      {teachingCourses ? (
        <View>
          <FlatList
            data={teachingCourses}
            renderItem={renderteachingCourses} />
        </View>
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>You are not teaching any course to Students xd!</Text>
        </View>
      )}
    </View>
  );
}
