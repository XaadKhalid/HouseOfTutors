/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { Text, View, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GetWithParams, PostWithParams } from '../../Api/API_Types';
import styles from '../../Assests/Styling';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import StarRating from './Rating';
import StarRated from './Rated';

export default function S_Learning() {
  const [learningCourses, SetLearningCourses] = useState([]);
  //const [rating, setRating] = useState(0);

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
      response.sort((a, b) => {
        if (a.status === 'In Progress' && b.status === 'Completed') {
          return -1; // "In Progress" comes before "Completed"
        } else if (a.status === 'Completed' && b.status === 'In Progress') {
          return 1; // "Completed" comes after "In Progress"
        } else {
          return 0; // Maintain the original order
        }
      });
      const updatedList = response.map((item, index) => {
        if (item.status === 'In Progress') {
          item = {
            ...item,
            isFinised: true,
            isRatingVisible: false,
            isButtonVisible: true,
            isAlreadyRated: false,
          };
          return item;
        } else {
          item = {
            ...item,
            isFinised: false,
            isRatingVisible: false,
            isButtonVisible: false,
            isAlreadyRated: true,
          };
          return item;
        }
      });
      SetLearningCourses(updatedList);
    }
  };

  const toggleFinish = (index) => {
    const updated = learningCourses.map((item, index1) => {
      if (index === index1) {
        return {
          ...item,
          isFinised: !item.isFinised,
        };
      }
      return item;
    });
    SetLearningCourses(updated);
  };

  const toggleRate = (index) => {
    const updated = learningCourses.map((item, index1) => {
      if (index === index1) {
        return {
          ...item,
          isRatingVisible: !item.isRatingVisible,
          isButtonVisible: !item.isButtonVisible,
        };
      }
      return item;
    });
    SetLearningCourses(updated);
  };

  const handleFinishCourse = async (sname, tname, cname, index) => {
    const paramsObject = {
      controller: 'Student',
      action: 'FinishCourse',
      params: {
        sname: sname,
        tname: tname,
        cname: cname,
      },
    };
    let response = await PostWithParams(paramsObject);
    if (response !== 'No Course Enrolled To Finish') {
      toggleFinish(index);
      ToastAndroid.show('Course Finished Successfully Please Rate Tutor', ToastAndroid.SHORT);
    }
  };

  const handleRateTutor = async (sname, tname, cname, value) => {
    const paramsObject = {
      controller: 'Student',
      action: 'RateTutor',
      params: {
        sname: sname,
        tname: tname,
        cname: cname,
        rating: value,
      },
    };
    let response = await PostWithParams(paramsObject);
    if (response !== 'Course Not Found') {
      ToastAndroid.show('Tutor Rated Successfully', ToastAndroid.SHORT);
      getlearningCourses();
    }
  };

  const handleStars = (sname, tname, cname, value) => {
    //setRating(value);
    handleRateTutor(sname, tname, cname, value);
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
        {item.isAlreadyRated ? (
          <View style={styles.itembox}>
            <Text style={styles.itemText}>Rating :</Text>
            <StarRated rating={item.rating} />
          </View>
        ) : (
          <View style={styles.itembox}>
            <Text style={styles.itemText}>Class Time :</Text>
            {item.timeslots.map((slot) => (
              <Text key={slot} style={styles.itemText}>{slot}</Text>
            ))}
          </View>
        )}
        {item.isButtonVisible && (
          <View style={styles.itembox}>
            <TouchableOpacity style={item.isFinised ? styles.button : styles.disablebutton} disabled={!item.isFinised} onPress={async () => {
              handleFinishCourse(item.sname, item.tname, item.cname, index);
            }}>
              <Text style={styles.buttonText}>Finish Course</Text>
            </TouchableOpacity>
            <TouchableOpacity style={item.isFinised ? styles.disablebutton : styles.button} disabled={item.isFinised} onPress={async () => {
              toggleRate(index);
            }}>
              <Text style={styles.buttonText}>Rate Tutor</Text>
            </TouchableOpacity>
          </View>
        )}
        {item.isRatingVisible && (
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <StarRating rating={0} onStarPress={(value) => {
              handleStars(item.sname, item.tname, item.cname, value);
            }} />
          </View>
        )}
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
