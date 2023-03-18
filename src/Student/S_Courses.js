/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Modal,
  FlatList,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Disp_selectedcourse = ({ selectedCourse }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tutors, setTutors] = useState([]);

  const get_tutors = async id => {
    try {
      let gmail = 'sohaib@gmail.com';
      const response = await fetch(
        `http://192.168.43.90/HouseOfTutorsAPI_2/api/student/FindTutor?semail=${gmail}&cid=${id}`,
      );
      const data = await response.json();
      console.log('Data from API =>', data);
      console.log(id);
      if (data === 'No Teacher Found!') {
        Alert.alert('No Teacher Found!');
      } else {
        setTutors(data);
        setIsVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <FlatList
        data={selectedCourse}
        renderItem={({ item }) => (
          <View style={styles.modal}>
            <Text style={styles.text}>Course ID: {item.cid}</Text>
            <Text style={styles.text}>Name: {item.cname}</Text>
            <View>
              <Button
                title="Find Tutor"
                onPress={() => {
                  get_tutors(item.cid);
                  console.log('Find tutor for course', item.cid);
                }}
              />
            </View>
          </View>
        )}
      />
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={isVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        <FlatList
          data={tutors}
          renderItem={({ item1 }) => (
            <View style={styles.modal}>
              <Text style={styles.text}>Teacher ID: {item1}</Text>
              {/* <Text style={styles.text}>Name: {item1.temail}</Text> */}
              <View>
                <Button
                  title="Send Request"
                  onPress={() => {
                    setIsVisible(!isVisible);
                    console.log('Data to be send in send request', item1);
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

export default function S_Courses() {
  const [isVisible, setIsVisible] = useState(false);
  const [myCourses, setMyCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);

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
        }}>
        <FlatList
          data={myCourses}
          renderItem={({ item }) => (
            <View style={styles.modal}>
              <Text style={styles.text}>Course ID: {item.cid}</Text>
              <Text style={styles.text}>Name: {item.cname}</Text>
              <View>
                <Button
                  title="Add Course"
                  onPress={() => {
                    setIsVisible(!isVisible);
                    console.log('item to be passed in array', item);
                    setSelectedCourse([...selectedCourse, item]);
                  }}
                />
              </View>
            </View>
          )}
        />
      </Modal>
      <Disp_selectedcourse selectedCourse={selectedCourse} />
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    padding: 10,
    // backgroundColor: '#497174',
    // height: '100%',
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
    backgroundColor: '#792AFB',
    height: 100,
    width: '70%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 10,
    marginLeft: 60,
    elevation: 5,
  },
  text: {
    color: '#ffffff',
  },
});
