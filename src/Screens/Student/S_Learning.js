/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { Text, View, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GetWithParams, PostWithParams } from '../../Api/API_Types';
import styles from '../../Assests/Styling';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import StarRating from './Rating';

export default function S_Learning() {
  const [learningCourses, SetLearningCourses] = useState([]);
  const [isFinised, setIsFinished] = useState(true);
  const [rating, setRating] = useState(0);
  const [isRatingVisible, setisRatingVisible] = useState(false);

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

  const handleFinishCourse = async (sname, tname, cname) => {
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
      setIsFinished(true);
      ToastAndroid.show('Course Finished Successfully Please Rate Tutor', ToastAndroid.SHORT);
    }
  };

  const handleRateTutor = async (sname, tname, cname) => {
    const paramsObject = {
      controller: 'Student',
      action: 'RateTutor',
      params: {
        sname: sname,
        tname: tname,
        cname: cname,
        rating: rating,
      },
    };
    if (isFinised) {
      let response = await PostWithParams(paramsObject);
      if (response !== 'Course Not Found') {
        ToastAndroid.show('Tutor Rated Successfully', ToastAndroid.SHORT);
        getlearningCourses();
      }
    }
    else {
      ToastAndroid.show('Cannot Rate Tutor before Finishing Course', ToastAndroid.SHORT);
    }
  };

  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
    console.log('rating updated and going to again loading');
    getlearningCourses();
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
          <TouchableOpacity style={isFinised ? styles.button : styles.disablebutton} disabled={!isFinised} onPress={async () => {
            //handleFinishCourse(item.sname, item.tname, item.cname);
            setIsFinished(false);
          }}>
            <Text style={styles.buttonText}>Finish Course</Text>
          </TouchableOpacity>
          <TouchableOpacity style={isFinised ? styles.disablebutton : styles.button} disabled={isFinised} onPress={async () => {
            //handleRateTutor(item.sname, item.tname, item.cname);
            setisRatingVisible(true);
          }}>
            <Text style={styles.buttonText}>Rate Tutor</Text>
          </TouchableOpacity>
        </View>
        {isRatingVisible && (
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <StarRating rating={rating} onStarPress={handleStarPress} />
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
