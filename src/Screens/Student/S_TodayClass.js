/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../Assests/Styling';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import { GetWithParams } from '../../Api/API_Types';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function S_TodayClass() {

  const [classesList, setClassesList] = useState([]);

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = async () => {
    let gmail = '';
    let asyncresponse = await getgmailFormAsync();
    if (asyncresponse !== null) {
      gmail = asyncresponse;
      const paramsObject = {
        controller: 'Student',
        action: 'Get_Today_Classes',
        params: { semail: gmail },
      };
      let response = await GetWithParams(paramsObject);
      if (response !== 'No class are schedule for today' && response !== 'No Record Found in the Enrollment') {
        setClassesList(response);
      }
      else {
        setClassesList(null);
      }
    }
  };

  const renderclasses = ({ item, index }) => (
    <View key={index} style={styles.containerbox}>
      <View style={styles.itembox}>
        <Text style={styles.itemText}>Course: </Text>
        <Text style={styles.itemText}>{item.cname}</Text>
      </View>
      <View style={styles.itembox}>
        <Text style={styles.itemText}>Tutor: </Text>
        <Text style={styles.itemText}>{item.tname}</Text>
      </View>
      <View style={styles.itembox}>
        <Text style={styles.itemText}>Time: </Text>
        <Text style={styles.itemText}>{item.slotindexes}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => {
        console.log('Reschedule is Pressed');
        console.log();
      }}>
        <Text style={styles.buttonText}>ReSchedule Class</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.bodyContainer}>
      {classesList ? (
        <View>
          <FlatList
            data={classesList}
            renderItem={renderclasses} />
        </View>
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>
            You are not having any class for Today{'\n'}
            <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
            <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
            <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
          </Text>
        </View>
      )}
    </View>
  );
}
