/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from 'react-native-dialog';
import DialogInput from 'react-native-dialog/lib/Input';

export default function T_Profile() {
  const [courseList, setCourseList] = useState(false);
  const [enlistedCourse, setEnlistedCourse] = useState(false);
  const [completeCourseList, setCompleteCourseList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [visible, setVisible] = useState(false);
  const [courseGrade, setcourseGrade] = useState('');
  const [courseId, setCourseId] = useState('');
  const [tEmail, setTEmail] = useState('');

  useEffect(() => {
    getgmail();
    getEnlistedCourses();
  }, [tEmail, courseList]);

  const getgmail = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('std_email');
      if (jsonValue != null) {
        setTEmail(jsonValue);
        console.log('Getting the email address of student from Asyncstorage => ', tEmail);
      } else {
        console.log('No gmail found in Asyncstorage');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getcourses = async () => {
    try {
      const response = await fetch(
        'http://192.168.43.231/HouseOfTutors/api/Student/GetCourses',
      );
      const data = await response.json();
      console.log('Result from Getcourses API => ', data);
      if (data !== null) {
        setCompleteCourseList(data);
      } else {
        Alert.alert('No Course Found!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getEnlistedCourses = async () => {
    try {
      const response = await fetch(
        `http://192.168.43.231/HouseOfTutors/api/Tutor/GetTutorEnlist?semail=${tEmail}`,
      );
      const data = await response.json();
      console.log('Result from getEnlistedCourses API =>', data);
      if (data !== 'No courses yet') {
        setSelectedCourse(data);
        setEnlistedCourse(!enlistedCourse);
      } else {
        Alert.alert('No courses Enlisted Press Add to Enlist Course');
        console.log('No courses yet');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handle_Course_toggler = () => {
    // if (courseList === true) {
    //   getcourses();
    // }
    getcourses();
  };

  const CourseEnlist = async () => {
    try {
      const response = await fetch(
        `http://192.168.43.231/HouseOfTutors/api/Tutor/TutorCourseEnlist?temail=${tEmail}&cid=${courseId}&grade=${courseGrade}`,
        {
          method: 'POST',
        },
      );
      const data = await response.json();
      console.log('Response from Student CourseEnlist API => ', data);
      if (data === 'Course Already Enlisted') {
        Alert.alert('Course Already Enlisted!');
      } else {
        Alert.alert(data);
        //setSelectedCourse([...selectedCourse, item]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handle_Course_enlist = () => {
    setVisible(false);
    console.log('course id to be added in wishlist is ', courseId);
    console.log('Grade for that course is ', courseGrade);
    CourseEnlist();
  };

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <View style={styles.main_container}>
      <View>
        <Pressable
          style={styles.add_Course_btn}
          onPress={() => {
            setCourseList(!courseList);
            handle_Course_toggler();
          }}>
          <Ionicons name="add-outline" size={45} color="#ffffff" />
        </Pressable>
      </View>
      <View>
        {courseList && (
          <>
            <View>
              <Text
                style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 23 }}>
                Select Courses to Wishlist
              </Text>
            </View>
            <View style={styles.FList_BM}>
              <FlatList
                data={completeCourseList}
                renderItem={({ item }) => (
                  <View style={styles.modal}>
                    <Text style={styles.text}>Name: {item.cname}</Text>
                    <Text style={styles.text}>C-Code: {item.ccode}</Text>
                    <View>
                      <Pressable
                        style={styles.btn}
                        onPress={() => {
                          showDialog();
                          setCourseId(item.cid);
                        }}>
                        <Text style={styles.btn_text}>Add Course</Text>
                      </Pressable>
                    </View>
                    <View>
                      <Dialog.Container visible={visible}>
                        <Dialog.Title>Grade Confirmation</Dialog.Title>
                        <DialogInput label="Enter your grade" onChangeText={value => setcourseGrade(value)} keyboardType="default" />
                        <Dialog.Button label="Cancel" onPress={handleCancel} />
                        <Dialog.Button label="Confirm" onPress={handle_Course_enlist} />
                      </Dialog.Container>
                    </View>
                  </View>
                )}
              />
            </View>
          </>
        )}
        {enlistedCourse && (
          <>
            <Text
              style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 23 }}>
              Courses Wishlist
            </Text>
            <View style={styles.FList_BM}>
              <FlatList
                data={selectedCourse}
                renderItem={({ item }) => (
                  <View style={styles.modal}>
                    <Text style={styles.text}>Grade: {item.grade}</Text>
                    <Text style={styles.text}>Name: {item.cname}</Text>
                    <Text style={styles.text}>Course ID: {item.cid}</Text>
                  </View>
                )}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    padding: 15,
  },
  add_Course_btn: {
    backgroundColor: '#792AFB',
    borderRadius: 50 / 2,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    elevation: 10,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(102,24,231,0.8)',
    marginHorizontal: 60,
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
  crse_bm: {
    marginBottom: 100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  inputField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#FFB22F',
    elevation: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  btn_text: {
    color: '#000000',
    fontWeight: '600',
  },
  FList_BM: {
    marginBottom: 200,
  },
});
