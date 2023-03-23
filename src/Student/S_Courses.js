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
  const [stdEmail, setStdEmail] = useState('');
  const [visible, setVisible] = useState(false);
  const [numOfSlots, setNumOfSlots] = useState(0);
  const [courseId, setCourseId] = useState('');
  const [tutorsList_Visibility, setTutorsList_Visibility] = useState(false);
  const [tutorsList, setTutorsList] = useState([]);
  const [tEmail, setTEmail] = useState('');

  useEffect(() => {
    getgmail();
    getEnlistedCourses();
  }, [stdEmail]);

  const getgmail = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('std_email');
      if (jsonValue != null) {
        setStdEmail(jsonValue);
        console.log('Getting the email address of student from Asyncstorage => ', stdEmail);
        console.log('----------------------------------------------------------------------------');
      } else {
        console.log('No gmail found in Asyncstorage');
        console.log('----------------------------------------------------------------------------');
      }
    } catch (e) {
      console.log(e);
      console.log('----------------------------------------------------------------------------');
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
        `http://192.168.43.231/HouseOfTutors/api/Student/GetStudentEnlist?semail=${stdEmail}`,
      );
      const data = await response.json();
      console.log('Result from getEnlistedCourses API =>', data);
      console.log('----------------------------------------------------------------------------');
      if (data !== 'No course enlisted') {
        setSelectedCourse(data);
        console.log('I ma in the if condition of getenlisted course if api is yes');
        console.log('----------------------------------------------------------------------------');
        setEnlistedCourse(!enlistedCourse);
      } else {
        Alert.alert('No courses Enlisted pleae Press Add to Enlist Course');
        console.log('No courses added yet');
        console.log('----------------------------------------------------------------------------');
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

  const CourseEnlist = async item => {
    try {
      const response = await fetch(
        `http://192.168.43.231/HouseOfTutors/api/Student/StudentCourseEnlist?semail=${stdEmail}&cid=${item.cid}`,
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
        setSelectedCourse([...selectedCourse, item]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handle_Course_enlist = course => {
    console.log('course to be added in wishlist is ', course);
    CourseEnlist(course);
  };

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handle_Find_tutor = () => {
    console.log('Number of slots required => ', numOfSlots);
    console.log('coruseid against which tutor will be searched ', courseId);
    setVisible(false);
    get_tutors();
  };

  const get_tutors = async () => {
    try {
      const response = await fetch(
        `http://192.168.43.231/HouseOfTutors/api/student/FindTutor?semail=${stdEmail}&cid=${courseId}`,
      );
      const data = await response.json();
      console.log('Result from get_tutors API => ', data);
      if (data === 'No tutor available') {
        Alert.alert('No tutor available!');
        setTutorsList_Visibility(false);
      } else {
        setTutorsList(data);
        setEnlistedCourse(!enlistedCourse);
        setTutorsList_Visibility(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const send_tutor_request = async () => {
    try {
      const response = await fetch(
        `http://192.168.43.231/HouseOfTutors/api/Student/SendTutorRequest?semail=${stdEmail}&temail=${tEmail}&cid=${courseId}`, {
        method: 'POST',
      }
      );
      const data = await response.json();
      console.log('Result from send_tutor_request API => ', data);
      if (data === 'Already Requested') {
        setTutorsList_Visibility(false);
        setEnlistedCourse(true);
        Alert.alert('Already Requested!');
      } else {
        Alert.alert(data);
        setTutorsList_Visibility(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handle_send_request = () => {
    console.log('updated state of temail is => ', tEmail);
    send_tutor_request();
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
                    {/* <Text style={styles.text}>CID: {item.cid}</Text> */}
                    <Text style={styles.text}>Name: {item.cname}</Text>
                    <Text style={styles.text}>C-Code: {item.ccode}</Text>
                    <View>
                      <Pressable
                        style={styles.btn}
                        onPress={() => {
                          handle_Course_enlist(item);
                        }}>
                        <Text style={styles.btn_text}>Add Course</Text>
                      </Pressable>
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
                    <Text style={styles.text}>Course ID: {item.cid}</Text>
                    <Text style={styles.text}>Name: {item.cname}</Text>
                    <View>
                      <Pressable style={styles.btn} onPress={() => {
                        setCourseId(item.cid);
                        showDialog();
                      }}>
                        <Text style={styles.btn_text}>Find Tutor</Text>
                      </Pressable>
                    </View>
                    <View>
                      <Dialog.Container visible={visible}>
                        <Dialog.Title>Slots Confirmation</Dialog.Title>
                        <DialogInput label="Enter no of slots" onChangeText={value => setNumOfSlots(value)} keyboardType="number-pad" />
                        <Dialog.Button label="Cancel" onPress={handleCancel} />
                        <Dialog.Button label="Confirm" onPress={handle_Find_tutor} />
                      </Dialog.Container>
                    </View>
                  </View>
                )}
              />
            </View>
          </>
        )}
        {tutorsList_Visibility && (
          <>
            <View>
              <Text
                style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 23 }}>
                Our Best Teachers
              </Text>
            </View>
            <View style={styles.FList_BM}>
              <FlatList
                data={tutorsList}
                renderItem={({ item }) => (
                  <View style={styles.modal}>
                    {/* <Text style={styles.text}>CID: {item.cid}</Text> */}
                    <Text style={styles.text}>Name: {item.tname}</Text>
                    {/* <Text style={styles.text}>C-Code: {item.ccode}</Text> */}
                    <View>
                      <Pressable
                        style={styles.btn}
                        onPress={() => {
                          console.log('send request is sent');
                          setTEmail(item.temail);
                          handle_send_request();
                        }}>
                        <Text style={styles.btn_text}>Send Request</Text>
                      </Pressable>
                    </View>
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
