/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Modal,
  FlatList,
  Button,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Disp_selectedcourse = ({ selectedCourse, stdEmail }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tutors, setTutors] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [tEmail, setTeMail] = useState('');

  // useEffect(() => {
  //   get_tutors();
  // }, [courseId]);

  const get_tutors = async () => {
    try {
      const response = await fetch(
        `http://192.168.43.231/HouseOfTutors/api/student/FindTutor?semail=${stdEmail}&cid=${courseId}`,
      );
      const data = await response.json();
      console.log('Data from API =>', data);
      if (data === 'No tutor available') {
        Alert.alert('No tutor available!');
      } else {
        setTutors(data);
        setIsVisible(!isVisible);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const send_tutor_request = async () => {
    //console.log('Cid against which ttuor will be searched', courseId);
    //console.log('email against which ttuor will be searched', stdEmail);
    try {
      const response = await fetch(
        `http://192.168.43.231/HouseOfTutors/api/Student/SendTutorRequest?semail=${stdEmail}&temail=${tEmail}&cid=${courseId}`, {
        method: 'POST',
      }
      );
      const data = await response.json();
      console.log('Data from API =>', data);
      if (data === 'Already Requested') {
        Alert.alert('Already Requested!');
      } else {
        Alert.alert(data);
        setIsVisible(!isVisible);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.crse_bm}>
      <FlatList
        data={selectedCourse}
        renderItem={({ item }) => {
          return (
            <View style={styles.modal}>
              <Text style={styles.text}>Course ID: {item.cid}</Text>
              <Text style={styles.text}>Name: {item.cname}</Text>
              <View>
                <Button
                  title="Send Request"
                  onPress={() => {
                    console.log('Find tutor for course', item.cid);
                    //<Modal_NumofSlot item={item} visible={true} get_tutors={get_tutors} setIsVisible={setIsVisible} isVisible={isVisible} />;
                    //setSelectedCourse([item]);
                    setCourseId(item.cid);
                    get_tutors();
                  }} />
              </View>
            </View>
          );
        }}
      />
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(!isVisible);
          console.log('Modal has been closed.');
        }}>
        <FlatList
          data={tutors}
          renderItem={({ item }) => (
            <View style={styles.modal}>
              <Text style={styles.text}>Teacher ID: {item.tname}</Text>
              <View>
                <Button
                  title="Send Request"
                  onPress={() => {
                    setTeMail(item.temail);
                    send_tutor_request();
                    //setIsVisible(!isVisible);
                    console.log('Data to be send in send request', item);
                  }}
                />
              </View>
            </View>
          )}
        />
      </Modal>
    </View>
  );
};

const Modal_NumofSlot = ({ item, visible, get_tutors, setIsVisible, isVisible }) => {
  const [numofSlots, setNumOfSlots] = useState(1);
  const [modalVisible, setModalVisible] = useState(visible);

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible(!modalVisible)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            onChangeText={text => setNumOfSlots(text)}
            value={numofSlots}
            placeholder="Enter number of slots"
            style={styles.inputField}
          />
          <Button
            onPress={() => {
              get_tutors(item);
              setIsVisible(!isVisible);
              setModalVisible(!modalVisible);
            }}
            title="Submit"
          />
        </View>
      </View>
    </Modal>
  );
};

export default function S_Courses() {
  const [isVisible, setIsVisible] = useState(false);
  const [myCourses, setMyCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [stdEmail, setStdEmail] = useState('');

  useEffect(() => {
    getgmail();
    getEnlistedCourses();
  }, [selectedCourse, stdEmail]);

  const getgmail = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('std_email');
      if (jsonValue != null) {
        setStdEmail(jsonValue);
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
      console.log('Data from API =>', data);
      if (data !== null) {
        setMyCourses(data);
      } else {
        Alert.alert('No Course Found!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const CourseEnlist = async item => {
    try {
      const response = await fetch(
        `http://192.168.43.231/HouseOfTutors/api/student/StudentCourseEnlist?semail=${stdEmail}&cid=${item.cid}`,
        {
          method: 'POST',
        },
      );
      const data = await response.json();
      console.log('Response from Student CourseEnlist API =>', data);
      if (data === 'Course Already Enlisted') {
        Alert.alert('Course Already Enlisted!');
      } else {
        Alert.alert(data);
        setIsVisible(!isVisible);
        console.log('item to be passed in selectcourse_array is=>', item);
        setSelectedCourse([...selectedCourse, item]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getEnlistedCourses = async () => {
    try {
      const response = await fetch(
        `http://192.168.43.231/HouseOfTutors/api/student/GetStudentEnlist?semail=${stdEmail}`,
      );
      const data = await response.json();
      console.log('Data from getEnlistedCourses API =>', data);
      if (data !== []) {
        setSelectedCourse(data);
      } else {
        Alert.alert('No courses Enlisted pleae Press Add to Enlist Course');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.main_container}>
      <View>
        <Pressable
          style={styles.add_Course_btn}
          onPress={() => {
            setIsVisible(true);
            getcourses();
          }}>
          <Icon name="add-outline" size={45} color="#ffffff" />
        </Pressable>
      </View>
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={isVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
          setIsVisible(!isVisible);
        }}>
        <View style={{ paddingVertical: 25 }}>
          <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 23 }}>EnList Courses</Text>
          <FlatList
            data={myCourses}
            renderItem={({ item }) => (
              <View style={styles.modal}>
                <Text style={styles.text}>C-Code: {item.ccode}</Text>
                <Text style={styles.text}>Name: {item.cname}</Text>
                <View>
                  <Button
                    title="Add Course"
                    onPress={() => {
                      console.log('item passed to CourseEnlist API', item);
                      CourseEnlist(item);
                    }}
                  />
                </View>
              </View>
            )}
          />
        </View>
      </Modal>
      <Disp_selectedcourse
        selectedCourse={selectedCourse}
        stdEmail={stdEmail}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    padding: 10,
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
    backgroundColor: 'rgba(102,24,231,0.9)',
    marginHorizontal: 80,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    elevation: 5,
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 5,
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
});
