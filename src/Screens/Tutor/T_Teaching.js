/* eslint-disable prettier/prettier */
import { Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GetWithParams } from '../../Api/API_Types';
import styles from '../../Assests/Styling';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';

export default function T_Teaching() {
  const [teachingCourses, SetteachingCourses] = useState([]);

  useEffect(() => {
    getteachingCourses();
  }, []);

  const getteachingCourses = async () => {
    let gmail = await getgmailFormAsync();
    if (gmail !== null) {
      const paramsObject = {
        controller: 'Tutor',
        action: 'Get_Ttr_Teaching',
        params: { email: gmail },
      };
      let response = await GetWithParams(paramsObject);
      if (response !== 'No Courses found in enrollement Table') {
        SetteachingCourses(response);
      }
      else {
        SetteachingCourses(null);
      }
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
