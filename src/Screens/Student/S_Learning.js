/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GetWithParams } from '../../Api/API_Types';
import styles from '../../Assests/Styling';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function S_Learning() {
  const [learningCourses, SetLearningCourses] = useState([]);
  const [stdEmail, setStdEmail] = useState('');

  useEffect(() => {
    getgmail();
  }, []);

  useEffect(() => {
    if (stdEmail !== '') {
      getlearningCourses();
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

  const getlearningCourses = async () => {
    const paramsObject = {
      controller: 'Student',
      action: 'Get_Std_Learning',
      params: { email: stdEmail },
    };
    let response = await GetWithParams(paramsObject);
    if (response.includes('No Courses found in enrollement Table')) {
      SetLearningCourses(null);
    }
    else {
      SetLearningCourses(response);
    }
  };

  const toggleFlag = index => {
    const temparray = [...learningCourses];
    temparray[index].flag = !temparray[index].flag;
    SetLearningCourses(temparray);
  };

  const renderlearningCourses = ({ item, index }) => (
    <View key={index} style={styles.containerbox}>
      <View style={styles.itembox}>
        <Text style={styles.itemText}>{item.cname}</Text>
        <TouchableOpacity onPress={() => {
          toggleFlag(index);
        }}>
          <FontAwesome
            name={item.flag ? 'arrow-circle-o-up' : 'arrow-circle-o-down'}
            size={25}
            color="gold"
          />
        </TouchableOpacity>
      </View>
      {item.flag && (
        <View style={styles.detailsbox}>
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
        </View>
      )}
    </View>
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
