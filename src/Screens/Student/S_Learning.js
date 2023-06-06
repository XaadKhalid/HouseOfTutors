/* eslint-disable prettier/prettier */
import { Text, View, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GetWithParams, PostWithParams } from '../../Api/API_Types';
import styles from '../../Assests/Styling';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';

export default function S_Learning() {
  const [learningCourses, SetLearningCourses] = useState([]);

  useEffect(() => {
    getlearningCourses();
  }, []);

  const getlearningCourses = async () => {
    let gmail = await getgmailFormAsync();
    const paramsObject = {
      controller: 'Student',
      action: 'Get_Std_Learning',
      params: { email: gmail },
    };
    let response = await GetWithParams(paramsObject);
    if (response.includes('No Courses found in enrollement Table')) {
      SetLearningCourses(null);
    }
    else {
      SetLearningCourses(response);
    }
  };

  const renderlearningCourses = ({ item, index }) => (
    <View key={index} style={styles.containerbox}>
      <View style={styles.detailsbox}>
        <View style={styles.itembox}>
          <Text style={styles.itemText}>Course :</Text>
          <Text style={styles.itemText}>{item.cname}</Text>
        </View>
        <View style={styles.itembox}>
          <Text style={styles.itemText}>Tutor :</Text>
          <Text style={styles.itemText}>{item.tname}</Text>
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
        <View style={styles.itembox}>
          <TouchableOpacity style={styles.button} onPress={async () => {
            const paramsObject = {
              controller: 'Student',
              action: 'FinishCourse',
              params: {
                sname: item.sname,
                tname: item.tname,
                cname: item.cname,
              },
            };
            let response = await PostWithParams(paramsObject);
            if (response !== 'No Course Enrolled To Finish') {
              ToastAndroid.show('Course Finished Successfully Please Rate Tutor', ToastAndroid.SHORT);
            }
          }}>
            <Text style={styles.buttonText}>Finish Course</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            console.log('Rate Tutor is Pressed');
            console.log();
          }}>
            <Text style={styles.buttonText}>Rate Tutor</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  );

  return (
    <View style={styles.bodyContainer}>
      {learningCourses ? (
        <View>
          <FlatList
            data={learningCourses}
            renderItem={renderlearningCourses} />
        </View>
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>
            You are not learning any course from Tutors {'\n'}
            <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
            <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
            <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
          </Text>
        </View>
      )}
    </View>
  );
}
